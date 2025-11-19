import { createRouter, createWebHashHistory } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import { Progress } from '@site-pro/plugins'
// import { canTurnTo } from '@/layout/utils'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/config'
import { TOKEN_KEY } from '@/config/symbols'
import { getCookie } from '@/utils/cookie'
import routes from './routes'

export default () => {
    const router = createRouter({
        history: createWebHashHistory('/vue3-admin-pro/'),
        routes: routes
    })

    router.beforeEach((to, from, next) => {
        Progress.start()
        // ---
        message.destroy()
        Modal.destroyAll()
        const token = getCookie(TOKEN_KEY)
        if (!token && to.name !== LOGIN_ROUTE_NAME) {
            next({ name: LOGIN_ROUTE_NAME })
        } else if (token && to.name === LOGIN_ROUTE_NAME) {
            next({ name: HOME_ROUTE_NAME })
        } else if (!token && to.name === LOGIN_ROUTE_NAME) {
            next()
        } else {
            // if (userinfo.hasGetInfo) {
            //     if (canTurnTo(to.name, routes, access)) {
            //         next()
            //     } else {
            //         next({ replace: true, name: 'error-401' })
            //     }
            // } else {
            //   next()
            // }
            next()
        }
    })

    router.afterEach(() => {
        Progress.done()
    })

    return router
}
