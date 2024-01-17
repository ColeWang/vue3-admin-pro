import { createRouter, createWebHistory } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import NProgress from 'nprogress'
// import { canTurnTo } from '@/layout/utils'
import { getToken } from '@/utils/auth'
import { LOGIN_NAME, HOME_NAME } from '@/config'
import routes from './routes'

// function turnTo (to, next, access) {
//   if (canTurnTo(to.name, routes, access)) {
//     next()
//   } else {
//     next({ replace: true, name: 'error-401' })
//   }
// }

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior () {
    const container = document.getElementById('viewContainer')
    if (container) {
      return { top: 0, left: 0, el: container }
    }
    return { top: 0, left: 0 }
  },
  routes: routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // ---
  message.destroy()
  Modal.destroyAll()
  const token = getToken()
  if (!token && to.name !== LOGIN_NAME) {
    next({ name: LOGIN_NAME })
  } else if (token && to.name === LOGIN_NAME) {
    next({ name: HOME_NAME })
  } else if (!token && to.name === LOGIN_NAME) {
    next()
  } else {
    // if (userinfo.hasGetInfo) {
    //   turnTo(to, next, userinfo.access)
    // } else {
    //   next()
    // }
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
