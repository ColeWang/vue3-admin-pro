import { defineComponent, unref } from 'vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { isFunction, set } from 'lodash-es'
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

        function genNamePathValues (namePathList) {
            const result = {}
            namePathList.forEach((namePath) => {
                if (getModelValue && isFunction(getModelValue)) {
                    const value = getModelValue(namePath)
                    set(result, namePath, cloneProxyToRaw(value))
                }
            })
            return result
        }

        return () => {
            const { grid } = unref(formProps)
            const { name: namePaths, colProps } = props

            const colWrapProps = {
                ...colProps,
                grid: !!grid
            }
            const slotScope = genNamePathValues(namePaths)
            return (
                <ColWrap {...colWrapProps}>
                    {slots.default && slots.default(slotScope)}
                </ColWrap>
            )
        }
    }
})
