import { inject } from 'vue'
import { Fullscreen, Screen } from './plugins'

const BaseKey = Symbol('Site')

const defaultPlugins = [Fullscreen, Screen]

function install (app, options = {}) {
    const $site = {
        version: __SITE_VERSION__,
        config: options.config || {}
    }

    app.config.globalProperties.$site = $site
    app.provide(BaseKey, $site)

    defaultPlugins.forEach((plugin) => {
        plugin.install(app, options, $site)
        plugin.__installed = true
    })
}

export function useSite () {
    return inject(BaseKey, {})
}

export function createSite (config) {
    return { name: 'Site', install: install }
}
