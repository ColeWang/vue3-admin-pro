import { computed, defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { getSlotVNode } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { useSite } from '@site-pro/plugins'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProBaseLayout',
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

        function onCollapse () {
            // -- value
            collapsed.value = !unref(collapsed)
        }

        function onDrawerClose () {
            // unref(hasDrawer) && onCollapse()
            unref(hasDrawer) && (collapsed.value = true)
        }

        function styleFn (width) {
            // 缓存 width border 1px
            siderWidth.value = width
            return { width: `${width}px` }
        }

        return () => {
            const slotProps = {
                collapsed: unref(hasDrawer) ? false : unref(collapsed),
                styleFn: styleFn,
                onCollapse: onCollapse,
                onDrawerClose: onDrawerClose
            }

            const siderDom = getSlotVNode(slots, props, 'sider', slotProps)
            const headerDom = getSlotVNode(slots, props, 'header', slotProps)
            const contentDom = getSlotVNode(slots, props, 'content', slotProps)

            const needSiderDom = unref(hasDrawer) ? (
                <Drawer
                    bodyStyle={{ padding: 0 }}
                    placement={'left'}
                    closable={false}
                    width={unref(siderWidth) + 1}
                    open={!unref(collapsed)}
                    onUpdate:open={onCollapse}
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
