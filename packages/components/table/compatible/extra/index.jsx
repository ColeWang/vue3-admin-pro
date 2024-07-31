import { defineComponent, ref } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { getElement } from '../../../../utils/dom'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-extra', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const popupContainer = ref(null)

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <ConfigProvider getPopupContainer={getElement.bind(null, popupContainer)}>
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
