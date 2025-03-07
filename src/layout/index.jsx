import { computed, defineComponent, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAppShare from '@/hooks/useAppShare'
import routes from '@/router/routes'
import { HOME_NAME } from '@/config'
// --
import BaseLayout from './compatible/base-layout'
import Sidebar from './compatible/sidebar'
import Navbar from './compatible/navbar'
import Container from './compatible/container'
import Tags from './compatible/tags'
import { getMenuList } from './utils'
import useTags from './hooks/useTags'

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
})

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { theme } = useAppShare()

        const route = useRoute()
        const router = useRouter()

        // 过滤没有权限的路由, 权限 access 一般是在后台请求过来放在 store 里面
        const menus = getMenuList(routes, [])
        const { tags, onTagClick, onTagClose } = useTags(menus, {
            homeName: HOME_NAME,
            route: route,
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
            router.push({ name, query, params })
        }

        function onMenusChange (afterClose) {
            return function (name) {
                router.push({ name: name }).then(() => {
                    afterClose && afterClose()
                })
            }
        }

        return () => {
            const { sideDark } = unref(theme) || {}

            const layoutSlots = {
                sider: ({ collapsed, styleFn, onDrawerClose: afterClose }) => {
                    return (
                        <Sidebar
                            theme={sideDark ? 'dark' : 'light'}
                            logo={() => <LogoIcon/>}
                            route={route}
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
