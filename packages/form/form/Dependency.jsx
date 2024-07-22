import { defineComponent, unref } from 'vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { cloneProxyToRaw } from '../../_utils/props-util'
import { isFunction, reduce, set } from 'lodash-es'

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
    setup (props, { slots, attrs }) {
        const { formProps = {}, getModelValue } = useFormInstance()

        return () => {
            const { name: namePathList, colProps } = props
            const { grid } = unref(formProps)

            const slotScope = reduce(namePathList, (result, namePath) => {
                if (namePath && getModelValue && isFunction(getModelValue)) {
                    const value = getModelValue(namePath)
                    return set(result, namePath, cloneProxyToRaw(value))
                }
                return result
            }, {})

            const colWrapProps = {
                ...attrs,
                ...colProps,
                grid: !!grid
            }
            return (
                <ColWrap {...colWrapProps}>
                    {slots.default && slots.default(slotScope)}
                </ColWrap>
            )
        }
    }
})
