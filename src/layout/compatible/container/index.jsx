import { defineComponent, KeepAlive, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { BackTop } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        include: {
            type: Array,
            default: () => ([])
        },
        maxCache: {
            type: [Number, String],
            default: 10
        },
        header: {
            type: Function,
            default: undefined
        },
        footer: {
            type: Function,
            default: undefined
        }
    },
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-container', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const spaceRef = ref(null)

        return () => {
            const { include, maxCache } = props

            const headerDom = getSlotVNode(slots, props, 'header')
            const footerDom = getSlotVNode(slots, props, 'footer')

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-space`} ref={spaceRef}>
                        <div id={'viewContainer'} class={`${prefixCls.value}-view`}>
                            {headerDom}
                            <div class={`${prefixCls.value}-view-fill`}/>
                            <div class={`${prefixCls.value}-view-content`}>
                                <RouterView>
                                    {({ Component }) => {
                                        return (
                                            <KeepAlive include={include} max={maxCache}>
                                                {Component}
                                            </KeepAlive>
                                        )
                                    }}
                                </RouterView>
                            </div>
                            <div class={`${prefixCls.value}-view-fill`}/>
                            {footerDom}
                        </div>
                        <BackTop target={() => unref(spaceRef)}/>
                    </div>
                </div>
            )
        }
    }
})
