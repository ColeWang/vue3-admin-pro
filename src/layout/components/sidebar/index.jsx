import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Menu } from 'ant-design-vue'
import XIcon from './XIcon'
import XLogo from './XLogo'
import { hasChild } from '../../utils'
import { dropRight, isNil, last, reverse } from 'lodash-es'
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

function createMenuItem (item) {
    if (item.children && item.children.length === 1) {
        const menuItemSlots = {
            icon: () => <XIcon type={item.children[0].icon || item.icon}/>,
            default: () => <span>{item.children[0].meta.title}</span>
        }
        return <Menu.Item key={item.children[0].name} v-slots={menuItemSlots}/>
    } else {
        const menuItemSlots = {
            icon: () => <XIcon type={item.icon}/>,
            default: () => <span>{item.meta.title}</span>
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
        return () => {
            const subMenuSlots = {
                title: () => {
                    return (
                        <Fragment>
                            <XIcon type={props.option.icon}/>
                            <span>{props.option.meta.title}</span>
                        </Fragment>
                    )
                },
                default: () => {
                    return props.option.children.map((item) => {
                        return createMenuItem(item)
                    })
                }
            }
            return <Menu.SubMenu key={props.option.name} {...props} v-slots={subMenuSlots}/>
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
            const sideStyles = {
                width: props.collapsed ? '80px' : '256px'
            }

            const menuProps = {
                inlineCollapsed: props.collapsed,
                selectedKeys: unref(selectedKeys),
                openKeys: unref(openKeys),
                onSelect: onSelectMenu,
                onOpenChange: onOpenChange,
                theme: 'dark',
                mode: 'inline'
            }

            const menuSlots = {
                default: () => {
                    return props.menus.map((item) => {
                        return createMenuItem(item)
                    })
                }
            }

            return (
                <div class={cx('sidebar')} style={sideStyles}>
                    <div class={cx('sidebar-content')}>
                        <div class={cx('sidebar-content__wrap')}>
                            <XLogo collapsed={props.collapsed}/>
                            <Menu style={sideStyles} {...menuProps} v-slots={menuSlots}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
