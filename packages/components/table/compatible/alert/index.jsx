import { defineComponent, Fragment, ref, unref } from 'vue'
import { ConfigProvider, Space, theme } from 'ant-design-vue'
import { Action } from '../../components'
import { useLocaleReceiver } from '../../../locale-provider'
import { getSlotVNode } from '../../../../utils/props-util'
import { getElement } from '../../../../utils/dom'
import { useConfigInject } from '../../../../utils/extend'
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
        const { prefixCls } = useConfigInject('pro-table-alert', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'alert'])

        const popupContainer = ref(null)

        function onCleanSelected () {
            emit('cleanSelected')
        }

        return () => {
            if (props.selectedRowKeys.length < 1) return null
            // ----
            const { selectedRowKeys, selectedRows } = props
            const { sizeMS } = unref(token)

            const contentText = `${t('selected')} ${selectedRowKeys.length} ${t('item')}`
            const defaultContent = (
                <Space size={sizeMS / 2}>
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
                    <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                <div class={`${prefixCls.value}-wrapper`}>
                                    <div class={`${prefixCls.value}-content`}>
                                        {customContent || defaultContent}
                                    </div>
                                    <div class={`${prefixCls.value}-options`}>
                                        {optionsDom}
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
