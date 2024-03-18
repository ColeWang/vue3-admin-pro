import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import BaseField from '@/components/base-field'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { isNumber, pick } from 'lodash-es'

const sizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

function unit (value) {
    if (value && isNumber(value)) {
        return `${value}px`
    }
    return undefined
}

function fieldStyles (style, fieldWidth) {
    const { maxWidth, minWidth, width, ...restStyles } = style || {}
    const fieldSize = isNumber(fieldWidth) ? unit(fieldWidth) : unit(sizeEnum[fieldWidth])
    return {
        ...restStyles,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || unit(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}

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
            const { formItemProps: { name } } = props
            if (formInstance.setModelValue && name) {
                formInstance.setModelValue(value, name)
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
