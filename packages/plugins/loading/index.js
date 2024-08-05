import { cloneVNode, createVNode, render as vueRender } from 'vue'
import Loading from './component'
import { createDocumentFragment, createReactivePlugin } from '../../utils/create'
import { omit } from 'lodash-es'

const container = createDocumentFragment('site-loading')
let instance = null
let configOptions = {}
let configProps = {}

export default createReactivePlugin({
    isActive: false
}, {
    show () {
        instance = this.render(configProps, configOptions)
        // --
        this.isActive = true
        this.update({ visible: true })
    },
    hide (config) {
        if (!this.isActive) return
        // 动画结束
        const onAfterClose = () => {
            this.destroy()
            this.isActive = false
            config && config.onAfterClose && config.onAfterClose()
        }
        this.update({ visible: false, onAfterClose })
    },
    update (props) {
        if (!container || !instance) return
        const nextVNode = cloneVNode(instance, { ...configProps, ...props })
        vueRender(nextVNode, container)
    },
    destroy () {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props, options) {
        if (!container) return null
        const vm = createVNode(Loading, { ...props })
        vm.appContext = options.parentContext || options.appContext || vm.appContext
        vueRender(vm, container)
        return vm
    },
    install (app, options, $site) {
        $site && ($site.loading = this)

        configProps = omit(options, ['parentContext', 'appContext'])
        configOptions = options
    }
})
