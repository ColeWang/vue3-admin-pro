import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import Breadcrumb from '../../components/breadcrumb'
import Settings from '../../components/settings'
import Fullscreen from '../../components/fullscreen'
import Language from '../../components/language'
import Avatar from '../../components/avatar'
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

        const popupContainer = ref(null)

        function onCollapse () {
            emit('collapse', !props.collapsed)
        }

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            const { router, collapsed } = props

            const collapseClass = [`${prefixCls.value}-collapse-icon`, {
                [`${prefixCls.value}-collapse-icon__down`]: !!collapsed
            }]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-content`}>
                                <div class={`${prefixCls.value}-left`}>
                                    <div class={`${prefixCls.value}-collapse`} onClick={onCollapse}>
                                        <HamburgerOutlined class={collapseClass}/>
                                    </div>
                                    <Breadcrumb router={router}/>
                                </div>
                                <div class={`${prefixCls.value}-right`}>
                                    <Settings/>
                                    <Fullscreen/>
                                    <Language/>
                                    <Avatar/>
                                </div>
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
