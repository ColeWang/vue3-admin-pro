import { inject } from 'vue'
import Fullscreen from './fullscreen'
import Loading from './loading'
import Progress from './progress'
import Screen from './screen'
import { version } from '../version'
import { forEach, omit } from 'lodash-es'

const BaseKey = Symbol('Site')

const defaultPlugins = {
    'fullscreen': Fullscreen,
    'loading': Loading,
    'progress': Progress,
    'screen': Screen
}

function install (app, options) {
    const { config: pluginConfig } = options

    const $site = {
        version: version,
        config: pluginConfig
    }

    app.config.globalProperties.$site = $site
    app.provide(BaseKey, $site)

    forEach(defaultPlugins, (plugin, name) => {
        const pluginOptions = { ...options, ...pluginConfig[name] }
        plugin.install(app, omit(pluginOptions, ['config']), $site)
        plugin.__installed = true
    })
}

function useSite () {
    return inject(BaseKey, {})
}

function createSite (config = {}) {
    const installExtend = (app, options) => {
        install(app, { ...options, config })
    }
    return { name: 'Site', install: installExtend }
}

export { useSite, createSite }
export { Fullscreen, Loading, Progress, Screen }
