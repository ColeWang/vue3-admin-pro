import { cloneVNode, createVNode, render as vueRender } from 'vue'
import Loading from './component'
import { createDocumentFragment, createReactivePlugin } from '../../utils/create'
import { omit } from 'lodash-es'

const container = createDocumentFragment()
let instance = null
let configProps = {}

export default createReactivePlugin({
    isActive: false
}, {
    show () {
        this.isActive = true
        this.update({ visible: true })
    },
    hide (config) {
        this.isActive = false
        const afterClose = () => {
            config && config.afterClose && config.afterClose()
        }
        this.update({ visible: false, afterClose })
    },
    update (props) {
        const nextVNode = cloneVNode(instance, {
            ...configProps,
            ...props
        })
        instance && vueRender(nextVNode, container)
    },
    destroy () {
        instance && vueRender(null, container)
        instance = null
    },
    render (props, options) {
        const vm = createVNode(Loading, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        document.body.appendChild(container)
        return vm
    },
    install (app, options, $site) {
        $site && ($site.loading = this)

        configProps = omit(options, ['parentContext', 'appContext'])
        instance = this.render(configProps, options)
    }
})
