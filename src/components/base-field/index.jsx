import { defineComponent } from 'vue'
import BaseFieldProps from './BaseFieldProps'
import FieldDatePicker from './components/DatePicker'
import FieldRangePicker from './components/RangePicker'
import FieldSelect from './components/Select'
import FieldNumber from './components/Number'
import FieldTextArea from './components/TextArea'
import FieldText from './components/Text'
import FieldPassword from './components/Password'
import { omitUndefined } from '@/utils'
import { isFunction } from 'lodash-es'

function defaultRenderText (valueType, props, slots) {
    if (valueType === 'date') {
        return <FieldDatePicker {...props} v-slots={slots}/>
    }
    if (valueType === 'dateRange') {
        return <FieldRangePicker {...props} v-slots={slots}/>
    }
    if (valueType === 'select') {
        return <FieldSelect {...props} v-slots={slots}/>
    }
    if (valueType === 'number') {
        return <FieldNumber {...props} v-slots={slots}/>
    }
    if (valueType === 'textarea') {
        return <FieldTextArea {...props} v-slots={slots}/>
    }
    if (valueType === 'password') {
        return <FieldPassword {...props} v-slots={slots}/>
    }
    return <FieldText {...props} v-slots={slots}/>
}

export default defineComponent({
    inheritAttrs: false,
    props: { ...BaseFieldProps },
    setup (props, { slots, attrs }) {
        function onUpdateValue (value) {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { text, valueType, fieldProps, renderFormItem, formItemProps } = props
            const placeholder = fieldProps.placeholder || props.placeholder
            const { model = {}, name } = formItemProps
            const inputValue = model[name]
            const dataValue = props.mode === 'edit' ? (inputValue ?? text ?? '') : (text ?? inputValue ?? '')
            const omitFieldProps = {
                ...fieldProps,
                value: inputValue,
                placeholder: placeholder,
                'onUpdate:value': onUpdateValue
            }
            const renderProps = {
                ...props,
                ...attrs,
                text: dataValue,
                fieldProps: omitUndefined(omitFieldProps),
                formItemProps: omitUndefined(formItemProps),
                renderFormItem: renderFormItem,
            }

            return defaultRenderText(valueType, renderProps, slots)
        }
    }
})
