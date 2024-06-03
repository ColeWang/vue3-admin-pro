import { defineComponent, onUnmounted, reactive, ref, unref } from 'vue'
import { Button, Card, Checkbox } from 'ant-design-vue'
import { Form, Password, Text } from '@/components/form'
import { PasswordFilled, UserFilled } from '@/components/icon'
import { useRoute, useRouter } from 'vue-router'
import { HOME_NAME } from '@/config'
import useRemember from './useRemember'
import bubbly from './bubbly'
import { setCookie, TOKEN_KEY } from '@/utils/cookie'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'
import BACKGROUND from './images/background.svg'

const cx = classNames.bind(styles)

let destroy = null

function loadImage (src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (err) => {
            reject(err)
        }
    })
}

export default defineComponent({
    setup () {
        const canvasRef = ref(null)
        const formRef = ref(null)

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

        const rules = {
            username: [{
                required: true,
                message: '账号不能为空'
            }],
            password: [{
                required: true,
                message: '密码不能为空'
            }]
        }

        loadImage(BACKGROUND).then((image) => {
            destroy = bubbly(unref(canvasRef), image)
        })

        onUnmounted(() => {
            destroy && destroy()
            destroy = null
        })

        function onSubmit () {
            const context = unref(formRef)
            if (context && context.getFormInstance) {
                const formInstance = context.getFormInstance()
                formInstance && formInstance.submit()
            }
        }

        function onFinish () {
            errorType.value = undefined
            const data = {
                phone: Number(model.username),
                passwd: model.password
            }
            loading.value = true
            setTimeout(() => {
                setCookie(TOKEN_KEY, 'token')
                const { redirect } = route.query || {}
                localRemember(model)
                const name = redirect && String(redirect)
                router.push({ name: name || HOME_NAME })
            }, 1000)
            // requestLogin(data)
            //     .then((res) => {
            //         localRemember(model)
            //         router.push({ name: HOME_NAME })
            //     })
            //     .catch((err) => {
            //         errorType.value = err.message || '登录失败'
            //     })
            //     .finally(() => {
            //         loading.value = false
            //     })
        }

        return () => {
            const cardProps = {
                title: '欢迎登陆',
                bordered: false,
                bodyStyle: {
                    padding: '16px'
                }
            }

            return (
                <div class={cx('login')}>
                    <div class={cx('login-bg')}>
                        <canvas class={cx('login-bg__canvas')} ref={canvasRef}/>
                    </div>
                    <Card class={cx('login-form')} {...cardProps}>
                        <Form model={model} rules={rules} onFinish={onFinish} ref={formRef}>
                            <Text
                                name={'username'}
                                placeholder={'请输入账号'}
                                fieldProps={{ allowClear: false }}
                                v-slots={{ addonBefore: () => <UserFilled/> }}
                            />
                            <Password
                                name={'password'}
                                placeholder={'请输入密码'}
                                fieldProps={{ allowClear: false }}
                                v-slots={{ addonBefore: () => <PasswordFilled/> }}
                            />
                            <div class={cx('checked-wrap')}>
                                <Checkbox checked={unref(checked)} onChange={setChecked}>
                                    记住账号
                                </Checkbox>
                                <a href={'javaScript: void 0'}>忘记密码</a>
                            </div>
                            <Form.Item class={cx('login-form__error')} validateStatus={'error'} help={unref(errorType)}>
                                <Button type={'primary'} block={true} loading={unref(loading)} onClick={onSubmit}>
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
