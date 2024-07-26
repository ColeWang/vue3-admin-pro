import { createApp } from 'vue'
import Root from '@/App'
// ----
import createStores from '@/stores'
import createRouter from '@/router'
import createBoots from '@/boot'
// ----
import { isFunction } from 'lodash-es'
// CSS
import '@/css/reset.css'

async function createRunApp () {
    const app = createApp(Root)

    const stores = isFunction(createStores)
        ? await createStores()
        : createStores
    app.use(stores)

    const router = isFunction(createRouter)
        ? await createRouter()
        : createRouter

    // make router instance available in stores
    stores.use(() => ({ router: router }))

    return { app, router, stores }
}

async function start ({ app, router, stores }) {
    const urlPath = window.location.href.replace(window.location.origin, '')
    const publicPath = '/'

    /**
     * 处理一些杂项
     */

    await createBoots({ app, router, stores, urlPath, publicPath })

    // use router
    app.use(router)
    app.mount('#app')
}

createRunApp().then(start)
