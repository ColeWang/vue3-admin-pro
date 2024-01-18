import { defineComponent, Fragment, ref, unref } from 'vue'
import { Form as AntForm, Space } from 'ant-design-vue'
import BaseForm from '../base-form'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { isFunction, map } from 'lodash-es'
import { omitUndefined } from '@/utils'
import useMediaQuery from '@/hooks/useMediaQuery'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const FormGroup = defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: String,
            default: undefined
        },
        size: {
            type: Number,
            default: 32
        },
        align: {
            type: String,
            default: 'start'
        }
    },
    setup (props, { slots }) {
        const { className } = useMediaQuery()
        const formInstance = useFormInstance()

        return () => {
            const { title, size } = props
            const { title: titleSlot, ...restSlots } = slots

            const formProps = formInstance ? unref(formInstance.formProps) : {}
            const layout = formProps.layout || 'vertical'

            const spaceProps = {
                size: layout === 'inline' ? 0 : size,
                align: 'start',
                wrap: true,
            }

            const spaceStyles = {
                rowGap: 0,
                marginBottom: 0,
                flexWrap: 'wrap',
                maxWidth: '100%'
            }

            const titleDom = (() => {
                const children = titleSlot ? titleSlot() : null
                if (children || title) {
                    return (
                        <div class={cx('group-title')}>{children || title}</div>
                    )
                }
                return null
            })()

            const groupClassNames = cx('group', {
                'group__inline': layout === 'inline',
                'group__vertical': 'xs' === unref(className) || layout === 'vertical',
            })

            return (
                <div class={groupClassNames}>
                    <Fragment>{titleDom}</Fragment>
                    <Space {...spaceProps} style={spaceStyles} v-slots={restSlots}/>
                </div>
            )
        }
    }
})

const FormDependency = defineComponent({
    inheritAttrs: false,
    props: {
        ...AntForm.Item.props,
        name: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props, { attrs, slots }) {
        const formInstance = useFormInstance()

        function getFieldValue (name) {
            if (formInstance && formInstance.getModelValue) {
                return formInstance.getModelValue(name)
            }
            return undefined
        }

        return () => {
            const defaultSlots = (() => {
                if (slots.default && isFunction(slots.default)) {
                    const result = map(props.name, (name) => {
                        return getFieldValue(name)
                    })
                    return slots.default.bind(null, result)
                }
                return undefined
            })()

            const nextSlots = omitUndefined({ ...slots, default: defaultSlots })
            const itemProps = { ...attrs, ...props }

            return (
                <AntForm.Item noStyle={true} {...itemProps} v-slots={nextSlots}/>
            )
        }
    }
})

const Form = defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseForm.props,
        layout: {
            type: String,
            default: undefined
        }
    },
    setup (props, { slots, attrs, expose }) {
        const baseFormRef = ref(null)

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            const baseFormProps = {
                ...attrs,
                ...props,
                layout: props.layout || 'vertical'
            }
            return (
                <BaseForm ref={baseFormRef} {...baseFormProps} v-slots={slots}/>
            )
        }
    }
})

Form.useForm = AntForm.useForm
Form.Item = AntForm.Item
Form.Group = FormGroup
Form.Dependency = FormDependency

export default Form
