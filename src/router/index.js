import { createRouter, createWebHistory } from 'vue-router'
import Loading from '@/components/loading'
import NProgress from 'nprogress'
import { canTurnTo } from '@/layout/utils'
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
  routes: routes
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
