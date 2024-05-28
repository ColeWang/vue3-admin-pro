import axios from 'axios'

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
    return res
}, (err) => {
    // const data = err.response && err.response.data
    // if (data && (data.message || data.code)) {
    //     err.message = data.message
    //     err.code = data.code
    // }
    return Promise.reject(err)
})

export default instance
