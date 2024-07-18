import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { TextDecoder, TextEncoder } from 'node:util'

// config
config.global.stubs = {
    transition: false,
    'transition-group': false,
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
        return {
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        }
    })
})
Object.defineProperty(window, 'TextEncoder', {
    writable: true,
    value: TextEncoder,
})
Object.defineProperty(window, 'TextDecoder', {
    writable: true,
    value: TextDecoder,
})

window.resizeTo = (width, height) => {
    window.innerWidth = width || window.innerWidth
    window.innerHeight = height || window.innerHeight
    window.dispatchEvent(new Event('resize'))
}

window.scrollTo = () => {
    return false
}

// Mock getComputedStyle
const originGetComputedStyle = window.getComputedStyle
window.getComputedStyle = (ele) => {
    const CSSStyle = originGetComputedStyle(ele)
    CSSStyle.lineHeight = '16px'
    return CSSStyle
}

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback) => {
    return setTimeout(callback, 0)
}
global.cancelAnimationFrame = (callback) => {
    return clearTimeout(callback, 0)
}
