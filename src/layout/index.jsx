import { computed, defineComponent, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppMain from './AppMain'
import AppContent from './AppContent'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import TagsNav from './components/tags-nav'
import useTags from './hooks/useTags'
import { getMenuList } from './utils'
import routes from '@/router/routes'
import { HOME_NAME } from '@/config'
import { useAppInstance } from '@/useAppInstance'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const { setLocale } = useAppInstance()
        const route = useRoute()
        const router = useRouter()
        // --
        const collapsed = ref(false)
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, HOME_NAME)

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

        function onLocalChange (value) {
            setLocale && setLocale(value)
        }

        function onLogout () {
            console.log('onLogOut')
        }

        return () => {
            return (
                <AppMain
                    sidebar={() => (
                        <Sidebar
                            route={route}
                            menus={menus}
                            collapsed={unref(collapsed)}
                            onChange={onSidebarChange}
                        />
                    )}
                    navbar={() => [
                        <Navbar
                            router={router}
                            collapsed={unref(collapsed)}
                            onChange={onCollapsedChange}
                            onLocal={onLocalChange}
                            onLogout={onLogout}
                        />,
                        <TagsNav
                            homeName={HOME_NAME}
                            route={route}
                            tags={unref(tags)}
                            onClick={onTagClick}
                            onClose={onTagClose}
                        />
                    ]}
                >
                    <AppContent include={unref(include)}/>
                </AppMain>
            )
        }
    }
})
