import { defineComponent } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import { Submitter } from '../../base-form'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/actions.module.scss'

const cx = classNames.bind(styles)

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
        const { t } = useLocaleReceiver(['Form'])

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { collapsed, showCollapse, submitter } = props

            const collapseDom = showCollapse && (
                <Button class={cx('collapse-button')} type={'link'} onClick={onCollapse}>
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
