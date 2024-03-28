const baseFieldProps = {
    text: {
        type: [String, Number, Boolean, Array, Object],
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
        default: undefined
    },
    fieldProps: { // 组件Props
        type: Object,
        default: () => ({})
    },
    formItemProps: {
        type: Object,
        default: () => ({})
    },
    emptyText: {
        type: String,
        default: '-'
    },
    renderField: {
        type: Function,
        default: undefined
    }
}

export default baseFieldProps
