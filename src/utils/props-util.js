import { Comment, Fragment, isProxy, toRaw } from 'vue'
import { cloneDeep, cloneWith, isArray, isFunction } from 'lodash-es'

export function cloneProxyToRaw (proxy) {
    return cloneWith(proxy, (value) => {
        if (isProxy(value)) {
            const nextValue = toRaw(value)
            return cloneDeep(nextValue)
        } else {
            return value
        }
    })
}

export function isValidElement (c) {
    return c && c.__v_isVNode && typeof c.type !== 'symbol'
}

export function isEmptyText (c) {
    return c && c.type === Text && c.children.trim() === ''
}

export function isEmptyFragment (c) {
    return c && c.type === Fragment && c.children.length === 0
}

export function isEmptyElement (c) {
    return c && (c.type === Comment || isEmptyText(c) || isEmptyFragment(c))
}

export function filterEmptyElement (children) {
    const result = []
    if (isArray(children) && children.length !== 0) {
        children.forEach((child) => {
            if (isArray(child)) {
                result.push(...child)
            } else if (child && child.type === Fragment && isArray(child.children)) {
                result.push(...filterEmptyElement(child.children))
            } else if (child) {
                result.push(child)
            }
        })
    }
    return result.filter((c) => !isEmptyElement(c))
}

export function getSlot (slots, props, name = 'default') {
    const result = props[name] || slots[name]
    return isFunction(result) ? result : undefined
}

export function getSlotVNode (slots, props, name = 'default', slotScope) {
    const result = props[name] || slots[name]
    return isFunction(result) ? result(slotScope) : undefined
}

export function getPropsSlot (slots, props, name = 'default', slotScope) {
    const result = props[name] ?? slots[name]
    return isFunction(result) ? result(slotScope) : result
}
