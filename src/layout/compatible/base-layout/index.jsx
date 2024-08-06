import { computed, defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { useSite } from '@site'
import { getSlotVNode } from '@site/utils/props-util'
import { useConfigInject } from '@site/utils/extend'
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
        const { prefixCls } = useConfigInject('pro-base-layout', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const $site = useSite()

        const hasDrawer = computed(() => $site.screen.lt.lg)
        const siderWidth = ref(0)

        const collapsed = ref(false)

        function onCollapse (value) {
            // -- value
            collapsed.value = !unref(collapsed)
        }

        function onDrawerChange () {
            unref(hasDrawer) && onCollapse()
        }

        function styleFn (width) {
            // 缓存 width border 1px
            siderWidth.value = width
            return { width: `${width}px` }
        }

        return () => {
            const slotScope = {
                collapsed: unref(hasDrawer) ? false : unref(collapsed),
                styleFn: styleFn,
                onCollapse: onCollapse,
                onDrawerChange: onDrawerChange
            }

            const siderDom = getSlotVNode(slots, props, 'sider', slotScope)
            const headerDom = getSlotVNode(slots, props, 'header', slotScope)
            const contentDom = getSlotVNode(slots, props, 'content', slotScope)

            const needSiderDom = unref(hasDrawer) ? (
                <Drawer
                    bodyStyle={{ padding: 0 }}
                    placement={'left'}
                    closable={false}
                    width={unref(siderWidth) + 1}
                    open={!unref(collapsed)}
                    onUpdate:open={onDrawerChange}
                >
                    {siderDom}
                </Drawer>
            ) : (
                siderDom
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {needSiderDom}
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
