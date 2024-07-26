import { defineComponent } from 'vue'
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
            default: () => ({})
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        onCollapse: {
            type: Function,
            default: undefined
        }
    },
    emits: ['collapse'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-navbar', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        return () => {
            const { router, collapsed } = props

            const collapseClass = [`${prefixCls.value}-collapse-icon`, {
                [`${prefixCls.value}-collapse-icon__down`]: !!collapsed
            }]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-left`}>
                        <div class={`${prefixCls.value}-collapse`} onClick={onCollapse}>
                            <HamburgerOutlined class={collapseClass}/>
                        </div>
                        <Breadcrumb router={router}/>
                    </div>
                    <div class={`${prefixCls.value}-right`}>
                        <Fullscreen/>
                        <Language/>
                        <Avatar/>
                    </div>
                </div>
            )
        }
    }
})
