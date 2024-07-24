import { defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import useMediaQuery from '@utils/hooks/useMediaQuery'
import { getPropsSlot } from '@utils/props-util'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        sider: {
            type: Function,
            default: undefined
        },
        header: {
            type: Function,
            default: undefined
        },
        content: {
            type: Function,
            default: undefined
        }
    },
    setup (props, { slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { screen } = useMediaQuery()

        const collapsed = ref(false)

        function onCollapse (value) {
            collapsed.value = value
        }

        return () => {
            const slotScope = {
                collapsed: unref(collapsed),
                onCollapse: onCollapse
            }

            const siderDom = getPropsSlot(slots, props, 'sider', slotScope)
            const headerDom = getPropsSlot(slots, props, 'header', slotScope)
            const contentDom = getPropsSlot(slots, props, 'content')

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {siderDom}
                    <div class={`${prefixCls.value}-prime`}>
                        {headerDom}
                        <div class={`${prefixCls.value}-content`}>
                            {contentDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
