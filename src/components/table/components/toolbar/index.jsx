import { defineComponent, Fragment, ref, unref } from 'vue'
import { Button, ConfigProvider, Space, Tooltip } from 'ant-design-vue'
import { ReloadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import Density from './Density'
import Setting from './Setting'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const defaultOptions = { exportRender: true, densityRender: true, settingRender: true }

export default defineComponent({
    inheritAttrs: false,
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        title: {
            type: Function,
            default: undefined
        },
        columns: {
            type: Array,
            default: () => ([])
        },
        pageData: {
            type: Array,
            default: () => ([])
        },
        density: {
            type: String,
            default: 'large'
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['reload', 'export', 'density', 'setting'],
    setup (props, { emit, slots, attrs }) {
        const popupContainer = ref(null)

        const { t } = useLocaleReceiver('Table.toolbar')

        function handleReloadClick () {
            !props.loading && emit('reload')
        }

        function handleExportClick () {
            emit('export')
        }

        function onDensityChange (value) {
            emit('density', value)
        }

        function onSettingChange (columns) {
            emit('setting', columns)
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            const { title, loading, density, columns, pageData, options } = props
            const { exportRender, densityRender, settingRender } = { ...defaultOptions, ...options }

            const renderTitle = slots.title || title
            const slotScope = { loading, density, pageData, ...attrs }

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
                                <Button onClick={handleReloadClick}>
                                    <ReloadOutlined spin={loading}/>
                                </Button>
                            </Tooltip>
                            {exportRender && (
                                <Tooltip title={t('export')}>
                                    <Button onClick={handleExportClick}>
                                        <VerticalAlignBottomOutlined/>
                                    </Button>
                                </Tooltip>
                            )}
                            {densityRender && (
                                <Density value={density} onChange={onDensityChange}/>
                            )}
                            {settingRender && (
                                <Setting columns={columns} onChange={onSettingChange}/>
                            )}
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
