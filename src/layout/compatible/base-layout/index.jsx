import { computed, defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { getSlotVNode, toPx } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import { useSite } from '@site-pro/plugins'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProBaseLayout',
    props: {
        sidebar: {
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
        const sidebarWidth = ref(0)

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
            sidebarWidth.value = width
            return { width: toPx(width) }
        }

        return () => {
            const slotProps = {
                collapsed: unref(hasDrawer) ? false : unref(collapsed),
                styleFn: styleFn,
                onCollapse: onCollapse,
                onDrawerClose: onDrawerClose
            }

            const sidebarDom = getSlotVNode(slots, props, 'sidebar', slotProps)
            const headerDom = getSlotVNode(slots, props, 'header', slotProps)
            const contentDom = getSlotVNode(slots, props, 'content', slotProps)

            const needSidebarDom = unref(hasDrawer) ? (
                <Drawer
                    bodyStyle={{ padding: 0 }}
                    placement={'left'}
                    closable={false}
                    width={unref(sidebarWidth) + 1}
                    open={!unref(collapsed)}
                    onUpdate:open={onCollapse}
                >
                    {sidebarDom}
                </Drawer>
            ) : (
                sidebarDom
            )

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {needSidebarDom}
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
