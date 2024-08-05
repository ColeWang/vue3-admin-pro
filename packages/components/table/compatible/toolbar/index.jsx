import { defineComponent, ref, unref } from 'vue'
import { Button, ConfigProvider, Dropdown, Popover, Space, Tooltip } from 'ant-design-vue'
import {
    ColumnHeightOutlined,
    ReloadOutlined,
    SettingOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons-vue'
import { ResizeObserver } from '../../../resize-observer'
import Density from '../density'
import Setting from '../setting'
import useSpanConfig from '../../../form/layouts/query-filter/hooks/useSpanConfig'
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
        getSpanConfig: {
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
        const { t } = useLocaleReceiver(['Table', 'toolbar'])
        const { requestProps = {}, onReload } = useSharedContext()

        const popupContainer = ref(null)

        const size = ref({ width: 0, height: 0 })

        const { span } = useSpanConfig(size, props)

        function onResize (value) {
            size.value = value
        }

        function onExportClick () {
            emit('export')
        }

        return () => {
            const { options: propsOptions } = props

            const slotScope = {
                wordWrap: unref(span) === 24,
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
                    <Space.Compact>{customSettings || defaultSettings}</Space.Compact>
                )
            }

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ResizeObserver onResize={onResize}>
                        <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                            <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                                <div class={[`${prefixCls.value}-container`, {
                                    [`${prefixCls.value}-container__word-wrap`]: unref(span) === 24
                                }]}>
                                    {titleDom || actionsDom ? (
                                        <div class={`${prefixCls.value}-header`}>
                                            <div class={`${prefixCls.value}-title`}>
                                                {titleDom}
                                            </div>
                                            <div class={`${prefixCls.value}-actions`}>
                                                {actionsDom}
                                            </div>
                                        </div>
                                    ) : (
                                        <div/>
                                    )}
                                    <div class={`${prefixCls.value}-settings`}>
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
