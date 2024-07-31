import { createApp, reactive } from 'vue'
import { omit } from 'lodash-es'

const bodyNode = document.body
const nodes = []

export function createChildApp (rootComponent, parentApp) {
    const appContext = omit(parentApp._context, ['reload'])

    const app = createApp(rootComponent)
    app.config.globalProperties = parentApp.config.globalProperties

    Object.assign(app._context, appContext)
    return app
}

export function createGlobalNode (id, className) {
    const el = document.createElement('div')
    if (className !== undefined) {
        el.className = className
    }
    el.id = id
    bodyNode.appendChild(el)
    nodes.push(el)
    return el
}

export function removeGlobalNode (el) {
    const index = nodes.indexOf(el)
    nodes.splice(index, 1)
    el.remove()
}

export function createReactivePlugin (state, plugin) {
    const pluginState = reactive(state)

    for (const name in pluginState) {
        Object.defineProperty(plugin, name, {
            enumerable: true,
            get () {
                return pluginState[name]
            },
            set (value) {
                pluginState[name] = value
            }
        })
    }

    return plugin
}
