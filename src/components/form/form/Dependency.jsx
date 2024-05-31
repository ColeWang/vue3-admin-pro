import { defineComponent, unref } from 'vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { fromPairs, isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        name: {
            type: Array,
            default: () => ([])
        },
        colProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        const { formProps = {}, getModelValue } = useFormInstance()

        function getFieldValue (name) {
            if (getModelValue && isFunction(getModelValue)) {
                return getModelValue(name)
            }
            return undefined
        }

        return () => {
            const { grid } = unref(formProps)
            const { name, colProps } = props

            const colWrapProps = {
                ...colProps,
                grid: !!grid
            }
            const values = name.map((key) => {
                return [key, getFieldValue(key)]
            })
            const slotScope = fromPairs(values)
            return (
                <ColWrap {...colWrapProps}>
                    {slots.default && slots.default(slotScope)}
                </ColWrap>
            )
        }
    }
})
