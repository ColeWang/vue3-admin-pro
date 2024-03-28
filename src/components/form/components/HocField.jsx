import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { pick } from 'lodash-es'
import Field from './Field'

function HocField (valueType) {
    return defineComponent({
        inheritAttrs: false,
        props: { ...Field.props, ...Form.Item.props },
        setup (props, { slots, attrs }) {
            return () => {
                const { fieldProps, formItemProps } = props
                const needFormItemProps = {
                    ...pick(props, Object.keys(Form.Item.props)),
                    ...formItemProps,
                }
                const needFieldProps = {
                    ...attrs,
                    ...props,
                    valueType: valueType,
                    fieldProps: fieldProps,
                    formItemProps: needFormItemProps
                }
                return <Field {...needFieldProps} v-slots={slots}/>
            }
        }
    })
}

export default HocField
