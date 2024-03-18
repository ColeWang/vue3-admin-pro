import { defineComponent, ref, unref } from 'vue'
import { Form as AntForm } from 'ant-design-vue'
import BaseForm from '../base-form'
import Group from './Group'
import Dependency from './Dependency'

const Form = defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseForm.props,
        layout: {
            type: String,
            default: 'vertical'
        }
    },
    setup (props, { slots, attrs, expose }) {
        const baseFormRef = ref(null)

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const baseFormProps = { ...attrs, ...props }
            return (
                <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={slots}/>
            )
        }
    }
})

Form.useForm = AntForm.useForm
Form.Item = AntForm.Item
Form.Group = Group
Form.Dependency = Dependency

export default Form
