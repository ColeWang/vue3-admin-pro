import { defineComponent, unref } from 'vue'
import { Space, theme } from 'ant-design-vue'
import Tooltip from './Tooltip'
import { useLocaleReceiver } from '../../../locale-provider'
import { useConfigInject } from '../../../_utils/extend'
import useStyle from './style/tree-node'
import {
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'

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
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-column-setting-tree-node', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        /* v8 ignore next 3 */
        function onChange (fixed) {
            emit('change', props.columnKey, fixed)
        }

        return () => {
            const { title, fixed, columnKey } = props
            const { marginXXS } = unref(token)

            const iconProps = {
                columnKey: columnKey,
                onChange: onChange
            }

            const iconDom = (
                <Space size={marginXXS}>
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
                            {!attrs.disabled && iconDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})

