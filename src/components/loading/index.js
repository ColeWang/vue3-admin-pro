import { createVNode, render as vueRender } from 'vue'
import LoadingCom from './Loading'

let container = null
let vNode = null

function removeChild (node) {
    try {
        node && document.body.removeChild(node)
    } catch (err) {
        console.warn(err)
    }
}

function destroy () {
    container && vueRender(null, container)
    container && removeChild(container)
    vNode = null
    container = null
}

function Loading () {
    container && destroy()
    // ---
    container = document.createElement('div')
    vNode = createVNode(LoadingCom, { onClose: destroy })
    vueRender(vNode, container)
    document.body.appendChild(container)

    return () => {
        if (vNode && vNode.component) {
            const instance = vNode.component || {}
            const { exposeProxy } = instance
            exposeProxy && exposeProxy.hide()
        }
    }
}

Loading.destroy = destroy

export default Loading
