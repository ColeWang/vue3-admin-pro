import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Form.Item.props,
        colProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots, attrs }) {
        const { formProps = {} } = useFormInstance()

        return () => {
            const { colProps, ...restProps } = props
            const { grid } = unref(formProps)

            const colWrapProps = {
                ...attrs,
                ...colProps,
                grid: !!grid
            }
            return (
                <ColWrap {...colWrapProps}>
                    <Form.Item {...restProps} v-slots={slots}/>
                </ColWrap>
            )
        }
    }
})
