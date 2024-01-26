import { defineComponent, Fragment, ref, unref } from 'vue'
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

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const route = useRoute()
        const router = useRouter()
        // --
        const collapsed = ref(false)
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, HOME_NAME)

        function onSidebarChange (name) {
            router.push({ name: name })
        }

        function onCollapsedChange (value) {
            collapsed.value = value
        }

        function onLogout () {
            console.log('onLogOut')
        }

        return () => {
            const mainSlots = {
                sidebar: () => {
                    const sidebarProps = {
                        route: route,
                        menus: menus,
                        collapsed: unref(collapsed),
                        onChange: onSidebarChange
                    }
                    return (
                        <Sidebar {...sidebarProps}/>
                    )
                },
                navbar: () => {
                    const navbarProps = {
                        router: router,
                        collapsed: unref(collapsed),
                        onChange: onCollapsedChange,
                        onLogout: onLogout
                    }
                    const tagsNavProps = {
                        homeName: HOME_NAME,
                        route: route,
                        tags: unref(tags),
                        onClick: onTagClick,
                        onClose: onTagClose
                    }
                    return (
                        <Fragment>
                            <Navbar {...navbarProps}/>
                            <TagsNav {...tagsNavProps}/>
                        </Fragment>
                    )
                },
                default: () => {
                    const include = unref(tags).filter((item) => {
                        const { meta } = item || {}
                        return meta && !(meta.notCache)
                    }).map((item) => {
                        return item.name
                    })
                    return <AppContent include={include}/>
                }
            }

            return <AppMain v-slots={mainSlots}/>
        }
    }
})
