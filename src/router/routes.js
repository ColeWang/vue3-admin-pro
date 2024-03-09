import Layout from '@/layout'

/**
 * meta: {
 *  title: (string) 导航栏title
 *  icon: (string|function) 导航栏icon
 *  hideInMenu: (boolean=false) 设为true后在左侧菜单不会显示该页面选项
 *  hltInName: (string) 高亮的路由name active
 *  access: (null) 可访问该页面的权限数组 当前路由设置的权限会影响子路由
 * }
 */
const routes = [
    {
        path: '/',
        name: '_home',
        redirect: { name: 'Home' },
        meta: {
            hideInMenu: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/login')
    },
    {
        path: '/home',
        name: 'Home',
        redirect: { name: 'HomeIndex' },
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'HomeIndex',
                component: () => import('@/views/Home'),
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/form',
        name: 'Form',
        redirect: { name: 'FormLayout' },
        meta: {
            title: '表单'
        },
        component: Layout,
        children: [
            {
                path: 'layout',
                name: 'FormLayout',
                component: () => import('@/views/form/Layout'),
                meta: {
                    title: '表单布局'
                }
            },
            {
                path: 'modal',
                name: 'FormModal',
                component: () => import('@/views/form/Modal'),
                meta: {
                    title: '浮层表单'
                }
            },
            {
                path: 'filter',
                name: 'FormFilter',
                component: () => import('@/views/form/Filter'),
                meta: {
                    title: '筛选表单'
                }
            },
        ]
    },
    {
        path: '/table',
        name: 'Table',
        redirect: { name: 'TableIndex' },
        meta: {
            title: '表格'
        },
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'TableIndex',
                component: () => import('@/views/table/index'),
                meta: {
                    title: '表格'
                }
            },
            {
                path: 'custom-search',
                name: 'TableCustomSearch',
                component: () => import('@/views/table/CustomSearch'),
                meta: {
                    title: '自定义搜索'
                }
            }
        ]
    },
    {
        path: '/test',
        name: 'Test',
        redirect: { name: 'TestIndex' },
        meta: {
            title: '测试'
        },
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'TestIndex',
                component: () => import('@/views/Test'),
                meta: {
                    title: '测试'
                }
            }
        ]
    },
    {
        path: '/401',
        name: 'error-401',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/401')
    },
    {
        path: '/500',
        name: 'error-500',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/500')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-404',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/error-page/404')
    }
]

export default routes
