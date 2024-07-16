import { defineComponent, ref, unref } from 'vue'
import useResizeObserver from '../_utils/hooks/useResizeObserver'
import { debounce, head } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        debounce: {
            type: Number,
            default: 100
        },
        onResize: {
            type: Function,
            default: undefined
        }
    },
    emits: ['resize'],
    setup (props, { emit, attrs, slots }) {
        const elRef = ref(null)

        const size = ref({ width: 0, height: 0 })

        function setSize (value) {
            size.value = value
            emit('resize', value)
        }

        const debounceCallback = debounce((entries) => {
            const { contentRect = {} } = head(entries) || {}
            const { width, height, ...restRect } = contentRect
            setSize({ width, height, ...restRect })
        }, props.debounce, { leading: true })

        useResizeObserver(elRef, debounceCallback)

        return () => {
            const slotScope = { size: unref(size) }
            const children = slots.default && slots.default(slotScope)

            return (
                <div {...attrs} ref={elRef}>
                    {children}
                </div>
            )
        }
    }
})
