import { createApp } from 'vue'
import Root from '@/App'
// ----
import createStores from '@/stores'
import createRouter from '@/router'
import i18n from '@/locale'
// CSS
import 'ant-design-vue/es/style/reset.css'
import '@/css/base.css'
import '@/css/transition.scss'
import '@/css/nprogress.scss'

const app = createApp(Root)

const stores = typeof createStores === 'function'
    ? await createStores()
    : createStores
app.use(stores)

const router = typeof createRouter === 'function'
    ? await createRouter()
    : createRouter
app.use(router)

// make router instance available in stores
stores.use(() => ({ router: router }))

/**
 * @todo 迁移到 boot
 * @todo i18n 注入和修改语言逻辑重写
 * boot(app, router, stores)
 */
app.use(i18n)

app.mount('#app')
