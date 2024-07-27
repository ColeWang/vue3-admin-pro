import Error403 from '@/views/error-pages/403'
import Error404 from '@/views/error-pages/404'
import Error500 from '@/views/error-pages/500'

const errorPages = [
    {
        path: '/403',
        name: 'Error403',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: Error403
    },
    {
        path: '/404',
        name: 'Error404',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: Error404
    },
    {
        path: '/500',
        name: 'Error500',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: Error500
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            hideInMenu: true,
            notCache: true
        },
        component: Error404
    }
]

export default errorPages
