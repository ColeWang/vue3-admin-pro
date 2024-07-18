import { defineComponent } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '../../../locale-provider'
import { Submitter } from '../../base-form'
import { pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        prefixCls: {
            type: String,
            default: undefined
        },
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
        const { t } = useLocaleReceiver(['Form'])

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { prefixCls, collapsed, showCollapse, submitter } = props

            const collapseDom = showCollapse && (
                <Button class={`${prefixCls}-collapse-button`} type={'link'} onClick={onCollapse}>
                    <span>{!collapsed ? t('expand') : t('collapsed')}</span>
                    {collapsed ? <DownOutlined/> : <UpOutlined/>}
                </Button>
            )
            const submitterProps = {
                ...pick(props, Object.keys(Submitter.props)),
                ...pick(submitter, Object.keys(Submitter.props)),
                submitText: submitter.submitText || t('search')
            }
            return (
                <Space size={10} {...attrs}>
                    <Submitter {...submitterProps}/>
                    {collapseDom}
                </Space>
            )
        }
    }
})
