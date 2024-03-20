import { cloneVNode, defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import ColWrap from '../helpers/ColWrap'
import { useFormInstance } from '../base-form'
import { isValidElement } from '@/utils'
import { head, isFunction, pick } from 'lodash-es'
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
    inheritAttrs: false,
    props: fieldCustomProps,
    setup (props, { slots }) {
        const formInstance = useFormInstance()

        function onUpdateValue (value) {
            const { setModelValue } = formInstance
            const pickProps = pick(props, Object.keys(Form.Item.props))
            const { name } = { ...pickProps, ...props.formItemProps }
            if (isFunction(setModelValue) && name) {
                setModelValue(value, name)
            }
        }

        return () => {
            const pickProps = pick(props, Object.keys(Form.Item.props))
            const formItemProps = { ...pickProps, ...props.formItemProps }
            const { width: fieldWidth, hidden, colProps } = props
            const { model = {}, formProps = {} } = formInstance

            const needSlots = {
                default: () => {
                    const children = slots.default ? slots.default() : []
                    const vNode = head(children)
                    if (!isValidElement(vNode)) {
                        return vNode
                    }
                    const name = formItemProps.name
                    const inputValue = unref(model)[name]
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
