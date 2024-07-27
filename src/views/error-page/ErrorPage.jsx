import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Result } from 'ant-design-vue'
import { HOME_NAME } from '@/config'
import { useConfigInject } from '@utils/extend'
import useStyle from './style'

export default defineComponent({
    inheritAttrs: false,
    props: { ...Result.props },
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-error-page', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)

        const router = useRouter()

        function onBackHome () {
            router.replace({ name: HOME_NAME })
        }

        return () => {
            const resultSlots = {
                extra: () => {
                    return (
                        <Button type={'primary'} onClick={onBackHome}>
                            Back Home
                        </Button>
                    )
                }
            }
            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Result {...props} v-slots={resultSlots}/>
                </div>
            )
        }
    }
})
