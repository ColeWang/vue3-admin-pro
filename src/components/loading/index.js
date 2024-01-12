import { createVNode, render as vueRender } from 'vue'
import LoadingCom from './Loading'

let container = null

function removeChild (node) {
    try {
        node && document.body.removeChild(node)
    } catch (err) {
        console.log(err)
    }
}

function Loading () {
    const nextProps = {
        doClose: doClose
    }

    let vNode = createVNode(LoadingCom, nextProps)
    removeChild(container)
    container = document.createElement('div')
    vueRender(vNode, container)
    document.body.appendChild(container)

    function doClose () {
        container && vueRender(null, container)
        removeChild(container)
        vNode = null
        container = null
    }

    return () => {
        if (vNode && vNode.component) {
            const instance = vNode.component
            const vm = instance.proxy
            vm.onHide()
        }
    }
}

Loading.destroy = function () {
    container && vueRender(null, container)
    container = null
    return removeChild(container)
}

export default Loading
