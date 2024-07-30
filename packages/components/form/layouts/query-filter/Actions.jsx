import { defineComponent, unref } from 'vue'
import { Button, Space, theme } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { Submitter } from '../../base-form'
import { useLocaleReceiver } from '../../../locale-provider'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style/actions'
import { pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        collapsed: {
            type: Boolean,
            default: true
        },
        showCollapse: {
            type: Boolean,
            default: false
        },
        submitter: {
            type: Object,
            default: () => ({})
        },
        onSubmit: {
            type: Function,
            default: undefined
        },
        onReset: {
            type: Function,
            default: undefined
        },
        onCollapse: {
            type: Function,
            default: undefined
        }
    },
    emits: ['submit', 'reset', 'collapse'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-query-filter-actions', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { token } = theme.useToken()
        const { t } = useLocaleReceiver(['Form'])

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { collapsed, showCollapse, submitter } = props
            const { sizeMS } = unref(token)

            const collapseDom = showCollapse && (
                <Button class={`${prefixCls.value}-collapse-button`} type={'link'} onClick={onCollapse}>
                    <span>{!collapsed ? t('expand') : t('collapsed')}</span>
                    {collapsed ? <DownOutlined/> : <UpOutlined/>}
                </Button>
            )
            const submitterProps = {
                ...pick(props, Object.keys(Submitter.props)),
                ...pick(submitter, Object.keys(Submitter.props)),
                submitText: submitter.submitText || t('search')
            }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Space size={sizeMS / 2}>
                        <Submitter {...submitterProps}/>
                        {collapseDom}
                    </Space>
                </div>
            )
        }
    }
})
