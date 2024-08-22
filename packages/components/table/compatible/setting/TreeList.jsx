import { defineComponent, unref } from 'vue'
import { theme, Tree } from 'ant-design-vue'
import { useConfigInject } from '@site-pro/hooks'
import TreeNode from './TreeNode'
import DraggableOutlined from './DraggableOutlined'
import useStyle from './style/tree-list'

export default defineComponent({
    inheritAttrs: false,
    props: {
        showTitle: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        },
        columns: {
            type: Array,
            default: () => ([])
        },
        checkable: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: true
        },
        onCheckChange: {
            type: Function,
            default: undefined
        },
        onDropChange: {
            type: Function,
            default: undefined
        },
        onFixedChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['checkChange', 'dropChange', 'fixedChange'],
    setup (props, { emit }) {
        const { prefixCls } = useConfigInject('pro-table-setting-list', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()

        /* v8 ignore next 5 */
        function onTreeNodeCheck (_, info) {
            const { node, checked } = info
            const column = props.columns.find((item) => item.key === node.key)
            emit('checkChange', node.key, { ...column, checked: checked })
        }

        /* v8 ignore next 6 */
        function onTreeNodeDrop (info) {
            const { node, dragNode, dropPosition } = info
            const dragKey = dragNode.key, dropKey = node.key, dropPos = node.pos.split('-')
            const trueDropPosition = dropPosition - Number(dropPos[dropPos.length - 1])
            emit('dropChange', dragKey, dropKey, trueDropPosition, dropPosition)
        }

        /* v8 ignore next 4 */
        function onChangeFixed (key, fixed) {
            const column = props.columns.find((item) => item.key === key)
            emit('fixedChange', key, { ...column, fixed: fixed })
        }

        return () => {
            if (props.columns.length === 0) return null
            // ----
            const { columns, showTitle, title, fixed, checkable, draggable } = props
            const { controlHeightSM } = unref(token)

            const checkedKeys = columns.filter((item) => {
                return item.checked !== false
            }).map((item) => {
                return item.key
            })

            const treeSlots = {
                title: (slotScope) => {
                    const checkboxItemProps = {
                        ...slotScope,
                        fixed: fixed,
                        columnKey: slotScope.key,
                        onChange: onChangeFixed
                    }
                    return (
                        <TreeNode {...checkboxItemProps}/>
                    )
                }
            }

            const loopTreeData = columns.map((item) => {
                return {
                    key: item.key,
                    title: item.title,
                    selectable: false,
                    disableCheckbox: item.disable === true
                }
            })

            const needDraggable = draggable ? { icon: <DraggableOutlined/> } : false

            const needTreeProps = {
                height: controlHeightSM * 10,
                blockNode: true,
                checkStrictly: true,
                checkable: checkable,
                draggable: needDraggable,
                checkedKeys: checkedKeys,
                treeData: loopTreeData,
                onCheck: onTreeNodeCheck,
                onDrop: onTreeNodeDrop
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]}>
                    {showTitle && (
                        <div class={`${prefixCls.value}-title`}>{title}</div>
                    )}
                    <Tree {...needTreeProps} v-slots={treeSlots}/>
                </div>
            )
        }
    }
})
