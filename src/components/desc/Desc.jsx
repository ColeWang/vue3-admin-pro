import { computed, defineComponent } from 'vue'
import { Descriptions } from 'ant-design-vue'
import { createDescContext } from './hooks/useDescContext'
import { pick } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Descriptions.props,
        model: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { attrs, slots }) {
        const sModel = computed(() => props.model)

        createDescContext({ model: sModel })

        return () => {
            const needProps = {
                ...attrs,
                ...pick(props, Object.keys(Descriptions.props))
            }
            return (
                <Descriptions {...needProps} v-slots={slots}/>
            )
        }
    }
})
