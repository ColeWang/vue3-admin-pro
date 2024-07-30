import { computed, defineComponent, unref } from 'vue'
import { Breadcrumb } from 'ant-design-vue'
import useShowTitle from '../../hooks/useShowTitle'
import { useConfigInject } from '@packages/utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        router: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-breadcrumb', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const { showTitle } = useShowTitle()

        const levels = computed(() => {
            if (props.router && props.router.currentRoute) {
                return unref(props.router.currentRoute).matched.concat().filter((item) => {
                    return !!item.meta.title
                })
            } else {
                return []
            }
        })

        return () => {
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Breadcrumb>
                        {unref(levels).map((item, index) => {
                            return (
                                <Breadcrumb.Item key={item.name || index}>
                                    {showTitle && showTitle(item)}
                                </Breadcrumb.Item>
                            )
                        })}
                    </Breadcrumb>
                </div>
            )
        }
    }
})
