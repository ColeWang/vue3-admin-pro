import { createReactivePlugin } from '../../utils/create'

const native = {
    request: ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'].find((request) => !!document.documentElement[request]),
    exit: ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'].find((exit) => !!document[exit])
}

function getFullElement () {
    return (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null)
}

function promisify (target, event) {
    try {
        const result = target[event]()
        return result || Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

export default createReactivePlugin({
    isActive: false,
    activeEl: null
}, {
    request (target) {
        const el = target || document.documentElement
        if (this.activeEl === el) return Promise.resolve()
        // --
        const result = this.activeEl !== null && el.contains(this.activeEl) === true
            ? this.exit()
            : Promise.resolve()

        return result.finally(() => promisify(el, native.request))
    },
    exit () {
        return this.isActive === true
            ? promisify(document, native.exit)
            : Promise.resolve()
    },
    toggle (target) {
        return this.isActive === true
            ? this.exit()
            : this.request(target)
    },
    install (app, options, $site) {
        $site && ($site.fullscreen = this)

        const onUpdateActiveEl = () => {
            this.activeEl = this.isActive === false ? null : getFullElement()
        }

        const onChange = () => {
            this.isActive = this.isActive === false
            onUpdateActiveEl()
        }

        this.isActive = !!getFullElement()
        this.isActive === true && onUpdateActiveEl()

        // ;['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'].forEach((type) => {
        //     addEvt(document, type, onChange)
        // })

        ;['onfullscreenchange', 'onmsfullscreenchange', 'onmozfullscreenchange', 'onwebkitfullscreenchange'].forEach((event) => {
            document[event] = onChange
        })
    }
})



