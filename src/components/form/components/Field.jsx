import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import BaseField from '@/components/base-field'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { isFunction, pick } from 'lodash-es'
import { fieldStyles } from './utils'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseField.props,
        width: {
            type: [String, Number],
            default: undefined
        },
        hidden: {
            type: Boolean,
            default: false
        },
        colProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots: fieldSlots, attrs }) {
        const formInstance = useFormInstance()

        function onUpdateValue (value) {
            const { setModelValue } = formInstance
            const { formItemProps: { name } } = props
            if (isFunction(setModelValue) && name) {
                setModelValue(value, name)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, hidden, colProps } = props
            const { model = {}, formProps = {} } = formInstance

            const formItemSlots = {
                default: () => {
                    const needFieldProps = {
                        ...fieldProps,
                        style: fieldStyles(fieldProps.style, fieldWidth),
                        'onUpdate:value': onUpdateValue
                    }
                    const needFormItemProps = {
                        ...formItemProps,
                        key: formItemProps.name,
                        model: unref(model)
                    }
                    const baseFieldProps = {
                        ...attrs,
                        ...pick(props, Object.keys(BaseField.props)),
                        fieldProps: needFieldProps,
                        formItemProps: needFormItemProps
                    }
                    return (
                        <BaseField {...baseFieldProps} v-slots={fieldSlots}/>
                    )
                }
            }

            const colWrapProps = {
                ...colProps,
                hidden: hidden,
                grid: !!(unref(formProps).grid),
            }

            return (
                <ColWrap {...colWrapProps} key={formItemProps.name}>
                    <Form.Item {...formItemProps} v-slots={formItemSlots}/>
                </ColWrap>
            )
        }
    }
})
