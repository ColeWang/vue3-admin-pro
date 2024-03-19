import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import BaseForm from '../base-form'
import Submitter from '../components/Submitter'
import { isFunction, pick } from 'lodash-es'

const drawerFormProps = {
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
    drawerProps: {
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

export default defineComponent({
    inheritAttrs: false,
    props: drawerFormProps,
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

        function onOpenClick () {
            setOpenValue(true)
            props.onOpen && emit('open')
            isFunction(props.drawerProps.onOpen) && props.drawerProps.onOpen()
        }

        function onClose () {
            if (unref(loading)) return
            setOpenValue(false)
            props.onCancel && emit('cancel')
            isFunction(props.drawerProps.onCancel) && props.drawerProps.onCancel()
        }

        function onAfterClose () {
            const drawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...props.drawerProps
            }
            if (drawerProps.destroyOnClose) {
                const context = unref(baseFormRef)
                context && context.resetFields()
            }
            props.onAfterClose && emit('afterClose')
            isFunction(props.drawerProps.onAfterClose) && props.drawerProps.onAfterClose()
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
                result && onClose()
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
            close: onClose,
            getFormInstance,
        })

        return () => {
            const { drawerProps, submitText, resetText } = props
            const { submitter: submitterSlot, ...restSlots } = slots

            const drawerSlots = {
                default: () => {
                    const baseFormProps = {
                        ...attrs,
                        ...pick(props, Object.keys(BaseForm.props)),
                        onSubmit: onFinishHandle,
                        onFinish: onFinishHandle
                    }
                    return (
                        <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={restSlots}/>
                    )
                },
                extra: () => {
                    const submitterProps = {
                        ...pick(props, Object.keys(Submitter.props)),
                        loading: unref(loading),
                        submitText: submitText || t('okText'),
                        resetText: resetText || t('cancelText'),
                        onSubmit: onSubmit,
                        onReset: onClose
                    }
                    if (submitterSlot && isFunction(submitterSlot)) {
                        return submitterSlot(submitterProps)
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

            const needDrawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...drawerProps,
                open: unref(sOpen),
                onClose: onClose,
                onAfterOpenChange: onAfterClose
            }

            return (
                <Fragment>
                    <Drawer {...needDrawerProps} v-slots={drawerSlots}/>
                    {triggerDom}
                </Fragment>
            )
        }
    }
})
