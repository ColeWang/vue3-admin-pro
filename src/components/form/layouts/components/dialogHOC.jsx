import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { default as BaseForm, Submitter } from '../../base-form'
import { useLocaleReceiver } from '@/components/locale-provider'
import { isFunction, pick } from 'lodash-es'

export const HOCProps = {
    ...BaseForm.props,
    ...Submitter.props,
    layout: {
        type: String,
        default: 'vertical'
    },
    open: {
        type: Boolean,
        default: false
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
    destroyOnClose: {
        type: Boolean,
        default: true
    },
    extraProps: {
        type: Object,
        default: () => ({})
    },
    onOpen: {
        type: Function,
        default: undefined
    },
    onCancel: {
        type: Function,
        default: undefined
    },
    onAfterClose: {
        type: Function,
        default: undefined
    },
    onOpenChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    }
}

function dialogHOC (WrappedComponent) {
    return defineComponent({
        inheritAttrs: false,
        props: HOCProps,
        emits: ['update:open', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
        setup (props, { emit, slots, attrs, expose }) {
            const baseFormRef = ref(null)

            const { t } = useLocaleReceiver('Form')

            const sOpen = ref(props.open)
            const loading = ref(false)

            watch(() => props.open, (value) => {
                sOpen.value = value
            }, { immediate: true })

            watch(sOpen, (value) => {
                emit('openChange', value)
            })

            watch(loading, (value) => {
                emit('loadingChange', value)
            })

            function setOpenValue (value) {
                sOpen.value = value
                emit('update:open', value)
            }

            function onOpen () {
                setOpenValue(true)
                props.onOpen && emit('open')
                isFunction(props.extraProps.onOpen) && props.extraProps.onOpen()
            }

            function onCancel () {
                if (unref(loading)) return
                setOpenValue(false)
                props.onCancel && emit('cancel')
                isFunction(props.extraProps.onCancel) && props.extraProps.onCancel()
            }

            function onAfterClose () {
                const needDialogProps = {
                    ...pick(props, Object.keys(HOCProps)),
                    ...props.extraProps
                }
                if (needDialogProps.destroyOnClose) {
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

            async function onFinish (values) {
                const request = props.onFinish || props.onSubmit
                if (!isFunction(request) || unref(loading)) return
                loading.value = true
                try {
                    const result = await request(values)
                    loading.value = false
                    result && onCancel()
                } catch (err) {
                    loading.value = false
                    console.warn(err)
                }
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
                const { trigger: triggerSlot, ...restSlots } = slots

                const triggerDom = triggerSlot && (
                    <div style={{ display: 'inline-block' }} onClick={onOpen}>
                        {triggerSlot()}
                    </div>
                )

                const HOCSlots = {
                    default: () => {
                        const baseFormProps = {
                            ...attrs,
                            ...pick(props, Object.keys(BaseForm.props)),
                            onSubmit: onFinish,
                            onFinish: onFinish
                        }
                        return (
                            <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={restSlots}/>
                        )
                    },
                    submitter: () => {
                        const submitterProps = {
                            ...pick(props, Object.keys(Submitter.props)),
                            loading: unref(loading),
                            submitText: submitText || t('okText'),
                            resetText: resetText || t('cancelText'),
                            onSubmit: onSubmit,
                            onReset: onCancel
                        }
                        return (
                            <Submitter {...submitterProps}/>
                        )
                    }
                }

                const needHOCProps = {
                    ...pick(props, Object.keys(HOCProps)),
                    ...extraProps,
                    open: unref(sOpen),
                    onCancel: onCancel,
                    onAfterClose: onAfterClose
                }

                return (
                    <Fragment>
                        <WrappedComponent {...needHOCProps} v-slots={HOCSlots}/>
                        {triggerDom}
                    </Fragment>
                )
            }
        }
    })
}

export default dialogHOC
