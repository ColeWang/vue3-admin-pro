import { Fragment } from 'vue'
import { isArray, isFunction } from 'lodash-es'
import { isEmptyElement } from './is'

export function flattenChildren (children) {
    const result = []
    if (isArray(children) && children.length !== 0) {
        children.forEach((child) => {
            if (isArray(child)) {
                result.push(...child)
            } else if (child && child.type === Fragment && isArray(child.children)) {
                result.push(...flattenChildren(child.children))
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
