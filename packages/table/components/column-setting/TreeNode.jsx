import { defineComponent } from 'vue'
import { Space } from 'ant-design-vue'
import {
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined
} from '@ant-design/icons-vue'
import Tooltip from './Tooltip'
import { useLocaleReceiver } from '../../../locale-provider'
import classNames from '../../../_utils/classNames/bind'
import styles from './style/tree.module.scss'

const cx = classNames.bind(styles)

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
        const { t } = useLocaleReceiver(['Table', 'toolbar'])

        /* v8 ignore next 3 */
        function onChange (fixed) {
            emit('change', props.columnKey, fixed)
        }

        return () => {
            const { title, fixed, columnKey } = props

            const iconProps = {
                columnKey: columnKey,
                onChange: onChange
            }

            const iconDom = (
                <Space size={4}>
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

            return (
                <div class={cx('tree-node')}>
                    <div class={cx('tree-node-title')}>{title}</div>
                    <div class={cx('tree-node-option')}>
                        {!attrs.disabled && iconDom}
                    </div>
                </div>
            )
        }
    }
})

