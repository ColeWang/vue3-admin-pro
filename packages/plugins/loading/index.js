import { h, Transition, onMounted } from 'vue'
import { Spin } from 'ant-design-vue'
import { createReactivePlugin, createGlobalNode, createChildApp } from '../../utils/create'

let uid = 0

const defaults = {
    group: '__default_group__',
    delay: 0
}

const Plugin = createReactivePlugin({
    isActive: false
}, {
    show (options) {
        Plugin.isActive = true
        const el = createGlobalNode('pro-loading')
        const app = createChildApp({
            setup () {
                function onAfterLeave () {

                }

                return () => {
                    const props = {
                        onAfterLeave: onAfterLeave
                    }
                    return h(Transition, props, Spin)
                }
            }
        })
    },
    hide () {

    },
    install () {

    }
})

export default Plugin
