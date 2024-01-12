import { defineComponent, Fragment } from 'vue'
import BaseFieldProps from './BaseFieldProps'
import FieldDatePicker from './components/DatePicker'
import FieldRangePicker from './components/RangePicker'
import FieldSelect from './components/Select'
import FieldNumber from './components/Number'
import FieldTextArea from './components/TextArea'
import FieldText from './components/Text'
import { omitUndefined } from '@/utils'

function defaultRenderText (dataValue, valueType, props, slots) {
    const { fieldProps } = props

    if (valueType === 'date') {
        const nextFieldProps = {
            ...fieldProps,
            mode: 'date'
        }
        return <FieldDatePicker {...props} text={dataValue} fieldProps={nextFieldProps} v-slots={slots}/>
    }
    if (valueType === 'dateRange') {
        return <FieldRangePicker {...props} text={dataValue} v-slots={slots}/>
    }
    if (valueType === 'select') {
        return <FieldSelect {...props} text={dataValue} v-slots={slots}/>
    }
    if (valueType === 'number') {
        return <FieldNumber {...props} text={dataValue} v-slots={slots}/>
    }
    if (valueType === 'textarea') {
        return <FieldTextArea {...props} text={dataValue} v-slots={slots}/>
    }
    return <FieldText {...props} text={dataValue} v-slots={slots}/>
}

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots, attrs }) {
        function onUpdateValue (value) {
            const { fieldProps } = props
            if (fieldProps['onUpdate:value']) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { text, valueType, fieldProps, renderFormItem, formItemProps } = props

            const { model = {}, name } = formItemProps

            const inputValue = model[name]

            const placeholder = fieldProps.placeholder || props.placeholder

            const omitFieldProps = omitUndefined({
                ...fieldProps,
                value: inputValue,
                placeholder: placeholder,
                'onUpdate:value': onUpdateValue
            })

            const omitFormItemProps = omitUndefined(formItemProps)

            const dataValue = props.mode === 'edit' ? (omitFieldProps.value || text) : (text || omitFieldProps.value)

            const renderProps = {
                ...props,
                ...attrs,
                fieldProps: omitFieldProps,
                formItemProps: omitFormItemProps,
                renderFormItem: renderFormItem,
            }

            const children = defaultRenderText(dataValue, valueType, renderProps, slots)

            return (
                <Fragment>{children}</Fragment>
            )
        }
    }
})
