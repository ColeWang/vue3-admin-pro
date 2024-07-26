import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Menu, theme } from 'ant-design-vue'
import OutIcon from './OutIcon'
import useShowTitle from '../../hooks/useShowTitle'
import { hasChild, showChildren } from '../../utils'
import { getPropsSlot } from '@utils/props-util'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'
import { dropRight, head, isNil, last, reverse } from 'lodash-es'

function createFlatMenus (menus) {
    const flatMenus = []

    function loopMenus (childMenus, parent) {
        return childMenus.forEach((item) => {
            const nextItem = { ...item, parent }
            if (item && hasChild(item)) {
                nextItem.children = loopMenus(nextItem.children, nextItem)
            }
            flatMenus.push(nextItem)
        })
    }

    loopMenus(menus, null)
    return flatMenus
}

function createMenuItem (item, showTitle) {
    if (item.children && item.children.length === 1) {
        const soleItem = head(item.children) || {}
        return (
            <Menu.Item key={soleItem.name} v-slots={{
                icon: () => <OutIcon type={soleItem.icon || item.icon}/>
            }}>
                <span>{showTitle && showTitle(soleItem)}</span>
            </Menu.Item>
        )
    } else {
        return showChildren(item) ? (
            <XSubMenu option={item} key={item.name}/>
        ) : (
            <Menu.Item key={item.name} v-slots={{
                icon: () => <OutIcon type={item.icon}/>
            }}>
                <span>{showTitle && showTitle(item)}</span>
            </Menu.Item>
        )
    }
}

const XSubMenu = defineComponent({
    inheritAttrs: false,
    props: {
        ...Menu.SubMenu.props,
        option: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props) {
        const { showTitle } = useShowTitle()

        return () => {
            const { option, ...restProps } = props

            const subMenuSlots = {
                title: () => {
                    return (
                        <Fragment>
                            <OutIcon type={option.icon}/>
                            <span>{showTitle && showTitle(option)}</span>
                        </Fragment>
                    )
                }
            }
            return (
                <Menu.SubMenu
                    {...restProps}
                    key={option.name}
                    v-slots={subMenuSlots}
                >
                    {option.children.map((item) => {
                        return createMenuItem(item, showTitle)
                    })}
                </Menu.SubMenu>
            )
        }
    }
})

export default defineComponent({
    inheritAttrs: false,
    props: {
        route: {
            type: Object,
            default: () => ({})
        },
        theme: {
            type: String,
            default: 'dark' // light dark
        },
        level: {
            type: Number,
            default: 3 // 8 * n
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => ([])
        },
        logo: {
            type: Function,
            default: undefined
        },
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change', 'open'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-sidebar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { showTitle } = useShowTitle()

        const flatMenus = createFlatMenus(props.menus)
        const selectedKeys = ref([])
        const openKeys = ref([])

        watch(() => props.route, (currentRoute) => {
            const { meta = {}, name } = currentRoute
            const needName = meta.hltInName || name
            selectedKeys.value = [needName]
            if (!props.collapsed) {
                const nextKeys = genFlatKeys(flatMenus, needName)
                setOpenKeys(nextKeys)
            }
        }, { deep: true, immediate: true })

        function setOpenKeys (value) {
            openKeys.value = value
            emit('open')
        }

        function onSelectMenu (params) {
            const { route: currentRoute } = props
            if (currentRoute.name !== params.key) {
                emit('change', params.key)
            }
        }

        function genFlatKeys (values, key) {
            let result = values.find((item) => item.name === key)
            const keys = []
            while (result && !isNil(result)) {
                keys.push(result.name)
                result = result.parent
            }
            return reverse(keys)
        }

        function onOpenChange (values) {
            const latest = values.find((key) => unref(openKeys).indexOf(key) === -1)
            if (latest && !isNil(latest)) {
                const nextKeys = genFlatKeys(flatMenus, last(values))
                setOpenKeys(nextKeys)
            } else {
                const findIndex = unref(openKeys).findIndex((key) => values.indexOf(key) === -1)
                const nextKeys = dropRight(unref(openKeys), unref(openKeys).length - findIndex)
                setOpenKeys(nextKeys)
            }
        }

        return () => {
            const { theme, level, collapsed, menus } = props
            const { controlHeightLG, controlHeightSM } = unref(token)

            const menuProps = {
                mode: 'inline',
                theme: theme,
                inlineCollapsed: collapsed,
                selectedKeys: unref(selectedKeys),
                openKeys: unref(openKeys),
                inlineIndent: controlHeightSM,
                onSelect: onSelectMenu,
                onOpenChange: onOpenChange
            }

            const logoDom = getPropsSlot(slots, props, 'logo')
            const children = menus.map((item) => {
                return createMenuItem(item, showTitle)
            })

            const menuStyle = collapsed ? {
                width: `${controlHeightLG * 2}px`
            } : {
                width: `${controlHeightLG * 5 + level * 8}px`
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value, `${prefixCls.value}-${theme}`]} {...attrs}>
                    <div class={`${prefixCls.value}-space`}>
                        <div class={`${prefixCls.value}-content`}>
                            <div class={`${prefixCls.value}-logo`}>
                                {logoDom}
                            </div>
                            <Menu {...menuProps} style={menuStyle}>
                                {children}
                            </Menu>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
