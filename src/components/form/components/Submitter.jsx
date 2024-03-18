import { defineComponent } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import { preventDefault } from '@/utils/event'

const submitterProps = {
    loading: {
        type: Boolean,
        default: false
    },
    space: {
        type: Number,
        default: 8
    },
    submitText: {
        type: String,
        default: undefined
    },
    resetText: {
        type: String,
        default: undefined
    },
    submitButtonProps: {
        type: [Object, Boolean],
        default: undefined
    },
    resetButtonProps: {
        type: [Object, Boolean],
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: submitterProps,
    emits: ['submit', 'reset', 'keyPress'],
    setup (props, { emit }) {
        const { t } = useLocaleReceiver('Form')

        function onReset (evt) {
            preventDefault(evt)
            emit('reset', evt)
        }

        function onKeyPress (evt) {
            emit('keyPress', evt)
        }

        function onSubmit (evt) {
            preventDefault(evt)
            emit('submit', evt)
        }

        return () => {
            const { loading, space, submitText, resetText, submitButtonProps, resetButtonProps } = props

            const nextSubmitButtonProps = {
                ...submitButtonProps,
                type: 'primary',
                loading: loading,
                onClick: onSubmit,
                onKeyPress: onKeyPress
            }

            return (
                <Space size={space}>
                    {resetButtonProps !== false && (
                        <Button {...resetButtonProps} onClick={onReset}>
                            {resetText || t('reset')}
                        </Button>
                    )}
                    {submitButtonProps !== false && (
                        <Button {...nextSubmitButtonProps} html-type={'submit'}>
                            {submitText || t('submit')}
                        </Button>
                    )}
                </Space>
            )
        }
    }
})
