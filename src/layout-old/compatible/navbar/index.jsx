import { defineComponent } from 'vue'
import { Layout } from 'ant-design-vue'
import Breadcrumb from '../../components/breadcrumb'
import Fullscreen from '../../components/fullscreen'
import Avatar from '../../components/avatar'
import Language from '../../components/language'
import { HamburgerOutlined } from '@/components/icon'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        router: {
            type: Object,
            default: undefined
        },
        collapsed: {
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
        const { prefixCls } = useConfigInject('pro-layout-navbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function handleCollapseClick () {
            emit('change', !props.collapsed)
        }

        return () => {
            const { router, collapsed } = props

            const collapseClass = [`${prefixCls.value}-collapse-icon`, {
                [`${prefixCls.value}-collapse-icon__down`]: !!collapsed
            }]

            return wrapSSR(
                <Layout.Header class={[prefixCls.value, hashId.value]}>
                    <div class={`${prefixCls.value}-left`}>
                        <div class={`${prefixCls.value}-collapse`} onClick={handleCollapseClick}>
                            <HamburgerOutlined class={collapseClass}/>
                        </div>
                        <Breadcrumb router={router}/>
                    </div>
                    <div class={`${prefixCls.value}-right`}>
                        <Fullscreen/>
                        <Language/>
                        <Avatar/>
                    </div>
                </Layout.Header>
            )
        }
    }
})
