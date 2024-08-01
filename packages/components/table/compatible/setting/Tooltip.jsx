import { defineComponent } from 'vue'
import { Tooltip } from 'ant-design-vue'
import { preventDefault } from '../../../../utils/event'

export default defineComponent({
    inheritAttrs: false,
    props: {
        columnKey: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: undefined
        },
        fixed: {
            type: String,
            default: undefined
        },
        onChange: {
            type: Function,
            default: undefined
        }
    },
    emits: ['change'],
    setup (props, { emit, slots }) {
        /* v8 ignore next 4 */
        function onClick (evt) {
            preventDefault(evt, true)
            emit('change', props.fixed)
        }

        return () => {
            const { title } = props

            return (
                <Tooltip title={title}>
                    <span onClick={onClick}>
                        {slots.default && slots.default()}
                    </span>
                </Tooltip>
            )
        }
    }
})

