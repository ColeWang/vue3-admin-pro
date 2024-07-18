import { computed, defineComponent, inject, provide } from 'vue'

const BaseKey = Symbol('CustomFields')

export function useCustomFields () {
    return inject(BaseKey, {})
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        valueTypeMap: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        const valueTypeMap = computed(() => {
            return props.valueTypeMap
        })

        provide(BaseKey, { valueTypeMap })

        return () => {
            return slots.default && slots.default()
        }
    }
})
