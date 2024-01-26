import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Menu } from 'ant-design-vue'
import OutIcon from './OutIcon'
import Logo from './Logo'
import useShowTitle from '../../hooks/useShowTitle'
import { dropRight, head, isNil, last, reverse } from 'lodash-es'
import { hasChild } from '../../utils'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

function showChildren (item) {
    return !!(item.children && item.children.length > 1)
}

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
        const menuItemSlots = {
            icon: () => <OutIcon type={soleItem.icon || item.icon}/>,
            default: () => <span>{showTitle(soleItem)}</span>
        }
        return <Menu.Item key={soleItem.name} v-slots={menuItemSlots}/>
    } else {
        const menuItemSlots = {
            icon: () => <OutIcon type={item.icon}/>,
            default: () => <span>{showTitle(item)}</span>
        }
        return showChildren(item) ? (
            <XSubMenu option={item} key={item.name}/>
        ) : (
            <Menu.Item key={item.name} v-slots={menuItemSlots}/>
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
            const { option } = props

            const subMenuSlots = {
                title: () => {
                    return (
                        <Fragment>
                            <OutIcon type={option.icon}/>
                            <span>{showTitle(option)}</span>
                        </Fragment>
                    )
                },
                default: () => {
                    return option.children.map((item) => {
                        return createMenuItem(item, showTitle)
                    })
                }
            }
            return <Menu.SubMenu key={option.name} {...props} v-slots={subMenuSlots}/>
        }
    }
})

export default defineComponent({
    inheritAttrs: false,
    props: {
        route: {
            type: Object,
            default: undefined
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => ([])
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        const { showTitle } = useShowTitle()

        const FlatMenus = createFlatMenus(props.menus)
        const selectedKeys = ref([])
        const openKeys = ref([])

        watch(() => props.route, (currentRoute) => {
            const { meta, name } = currentRoute || {}
            if (meta.hltInName) {
                selectedKeys.value = [meta.hltInName]
            } else {
                selectedKeys.value = [name]
                // @todo 待优化
                if (!props.collapsed) {
                    setOpenKeys(findMenuKeys(FlatMenus, name))
                }
            }
        }, { deep: true, immediate: true })

        function setOpenKeys (value) {
            openKeys.value = value
        }

        function onSelectMenu (params) {
            const { route: currentRoute } = props
            if (currentRoute.name !== params.key) {
                emit('change', params.key)
            }
        }

        function findMenuKeys (flatMenus, lastKey) {
            let result = flatMenus.find((item) => item.name === lastKey)
            const keys = []
            while (result && !isNil(result)) {
                keys.push(result.name)
                result = result.parent
            }
            return reverse(keys)
        }

        function onOpenChange (keys) {
            const lastKey = last(keys)
            const latestKey = keys.find((key) => unref(openKeys).indexOf(key) === -1)
            if (latestKey && !isNil(latestKey)) {
                setOpenKeys(findMenuKeys(FlatMenus, lastKey))
            } else {
                const findIndex = unref(openKeys).findIndex((key) => keys.indexOf(key) === -1)
                setOpenKeys(dropRight(unref(openKeys), unref(openKeys).length - findIndex))
            }
        }

        return () => {
            const { menus, collapsed } = props

            const sideStyles = {
                width: !!collapsed ? '80px' : '256px'
            }

            const menuProps = {
                inlineCollapsed: collapsed,
                selectedKeys: unref(selectedKeys),
                openKeys: unref(openKeys),
                onSelect: onSelectMenu,
                onOpenChange: onOpenChange,
                theme: 'dark',
                mode: 'inline'
            }

            const menuSlots = {
                default: () => {
                    return menus.map((item) => {
                        return createMenuItem(item, showTitle)
                    })
                }
            }

            return (
                <div class={cx('sidebar')} style={sideStyles}>
                    <div class={cx('sidebar-content')}>
                        <div class={cx('sidebar-content__wrap')}>
                            <Logo collapsed={collapsed}/>
                            <Menu style={sideStyles} {...menuProps} v-slots={menuSlots}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
