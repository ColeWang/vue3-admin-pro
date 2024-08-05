import { cloneVNode, createVNode, render as vueRender } from 'vue'
import Progress from './component'
import { createDocumentFragment, createReactivePlugin } from '../../utils/create'

const container = createDocumentFragment('site-progress')
let instance = null
let configOptions = {}

let timer = null

function clamp (value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

function step (value) {
    if (value >= 0 && value < 20) return 10
    if (value >= 20 && value < 50) return 4
    if (value >= 50 && value < 80) return 2
    if (value >= 80 && value < 99) return 0.5
    return 0
}

function barCSS (status, speed, easing) {
    const offset = status - 100
    return {
        opacity: 1,
        transition: `all ${speed}ms ${easing} 0s`,
        transform: `translate3d(${offset}%, 0, 0)`
    }
}

export default createReactivePlugin({
    isActive: false,
    status: 0
}, {
    start () {
        const { speed = 200, easing = 'linear' } = configOptions

        this.status = 0
        instance = this.render({ style: barCSS(this.status, speed, easing) })
        // --
        this.isActive = true
        this.trickle()
    },
    done () {
        if (!this.isActive || this.status >= 100) return
        // --
        clearTimeout(timer)
        this.setStatus(100)
    },
    trickle () {
        const { speed = 200 } = configOptions
        const nextStatus = this.status + step(this.status)
        const status = clamp(nextStatus, 0, 99.5)
        this.setStatus(status)
        timer = setTimeout(() => {
            if (this.status < 100) {
                this.trickle()
            }
        }, speed)
    },
    setStatus (value) {
        const { speed = 200, easing = 'linear' } = configOptions
        this.status = clamp(value, 8, 100)
        this.update({ style: barCSS(this.status, speed, easing) })
        if (this.status >= 100) {
            setTimeout(() => {
                const style = barCSS(this.status, speed, easing)
                this.update({ style: { ...style, opacity: 0 } })
                setTimeout(() => {
                    this.destroy()
                    this.status = 0
                    this.isActive = false
                }, speed)
            }, speed)
        }
    },
    update (props) {
        if (!container || !instance) return
        const nextVNode = cloneVNode(instance, { ...props })
        vueRender(nextVNode, container)
    },
    destroy () {
        if (!container || !instance) return
        vueRender(null, container)
        instance = null
    },
    render (props) {
        if (!container) return null
        const vm = createVNode(Progress, { ...props })
        vueRender(vm, container)
        return vm
    },
    install (app, options, $site) {
        $site && ($site.progress = this)

        configOptions = options
    }
})
