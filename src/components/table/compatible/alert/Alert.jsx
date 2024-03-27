import { defineComponent } from 'vue'
import { Space } from 'ant-design-vue'
import Action from '../../components/action'
import { useLocaleReceiver } from '@/components/locale-provider'
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
        onCleanSelected: {
            type: Function,
            default: undefined
        }
    },
    emits: ['cleanSelected'],
    setup (props, { emit, slots }) {
        const { t } = useLocaleReceiver('Table.alert')

        function onCleanSelected () {
            emit('cleanSelected')
        }

        return () => {
            if (props.selectedRowKeys.length < 1) return null

            const { selectedRowKeys, selectedRows } = props
            const { length } = selectedRowKeys
            const alertInfo = `${t('selected')} ${length} ${t('item')}`

            const slotScope = { keys: selectedRowKeys, rows: selectedRows }
            const children = slots.default && slots.default(slotScope)

            return (
                <div class={cx('alert')}>
                    <div class={cx('alert-container')}>
                        <div class={cx('alert-info')}>
                            <div class={cx('alert-info-content')}>
                                <Space size={8}>
                                    <span>{alertInfo}</span>
                                    <Action onClick={onCleanSelected}>
                                        {t('clear')}
                                    </Action>
                                </Space>
                            </div>
                            <div class={cx('alert-info-option')}>{children}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
