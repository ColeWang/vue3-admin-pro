import { cloneVNode, defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form/hooks/useFormInstance'
import { isValidElement } from '@/utils'
import { head, pick } from 'lodash-es'
import { fieldStyles } from './utils'

const fieldCustomProps = {
    ...Form.Item.props,
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
    },
    formItemProps: {
        type: Object,
        default: () => ({})
    }
}

export default defineComponent({
    props: fieldCustomProps,
    setup (props, { slots }) {
        const formInstance = useFormInstance()

        function onUpdateValue (value) {
            const { name } = { ...pick(props, Object.keys(Form.Item.props)), ...props.formItemProps }
            if (formInstance.setModelValue && name) {
                formInstance.setModelValue(value, name)
            }
        }

        return () => {
            const formItemProps = {
                ...pick(props, Object.keys(Form.Item.props)),
                ...props.formItemProps,
            }
            const { width: fieldWidth, hidden, colProps } = props
            const { model = {}, formProps = {} } = formInstance

            const needSlots = {
                default: () => {
                    const children = slots.default ? slots.default() : []
                    const vNode = head(children)
                    if (!isValidElement(vNode)) {
                        return vNode
                    }
                    const inputValue = unref(model)[formItemProps.name]
                    return cloneVNode(vNode, {
                        value: inputValue,
                        style: fieldStyles({}, fieldWidth),
                        'onUpdate:value': onUpdateValue
                    })
                }
            }

            const colWrapProps = {
                ...colProps,
                hidden: hidden,
                grid: !!(unref(formProps).grid),
            }

            return (
                <ColWrap {...colWrapProps} key={formItemProps.name}>
                    <Form.Item {...formItemProps} v-slots={needSlots}/>
                </ColWrap>
            )
        }
    }
})
