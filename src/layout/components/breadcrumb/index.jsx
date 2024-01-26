import { computed, defineComponent, unref } from 'vue'
import { Breadcrumb } from 'ant-design-vue'
import useShowTitle from '../../hooks/useShowTitle'

export default defineComponent({
    inheritAttrs: false,
    props: {
        router: {
            type: Object,
            default: undefined
        }
    },
    setup (props) {
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
            const breadcrumbSlots = {
                default: () => {
                    return unref(levels).map((item) => {
                        return (
                            <Breadcrumb.Item>
                                {showTitle(item)}
                            </Breadcrumb.Item>
                        )
                    })
                }
            }

            return (
                <Breadcrumb style={{ marginLeft: '30px' }} v-slots={breadcrumbSlots}/>
            )
        }
    }
})
