import { defineComponent, reactive, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Card, Checkbox } from 'ant-design-vue'
import { Form, Password, Text, useSite } from '@site'
import { PasswordFilled, UserFilled } from '@/components/icon'
import { useConfigInject } from '@site/utils/extend'
import useStyle from './style'
// --
import { HOME_NAME } from '@/config'
import { setCookie, TOKEN_KEY } from '@/utils/cookie'
import Bubbly from './bubbly'
import useRemember from './useRemember'

/**
 * 登录页 在示例中不提供多语言
 *
 * 实际使用中
 * import { useI18n } from 'vue-i18n'
 * const { t } = useI18n({
 *     messages: {
 *         'en-US': {
 *             login: 'Login'
 *         },
 *         'zh-CN': {
 *             login: '登录'
 *         }
 *     }
 * })
 *
 * t('login')
 */
export default defineComponent({
    inheritAttrs: false,
    setup (props, { attrs }) {
        const { prefixCls } = useConfigInject('pro-login', props)
        const [wrapSSR, hashId] = useStyle(prefixCls)
        const $site = useSite()

        const router = useRouter()
        const route = useRoute()

        const loading = ref(false)
        const errorType = ref(undefined)

        const model = reactive({
            username: '',
            password: ''
        })

        const { checked, setChecked, localRemember } = useRemember({
            setState: (state) => {
                model.username = state.username
                model.password = state.password
            }
        })

        function onFinish () {
            console.log('onFinish', model)
            errorType.value = undefined
            loading.value = true
            setTimeout(() => {
                setCookie(TOKEN_KEY, 'token')
                const { redirect } = route.query || {}
                localRemember(model)
                const name = redirect && String(redirect)
                router.push({ name: name || HOME_NAME })
            }, 1000)
        }

        return () => {
            const cardClass = [`${prefixCls.value}-form`, {
                [`${prefixCls.value}-form-center`]: $site.screen.lt.lg
            }]

            return wrapSSR(
                <div class={[prefixCls.value, hashId.value]} {...attrs}>
                    <Bubbly/>
                    <Card class={cardClass} title={'欢迎登陆'} bordered={false}>
                        <Form model={model} onFinish={onFinish}>
                            <Text
                                name={'username'}
                                placeholder={'请输入账号'}
                                fieldProps={{ allowClear: false }}
                                formItemProps={{ rules: { required: true, message: '账号不能为空' } }}
                                v-slots={{ addonBefore: () => <UserFilled/> }}
                            />
                            <Password
                                name={'password'}
                                placeholder={'请输入密码'}
                                fieldProps={{ allowClear: false }}
                                formItemProps={{ rules: { required: true, message: '密码不能为空' } }}
                                v-slots={{ addonBefore: () => <PasswordFilled/> }}
                            />
                            <div class={`${prefixCls.value}-checkbox-warp`}>
                                <Checkbox checked={unref(checked)} onChange={setChecked}>
                                    记住账号
                                </Checkbox>
                                <a href={'javaScript: void 0'}>
                                    忘记密码
                                </a>
                            </div>
                            <Form.Item
                                class={`${prefixCls.value}-form-item-error`}
                                validateStatus={'error'}
                                help={unref(errorType)}
                            >
                                <Button type={'primary'} html-type={'submit'} block={true} loading={unref(loading)}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            )
        }
    }
})
