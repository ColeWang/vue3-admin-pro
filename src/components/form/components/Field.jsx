import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import BaseField from '@/components/base-field'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { isNumber } from 'lodash-es'

const SizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...BaseField.props,
        width: {
            type: [String, Number],
            default: undefined
        },
        colProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots: fieldSlots }) {
        const formInstance = useFormInstance()

        function unit (value) {
            if (value && isNumber(value)) {
                return `${value}px`
            }
            return undefined
        }

        function onUpdateValue (value) {
            const { formItemProps } = props
            if (formInstance && formItemProps.name) {
                formInstance.setModelValue(value, formItemProps.name)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, colProps, ...restProps } = props

            const model = formInstance ? unref(formInstance.model) : {}
            const formProps = formInstance ? unref(formInstance.formProps) : {}

            const nextFormItemProps = {
                ...formItemProps,
                model: model,
                key: formItemProps.name,
            }

            const formItemSlots = {
                default: () => {
                    const fieldStyles = (() => {
                        const { style: nextStyle } = fieldProps
                        const { maxWidth, minWidth, width } = nextStyle || {}
                        const fieldSize = isNumber(fieldWidth) ? unit(fieldWidth) : unit(SizeEnum[fieldWidth])
                        return {
                            ...nextStyle,
                            maxWidth: maxWidth || '100%',
                            minWidth: minWidth || unit(SizeEnum['xs']),
                            width: width || fieldSize || '100%'
                        }
                    })()
                    const nextFieldProps = {
                        ...fieldProps,
                        style: fieldStyles,
                        onUpdateValue: onUpdateValue,
                        'onUpdate:value': onUpdateValue
                    }
                    return (
                        <BaseField
                            {...restProps}
                            fieldProps={nextFieldProps}
                            formItemProps={nextFormItemProps}
                            v-slots={fieldSlots}
                        />
                    )
                }
            }

            const colWrapProps = { grid: !!formProps.grid, ...colProps }

            const colWrapSlots = {
                default: () => {
                    return (
                        <Form.Item {...nextFormItemProps} v-slots={formItemSlots}/>
                    )
                }
            }
            return (
                <ColWrap
                    key={formItemProps.name}
                    {...colWrapProps}
                    v-slots={colWrapSlots}
                />
            )
        }
    }
})
