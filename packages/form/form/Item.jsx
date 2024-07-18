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
                ...colProps,
                grid: !!grid
            }
            const formItemProps = {
                ...attrs,
                ...restProps
            }
            return (
                <ColWrap {...colWrapProps}>
                    <Form.Item {...formItemProps} v-slots={slots}/>
                </ColWrap>
            )
        }
    }
})
