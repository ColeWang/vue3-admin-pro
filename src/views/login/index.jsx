import { defineComponent, onMounted, onUnmounted, reactive, ref, unref } from 'vue'
import { Button, Checkbox, Form, Input } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import UserFilled from '@/icons/UserFilled'
import PasswordFilled from '@/icons/PasswordFilled'
import { localCache, PASSWORD__LOCAL, USERNAME__LOCAL } from '@/common/storage'
import { AesDecode, AesEncode } from '@/common/ase'
// import { HOME_NAME } from '@/config'
import bubbly from './bubbly'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'
import BACKGROUND from './images/background.svg'

const cx = classNames.bind(styles)

const wrapperCol = {
    span: 24
}

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
        const router = useRouter()

        const checked = ref(false)
        const loading = ref(false)

        const loginForm = reactive({
            username: '',
            password: ''
        })

        const errorType = ref(undefined)

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

        onMounted(() => {
            loadImage(BACKGROUND).then((image) => {
                destroy = bubbly(unref(canvasRef), image)
            })
            // 账号信息
            const username = localCache.get(USERNAME__LOCAL)
            const password = localCache.get(PASSWORD__LOCAL)
            if (username && password) {
                loginForm.username = AesDecode(username)
                loginForm.password = AesDecode(password)
                checked.value = true
            }
        })

        onUnmounted(() => {
            destroy && destroy()
            destroy = null
        })

        function onRecall (checked) {
            if (checked) {
                const username = localCache.get(USERNAME__LOCAL)
                const password = localCache.get(PASSWORD__LOCAL)
                const nextUsername = AesEncode(loginForm.username)
                const nextPassword = AesEncode(loginForm.password)
                if (username !== nextUsername && password !== nextPassword) {
                    localCache.set(USERNAME__LOCAL, nextUsername)
                    localCache.set(PASSWORD__LOCAL, nextPassword)
                }
            } else {
                localCache.remove(USERNAME__LOCAL)
                localCache.remove(PASSWORD__LOCAL)
            }
        }

        function onSubmit () {
            errorType.value = undefined
            const data = {
                phone: Number(loginForm.username),
                passwd: loginForm.password
            }
            loading.value = true
            // requestLogin(data)
            //     .then((res) => {
            //         onRecall(unref(checked))
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
            return (
                <div class={cx('login')}>
                    <div class={cx('login-bg')}>
                        <canvas class={cx('login-bg__canvas')} ref={canvasRef}/>
                    </div>
                    <div class={cx('login-form')}>
                        <div class={cx('title')}>
                            <div class={cx('title__text')}>欢迎登陆</div>
                        </div>
                        <div class={cx('form-wrap')}>
                            <Form model={loginForm} rules={rules} onFinish={onSubmit}>
                                <Form.Item name="username" wrapperCol={wrapperCol}>
                                    <Input
                                        placeholder="请输入账号"
                                        v-model:value={loginForm.username}
                                        v-slots={{ addonBefore: () => <UserFilled/> }}
                                    />
                                </Form.Item>
                                <Form.Item name="password" wrapperCol={wrapperCol}>
                                    <Input.Password
                                        placeholder="请输入密码"
                                        v-model:value={loginForm.password}
                                        v-slots={{ addonBefore: () => <PasswordFilled/> }}
                                    />
                                </Form.Item>
                                <div class={cx('checked-wrap')}>
                                    <Checkbox v-model:checked={checked.value}>记住账号</Checkbox>
                                    <a href="javaScript: void 0">忘记密码</a>
                                </div>
                                <Form.Item wrapperCol={wrapperCol} validateStatus="error" help={unref(errorType)}>
                                    <Button type="primary" html-type="submit" block={true} loading={unref(loading)}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
    }
})
