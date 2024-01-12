import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppMain from './AppMain'
import AppContent from './AppContent'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import TagsNav from './components/tags-nav'
import { getMenuList } from './utils'
import routes from '@/router/routes'
import { localCache, TAGS__LOCAL } from '@/common/storage'
import { HOME_NAME } from '@/config'
import { cloneProxyToRaw } from '@/utils'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const route = useRoute()
        const router = useRouter()
        // --
        const MENUS = getMenuList(routes, [])
        const collapsed = ref(false)
        // -- tags
        const homeRoute = getCurrentRoute(MENUS, HOME_NAME)
        const cacheTags = localCache.getObj(TAGS__LOCAL)
        const tags = ref(cacheTags ? [...filterCache(MENUS, cacheTags)] : [homeRoute])

        watch(() => route, (currentRoute) => {
            if (currentRoute && currentRoute.name) {
                const { name, meta, query, params } = currentRoute
                const result = unref(tags).findIndex((item) => {
                    return item.name === name
                })
                if (result < 0) {
                    setTagsValue([...unref(tags), cloneProxyToRaw({ name, meta, query, params })])
                }
            }
        }, { immediate: true, deep: true })

        function filterCache (menus, values) {
            return values.filter((item) => {
                return !!getCurrentRoute(menus, item.name)
            })
        }

        function getCurrentRoute (menus, name) {
            for (let item of menus) {
                if (item.name === name) {
                    return item
                } else if (item.children && item.children.length) {
                    const result = getCurrentRoute(item.children, name)
                    if (result) return result
                }
            }
        }

        function setTagsValue (values) {
            tags.value = values
            localCache.setObj(TAGS__LOCAL, values)
        }

        function onSidebarChange (name) {
            router.push({ name: name })
        }

        function onTagClick (route) {
            const { name, query, params } = route
            router.push({ name, query, params })
        }

        function onTagClose (values, toName) {
            setTagsValue(values)
            if (toName) {
                const result = values.find((item) => {
                    return item.name === toName
                })
                const { name, query, params } = result || {}
                router.push({ name, query, params })
            }
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
                        menus: MENUS,
                        collapsed: unref(collapsed),
                        onChange: onSidebarChange
                    }
                    return (
                        <Sidebar {...sidebarProps}/>
                    )
                },
                navbar: () => {
                    const navbarProps = {
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
