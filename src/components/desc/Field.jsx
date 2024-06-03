import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import BaseField from '@/components/base-field'
import { useDescContext } from './hooks/useDescContext'
import { pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseField.props, ...Form.Item.props },
    setup (props, { attrs, slots }) {
        const { model = {} } = useDescContext()

        return () => {
            const { fieldProps, formItemProps } = props

            const needFormItemProps = {
                ...pick(props, Object.keys(Form.Item.props)),
                ...formItemProps,
                model: unref(model)
            }

            const baseFieldProps = {
                ...attrs,
                ...props,
                mode: 'read',
                fieldProps: fieldProps,
                formItemProps: needFormItemProps
            }
            return (
                <BaseField {...baseFieldProps} v-slots={slots}/>
            )
        }
    }
})
