import { defineComponent } from 'vue'
import BaseFieldProps from './BaseFieldProps'
import FieldDatePicker from './components/DatePicker'
import FieldRangePicker from './components/RangePicker'
import FieldTimePicker from './components/TimePicker'
import FieldTimeRangePicker from './components/TimeRangePicker'
import FieldRadio from './components/Radio'
import FieldSelect from './components/Select'
import FieldNumber from './components/Number'
import FieldTextArea from './components/TextArea'
import FieldText from './components/Text'
import FieldPassword from './components/Password'
import { omitUndefined } from '@/utils'
import { isFunction } from 'lodash-es'

function mergeFieldProps (props, extraFieldProps) {
    const fieldProps = { ...props.fieldProps, ...extraFieldProps }
    return { ...props, fieldProps }
}

function defaultRenderText (valueType, props, slots) {
    if (valueType === 'date') {
        const dateProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateWeek') {
        const dateProps = mergeFieldProps(props, {
            picker: 'week',
            format: 'YYYY-wo'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateWeekRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'week',
            format: 'YYYY-wo'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateMonth') {
        const dateProps = mergeFieldProps(props, {
            picker: 'month',
            format: 'YYYY-MM'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateMonthRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'month',
            format: 'YYYY-MM'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateQuarter') {
        const dateProps = mergeFieldProps(props, {
            picker: 'quarter',
            format: 'YYYY-[Q]Q'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateQuarterRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'quarter',
            format: 'YYYY-[Q]Q'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateYear') {
        const dateProps = mergeFieldProps(props, {
            picker: 'year',
            format: 'YYYY'
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateYearRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'year',
            format: 'YYYY'
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateTime') {
        const dateProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true
        })
        return <FieldDatePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'dateTimeRange') {
        const dateProps = mergeFieldProps(props, {
            picker: 'date',
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: true
        })
        return <FieldRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'time') {
        const dateProps = mergeFieldProps(props, {
            format: 'HH:mm:ss'
        })
        return <FieldTimePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'timeRange') {
        const dateProps = mergeFieldProps(props, {
            format: 'HH:mm:ss'
        })
        return <FieldTimeRangePicker {...dateProps} v-slots={slots}/>
    }
    if (valueType === 'radio') {
        return <FieldRadio {...props} v-slots={slots}/>
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
