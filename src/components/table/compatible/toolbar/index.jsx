import { defineComponent, ref, unref } from 'vue'
import { Button, ConfigProvider, Space, Tooltip } from 'ant-design-vue'
import { ReloadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons-vue'
import Density from '../../components/density'
import ColumnSetting from '../../components/column-setting'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '@/components/locale-provider'
import { getSlotVNode } from '@/utils/props-util'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const defaultOptions = {
    reload: true,
    export: false,
    density: true,
    setting: true
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        options: {
            type: [Object, Boolean],
            default: () => ({})
        },
        title: {
            type: Function,
            default: undefined
        },
        actions: {
            type: Function,
            default: undefined
        },
        settings: {
            type: Function,
            default: undefined
        },
        onExport: {
            type: Function,
            default: undefined
        }
    },
    emits: ['export'],
    setup (props, { emit, slots }) {
        const popupContainer = ref(null)

        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps, onReload } = useSharedContext()

        function onExportClick () {
            emit('export')
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            const { options: propsOptions } = props

            const slotScope = { ...requestProps }
            const titleDom = getSlotVNode(slots, props, 'title', slotScope)
            const actionsDom = getSlotVNode(slots, props, 'actions', slotScope)

            const renderSettings = () => {
                const catalog = {
                    reload: (
                        <Tooltip title={t('reload')}>
                            <Button onClick={onReload}>
                                <ReloadOutlined spin={requestProps.loading}/>
                            </Button>
                        </Tooltip>
                    ),
                    export: (
                        <Tooltip title={t('export')}>
                            <Button onClick={onExportClick}>
                                <VerticalAlignBottomOutlined/>
                            </Button>
                        </Tooltip>
                    ),
                    density: <Density/>,
                    setting: <ColumnSetting/>
                }

                const options = pick({ ...defaultOptions, ...propsOptions }, Object.keys(defaultOptions))
                const defaultSettings = Object.keys(options)
                    .filter((key) => options[key])
                    .map((key) => catalog[key])

                const customSettings = getSlotVNode(slots, props, 'settings', slotScope)

                return (
                    <Space.Compact style={{ marginLeft: '12px' }}>
                        {customSettings || defaultSettings}
                    </Space.Compact>
                )
            }

            return (
                <ConfigProvider getPopupContainer={getPopupContainer}>
                    <div class={cx('popup-container')} ref={popupContainer}>
                        <div class={cx('toolbar')}>
                            <div class={cx('toolbar-title')}>{titleDom}</div>
                            <div class={cx('toolbar-actions')}>
                                <Space size={8}>{actionsDom}</Space>
                                {propsOptions !== false && renderSettings()}
                            </div>
                        </div>
                    </div>
                </ConfigProvider>
            )
        }
    }
})
