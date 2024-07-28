import { computed, defineComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from './compatible/base-layout'
import Sidebar from './compatible/sidebar'
import Navbar from './compatible/navbar'
import Container from './compatible/container'
import Tags from './compatible/tags'
import useTags from './hooks/useTags'
import { getMenuList } from './utils'
import routes from '@/router/routes'
import { useAppInstance } from '@/useAppInstance'
import { HOME_NAME } from '@/config'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { theme = 'dark' } = useAppInstance()

        const route = useRoute()
        const router = useRouter()

        // 过滤没有权限的路由, 权限 access 一般是在后台请求过来放在 store 里面
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, {
            route: route,
            router: router,
            homeName: HOME_NAME
        })

        const sidebarTheme = computed(() => {
            return unref(theme) === 'light' || unref(theme) === 'dark' ? unref(theme) : 'light'
        })

        const include = computed(() => {
            return unref(tags).filter((item) => {
                const { meta } = item || {}
                return meta && !(meta.notCache)
            }).map((item) => {
                return item.name
            })
        })

        function onSidebarChange (name) {
            router.push({ name: name })
        }

        return () => {
            const layoutSlots = {
                sider: ({ collapsed }) => {
                    const logo = () => {
                        const style = { width: '32px', height: '32px' }
                        return (
                            <img src={'/logo.svg'} style={style} alt={'logo'}/>
                        )
                    }
                    return (
                        <Sidebar
                            theme={unref(sidebarTheme)}
                            logo={logo}
                            route={route}
                            menus={menus}
                            collapsed={collapsed}
                            onChange={onSidebarChange}
                        />
                    )
                },
                header: ({ collapsed, onCollapse }) => {
                    return [
                        <Navbar
                            router={router}
                            collapsed={collapsed}
                            onCollapse={onCollapse}
                        />,
                        <Tags
                            homeName={HOME_NAME}
                            route={route}
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
