import { fromPairs, head } from 'lodash-es'

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
const result = (methods || []).map((method, index) => {
    return [defaultMethod[index], method]
})

const native = fromPairs(result)

export default native
