import Error403 from '@/views/error-page/403'
import Error404 from '@/views/error-page/404'
import Error500 from '@/views/error-page/500'

const errorPages = [
    {
        path: '/403',
        name: 'error-403',
        meta: {
            hideInMenu: true
        },
        component: Error403
    },
    {
        path: '/404',
        name: 'error-404',
        meta: {
            hideInMenu: true
        },
        component: Error404
    },
    {
        path: '/500',
        name: 'error-500',
        meta: {
            hideInMenu: true
        },
        component: Error500
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-404',
        meta: {
            hideInMenu: true
        },
        component: Error404
    }
]

export default errorPages
