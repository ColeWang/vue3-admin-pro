import { defineComponent } from 'vue'
import { Button, Space } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import { Submitter } from '../base-form'
import { pick } from 'lodash-es'
import classNames from '@/utils/classNames/bind'
import styles from './style/actions.module.scss'

const cx = classNames.bind(styles)

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Submitter.props,
        collapseRender: {
            type: Boolean,
            default: false
        },
        collapsed: {
            type: Boolean,
            default: true
        },
        onCollapse: {
            type: Function,
            default: undefined
        }
    },
    emits: ['collapse'],
    setup (props, { emit, attrs }) {
        const { t } = useLocaleReceiver('Form')

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { collapseRender, collapsed } = props

            const collapseDom = collapseRender && (
                <Button class={cx('collapse-button')} type={'link'} onClick={onCollapse}>
                    <span>{!collapsed ? t('expand') : t('collapsed')}</span>
                    {collapsed ? <DownOutlined/> : <UpOutlined/>}
                </Button>
            )
            const submitterProps = {
                ...attrs,
                ...pick(props, Object.keys(Submitter.props))
            }
            return (
                <Space size={10}>
                    <Submitter {...submitterProps}/>
                    {collapseDom}
                </Space>
            )
        }
    }
})
