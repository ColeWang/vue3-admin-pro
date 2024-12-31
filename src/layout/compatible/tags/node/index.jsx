import { defineComponent, withModifiers } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { preventDefault } from '@site-pro/utils'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProLayoutTagsNode',
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
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <div class={`${prefixCls.value}-content`} onClick={onClick}>
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
                </div>
            )
        }
    }
})
