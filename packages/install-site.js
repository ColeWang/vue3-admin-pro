import { inject } from 'vue'
import { Fullscreen, Screen } from './plugins'
import { omit } from 'lodash-es'

const BaseKey = Symbol('Site')

const defaultPlugins = [
    {
        name: 'fullscreen',
        plugin: Fullscreen
    },
    {
        name: 'screen',
        plugin: Screen
    }
]

function install (app, options) {
    const { config: pluginConfig } = options

    const $site = {
        version: __SITE_VERSION__,
        config: pluginConfig
    }

    app.config.globalProperties.$site = $site
    app.provide(BaseKey, $site)

    defaultPlugins.forEach(({ name, plugin }) => {
        const pluginOptions = { ...options, ...pluginConfig[name] }
        plugin.install(app, omit(pluginOptions, ['config']), $site)
        plugin.__installed = true
    })
}

export function useSite () {
    return inject(BaseKey, {})
}

export function createSite (config = {}) {
    const installExtend = (app, options) => {
        install(app, { ...options, config })
    }
    return { name: 'Site', install: installExtend }
}
