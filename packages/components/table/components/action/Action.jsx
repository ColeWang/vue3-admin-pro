import { defineComponent } from 'vue'
import { preventDefault } from '../../../../utils/event'
import { useConfigInject } from '../../../../utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        onClick: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-table-action', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function onClick (evt) {
            preventDefault(evt)
            emit('click', evt)
        }

        return () => {
            const actionClass = [prefixCls.value, hashId.value, {
                [`${prefixCls.value}-default`]: props.type === 'default',
                [`${prefixCls.value}-primary`]: props.type === 'primary',
                [`${prefixCls.value}-warning`]: props.type === 'warning',
                [`${prefixCls.value}-error`]: props.type === 'error'
            }]

            const actionProps = { ...attrs, onClick: onClick }
            return wrapSSR(
                <a class={actionClass} {...actionProps}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})
