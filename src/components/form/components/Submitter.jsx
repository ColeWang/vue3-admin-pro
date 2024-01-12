import { defineComponent } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { preventDefault } from '@/utils/event'

export default defineComponent({
    inheritAttrs: false,
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        space: {
            type: Number,
            default: 8
        },
        config: {
            type: Object,
            default: () => ({})
        },
        submitButtonProps: {
            type: [Object, Boolean],
            default: undefined
        },
        resetButtonProps: {
            type: [Object, Boolean],
            default: undefined
        }
    },
    emits: ['submit', 'reset', 'keyPress'],
    setup (props, { emit }) {
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
            const { loading, space, submitButtonProps, resetButtonProps } = props
            const { submitText = '提交', resetText = '重置' } = props.config

            const nextSubmitButtonProps = {
                ...submitButtonProps,
                type: 'primary',
                loading: loading,
                onClick: onSubmit,
                onKeyPress: onKeyPress
            }

            const nextResetButtonProps = {
                ...resetButtonProps,
                onClick: onReset
            }

            return (
                <Space size={space}>
                    {resetButtonProps !== false ? (
                        <Button {...nextResetButtonProps}>
                            {resetText}
                        </Button>
                    ) : null}
                    {submitButtonProps !== false ? (
                        <Button {...nextSubmitButtonProps} html-type={'submit'}>
                            {submitText}
                        </Button>
                    ) : null}
                </Space>
            )
        }
    }
})
