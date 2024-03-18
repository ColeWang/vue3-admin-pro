import { defineComponent, Fragment, ref, unref } from 'vue'
import { Form as AntForm, Space } from 'ant-design-vue'
import BaseForm from '../base-form'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { forEach, isFunction } from 'lodash-es'
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
            const { title, size, align } = props
            const { formProps = {} } = formInstance
            const { title: titleSlot, ...restSlots } = slots
            const layout = unref(formProps).layout || 'vertical'

            const titleDom = (() => {
                const children = titleSlot && titleSlot()
                if (children || title) {
                    return (
                        <div class={cx('group-title')}>{children || title}</div>
                    )
                }
                return null
            })()

            const spaceStyles = {
                rowGap: 0,
                marginBottom: 0,
                flexWrap: 'wrap',
                maxWidth: '100%'
            }

            const groupClassNames = cx('group', {
                'group__inline': layout === 'inline',
                'group__vertical': 'xs' === unref(className) || layout === 'vertical',
            })

            return (
                <div class={groupClassNames}>
                    <Fragment>{titleDom}</Fragment>
                    <Space
                        size={layout === 'inline' ? 0 : size}
                        align={align}
                        wrap={true}
                        style={spaceStyles}
                        v-slots={restSlots}
                    />
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
            const { name, ...restProps } = props

            const defaultSlots = (() => {
                if (slots.default && isFunction(slots.default)) {
                    const result = {}
                    forEach(name, (key) => {
                        result[key] = getFieldValue(key)
                    })
                    return slots.default.bind(null, result)
                }
                return undefined
            })()

            const nextSlots = omitUndefined({ ...slots, default: defaultSlots })
            return (
                <AntForm.Item
                    {...attrs}
                    {...restProps}
                    noStyle={true}
                    v-slots={nextSlots}
                />
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
            default: 'vertical'
        }
    },
    setup (props, { slots, attrs, expose }) {
        const baseFormRef = ref(null)

        function getFormInstance () {
            return unref(baseFormRef)
        }

        expose({ getFormInstance })

        return () => {
            return (
                <BaseForm
                    {...attrs}
                    {...props}
                    ref={baseFormRef}
                    v-slots={slots}
                />
            )
        }
    }
})

Form.useForm = AntForm.useForm
Form.Item = AntForm.Item
Form.Group = FormGroup
Form.Dependency = FormDependency

export default Form
