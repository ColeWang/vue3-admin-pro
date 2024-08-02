import { defineComponent, ref, unref } from 'vue'
import { Button, ConfigProvider, Dropdown, Popover, Space, theme, Tooltip } from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import Density from '../density'
import Setting from '../setting'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'
import { getSlotVNode } from '../../../../utils/props-util'
import { getElement } from '../../../../utils/dom'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'
import { pick } from 'lodash-es'

const defaultOptions = {
    reload: true,
    export: false,
    density: true,
    setting: true
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        title: {
            type: Function,
            default: undefined
        },
        options: {
            type: [Object, Boolean],
            default: () => ({})
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
    setup (props, { emit, slots, attrs }) {
        const popupContainer = ref(null)

        const { prefixCls } = useConfigInject('pro-table-toolbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {}, onReload } = useSharedContext()

        function onExportClick () {
            emit('export')
        }

        return () => {
            const { options: propsOptions } = props
            const { sizeMS } = unref(token)

            const slotScope = {
                loading: requestProps.loading,
                pageData: requestProps.dataSource,
                pagination: requestProps.pagination
            }
            const titleDom = getSlotVNode(slots, props, 'title', slotScope)
            const actionsDom = getSlotVNode(slots, props, 'actions', slotScope)

            const renderSettings = () => {
                const vNodeCatalog = {
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
                    density: (
                        <Tooltip title={t('density')}>
                            <Dropdown trigger={['click']} placement={'bottomRight'} v-slots={{
                                overlay: () => <Density/>
                            }}>
                                <Button>
                                    <ColumnHeightOutlined/>
                                </Button>
                            </Dropdown>
                        </Tooltip>
                    ),
                    setting: (
                        <Tooltip title={t('columnSetting')}>
                            <Popover trigger={'click'} placement={'bottomRight'} v-slots={{
                                content: () => <Setting/>
                            }}>
                                <Button>
                                    <SettingOutlined/>
                                </Button>
                            </Popover>
                        </Tooltip>
                    )
                }

                const options = pick({ ...defaultOptions, ...propsOptions }, Object.keys(defaultOptions))
                const defaultSettings = Object.keys(options)
                    .filter((key) => options[key])
                    .map((key) => vNodeCatalog[key])

                const customSettings = getSlotVNode(slots, props, 'settings', slotScope)

                return (
                    <Space.Compact style={{ marginInlineStart: `${sizeMS / 2}px` }}>
                        {customSettings || defaultSettings}
                    </Space.Compact>
                )
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-space`}>
                                <div class={`${prefixCls.value}-container`}>
                                    <div class={`${prefixCls.value}-title`}>{titleDom}</div>
                                    <div class={`${prefixCls.value}-actions`}>
                                        <Space size={sizeMS / 2}>{actionsDom}</Space>
                                        {propsOptions !== false && renderSettings()}
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
