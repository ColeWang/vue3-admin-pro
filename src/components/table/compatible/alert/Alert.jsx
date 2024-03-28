import { defineComponent, Fragment, ref, unref } from 'vue'
import { ConfigProvider, Space } from 'ant-design-vue'
import Action from '../../components/action'
import { useLocaleReceiver } from '@/components/locale-provider'
import { getSlotVNode } from '@/utils/props-util'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

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
    setup (props, { emit, slots }) {
        const popupContainer = ref(null)

        const { t } = useLocaleReceiver('Table.alert')

        function onCleanSelected () {
            emit('cleanSelected')
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            if (props.selectedRowKeys.length < 1) return null

            const { selectedRowKeys, selectedRows } = props

            const slotScope = {
                keys: selectedRowKeys,
                rows: selectedRows,
                cleanSelected: onCleanSelected
            }
            const contentText = `${t('selected')} ${selectedRowKeys.length} ${t('item')}`
            const defaultContent = (
                <Space size={8}>
                    <Fragment>{contentText}</Fragment>
                    <Action onClick={onCleanSelected}>{t('clear')}</Action>
                </Space>
            )
            const customContent = getSlotVNode(slots, props, 'default', slotScope)

            const optionsDom = getSlotVNode(slots, props, 'options', slotScope)

            return (
                <div class={cx('alert')}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={cx('popup-container')} ref={popupContainer}>
                            <div class={cx('alert-container')}>
                                <div class={cx('alert-info-wrap')}>
                                    <div class={cx('alert-content')}>
                                        {customContent || defaultContent}
                                    </div>
                                    <div class={cx('alert-options')}>
                                        <Space size={16}>{optionsDom}</Space>
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
