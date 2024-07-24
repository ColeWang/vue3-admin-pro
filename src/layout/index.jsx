import { computed, defineComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from './compatible/base-layout'
import Container from './compatible/container'
import Navbar from './compatible/navbar'
import Sidebar from './compatible/sidebar'
import useTags from './hooks/useTags'
import { getMenuList } from './utils'
import routes from '@/router/routes'
import { HOME_NAME } from '@/config'

export default defineComponent({
    inheritAttrs: false,
    setup (props) {
        const route = useRoute()
        const router = useRouter()

        // 过滤没有权限的路由, 权限 access 一般是在后台请求过来放在 store 里面
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, {
            route: route,
            router: router,
            homeName: HOME_NAME
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
            // <Tags
            //     homeName={HOME_NAME}
            //     route={route}
            //     tags={unref(tags)}
            //     onClick={onTagClick}
            //     onClose={onTagClose}
            // />
            const layoutSlots = {
                sider: ({ collapsed }) => (
                    <Sidebar
                        route={route}
                        menus={menus}
                        collapsed={collapsed}
                        onChange={onSidebarChange}
                    />
                ),
                header: ({ collapsed, onCollapse }) => (
                    <Navbar
                        router={router}
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                    />
                ),
                content: () => <Container include={unref(include)}/>
            }

            return <BaseLayout v-slots={layoutSlots}/>
        }
    }
})
