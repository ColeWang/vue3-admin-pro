import { defineComponent, ref, unref } from 'vue'
import { Button, ConfigProvider, Dropdown, Popover, Space, theme, Tooltip } from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import { ResizeObserver } from '../../../resize-observer'
import Density from '../density'
import Setting from '../setting'
import { useSharedContext } from '../../hooks/useSharedContext'
import { useLocaleReceiver } from '../../../locale-provider'
import { getSlotVNode } from '../../../../utils/props-util'
import { getElement } from '../../../../utils/dom'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'
import { pick, toPlainObject } from 'lodash-es'

const defaultOptions = {
    reload: true,
    export: false,
    density: true,
    setting: true
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        // 换行宽度 556 form/layouts/query-filter/hooks/useQueryFilter.js
        wrapWidth: {
            type: Number,
            default: 556
        },
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
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-toolbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {}, onReload } = useSharedContext()

        const popupContainer = ref(null)

        const size = ref({ width: 0, height: 0 })

        function onResize (value) {
            size.value = value
        }

        function onExportClick () {
            emit('export')
        }

        return () => {
            const { wrapWidth, options: propsOptions } = props
            const { width: targetWidth } = unref(size)
            const { sizeMS } = unref(token)

            const slotScope = {
                nowrap: targetWidth >= wrapWidth,
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

                const options = pick({ ...defaultOptions, ...toPlainObject(propsOptions) }, Object.keys(defaultOptions))
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

            const containerClass = [`${prefixCls.value}-container`, {
                [`${prefixCls.value}-container__nowrap`]: targetWidth >= wrapWidth
            }]
            const titleClass = [`${prefixCls.value}-title`, {
                [`${prefixCls.value}-title__nowrap`]: targetWidth >= wrapWidth
            }]
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={containerClass}>
                                    {titleDom ? (
                                        <div class={titleClass}>
                                            {titleDom}
                                        </div>
                                    ) : (
                                        <div/>
                                    )}
                                    <div class={`${prefixCls.value}-actions`}>
                                        {actionsDom}
                                        {propsOptions !== false && renderSettings()}
                                    </div>
                                </div>
                            </div>
                        </ConfigProvider>
                    </ResizeObserver>
                </div>
            )
        }
    }
})
