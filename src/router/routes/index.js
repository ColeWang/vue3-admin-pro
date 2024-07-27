import Layout from '@/layout'
import errorPages from './errorPages'
import { concat } from 'lodash-es'

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
        component: () => import('@/views/login/index')
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
                path: 'drawer',
                name: 'FormDrawer',
                component: () => import('@/views/form/Drawer'),
                meta: {
                    title: '抽屉表单'
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
            },
            {
                path: 'editable-table',
                name: 'TableEditableTable',
                component: () => import('@/views/table/EditableTable'),
                meta: {
                    title: '可编辑表格'
                }
            }
        ]
    },
    {
        path: '/descriptions',
        name: 'Descriptions',
        redirect: { name: 'DescriptionsIndex' },
        meta: {
            title: '描述列表'
        },
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'DescriptionsIndex',
                component: () => import('@/views/descriptions/index'),
                meta: {
                    title: '描述列表'
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
    }
]

export default concat(routes, errorPages)
