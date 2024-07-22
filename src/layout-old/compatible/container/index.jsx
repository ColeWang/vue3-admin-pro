import { defineComponent, KeepAlive, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { BackTop, Layout } from 'ant-design-vue'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        include: {
            type: Array,
            default: () => ([])
        }
    },
    setup (props) {
        const spaceRef = ref(null)

        const { prefixCls } = useConfigInject('pro-layout-container', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            const { include } = props

            return wrapSSR(
                <Layout.Content class={[prefixCls.value, hashId.value]}>
                    <div class={`${prefixCls.value}-space`} ref={spaceRef}>
                        <div id={'viewContainer'} class={`${prefixCls.value}-view`}>
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
                        </div>
                        <BackTop target={() => unref(spaceRef)}/>
                    </div>
                </Layout.Content>
            )
        }
    }
})
