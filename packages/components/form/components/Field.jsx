import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import { BaseField } from '../../base-field'
import { useFormInstance } from '../base-form'
import { namePathToString, toPx } from '../../../utils/util'
import { genFormItemFixStyle } from '../utils'
import { has, isArray, isNumber, isString, merge, pick } from 'lodash-es'

const sizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

function fieldStyle (style, fieldWidth) {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize = isNumber(fieldWidth) ? toPx(fieldWidth) : toPx(sizeEnum[fieldWidth])
    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || toPx(sizeEnum['xs']),
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
    setup (props, { slots: fieldSlots }) {
        const { model = {}, formProps = {}, setModelValue } = useFormInstance()

        // 初始化值 防止 form 报错
        setDefaultValue(props.formItemProps.name)

        function setDefaultValue (namePath) {
            const hasValue = has(unref(model), namePath)
            !hasValue && onUpdateValue(namePath, undefined)
        }

        function onUpdateValue (namePath, value) {
            if (isString(namePath) || isArray(namePath)) {
                setModelValue && setModelValue(namePath, value)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout = 'vertical', grid } = unref(formProps)

            const extraFormItemProps = genFormItemFixStyle(labelWidth, layout)
            const key = namePathToString(formItemProps.name)

            const needFieldProps = {
                ...fieldProps,
                style: fieldStyle(fieldProps.style, fieldWidth),
                ['onUpdate:value']: onUpdateValue.bind(null, formItemProps.name)
            }
            const needFormItemProps = merge({
                ...formItemProps,
                key: key,
                model: unref(model)
            }, extraFormItemProps)

            const baseFieldProps = {
                ...pick(props, Object.keys(BaseField.props)),
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }
            const colWrapProps = {
                ...colProps,
                hidden: hidden,
                grid: !!grid,
            }
            return (
                <ColWrap {...colWrapProps} key={key}>
                    <Form.Item {...needFormItemProps}>
                        <BaseField {...baseFieldProps} v-slots={fieldSlots}/>
                    </Form.Item>
                </ColWrap>
            )
        }
    }
})
