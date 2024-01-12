import { computed, defineComponent, shallowRef, unref } from 'vue'
import { Button, Checkbox, Popover, Space, Tooltip, Tree } from 'ant-design-vue'
import {
    SettingOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'
import { preventDefault } from '@/utils/event'
import { isBoolean } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/setting.module.scss'

const cx = classNames.bind(styles)

const TooltipIcon = defineComponent({
    inheritAttrs: false,
    props: {
        columnKey: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit, slots }) {
        function onClick (evt) {
            preventDefault(evt, true)
            emit('change', props.fixed)
        }

        return () => {
            return (
                <Tooltip title={props.title}>
                    <span onClick={onClick}>
                        {slots.default ? slots.default() : null}
                    </span>
                </Tooltip>
            )
        }
    }
})

const CheckboxItem = defineComponent({
    inheritAttrs: false,
    props: {
        columnKey: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit, attrs }) {
        function onChange (fixed) {
            emit('change', props.columnKey, fixed)
        }

        return () => {
            const { title, fixed, columnKey } = props

            const iconProps = {
                columnKey: columnKey,
                onChange: onChange
            }

            const iconDom = (
                <Space size={4}>
                    {
                        fixed !== 'left' ? (
                            <TooltipIcon title={'固定在列首'} fixed={'left'} {...iconProps}>
                                <VerticalAlignTopOutlined/>
                            </TooltipIcon>
                        ) : null
                    }
                    {
                        !!fixed ? (
                            <TooltipIcon title={'不固定'} {...iconProps}>
                                <VerticalAlignMiddleOutlined/>
                            </TooltipIcon>
                        ) : null
                    }
                    {
                        fixed !== 'right' ? (
                            <TooltipIcon title={'固定在列尾'} fixed={'right'} {...iconProps}>
                                <VerticalAlignBottomOutlined/>
                            </TooltipIcon>
                        ) : null
                    }
                </Space>
            )

            return (
                <div class={cx('checkbox-item')}>
                    <div class={cx('checkbox-item-title')}>{title}</div>
                    <div class={cx('checkbox-item-option')}>
                        {!attrs.disabled ? iconDom : null}
                    </div>
                </div>
            )
        }
    }
})

const CheckboxList = defineComponent({
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
            default: undefined // left right
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
        }
    },
    emits: ['checkChange', 'dropChange', 'fixedChange'],
    setup (props, { emit }) {
        function onTreeNodeCheck (_, info) {
            const { node, checked } = info
            const columnProps = props.columns.find((columnProps) => columnProps.key === node.key)
            emit('checkChange', node.key, { ...columnProps, checked: checked })
        }

        function onTreeNodeDrop (info) {
            const { node, dragNode, dropPosition } = info
            const dragKey = dragNode.key, dropKey = node.key, dropPos = node.pos.split('-')
            const trueDropPosition = dropPosition - Number(dropPos[dropPos.length - 1])
            emit('dropChange', dragKey, dropKey, trueDropPosition, dropPosition)
        }

        function onChangeFixed (key, fixed) {
            const columnProps = props.columns.find((columnProps) => columnProps.key === key)
            emit('fixedChange', key, { ...columnProps, fixed: fixed })
        }

        return () => {
            if (props.columns.length === 0) return null

            const { showTitle, title, fixed, checkable, draggable } = props

            const checkedKeys = props.columns.filter((columnProps) => {
                return columnProps.checked !== false
            }).map((columnProps) => {
                return columnProps.key
            })

            const loopTreeData = props.columns.map((columnProps) => {
                return {
                    key: columnProps.key,
                    title: columnProps.title,
                    selectable: false,
                    // disabled: columnProps.disable === true,
                    disableCheckbox: columnProps.disable === true
                }
            })

            const treeProps = {
                height: 280,
                showLine: false,
                blockNode: true,
                checkStrictly: true,
                checkable: checkable,
                draggable: draggable,
                checkedKeys: checkedKeys,
                treeData: loopTreeData,
                onCheck: onTreeNodeCheck,
                onDrop: onTreeNodeDrop
            }

            const treeSlots = {
                title: (slotScope) => {
                    const checkboxItemProps = {
                        ...slotScope,
                        fixed: fixed,
                        columnKey: slotScope.key,
                        onChange: onChangeFixed
                    }
                    return (
                        <CheckboxItem {...checkboxItemProps}/>
                    )
                }
            }

            return (
                <div class={cx('checkbox-list')}>
                    {showTitle ? (<div className={cx('checkbox-list-title')}>{title}</div>) : null}
                    <Tree {...treeProps} v-slots={treeSlots}/>
                </div>
            )
        }
    }
})

function genBaseColumns (columns) {
    return columns.map((columnProps) => {
        const checked = isBoolean(columnProps.checked) ? columnProps.checked : true
        // 当存在 filters sorter 自动禁用
        const disable = (columnProps.filters || columnProps.sorter) ? true : columnProps.disable
        return { ...columnProps, checked: checked, disable: disable }
    })
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        checkable: {
            type: Boolean,
            default: true
        },
        draggable: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            default: () => ([])
        }
    },
    emits: ['updateTableColumns'],
    setup (props, { emit }) {
        const BaseColumns = genBaseColumns(props.columns)
        const localColumns = shallowRef([...BaseColumns])

        onUpdateTableColumns(unref(localColumns))

        const frontColumns = computed(() => {
            return unref(localColumns).filter((columnProps) => columnProps.fixed === 'left')
        })
        const betweenColumns = computed(() => {
            return unref(localColumns).filter((columnProps) => columnProps.fixed === undefined)
        })
        const behindColumns = computed(() => {
            return unref(localColumns).filter((columnProps) => columnProps.fixed === 'right')
        })

        function onUpdateTableColumns (columns) {
            const front = columns.filter((columnProps) => columnProps.fixed === 'left')
            const between = columns.filter((columnProps) => columnProps.fixed === undefined)
            const behind = columns.filter((columnProps) => columnProps.fixed === 'right')
            localColumns.value = [...front, ...between, ...behind]
            const nextTableColumns = unref(localColumns).map((columnProps) => {
                return { ...columnProps }
            }).filter((columnProps) => {
                return !!columnProps.checked
            })
            emit('updateTableColumns', nextTableColumns)
        }

        function onCheckClick (evt) {
            const { checked: targetChecked } = evt.target
            const nextColumns = unref(localColumns).map((columnProps) => {
                const checked = columnProps.disable ? columnProps.checked : targetChecked
                return { ...columnProps, checked: checked }
            })
            onUpdateTableColumns(nextColumns)
        }

        function onClearClick () {
            const nextColumns = BaseColumns.map((columnProps) => ({ ...columnProps }))
            onUpdateTableColumns(nextColumns)
        }

        function onFixedChange (key, node) {
            const nextColumns = [...unref(localColumns)]
            const findIndex = nextColumns.findIndex((columnProps) => columnProps.key === key)
            nextColumns.splice(findIndex, 1)
            nextColumns.push(node)
            onUpdateTableColumns(nextColumns)
        }

        function onCheckChange (key, node) {
            const nextColumns = [...unref(localColumns)]
            const findIndex = nextColumns.findIndex((columnProps) => columnProps.key === key)
            nextColumns.splice(findIndex, 1, node)
            onUpdateTableColumns(nextColumns)
        }

        function onDropChange (dragKey, dropKey, trueDropPosition, dropPosition) {
            const nextColumns = [...unref(localColumns)]
            const dragIndex = nextColumns.findIndex((columnProps) => columnProps.key === dragKey)
            const dropIndex = nextColumns.findIndex((columnProps) => columnProps.key === dropKey)
            const targetItem = nextColumns[dragIndex]
            nextColumns.splice(dragIndex, 1)
            if (trueDropPosition === -1 || dropPosition > dragIndex) {
                nextColumns.splice(dropIndex, 0, targetItem)
            } else {
                nextColumns.splice(dropIndex + 1, 0, targetItem)
            }
            onUpdateTableColumns(nextColumns)
        }

        return () => {
            const { checkable, draggable } = props

            const popoverSlots = {
                title: () => {
                    const unCheckedColumns = unref(localColumns).filter((columnProps) => {
                        return columnProps.checked === false
                    })
                    const indeterminate = unCheckedColumns.length > 0 && unCheckedColumns.length !== unref(localColumns).length
                    const checked = unCheckedColumns.length === 0 && unCheckedColumns.length !== unref(localColumns).length

                    return (
                        <div class={cx('setting-title')}>
                            <Checkbox indeterminate={indeterminate} checked={checked} onChange={onCheckClick}>
                                列展示
                            </Checkbox>
                            <Button style={{ padding: '4px' }} type={'link'} onClick={onClearClick}>{'重置'}</Button>
                        </div>
                    )
                },
                content: () => {
                    const showTitle = unref(frontColumns).length > 0 || unref(behindColumns).length > 0

                    return (
                        <div class={cx('checkbox-list-group')}>
                            <CheckboxList
                                fixed={'left'}
                                title={'固定在列首'}
                                columns={unref(frontColumns)}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <CheckboxList
                                title={'不固定'}
                                showTitle={showTitle}
                                columns={unref(betweenColumns)}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <CheckboxList
                                fixed={'right'}
                                title={'固定在列尾'}
                                columns={unref(behindColumns)}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                        </div>
                    )
                }
            }
            return (
                <Popover trigger={'click'} placement={'bottomRight'} v-slots={popoverSlots}>
                    <Tooltip title={'设置表头'}>
                        <Button>
                            <SettingOutlined/>
                        </Button>
                    </Tooltip>
                </Popover>
            )
        }
    }
})
