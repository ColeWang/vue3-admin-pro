import { isBoolean } from 'lodash-es'

export function stopPropagation (event) {
    event.stopPropagation()
}

export function preventDefault (event, isStopPropagation) {
    if (!isBoolean(event.cancelable) || event.cancelable) {
        event.preventDefault()
    }
    if (isStopPropagation) {
        stopPropagation(event)
    }
}

export function trigger (target, type) {
    const inputEvent = document.createEvent('HTMLEvents')
    inputEvent.initEvent(type, true, true)
    target.dispatchEvent(inputEvent)
}
