import { defineComponent, unref } from 'vue'
import { Button, Checkbox, theme } from 'ant-design-vue'
import TreeList from './TreeList'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'
import { reduce, set } from 'lodash-es'

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
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-table-setting', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { columns = [], columnsMap = {}, setColumnsMap } = useSharedContext()

        /* v8 ignore next 8 */
        function onCheckClick (evt) {
            const { checked: targetChecked } = evt.target || {}
            const values = reduce(unref(columnsMap), (result, column, key) => {
                const { hideInSetting, disable } = column || {}
                const checked = hideInSetting || disable ? column.checked : targetChecked
                return set(result, key, { ...column, checked: checked })
            }, {})
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 3 */
        function onClearClick () {
            setColumnsMap && setColumnsMap(false)
        }

        /* v8 ignore next 4 */
        function onFixedChange (key, column) {
            const values = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 4 */
        function onCheckChange (key, column) {
            const values = { ...unref(columnsMap), [key]: column }
            setColumnsMap && setColumnsMap(values)
        }

        /* v8 ignore next 17 */
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
            const { sizeXXS } = unref(token)

            // 不在 setting 中展示的
            const needColumns = unref(columns).filter((item) => !item.hideInSetting)

            const unCheckedColumns = needColumns.filter((item) => item.checked === false)
            const indeterminate = unCheckedColumns.length > 0 && unCheckedColumns.length !== needColumns.length
            const checked = unCheckedColumns.length === 0 && unCheckedColumns.length !== needColumns.length

            const leftList = needColumns.filter((item) => item.fixed === 'left')
            const list = needColumns.filter((item) => item.fixed === undefined)
            const rightList = needColumns.filter((item) => item.fixed === 'right')

            const showTitle = leftList.length > 0 || rightList.length > 0

            const treeListProps = {
                checkable: checkable,
                draggable: draggable,
                onCheckChange: onCheckChange,
                onFixedChange: onFixedChange,
                onDropChange: onDropChange
            }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-title`}>
                        <Checkbox
                            indeterminate={indeterminate}
                            checked={checked}
                            onChange={onCheckClick}
                        >
                            {t('columnDisplay')}
                        </Checkbox>
                        <Button
                            style={{ padding: `${sizeXXS}px` }}
                            type={'link'}
                            onClick={onClearClick}
                        >
                            {t('reset')}
                        </Button>
                    </div>
                    <div class={`${prefixCls.value}-tree-list-group`}>
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
