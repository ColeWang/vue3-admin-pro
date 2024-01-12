import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import BaseForm from '../base-form'
import Submitter from '../components/Submitter'
import { isFunction } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseForm.props,
        layout: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: '表单'
        },
        width: {
            type: Number,
            default: 800
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        modalProps: {
            type: Object,
            default: () => ({})
        },
        submitText: {
            type: String,
            default: undefined
        },
        resetText: {
            type: String,
            default: undefined
        }
    },
    emits: ['open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef = ref(null)
        const open = ref(false)
        const loading = ref(false)

        watch(() => open, (value) => {
            emit('openChange', value)
        })

        watch(() => loading, (value) => {
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
            const { title, width, maskClosable, modalProps, submitText, resetText, ...restProps } = props

            const nextModalProps = {
                ...modalProps,
                title: title,
                width: width,
                maskClosable: maskClosable,
                open: unref(open),
                onCancel: onModalClose,
                afterClose: onAfterClose,
            }

            const modalSlots = {
                default: () => {
                    const baseFormProps = {
                        ...attrs,
                        ...restProps,
                        ref: baseFormRef,
                        layout: props.layout || 'vertical',
                        onSubmit: onFinishHandle,
                        onFinish: onFinishHandle
                    }

                    return (
                        <BaseForm {...baseFormProps} v-slots={slots}/>
                    )
                },
                footer: () => {
                    const submitterProps = {
                        config: {
                            submitText: submitText || '确认',
                            resetText: resetText || '取消'
                        },
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onModalClose
                    }

                    return (
                        <Submitter {...submitterProps}/>
                    )
                }
            }

            const triggerDom = slots.trigger ? (
                <div style={{ display: 'inline-block' }} onClick={onOpenClick}>
                    {slots.trigger()}
                </div>
            ) : null

            return (
                <Fragment>
                    <Modal {...nextModalProps} v-slots={modalSlots}/>
                    <Fragment>{triggerDom}</Fragment>
                </Fragment>
            )
        }
    }
})
