import { isBoolean } from 'lodash-es'

export function addEvt (el, type, listener, options) {
    el.addEventListener(type, listener, options)
}

export function cleanEvt (el, type, listener, options) {
    el.removeEventListener(type, listener, options)
}

export function onceEvt (el, type, listener, options) {
    function handler (evt) {
        listener.call(null, evt)
        cleanEvt(el, type, handler, options)
    }

    addEvt(el, type, handler, options)
}

export function stopPropagation (evt) {
    evt.stopPropagation()
}

export function preventDefault (evt, isStopPropagation) {
    if (!isBoolean(evt.cancelable) || evt.cancelable) {
        evt.preventDefault()
    }
    if (isStopPropagation) {
        stopPropagation(evt)
    }
}

export function trigger (target, type) {
    const inputEvent = document.createEvent('HTMLEvents')
    inputEvent.initEvent(type, true, true)
    target.dispatchEvent(inputEvent)
}
