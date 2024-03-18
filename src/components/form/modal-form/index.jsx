import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseForm from '../base-form'
import Submitter from '../components/Submitter'
import { isFunction, pick } from 'lodash-es'

const modalFormProps = {
    ...BaseForm.props,
    ...Submitter.props,
    layout: {
        type: String,
        default: 'vertical'
    },
    title: {
        type: String,
        default: undefined
    },
    width: {
        type: Number,
        default: 512
    },
    maskClosable: {
        type: Boolean,
        default: true
    },
    modalProps: {
        type: Object,
        default: () => ({})
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: modalFormProps,
    emits: ['open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver('Form')

        const open = ref(false)
        const loading = ref(false)

        watch(open, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        function setOpenValue (value) {
            open.value = value
        }

        function onOpenClick () {
            setOpenValue(true)
            emit('open')
            props.modalProps.onOpen && props.modalProps.onOpen()
        }

        function onModalClose () {
            if (unref(loading)) return
            setOpenValue(false)
            emit('cancel')
            props.modalProps.onCancel && props.modalProps.onCancel()
        }

        function onAfterClose () {
            if (props.modalProps.destroyOnClose) {
                const context = unref(baseFormRef)
                context && context.resetFields()
            }
            emit('afterClose')
            props.modalProps.onAfterClose && props.modalProps.onAfterClose()
        }

        function onSubmit () {
            const context = unref(baseFormRef)
            context && context.submit()
        }

        async function onFinishHandle (values) {
            const request = props.onFinish || props.onSubmit
            if (!isFunction(request) || unref(loading)) return
            loading.value = true
            try {
                const result = await request(values)
                loading.value = false
                result && onModalClose()
            } catch (err) {
                loading.value = false
                console.warn(err)
            }
        }

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({
            open: onOpenClick,
            close: onModalClose,
            getFormInstance,
        })

        return () => {
            const { modalProps, submitText, resetText } = props

            const modalSlots = {
                default: () => {
                    const baseFormProps = {
                        ...attrs,
                        ...pick(props, Object.keys(BaseForm.props)),
                        onSubmit: onFinishHandle,
                        onFinish: onFinishHandle
                    }
                    return (
                        <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={slots}/>
                    )
                },
                footer: () => {
                    const submitterProps = {
                        ...pick(props, Object.keys(Submitter.props)),
                        loading: unref(loading),
                        submitText: submitText || t('okText'),
                        resetText: resetText || t('cancelText'),
                        onSubmit: onSubmit,
                        onReset: onModalClose
                    }
                    return (
                        <Submitter {...submitterProps}/>
                    )
                }
            }

            const triggerDom = slots.trigger && (
                <div style={{ display: 'inline-block' }} onClick={onOpenClick}>
                    {slots.trigger()}
                </div>
            )

            const needModalProps = {
                ...pick(props, Object.keys(Modal.props)),
                ...modalProps,
                open: unref(open),
                onCancel: onModalClose,
                afterClose: onAfterClose
            }

            return (
                <Fragment>
                    <Modal {...needModalProps} v-slots={modalSlots}/>
                    <Fragment>{triggerDom}</Fragment>
                </Fragment>
            )
        }
    }
})
