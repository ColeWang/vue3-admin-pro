import axios from './axios'
import i18n from './i18n'

const boots = [axios, i18n]

export default async (...args) => {
    for (let i = 0; i < boots.length; i++) {
        try {
            typeof boots[i] === 'function' && await boots[i](...args)
        } catch (err) {
            console.error('boot error:', err)
        }
    }
}
