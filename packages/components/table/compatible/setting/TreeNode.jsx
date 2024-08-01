import { defineComponent, unref } from 'vue'
import { Space, theme } from 'ant-design-vue'
import {
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'
import Tooltip from './Tooltip'
import { useLocaleReceiver } from '../../../locale-provider'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style/tree-node'

export default defineComponent({
    inheritAttrs: false,
    props: {
        columnKey: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        },
        disabledSettingIcon: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        const { prefixCls } = useConfigInject('pro-table-setting-node', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        /* v8 ignore next 3 */
        function onChange (fixed) {
            emit('change', props.columnKey, fixed)
        }

        return () => {
            const { title, fixed, columnKey, disabledSettingIcon } = props
            const { sizeXXS } = unref(token)

            const iconProps = {
                columnKey: columnKey,
                onChange: onChange
            }

            const iconDom = (
                <Space size={sizeXXS}>
                    {fixed !== 'left' && (
                        <Tooltip title={t('leftPin')} fixed={'left'} {...iconProps}>
                            <VerticalAlignTopOutlined/>
                        </Tooltip>
                    )}
                    {!!fixed && (
                        <Tooltip title={t('noPin')} {...iconProps}>
                            <VerticalAlignMiddleOutlined/>
                        </Tooltip>
                    )}
                    {fixed !== 'right' && (
                        <Tooltip title={t('rightPin')} fixed={'right'} {...iconProps}>
                            <VerticalAlignBottomOutlined/>
                        </Tooltip>
                    )}
                </Space>
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]}>
                    <div class={`${prefixCls.value}-title`}>{title}</div>
                    <div class={`${prefixCls.value}-option`}>
                        <div class={`${prefixCls.value}-option-icon`}>
                            {!disabledSettingIcon && iconDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})

