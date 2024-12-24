import Layout from '@/layout'
import errorPages from './error-pages'
import { concat } from 'lodash-es'

const routes = [
    {
        path: '/',
        name: '_home',
        redirect: { name: 'Home' },
        meta: {
            hideInMenu: true,
            notCache: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            hideInMenu: true,
            notCache: true
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
        redirect: { name: 'FormBasicForm' },
        meta: {
            title: '表单页'
        },
        component: Layout,
        children: [
            {
                path: 'basic-form',
                name: 'FormBasicForm',
                component: () => import('@/views/form/BasicForm'),
                meta: {
                    title: '基础表单'
                }
            },
            {
                path: 'floating-form',
                name: 'FormFloatingForm',
                component: () => import('@/views/form/FloatingForm'),
                meta: {
                    title: '浮层表单'
                }
            },
        ]
    },
    {
        path: '/list',
        name: 'List',
        redirect: { name: 'ListTable' },
        meta: {
            title: '列表页'
        },
        component: Layout,
        children: [
            {
                path: 'table',
                name: 'ListTable',
                component: () => import('@/views/list/Table'),
                meta: {
                    title: '查询表格'
                }
            }
        ]
    },
    {
        path: '/exception',
        name: 'Exception',
        redirect: { name: 'Exception403' },
        meta: {
            title: '异常页'
        },
        component: Layout,
        children: [
            {
                path: '403',
                name: 'Exception403',
                component: () => import('@/views/error-pages/403'),
                meta: {
                    title: '403'
                }
            },
            {
                path: '404',
                name: 'Exception404',
                component: () => import('@/views/error-pages/404'),
                meta: {
                    title: '404'
                }
            },
            {
                path: '500',
                name: 'Exception500',
                component: () => import('@/views/error-pages/500'),
                meta: {
                    title: '500'
                }
            }
        ]
    },
    {
        path: '/examples',
        name: 'Examples',
        redirect: { name: 'ExamplesDescriptions' },
        meta: {
            title: '组件展示'
        },
        component: Layout,
        children: [
            {
                path: 'descriptions',
                name: 'ExamplesDescriptions',
                component: () => import('@/views/examples/Descriptions'),
                meta: {
                    title: '描述列表'
                }
            },
            {
                path: 'test',
                name: 'ExamplesTest',
                component: () => import('@/views/examples/Test'),
                meta: {
                    title: '测试'
                }
            }
        ]
    }
]

export default concat(routes, errorPages)
