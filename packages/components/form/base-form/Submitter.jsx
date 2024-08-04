import { defineComponent, unref } from 'vue'
import { Button, Space, theme } from 'ant-design-vue'
import { useLocaleReceiver } from '../../locale-provider'
import { preventDefault } from '../../../utils/event'
import { toPlainObject } from 'lodash-es'

const submitterProps = {
    size: {
        type: Number,
        default: undefined
    },
    loading: {
        type: Boolean,
        default: false
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
    },
    onReset: {
        type: Function,
        default: undefined
    },
    onSubmit: {
        type: Function,
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: submitterProps,
    emits: ['reset', 'submit'],
    setup (props, { emit, attrs }) {
        const { token } = theme.useToken()

        const { t } = useLocaleReceiver(['Form'])

        function onReset (evt) {
            preventDefault(evt)
            emit('reset', evt)
        }

        function onSubmit (evt) {
            preventDefault(evt)
            emit('submit', evt)
        }

        return () => {
            const { size: propsSize, loading, submitText, resetText, submitButtonProps, resetButtonProps } = props
            const { sizeMS } = unref(token)

            const needSubmitButtonProps = {
                ...toPlainObject(submitButtonProps),
                type: 'primary',
                loading: loading,
                onClick: onSubmit
            }
            const resetButtonDom = resetButtonProps !== false && (
                <Button {...toPlainObject(resetButtonProps)} onClick={onReset}>
                    {resetText || t('reset')}
                </Button>
            )
            const submitButtonDom = submitButtonProps !== false && (
                <Button {...needSubmitButtonProps} html-type={'submit'}>
                    {submitText || t('submit')}
                </Button>
            )
            return (
                <Space size={propsSize || sizeMS / 2} {...attrs}>
                    {[resetButtonDom, submitButtonDom]}
                </Space>
            )
        }
    }
})
