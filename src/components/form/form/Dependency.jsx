import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { fromPairs, isFunction } from 'lodash-es'
import { omitUndefined } from '@/utils'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...AntForm.Item.props,
        name: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { attrs, slots }) {
        const formInstance = useFormInstance()

        function getFieldValue (name) {
            if (formInstance && formInstance.getModelValue) {
                return formInstance.getModelValue(name)
            }
            return undefined
        }

        return () => {
            const { name, ...restProps } = props

            const defaultSlots = (() => {
                if (slots.default && isFunction(slots.default)) {
                    const values = name.map((key) => {
                        return [key, getFieldValue(key)]
                    })
                    const result = fromPairs(values)
                    return slots.default.bind(null, result)
                }
                return undefined
            })()

            const needSlots = omitUndefined({ ...slots, default: defaultSlots })
            const formItemProps = { ...attrs, ...restProps, noStyle: true }
            return (
                <AntForm.Item {...formItemProps} v-slots={needSlots}/>
            )
        }
    }
})
