import { computed, defineComponent, ref, unref } from 'vue'
import { Drawer } from 'ant-design-vue'
import { useSite } from '@site'
import { getPropsSlot, getSlot } from '@site/utils/props-util'
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

        const collapsed = ref(false)
        const siderWidth = ref(0)

        const open = computed(() => !collapsed.value)

        function onCollapse () {
            collapsed.value = !unref(collapsed)
        }

        function styleFn (width) {
            // 缓存 width
            siderWidth.value = width + 1
            return { width: `${width}px` }
        }

        return () => {
            const siderSlot = getSlot(slots, props, 'sider')
            const headerSlot = getSlot(slots, props, 'header')

            const renderSider = () => {
                if ($site.screen.lt.lg) {
                    const drawerProps = {
                        bodyStyle: { padding: 0 },
                        placement: 'left',
                        closable: false,
                        width: unref(siderWidth),
                        open: unref(open),
                        ['onUpdate:open']: onCollapse
                    }
                    return (
                        <Drawer {...drawerProps}>
                            {() => siderSlot({ collapsed: false, styleFn })}
                        </Drawer>
                    )
                }
                return siderSlot({ collapsed: unref(collapsed) })
            }

            const renderHeader = () => {
                if ($site.screen.lt.lg) {
                    return headerSlot({ collapsed: false, onCollapse })
                }
                return headerSlot({ collapsed: unref(collapsed), onCollapse })
            }

            const contentDom = getPropsSlot(slots, props, 'content')

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    {siderSlot && renderSider()}
                    <div class={`${prefixCls.value}-prime`}>
                        {headerSlot && renderHeader()}
                        <div class={`${prefixCls.value}-content`}>
                            {contentDom}
                        </div>
                    </div>
                </div>
            )
        }
    }
})
