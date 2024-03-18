import { defineComponent, shallowRef, unref, watch } from 'vue'
import { Button, Checkbox, Popover, Tooltip } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import TreeList from './TreeList'
import { useLocaleReceiver } from '@/components/locale-provider'
import { isBoolean } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

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
    emits: ['change'],
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
            emit('change', nextTableColumns)
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
                            <TreeList
                                fixed={'left'}
                                title={t('leftPin')}
                                columns={frontColumns}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <TreeList
                                title={t('noPin')}
                                showTitle={showTitle}
                                columns={betweenColumns}
                                checkable={checkable}
                                draggable={draggable}
                                onCheckChange={onCheckChange}
                                onFixedChange={onFixedChange}
                                onDropChange={onDropChange}
                            />
                            <TreeList
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
