import { defineComponent, unref } from 'vue'
import BaseFieldProps from './BaseFieldProps'
import FieldDatePicker from './components/DatePicker'
import FieldRangePicker from './components/RangePicker'
import FieldTimePicker from './components/TimePicker'
import FieldTimeRangePicker from './components/TimeRangePicker'
import FieldSelect from './components/Select'
import FieldTreeSelect from './components/TreeSelect'
import FieldCascader from './components/Cascader'
import FieldRadio from './components/Radio'
import FieldCheckbox from './components/Checkbox'
import FieldSwitch from './components/Switch'
import FieldSlider from './components/Slider'
import FieldNumber from './components/Number'
import FieldTextArea from './components/TextArea'
import FieldText from './components/Text'
import FieldPassword from './components/Password'
import { useCustomFields } from './custom-fields'
import { isFunction, isObject } from 'lodash-es'

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
    if (valueType === 'select') {
        return <FieldSelect {...props} v-slots={slots}/>
    }
    if (valueType === 'treeSelect') {
        return <FieldTreeSelect {...props} v-slots={slots}/>
    }
    if (valueType === 'cascader') {
        return <FieldCascader {...props} v-slots={slots}/>
    }
    if (valueType === 'radio') {
        return <FieldRadio {...props} v-slots={slots}/>
    }
    if (valueType === 'checkbox') {
        return <FieldCheckbox {...props} v-slots={slots}/>
    }
    if (valueType === 'switch') {
        return <FieldSwitch {...props} v-slots={slots}/>
    }
    if (valueType === 'slider') {
        return <FieldSlider {...props} v-slots={slots}/>
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
        const { valueTypeMap } = useCustomFields()

        function onUpdateValue (value) {
            const { fieldProps } = props
            if (isFunction(fieldProps['onUpdate:value'])) {
                fieldProps['onUpdate:value'](value)
            }
        }

        return () => {
            const { mode, text, valueType, fieldProps, formItemProps } = props
            const placeholder = fieldProps.placeholder || props.placeholder
            const { model = {}, name } = formItemProps

            const inputValue = model[name]
            const dataValue = mode === 'edit' ? (inputValue ?? text ?? '') : (text ?? inputValue ?? '')

            const needFieldProps = {
                ...fieldProps,
                value: inputValue,
                placeholder: placeholder,
                'onUpdate:value': onUpdateValue
            }
            const fieldRenderProps = {
                ...props,
                ...attrs,
                text: dataValue,
                fieldProps: needFieldProps
            }

            const types = unref(valueTypeMap)
            const customRenderText = isObject(types) && types[valueType]
            if (customRenderText && isFunction(customRenderText)) {
                // 与 renderFormItem 参数保持一致
                // valueType: (text, props) => {}
                return customRenderText(dataValue, { mode, ...needFieldProps })
            }
            return defaultRenderText(valueType, fieldRenderProps, slots)
        }
    }
})
