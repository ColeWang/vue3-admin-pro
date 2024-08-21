import { reactive } from 'vue'

export function createDocumentFragment (id) {
    const container = document.createElement('div')
    id && (container.id = id)
    document.body.appendChild(container)
    return container
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
