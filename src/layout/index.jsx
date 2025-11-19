import { computed, defineComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppReceiver } from '@/hooks/useAppReceiver'
import routes from '@/router/routes'
import { HOME_ROUTE_NAME } from '@/config'
// --
import BaseLayout from './compatible/base-layout'
import Sidebar from './compatible/sidebar'
import Navbar from './compatible/navbar'
import Container from './compatible/container'
import Tags from './compatible/tags'
import useTags from './hooks/useTags'
import { getMenuList } from './utils'

const LogoIcon = defineComponent(() => {
    return () => {
        const style = { width: '32px', height: '32px' }
        return (
            <img
                src={'https://colewang.github.io/vue3-admin-pro/logo.svg'}
                style={style}
                alt={'logo'}
            />
        )
    }
}, {
    inheritAttrs: false,
    name: 'LogoIcon'
})

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayout',
    setup (props, { attrs }) {
        const { theme } = useAppReceiver()

        const $router = useRouter()
        const $route = useRoute()

        // 过滤没有权限的路由, 权限 access 一般是在后台请求过来放在 store 里面
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, {
            homeRouteName: HOME_ROUTE_NAME,
            route: $route,
            onChange: onTagsChange
        })

        const include = computed(() => {
            return unref(tags).filter((item) => {
                const { meta } = item || {}
                return meta && !(meta.notCache)
            }).map((item) => {
                return item.name
            })
        })

        function onTagsChange ({ name, query, params }) {
            $router.push({ name, query, params })
        }

        function onMenusChange (afterClose) {
            return function (name) {
                $router.push({ name: name }).then(() => {
                    afterClose && afterClose()
                })
            }
        }

        return () => {
            const { sideDark } = unref(theme) || {}

            const layoutSlots = {
                sidebar: ({ collapsed, styleFn, onDrawerClose: afterClose }) => {
                    return (
                        <Sidebar
                            theme={sideDark ? 'dark' : 'light'}
                            logo={() => <LogoIcon/>}
                            route={$route}
                            menus={menus}
                            collapsed={collapsed}
                            styleFn={styleFn}
                            onChange={onMenusChange(afterClose)}
                        />
                    )
                },
                header: ({ collapsed, onCollapse }) => {
                    return [
                        <Navbar
                            router={$router}
                            collapsed={collapsed}
                            onCollapse={onCollapse}
                        />,
                        <Tags
                            homeRouteName={HOME_ROUTE_NAME}
                            route={$route}
                            tags={unref(tags)}
                            onClick={onTagClick}
                            onClose={onTagClose}
                        />
                    ]
                },
                content: () => <Container include={unref(include)}/>
            }

            return <BaseLayout {...attrs} v-slots={layoutSlots}/>
        }
    }
})
