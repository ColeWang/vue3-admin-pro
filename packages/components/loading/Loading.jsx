import { defineComponent, Transition } from 'vue'
import { Spin } from 'ant-design-vue'
import { useConfigInject } from '../../utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-loading', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition>
                        <div class={`${prefixCls.value}-mask`}/>
                    </Transition>
                    <Transition>
                        <div class={`${prefixCls.value}-wrap`}>
                            <Spin/>
                        </div>
                    </Transition>
                </div>
            )
        }
    }
})
