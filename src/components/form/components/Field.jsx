import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import BaseField from '@/components/base-field'
import { useFormInstance } from '../base-form'
import { has, pick, toString } from 'lodash-es'
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
        const { model = {}, formProps = {}, setModelValue } = useFormInstance()

        // 初始化值 防止 form 报错
        const { formItemProps } = props
        const hasValue = has(unref(model), formItemProps.name)
        !hasValue && onUpdateValue(formItemProps.name, undefined)

        function onUpdateValue (namePath, value) {
            setModelValue && setModelValue(namePath, value)
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout = 'vertical', grid } = unref(formProps)

            const extraFormItemProps = genFormItemFixStyle(labelWidth, layout)

            const needFieldProps = {
                ...fieldProps,
                style: fieldStyle(fieldProps.style, fieldWidth),
                'onUpdate:value': onUpdateValue.bind(null, formItemProps.name)
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
                grid: !!grid,
            }

            // 暂不支持 Form.Item 本身的插槽 够用
            const key = toString(needFormItemProps.name)
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
