import { defineComponent, Fragment, ref, unref } from 'vue'
import { Button, ConfigProvider, Space, Tooltip } from 'ant-design-vue'
import { ReloadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import Density from './Density'
import Setting from './Setting'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: Function,
            default: undefined
        },
        loading: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'large'
        },
        columns: {
            type: Array,
            default: () => ([])
        },
        pageData: {
            type: Array,
            default: () => ([])
        },
        exportRender: {
            type: Boolean,
            default: true
        },
        sizeRender: {
            type: Boolean,
            default: true
        },
        settingRender: {
            type: Boolean,
            default: true
        }
    },
    emits: ['refresh', 'export', 'sizeChange', 'settingChange'],
    setup (props, { emit, slots, attrs }) {
        const popupContainer = ref(null)

        const { t } = useLocaleReceiver('Table.toolbar')

        function handleClickRefresh () {
            !props.loading && emit('refresh')
        }

        function handleClickExport () {
            emit('export')
        }

        function onSizeChange (value) {
            emit('sizeChange', value)
        }

        function onSettingChange (columns) {
            emit('settingChange', columns)
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            const { title, loading, size, columns, pageData } = props
            const { exportRender, sizeRender, settingRender } = props

            const renderTitle = slots.title || title

            const slotScope = { loading, size, pageData, ...attrs }

            const exportDom = exportRender && (
                <Tooltip title={t('export')}>
                    <Button onClick={handleClickExport}>
                        <VerticalAlignBottomOutlined/>
                    </Button>
                </Tooltip>
            )
            const sizeDom = sizeRender && (
                <Density size={size} onSizeChange={onSizeChange}/>
            )
            const settingDom = settingRender && (
                <Setting
                    {...attrs}
                    columns={columns}
                    onUpdateTableColumns={onSettingChange}
                />
            )

            const toolbarDom = (
                <div class={cx('toolbar')}>
                    <div class={cx('toolbar-title')}>
                        {renderTitle && renderTitle(slotScope)}
                    </div>
                    <div class={cx('toolbar-action')}>
                        <Space size={8} style={{ marginRight: '12px' }}>
                            {slots.default && slots.default(slotScope)}
                        </Space>
                        <Space.Compact>
                            <Tooltip title={t('reload')}>
                                <Button onClick={handleClickRefresh}>
                                    <ReloadOutlined spin={loading}/>
                                </Button>
                            </Tooltip>
                            {exportDom}
                            {sizeDom}
                            {settingDom}
                        </Space.Compact>
                    </div>
                </div>
            )

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('popup-container')} ref={popupContainer}>
                        <Fragment>{toolbarDom}</Fragment>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
