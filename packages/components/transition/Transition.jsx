import { defineComponent, nextTick, Transition } from 'vue'
import { addClass, removeClass } from '../../utils/dom'
import { useConfigInject } from '../../utils/extend'
import useStyle from './style'

function collapseMotion (name, appear) {
    return {
        name,
        appear,
        css: true,
        onBeforeEnter (node) {
            addClass(node, name)
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
            nextTick().then(() => {
                node.style.height = '0px'
                node.style.opacity = '0'
            })
        },
        onAfterLeave (node) {
            if (node && node.style) {
                removeClass(node, name)
                node.style.height = ''
                node.style.opacity = ''
            }
        }
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        appear: {
            type: Boolean,
            default: false,
        }
    },
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-transition', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { appear } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition {...collapseMotion(`${prefixCls.value}-collapse`, appear)}>
                        {slots.default && slots.default()}
                    </Transition>
                </div>
            )
        }
    }
})
