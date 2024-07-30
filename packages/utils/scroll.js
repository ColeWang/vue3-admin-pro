const overflowScrollReg = /scroll|auto/i

export function getScroller (el, root) {
    if (root === undefined) {
        root = window
    }
    let node = el
    while (node && node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === 1 && node !== root) {
        const computed = window.getComputedStyle(node)
        const overflowY = computed.overflowY
        if (overflowScrollReg.test(overflowY)) {
            return node
        }
        node = node.parentNode
    }
    return root
}

export function elCanScroll (el) {
    if (!el) return false
    if (el.scrollTop > 0) {
        return true
    }
    el.scrollTo(0, 1)
    const top = el.scrollTop
    top && el.scrollTo(0, 0)
    return top > 0
}
