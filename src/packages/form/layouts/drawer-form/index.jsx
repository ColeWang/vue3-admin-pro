import { defineComponent, Fragment, ref, unref, watch } from 'vue'
import { Drawer } from 'ant-design-vue'
import { default as BaseForm, Submitter } from '../../base-form'
import { default as useFloatForm, floatProps } from '../hooks/useFloatForm'
import { getSlotVNode } from '@/utils/props-util'
import { useLocaleReceiver } from '@/packages/locale-provider'
import { isFunction, omit, pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: floatProps,
    emits: ['update:open', 'open', 'cancel', 'afterClose', 'openChange', 'loadingChange'],
    setup (props, { emit, slots, attrs, expose }) {
        const baseFormRef = ref(null)

        const { t } = useLocaleReceiver(['Form'])

        const { sOpen, loading, onOpen, onCancel, onFinish } = useFloatForm(props, {
            onOpen: () => emit('open'),
            onCancel: () => emit('cancel'),
            onUpdateOpen: (value) => emit('update:open', value)
        })

        watch(sOpen, (value) => {
            emit('openChange', value)
        })

        watch(loading, (value) => {
            emit('loadingChange', value)
        })

        /* v8 ignore next 16 */
        function onAfterClose () {
            const { extraProps } = props

            const drawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...extraProps
            }
            if (drawerProps.destroyOnClose) {
                const context = unref(baseFormRef)
                context && context.resetFields()
            }
            if (extraProps.onAfterClose && isFunction(extraProps.onAfterClose)) {
                extraProps.onAfterClose()
            }
            emit('afterClose')
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
            const { extraProps, submitter } = props

            const baseFormProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseForm.props)),
                onFinish: onFinish
            }
            const baseFormSlots = omit(slots, ['trigger'])

            const needDrawerProps = {
                ...pick(props, Object.keys(Drawer.props)),
                ...extraProps,
                headerStyle: { paddingBlock: '14px' },
                open: unref(sOpen),
                onClose: onCancel,
                onAfterOpenChange: onAfterClose
            }
            const drawerSlots = {
                extra: () => {
                    const submitterProps = {
                        ...pick(submitter, Object.keys(Submitter.props)),
                        submitText: submitter.submitText || t('okText'),
                        resetText: submitter.resetText || t('cancelText'),
                        loading: unref(loading),
                        onSubmit: onSubmit,
                        onReset: onCancel
                    }
                    return <Submitter {...submitterProps}/>
                }
            }

            const triggerDom = getSlotVNode(slots, props, 'trigger')

            return (
                <Fragment>
                    <Drawer {...needDrawerProps} v-slots={drawerSlots}>
                        <BaseForm {...baseFormProps} ref={baseFormRef} v-slots={baseFormSlots}/>
                    </Drawer>
                    {triggerDom && (
                        <div style={{ display: 'inline-block' }} onClick={onOpen}>
                            {triggerDom}
                        </div>
                    )}
                </Fragment>
            )
        }
    }
})
