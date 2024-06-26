import { createRouter, createWebHashHistory } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import NProgress from 'nprogress'
// import { canTurnTo } from '@/layout/utils'
import { getCookie, TOKEN_KEY } from '@/utils/cookie'
import { HOME_NAME, LOGIN_NAME } from '@/config'
import routes from './routes'

function scrollBehavior () {
    const container = document.getElementById('viewContainer')
    if (container) {
        return { top: 0, left: 0, el: container }
    }
    return { top: 0, left: 0 }
}

function onBeforeGuard (to, from, next) {
    NProgress.start()
    // ---
    message.destroy()
    Modal.destroyAll()
    const token = getCookie(TOKEN_KEY)
    if (!token && to.name !== LOGIN_NAME) {
        next({ name: LOGIN_NAME })
    } else if (token && to.name === LOGIN_NAME) {
        next({ name: HOME_NAME })
    } else if (!token && to.name === LOGIN_NAME) {
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
}

function onAfterGuard () {
    NProgress.done()
}

export default () => {
    const router = createRouter({
        history: createWebHashHistory('/vue3-admin-pro/'),
        scrollBehavior: scrollBehavior,
        routes: routes
    })

    router.beforeEach(onBeforeGuard)

    router.afterEach(onAfterGuard)

    return router
}
