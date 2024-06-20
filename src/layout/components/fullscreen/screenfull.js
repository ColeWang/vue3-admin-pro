import { head, reduce, set } from 'lodash-es'

const methodMap = [
    ['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror',],
    ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror',],
    ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror',],
    ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror',],
    ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError',],
]

const methods = methodMap.find((list) => {
    const exitFullscreenMethod = list[1]
    return exitFullscreenMethod in document
})

const defaultMethod = head(methodMap)
const native = reduce(methods || [], (result, method, key) => {
    return set(result, defaultMethod[key], method)
}, {})

export default native
