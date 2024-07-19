import { defineComponent, ref, unref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useConfigInject } from '../../../_utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots, attrs }) {
        const popupContainer = ref(null)

        const { prefixCls } = useConfigInject('pro-table-extra', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function getPopupContainer () {
            const plain = unref(popupContainer)
            return plain ? (plain.$el || plain) : plain
        }

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getPopupContainer}>
                        <div class={`${prefixCls.value}-popup-container`} ref={popupContainer}>
                            <div class={`${prefixCls.value}-container`}>
                                {slots.default && slots.default()}
                            </div>
                        </div>
                    </ConfigProvider>
                </div>
            )
        }
    }
})
