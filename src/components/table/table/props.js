import { Table } from 'ant-design-vue'

const extraProps = {
    title: {
        type: Function,
        default: undefined
    },
    columns: {
        type: Array,
        default: () => ([])
    },
    rowSelection: {
        type: [Object, Boolean],
        default: false
    },
    scroll: {
        type: Object,
        default: () => ({ x: 'max-content' })
    },
    emptyText: {
        type: String,
        default: '-'
    }
}

const tableProps = {
    ...Table.props,
    ...extraProps,
    manualRequest: {
        type: Boolean,
        default: false
    },
    request: {
        type: Function,
        default: undefined
    },
    params: {
        type: Object,
        default: undefined
    },
    beforeSearchSubmit: {
        type: Function,
        default: undefined
    },
    postData: {
        type: Function,
        default: undefined
    },
    search: {
        type: [Object, Boolean],
        default: undefined
    },
    searchRender: {
        type: Function,
        default: undefined
    },
    toolbar: {
        type: [Object, Boolean],
        default: undefined
    },
    toolbarRender: {
        type: Function,
        default: undefined
    },
    extraRender: {
        type: Function,
        default: undefined
    },
    alertRender: {
        type: Function,
        default: undefined
    },
    alertOptionRender: {
        type: Function,
        default: undefined
    },
    tableRender: {
        type: Function,
        default: undefined
    },
    onChange: {
        type: Function,
        default: undefined
    },
    onPaginateChange: {
        type: Function,
        default: undefined
    },
    onFilterChange: {
        type: Function,
        default: undefined
    },
    onSortChange: {
        type: Function,
        default: undefined
    },
    onLoadingChange: {
        type: Function,
        default: undefined
    },
    onColumnsChange: {
        type: Function,
        default: undefined
    },
    onLoad: {
        type: Function,
        default: undefined
    },
    onRequestError: {
        type: Function,
        default: undefined
    },
    onSubmit: {
        type: Function,
        default: undefined
    },
    onReset: {
        type: Function,
        default: undefined
    }
}

export default tableProps
