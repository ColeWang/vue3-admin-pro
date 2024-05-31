import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import BaseField from '@/components/base-field'
import { useFormInstance } from '../base-form'
import { isFunction, pick } from 'lodash-es'
import { fieldStyle, genFormItemFixStyle } from '../utils'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseField.props,
        width: {
            type: [String, Number],
            default: undefined
        },
        labelWidth: {
            type: [String, Number],
            default: 'auto'
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
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { model = {}, formProps = {} } = formInstance

            const extraFormItemProps = genFormItemFixStyle(labelWidth, unref(formProps).layout)

            const needFieldProps = {
                ...fieldProps,
                style: fieldStyle(fieldProps.style, fieldWidth),
                'onUpdate:value': onUpdateValue
            }
            const needFormItemProps = {
                ...formItemProps,
                ...extraFormItemProps,
                key: formItemProps.name,
                model: unref(model)
            }
            const baseFieldProps = {
                ...attrs,
                ...pick(props, Object.keys(BaseField.props)),
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }

            const colWrapProps = {
                ...colProps,
                hidden: hidden,
                grid: !!(unref(formProps).grid),
            }

            // 暂不支持 Form.Item 本身的插槽 够用
            return (
                <ColWrap {...colWrapProps} key={needFormItemProps.name}>
                    <Form.Item {...needFormItemProps}>
                        <BaseField {...baseFieldProps} v-slots={fieldSlots}/>
                    </Form.Item>
                </ColWrap>
            )
        }
    }
})
