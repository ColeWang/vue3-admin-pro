import { defineComponent } from 'vue'
import { Space, Button } from 'ant-design-vue'
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue'
import { useLocaleReceiver } from '@/components/locale-provider'
import Submitter from '../components/Submitter'
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
        }
    },
    emits: ['collapse'],
    setup (props, { emit, attrs }) {
        const { t } = useLocaleReceiver('Form')

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { collapseRender, collapsed, ...restProps } = props

            const collapseDom = collapseRender && (
                <Button class={cx('collapse-button')} type={'link'} onClick={onCollapse}>
                    <span>{!collapsed ? t('expand') : t('collapsed')}</span>
                    {collapsed ? <DownOutlined/> : <UpOutlined/>}
                </Button>
            )
            return (
                <Space size={10}>
                    <Submitter {...attrs} {...restProps}/>
                    {collapseDom}
                </Space>
            )
        }
    }
})
