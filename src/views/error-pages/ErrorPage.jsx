import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Result } from 'ant-design-vue'
import { useConfigInject, useGlobalProperties } from '@site-pro/hooks'
import useStyle from './style'
import { HOME_NAME } from '@/config'

export default defineComponent({
    inheritAttrs: false,
    name: 'ProErrorPage',
    props: { ...Result.props },
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-error-page', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const { $t } = useGlobalProperties()

        const $router = useRouter()

        function onBackHome () {
            $router.replace({ name: HOME_NAME })
        }

        return () => {
            const resultSlots = {
                extra: () => {
                    return (
                        <Button type={'primary'} onClick={onBackHome}>
                            {$t ? $t('errorPages.backHome') : '返回首页'}
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
