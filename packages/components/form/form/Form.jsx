import { defineComponent, ref, unref } from 'vue'
import { BaseForm } from '../base-form'

export default defineComponent({
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
