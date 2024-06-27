import { computed, defineComponent, Fragment, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from './Layout'
import Container from './compatible/container'
import Navbar from './compatible/navbar'
import Sidebar from './compatible/sidebar'
import TagsNav from './compatible/tags-nav'
import useTags from './hooks/useTags'
import { getMenuList } from './utils'
import routes from '@/router/routes'
import { HOME_NAME } from '@/config'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const route = useRoute()
        const router = useRouter()
        // --
        const collapsed = ref(false)
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

        function onCollapsedChange (value) {
            collapsed.value = value
        }

        return () => {
            const layoutSlots = {
                navbar: () => (
                    <Fragment>
                        <Navbar
                            router={router}
                            collapsed={unref(collapsed)}
                            onChange={onCollapsedChange}
                        />
                        <TagsNav
                            homeName={HOME_NAME}
                            route={route}
                            tags={unref(tags)}
                            onClick={onTagClick}
                            onClose={onTagClose}
                        />
                    </Fragment>
                ),
                sidebar: () => (
                    <Sidebar
                        route={route}
                        menus={menus}
                        collapsed={unref(collapsed)}
                        onChange={onSidebarChange}
                    />
                )
            }

            return (
                <Layout v-slots={layoutSlots}>
                    <Container include={unref(include)}/>
                </Layout>
            )
        }
    }
})
