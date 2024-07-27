import { defineComponent, withModifiers } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { preventDefault } from '@utils/event'
import { useConfigInject } from '@utils/extend'
import useStyle from './style/node'

export default defineComponent({
    inheritAttrs: false,
    props: {
        closable: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: 'default' // primary
        },
        onClick: {
            type: Function,
            default: undefined
        },
        onClose: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click', 'close'],
    setup (props, { emit, slots, attrs }) {
        const { prefixCls } = useConfigInject('pro-layout-tags-node', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        function onClick (evt) {
            emit('click', evt)
        }

        function onClose (evt) {
            preventDefault(evt, true)
            emit('close', evt)
        }

        return () => {
            const { closable, color } = props

            const dotInnerClass = [`${prefixCls.value}-dot-inner`, {
                [`${prefixCls.value}-dot-inner-primary`]: color === 'primary'
            }]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} onClick={onClick} {...attrs}>
                    <span class={dotInnerClass}/>
                    <span class={`${prefixCls.value}-text`}>
                        {slots.default && slots.default()}
                    </span>
                    {closable && (
                        <span class={`${prefixCls.value}-close`} onClick={withModifiers(onClose, ['stop'])}>
                            <CloseOutlined/>
                        </span>
                    )}
                </div>
            )
        }
    }
})
