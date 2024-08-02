import { defineComponent, ref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import Breadcrumb from '../../components/breadcrumb'
import Settings from '../../components/settings'
import Fullscreen from '../../components/fullscreen'
import Language from '../../components/language'
import Avatar from '../../components/avatar'
import { HamburgerOutlined } from '@/components/icon'
import { useSite } from '@site'
import { getElement } from '@site//utils/dom'
import { useConfigInject } from '@site/utils/extend'
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
        const $site = useSite()

        const popupContainer = ref(null)

        function onCollapse () {
            emit('collapse')
        }

        return () => {
            const { router, collapsed } = props

            const collapseClass = [`${prefixCls.value}-collapse-icon`, {
                [`${prefixCls.value}-collapse-icon__down`]: !!collapsed
            }]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-content`}>
                                <div class={`${prefixCls.value}-left`}>
                                    <div class={`${prefixCls.value}-collapse`} onClick={onCollapse}>
                                        <HamburgerOutlined class={collapseClass}/>
                                    </div>
                                    {$site.screen.gt.xs ? (
                                        <Breadcrumb router={router}/>
                                    ) : null}
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
