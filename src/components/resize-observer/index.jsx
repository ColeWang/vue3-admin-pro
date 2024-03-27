import { defineComponent, ref, unref } from 'vue'
import useResizeObserver from '@/utils/hooks/useResizeObserver'
import { head } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        onResize: {
            type: Function,
            default: undefined
        }
    },
    emits: ['resize'],
    setup (props, { emit, slots }) {
        const elRef = ref(null)

        const size = ref({ width: 0, height: 0 })

        function setSize (value) {
            size.value = value
            emit('resize', value)
        }

        useResizeObserver(elRef, (entries) => {
            const entry = head(entries)
            const { width, height, ...restRect } = entry.contentRect
            setSize({ width, height, ...restRect })
        })

        return () => {
            const slotScope = unref(size)
            const children = slots.default && slots.default(slotScope)

            return (
                <div ref={elRef}>{children}</div>
            )
        }
    }
})
