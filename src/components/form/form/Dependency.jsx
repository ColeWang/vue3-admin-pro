import { defineComponent } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { fromPairs } from 'lodash-es'

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

            const values = name.map((key) => {
                return [key, getFieldValue(key)]
            })
            const slotScope = fromPairs(values)
            const children = slots.default && slots.default(slotScope)

            const formItemProps = { ...attrs, ...restProps, noStyle: true }
            return (
                <AntForm.Item {...formItemProps}>{children}</AntForm.Item>
            )
        }
    }
})
