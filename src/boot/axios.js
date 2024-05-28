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
    return Promise.reject(err)
})

function boot () {
    return instance
}

export default boot
