import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { default as BaseForm, Submitter } from '../../base-form'
import { default as useFloatForm, FloatProps } from '../hooks/useFloatForm'
import { useLocaleReceiver } from '@/components/locale-provider'
import { isFunction, pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: FloatProps,
    emits: ['update:open', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')

        const { open, loading, onOpen, onCancel, onFinish } = useFloatForm(props, {
            onOpen: () => emit('open'),
            onCancel: () => emit('cancel'),
            onUpdateOpen: (value) => emit('update:open', value)
        })

        watch(open, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        function onAfterClose () {
            const modalProps = {
                ...pick(props, Object.keys(Modal.props)),
                ...props.extraProps
            }
            if (modalProps.destroyOnClose) {
                const context = unref(baseFormRef)
                context && context.resetFields()
            }
            props.onAfterClose && emit('afterClose')
            isFunction(props.extraProps.onAfterClose) && props.extraProps.onAfterClose()
        }

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({
            open: onOpen,
            close: onCancel,
            getFormInstance,
        })

        return () => {
            const { extraProps, submitText, resetText } = props

            const modalSlots = {
                footer: () => {
                    const submitterProps = {
                        ...pick(props, Object.keys(Submitter.props)),
                        submitText: submitText || t('okText'),
                        resetText: resetText || t('cancelText'),
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onCancel
                    }
                    return (
                        <Submitter {...submitterProps}/>
                    )
                },
                default: () => {
                    const baseFormProps = {
                        ...attrs,
                        ...pick(props, Object.keys(BaseForm.props)),
                        onFinish: onFinish,
                        onSubmit: onFinish
                    }
                    return (
                        <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={slots}/>
                    )
                }
            }

            const triggerDom = slots.trigger && (
                <div style={{ display: 'inline-block' }} onClick={onOpen}>
                    {slots.trigger()}
                </div>
            )

            const needModalProps = {
                ...pick(props, Object.keys(Modal.props)),
                ...extraProps,
                open: unref(open),
                onCancel: onCancel,
                onAfterClose: onAfterClose
            }

            return (
                <Fragment>
                    <Modal {...needModalProps} v-slots={modalSlots}/>
                    {triggerDom}
                </Fragment>
            )
        }
    }
})
