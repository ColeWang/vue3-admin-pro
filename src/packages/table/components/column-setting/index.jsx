import { defineComponent, unref } from 'vue'
import { Button, Checkbox } from 'ant-design-vue'
import TreeList from './TreeList'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '@/packages/locale-provider'
import { reduce, set } from 'lodash-es'
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
        }
    },
    setup (props) {
        const { columns = [], columnsMap = {}, setColumnsMap } = useSharedContext()

        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        function onCheckClick (evt) {
            const { checked: targetChecked } = evt.target
            const values = reduce(unref(columnsMap), (result, column, key) => {
                const checked = column.disable ? column.checked : targetChecked
                return set(result, key, { ...column, checked: checked })
            }, {})
            setColumnsMap && setColumnsMap(values)
        }

        function onClearClick () {
            setColumnsMap && setColumnsMap(false)
        }

        function onFixedChange (key, column) {
            const values = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        function onCheckChange (key, column) {
            const values = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        function onDropChange (dragKey, dropKey, trueDropPosition, dropPosition) {
            const keys = unref(columns).map((column) => column.key)
            const dragIndex = keys.findIndex((key) => key === dragKey)
            const dropIndex = keys.findIndex((key) => key === dropKey)
            const target = keys[dragIndex]
            keys.splice(dragIndex, 1)
            if (trueDropPosition === -1 || dropPosition > dragIndex) {
                keys.splice(dropIndex, 0, target)
            } else {
                keys.splice(dropIndex + 1, 0, target)
            }
            const values = reduce(keys, (result, key, order) => {
                const column = unref(columnsMap)[key] || {}
                return set(result, key, { ...column, order })
            }, {})
            setColumnsMap && setColumnsMap(values)
        }

        return () => {
            const { checkable, draggable } = props

            const unCheckedColumns = unref(columns).filter((item) => item.checked === false)
            const indeterminate = unCheckedColumns.length > 0 && unCheckedColumns.length !== unref(columns).length
            const checked = unCheckedColumns.length === 0 && unCheckedColumns.length !== unref(columns).length

            const leftList = unref(columns).filter((item) => item.fixed === 'left')
            const list = unref(columns).filter((item) => item.fixed === undefined)
            const rightList = unref(columns).filter((item) => item.fixed === 'right')

            const showTitle = leftList.length > 0 || rightList.length > 0

            const treeListProps = {
                checkable: checkable,
                draggable: draggable,
                onCheckChange: onCheckChange,
                onFixedChange: onFixedChange,
                onDropChange: onDropChange
            }
            return (
                <div class={cx('column-setting')}>
                    <div class={cx('column-setting-title')}>
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
                    <div class={cx('tree-list-group')}>
                        <TreeList
                            fixed={'left'}
                            title={t('leftPin')}
                            columns={leftList}
                            {...treeListProps}
                        />
                        <TreeList
                            title={t('noPin')}
                            showTitle={showTitle}
                            columns={list}
                            {...treeListProps}
                        />
                        <TreeList
                            fixed={'right'}
                            title={t('rightPin')}
                            columns={rightList}
                            {...treeListProps}
                        />
                    </div>
                </div>
            )
        }
    }
})
