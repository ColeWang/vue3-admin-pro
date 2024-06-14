import { config } from '@vue/test-utils'

config.global.stubs = {
    transition: false,
    'transition-group': false,
}

global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth
    global.window.innerHeight = height || global.window.innerHeight
    global.window.dispatchEvent(new Event('resize'))
}

global.window.scrollTo = () => {}

global.window.matchMedia = (query) => {
    return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
    }
}
