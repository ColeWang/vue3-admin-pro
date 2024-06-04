import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import BaseField from '@/components/base-field'
import { useDescContext } from './hooks/useDescContext'
import { pick } from 'lodash-es'

const FIELD_MODE = 'read'

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

            const needFieldProps = {
                ...attrs,
                ...props,
                mode: FIELD_MODE,
                fieldProps: fieldProps,
                formItemProps: needFormItemProps
            }
            return (
                <BaseField {...needFieldProps} v-slots={slots}/>
            )
        }
    }
})
