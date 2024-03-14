import axios from 'axios'
import { Modal } from 'ant-design-vue'
import Loading from '@/components/loading'
import { removeToken } from '@/utils/auth'
// import { isDev } from '@/config'

// function genBaseUrl (href) {
//     const url = href + ''
//     const regExp = /^(.*)(\/admin\/)(.*)$/
//     return url.replace(regExp, '$1') + (isDev ? '/admin/api' : '/admin')
// }

function onExpireToken () {
    removeToken()
    Modal.error({
        title: 'Error',
        content: '登录过期，请重新登录!',
        onOk: () => {
            // const origin = location.origin
            // window.location.href = `${origin}/admin/`
        }
    })
}

const instance = axios.create({
    // baseURL: genBaseUrl(location.href),
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    validateStatus (status) {
        return status >= 200 && status < 300
    }
})

instance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((res) => {
    if (res && res.data && res.data.er === -1) {
        onExpireToken()
        Loading.destroy()
        return new Promise(() => ({}))
    }
    if (res && res.data && res.data.er !== 0) {
        const error = new Error(res.data.message || 'Error')
        error.er = res.data.er
        return Promise.reject(error)
    }
    return res
}, (err) => {
    const data = err.response && err.response.data
    if (data && (data.message || data.code)) {
        err.message = data.message
        err.code = data.code
    }
    return Promise.reject(err)
})

export default instance
