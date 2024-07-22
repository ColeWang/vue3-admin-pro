import { defineComponent, Fragment, ref, unref } from 'vue'
import { ConfigProvider, Space, theme } from 'ant-design-vue'
import Action from '../../components/action'
import { useLocaleReceiver } from '../../../locale-provider'
import { getSlotVNode } from '../../../_utils/props-util'
import { useConfigInject } from '../../../_utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        selectedRowKeys: {
            type: Array,
            default: () => ([])
        },
        selectedRows: {
            type: Array,
            default: () => ([])
        },
        options: {
            type: Function,
            default: undefined
        },
        onCleanSelected: {
            type: Function,
            default: undefined
        }
    },
    emits: ['cleanSelected'],
    setup (props, { emit, slots, attrs }) {
        const popupContainer = ref(null)

        const { prefixCls } = useConfigInject('pro-table-alert', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'alert'])

        function onCleanSelected () {
            emit('cleanSelected')
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            if (props.selectedRowKeys.length < 1) return null
            // ----
            const { selectedRowKeys, selectedRows } = props
            const { sizeXS } = unref(token)

            const contentText = `${t('selected')} ${selectedRowKeys.length} ${t('item')}`
            const defaultContent = (
                <Space size={sizeXS}>
                    <Fragment>{contentText}</Fragment>
                    <Action onClick={onCleanSelected}>
                        {t('clear')}
                    </Action>
                </Space>
            )

            const slotScope = {
                keys: selectedRowKeys,
                rows: selectedRows,
                cleanSelected: onCleanSelected
            }

            const customContent = getSlotVNode(slots, props, 'default', slotScope)
            const optionsDom = getSlotVNode(slots, props, 'options', slotScope)

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                <div class={`${prefixCls.value}-wrapper`}>
                                    <div class={`${prefixCls.value}-content`}>
                                        {customContent || defaultContent}
                                    </div>
                                    <div class={`${prefixCls.value}-options`}>
                                        <Space size={sizeXS}>{optionsDom}</Space>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
