import { defineComponent } from 'vue'
import { Form } from 'ant-design-vue'
import { pick } from 'lodash-es'
import Field from './Field'

const valueType = 'dateRange'

export default defineComponent({
    inheritAttrs: false,
    props: { ...Field.props, ...Form.Item.props },
    setup (props, { slots, attrs }) {
        return () => {
            const { fieldProps } = props
            const formItemProps = {
                ...pick(props, Object.keys(Form.Item.props)),
                ...props.formItemProps,
            }
            return (
                <Field
                    {...props}
                    {...attrs}
                    valueType={valueType}
                    fieldProps={fieldProps}
                    formItemProps={formItemProps}
                    v-slots={slots}
                />
            )
        }
    }
})
