import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { useFormInstance } from '../base-form'
import { fromPairs, isFunction } from 'lodash-es'

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
        const { getModelValue } = useFormInstance()

        function getFieldValue (name) {
            if (isFunction(getModelValue)) {
                return getModelValue(name)
            }
            return undefined
        }

        return () => {
            const { name, ...restProps } = props
            const formItemProps = { ...attrs, ...restProps, noStyle: true }
            const values = name.map((key) => {
                return [key, getFieldValue(key)]
            })
            const slotScope = fromPairs(values)
            return (
                <AntForm.Item {...formItemProps}>
                    {slots.default && slots.default(slotScope)}
                </AntForm.Item>
            )
        }
    }
})
