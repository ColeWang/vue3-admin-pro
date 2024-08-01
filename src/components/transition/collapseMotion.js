import { nextTick } from 'vue'
import { addClass, removeClass } from '@site/utils/dom'

function collapseMotion (name, appear) {
    return {
        name,
        appear,
        css: true,
        onBeforeEnter (node) {
            node.style.height = '0px'
            node.style.opacity = '0'
            addClass(node, name)
        },
        onEnter (node) {
            nextTick().then(() => {
                node.style.height = `${node.scrollHeight}px`
                node.style.opacity = '1'
            })
        },
        onAfterEnter (node) {
            if (node) {
                removeClass(node, name)
                node.style.height = ''
                node.style.opacity = ''
            }
        },
        onBeforeLeave (node) {
            addClass(node, name)
            node.style.height = `${node.offsetHeight}px`
            node.style.opacity = ''
        },
        onLeave (node) {
            setTimeout(() => {
                node.style.height = '0px'
                node.style.opacity = '0'
            })
        },
        onAfterLeave (node) {
            if (node) {
                removeClass(node, name)
                if (node.style) {
                    node.style.height = ''
                    node.style.opacity = ''
                }
            }
        },
    }
}

export default collapseMotion
