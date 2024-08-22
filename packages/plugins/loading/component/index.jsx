import { defineComponent, Transition } from 'vue'
import { Spin } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { useConfigInject } from '@site-pro/hooks'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        onAfterClose: {
            type: Function,
            default: undefined
        }
    },
    emits: ['afterClose'],
    setup (props, { emit, attrs }) {
        const { prefixCls } = useConfigInject('pro-loading', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        // @todo body overflow: 'hidden' preventScroll

        function onAfterLeave () {
            emit('afterClose')
        }

        return () => {
            const { visible } = props

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Transition appear={true} name={`${prefixCls.value}-mask-fade`} onAfterLeave={onAfterLeave}>
                        <div v-show={visible} class={`${prefixCls.value}-mask`}>
                            <div class={`${prefixCls.value}-spin`}>
                                <Spin v-slots={{
                                    indicator: () => <LoadingOutlined/>
                                }}/>
                            </div>
                        </div>
                    </Transition>
                </div>
            )
        }
    }
})
