import { computed, defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const router = useRouter()

        const levels = computed(() => {
            return unref(router.currentRoute).matched.concat().filter((item) => {
                return !!item.meta.title
            })
        })

        return () => {
            const breadcrumbSlots = {
                default: () => {
                    return unref(levels).map((item) => {
                        return <Breadcrumb.Item>{item.meta.title}</Breadcrumb.Item>
                    })
                }
            }

            return (
                <Breadcrumb style={{ marginLeft: '30px' }} v-slots={breadcrumbSlots}/>
            )
        }
    }
})
