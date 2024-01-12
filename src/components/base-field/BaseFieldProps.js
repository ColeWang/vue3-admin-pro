const BaseFieldProps = {
    text: {
        type: [String, Number, Array, Object],
        default: undefined
    },
    mode: {
        type: String,
        default: 'edit' // read只读模式 edit渲染编辑模式
    },
    placeholder: {
        type: String,
        default: undefined
    },
    valueType: {
        type: String,
        default: 'text'
    },
    valueEnum: {
        type: Object,
        default: () => ({})
    },
    fieldProps: { // 组件Props
        type: Object,
        default: () => ({})
    },
    formItemProps: {
        type: Object,
        default: () => ({})
    },
    renderFormItem: {
        type: Function,
        default: undefined
    }
}

export default BaseFieldProps
