export function on (el, type, listener, options) {
    el.addEventListener(type, listener, options)
}

export function off (el, type, listener, options) {
    el.removeEventListener(type, listener, options)
}

export function once (el, type, listener, options) {
    function handler (evt) {
        listener.call(undefined, evt)
        off(el, type, handler, options)
    }

    on(el, type, handler, options)
}

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
