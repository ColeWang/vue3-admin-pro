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
                const { fieldProps } = props
                const formItemProps = {
                    ...pick(props, Object.keys(Form.Item.props)),
                    ...props.formItemProps,
                }
                const needFieldProps = {
                    ...attrs,
                    ...props,
                    valueType: valueType,
                    fieldProps: fieldProps,
                    formItemProps: formItemProps
                }
                return (
                    <Field {...needFieldProps} v-slots={slots}/>
                )
            }
        }
    })
}

export default HocField
