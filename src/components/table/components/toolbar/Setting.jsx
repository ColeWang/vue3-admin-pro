import { defineComponent, shallowRef, unref, watch } from 'vue'
import { Button, Checkbox, Popover, Space, Tooltip, Tree } from 'ant-design-vue'
import {
    SettingOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
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
        const { t } = useLocaleReceiver('Table.toolbar')

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
                            <TooltipIcon title={t('leftPin')} fixed={'left'} {...iconProps}>
                                <VerticalAlignTopOutlined/>
                            </TooltipIcon>
                        ) : null
                    }
                    {
                        !!fixed ? (
                            <TooltipIcon title={t('noPin')} {...iconProps}>
                                <VerticalAlignMiddleOutlined/>
                            </TooltipIcon>
                        ) : null
                    }
                    {
                        fixed !== 'right' ? (
                            <TooltipIcon title={t('rightPin')} fixed={'right'} {...iconProps}>
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
            const columnProps = props.columns.find((item) => item.key === node.key)
            emit('checkChange', node.key, { ...columnProps, checked: checked })
        }

        function onTreeNodeDrop (info) {
            const { node, dragNode, dropPosition } = info
            const dragKey = dragNode.key, dropKey = node.key, dropPos = node.pos.split('-')
            const trueDropPosition = dropPosition - Number(dropPos[dropPos.length - 1])
            emit('dropChange', dragKey, dropKey, trueDropPosition, dropPosition)
        }

        function onChangeFixed (key, fixed) {
            const columnProps = props.columns.find((item) => item.key === key)
            emit('fixedChange', key, { ...columnProps, fixed: fixed })
        }

        return () => {
            if (props.columns.length === 0) return null

            const { columns, showTitle, title, fixed, checkable, draggable } = props

            const checkedKeys = columns.filter((item) => {
                return item.checked !== false
            }).map((item) => {
                return item.key
            })

            const loopTreeData = columns.map((item) => {
                return {
                    key: item.key,
                    title: item.title,
                    selectable: false,
                    // disabled: item.disable === true,
                    disableCheckbox: item.disable === true
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
        const { t } = useLocaleReceiver('Table.toolbar')

        const baseColumns = shallowRef([])
        const localColumns = shallowRef([])

        watch(() => props.columns, (values) => {
            baseColumns.value = genBaseColumns(values)
            localColumns.value = [...unref(baseColumns)]
        }, { immediate: true })

        onUpdateTableColumns(unref(localColumns))

        function genBaseColumns (columns) {
            return columns.map((item) => {
                const checked = isBoolean(item.checked) ? item.checked : true
                // 当存在 filters sorter 自动禁用
                const disable = (item.filters || item.sorter) ? true : item.disable
                return { ...item, checked: checked, disable: disable }
            })
        }

        function onUpdateTableColumns (columns) {
            const front = columns.filter((item) => item.fixed === 'left')
            const between = columns.filter((item) => item.fixed === undefined)
            const behind = columns.filter((item) => item.fixed === 'right')
            localColumns.value = [...front, ...between, ...behind]
            const nextTableColumns = unref(localColumns).map((column) => {
                return { ...column }
            }).filter((column) => {
                return !!column.checked
            })
            emit('updateTableColumns', nextTableColumns)
        }

        function onCheckClick (evt) {
            const { checked: targetChecked } = evt.target
            const nextColumns = unref(localColumns).map((item) => {
                const checked = item.disable ? item.checked : targetChecked
                return { ...item, checked: checked }
            })
            onUpdateTableColumns(nextColumns)
        }

        function onClearClick () {
            onUpdateTableColumns([...unref(baseColumns)])
        }

        function onFixedChange (key, node) {
            const nextColumns = [...unref(localColumns)]
            const findIndex = nextColumns.findIndex((item) => item.key === key)
            nextColumns.splice(findIndex, 1)
            nextColumns.push(node)
            onUpdateTableColumns(nextColumns)
        }

        function onCheckChange (key, node) {
            const nextColumns = [...unref(localColumns)]
            const findIndex = nextColumns.findIndex((item) => item.key === key)
            nextColumns.splice(findIndex, 1, node)
            onUpdateTableColumns(nextColumns)
        }

        function onDropChange (dragKey, dropKey, trueDropPosition, dropPosition) {
            const nextColumns = [...unref(localColumns)]
            const dragIndex = nextColumns.findIndex((item) => item.key === dragKey)
            const dropIndex = nextColumns.findIndex((item) => item.key === dropKey)
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
                    const unCheckedColumns = unref(localColumns).filter((item) => item.checked === false)
                    const indeterminate = unCheckedColumns.length > 0 && unCheckedColumns.length !== unref(localColumns).length
                    const checked = unCheckedColumns.length === 0 && unCheckedColumns.length !== unref(localColumns).length

                    return (
                        <div class={cx('setting-title')}>
                            <Checkbox
                                indeterminate={indeterminate}
                                checked={checked}
                                onChange={onCheckClick}
                            >
                                {t('columnDisplay')}
                            </Checkbox>
                            <Button
                                style={{ padding: '4px' }}
                                type={'link'}
                                onClick={onClearClick}
                            >
                                {t('reset')}
                            </Button>
                        </div>
                    )
                },
                content: () => {
                    const frontColumns = unref(localColumns).filter((item) => item.fixed === 'left')
                    const betweenColumns = unref(localColumns).filter((item) => item.fixed === undefined)
                    const behindColumns = unref(localColumns).filter((item) => item.fixed === 'right')

                    const showTitle = frontColumns.length > 0 || behindColumns.length > 0

                    return (
                        <div class={cx('checkbox-list-group')}>
                            <CheckboxList
                                fixed={'left'}
                                title={t('leftPin')}
                                columns={frontColumns}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <CheckboxList
                                title={t('noPin')}
                                showTitle={showTitle}
                                columns={betweenColumns}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <CheckboxList
                                fixed={'right'}
                                title={t('rightPin')}
                                columns={behindColumns}
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
                    <Tooltip title={t('columnSetting')}>
                        <Button>
                            <SettingOutlined/>
                        </Button>
                    </Tooltip>
                </Popover>
            )
        }
    }
})
