import ProError403 from '@/views/error-pages/403'
import ProError404 from '@/views/error-pages/404'
import ProError500 from '@/views/error-pages/500'

const errorPages = [
    {
        path: '/403',
        name: 'Error403',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: ProError403
    },
    {
        path: '/404',
        name: 'Error404',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: ProError404
    },
    {
        path: '/500',
        name: 'Error500',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: ProError500
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: ProError404
    }
]

export default errorPages
