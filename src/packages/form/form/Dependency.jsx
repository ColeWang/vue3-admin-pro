import { defineComponent, unref } from 'vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { isFunction, reduce, set } from 'lodash-es'
import { cloneProxyToRaw } from '@/utils/props-util'

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

        return () => {
            const { grid } = unref(formProps)
            const { name: namePathList, colProps } = props

            const slotScope = reduce(namePathList, (result, namePath) => {
                if (namePath && getModelValue && isFunction(getModelValue)) {
                    const value = getModelValue(namePath)
                    return set(result, namePath, cloneProxyToRaw(value))
                }
                return result
            }, {})

            const colWrapProps = {
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
