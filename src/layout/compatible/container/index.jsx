import { defineComponent, KeepAlive, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { BackTop } from 'ant-design-vue'
import { getPropsSlot } from '@utils/props-util'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        include: {
            type: Array,
            default: () => ([])
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
        const spaceRef = ref(null)

        const { prefixCls } = useConfigInject('pro-layout-container', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { include } = props

            const headerDom = getPropsSlot(slots, props, 'header')
            const footerDom = getPropsSlot(slots, props, 'footer')

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
                                            <KeepAlive max={10} include={include}>
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
