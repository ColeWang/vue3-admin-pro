import { nextTick } from 'vue'

function collapseMotion (name, appear) {
    return {
        name,
        appear,
        css: true,
        onBeforeEnter (node) {
            node.style.overflow = 'hidden'
            node.style.transition = 'height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
            node.style.height = '0px'
            node.style.opacity = '0'
        },
        onEnter (node) {
            nextTick().then(() => {
                node.style.height = `${node.scrollHeight}px`
                node.style.opacity = '1'
            })
        },
        onAfterEnter (node) {
            if (node && node.style) {
                node.style.overflow = ''
                node.style.transition = ''
                node.style.height = ''
                node.style.opacity = ''
            }
        },
        onBeforeLeave (node) {
            node.style.overflow = 'hidden'
            node.style.transition = 'height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)'
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
            if (node && node.style) {
                node.style.overflow = ''
                node.style.transition = ''
                node.style.height = ''
                node.style.opacity = ''
            }
        },
    }
}

export default collapseMotion
