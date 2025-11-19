import ProLayout from '@/layout'
import ProLogin from '@/views/login'
import { concat } from 'lodash-es'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/config'
import errorPages from './error-pages'
// ---
// -- pages
import HomeIndex from '@/views/Home'
import FormBasicForm from '@/views/form/BasicForm'
import FormFloatingForm from '@/views/form/FloatingForm'
import ListTable from '@/views/list/Table'
import Exception403 from '@/views/error-pages/403'
import Exception404 from '@/views/error-pages/404'
import Exception500 from '@/views/error-pages/500'
import ExamplesDescriptions from '@/views/examples/Descriptions'
import ExamplesTest from '@/views/examples/Test'

const routes = [
    {
        path: '/',
        name: '_home',
        redirect: { name: HOME_ROUTE_NAME },
        meta: {
            hideInMenu: true,
            notCache: true
        }
    },
    {
        path: '/login',
        name: LOGIN_ROUTE_NAME,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: ProLogin
    },
    {
        path: '/home',
        name: 'Home',
        redirect: { name: HOME_ROUTE_NAME },
        component: ProLayout,
        children: [
            {
                path: 'index',
                name: 'HomeIndex',
                component: HomeIndex,
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
        component: ProLayout,
        children: [
            {
                path: 'basic-form',
                name: 'FormBasicForm',
                component: FormBasicForm,
                meta: {
                    title: '基础表单'
                }
            },
            {
                path: 'floating-form',
                name: 'FormFloatingForm',
                component: FormFloatingForm,
                meta: {
                    title: '浮层表单'
                }
            }
        ]
    },
    {
        path: '/list',
        name: 'List',
        redirect: { name: 'ListTable' },
        meta: {
            title: '列表页'
        },
        component: ProLayout,
        children: [
            {
                path: 'table',
                name: 'ListTable',
                component: ListTable,
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
        component: ProLayout,
        children: [
            {
                path: '403',
                name: 'Exception403',
                component: Exception403,
                meta: {
                    title: '403'
                }
            },
            {
                path: '404',
                name: 'Exception404',
                component: Exception404,
                meta: {
                    title: '404'
                }
            },
            {
                path: '500',
                name: 'Exception500',
                component: Exception500,
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
        component: ProLayout,
        children: [
            {
                path: 'descriptions',
                name: 'ExamplesDescriptions',
                component: ExamplesDescriptions,
                meta: {
                    title: '描述列表'
                }
            },
            {
                path: 'test',
                name: 'ExamplesTest',
                component: ExamplesTest,
                meta: {
                    title: '测试'
                }
            }
        ]
    }
]

export default concat(routes, errorPages)
