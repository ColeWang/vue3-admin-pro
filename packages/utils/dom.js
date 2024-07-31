import { unref } from 'vue'

export function hasClass (node, className) {
    if (node.classList) {
        return node.classList.contains(className)
    }
    const originClass = node.className
    return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass (node, className) {
    if (node.classList) {
        node.classList.add(className)
    } else {
        if (!hasClass(node, className)) {
            node.className = `${node.className} ${className}`
        }
    }
}

export function removeClass (node, className) {
    if (node.classList) {
        node.classList.remove(className)
    } else {
        if (hasClass(node, className)) {
            const originClass = node.className
            node.className = ` ${originClass} `.replace(` ${className} `, ' ')
        }
    }
}

export function getElement (el) {
    const target = unref(el)
    if (target) {
        return target.$el || target
    }
    return undefined
}

export function getWindowSize () {
    // @todo visualViewport
    return [window.innerWidth, window.innerHeight]
}
