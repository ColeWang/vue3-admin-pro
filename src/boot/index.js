import plugins from './plugins'
import i18n from './i18n'
import axios from './axios'
import { isFunction } from 'lodash-es'

const bootArray = [plugins, i18n, axios]

export default async (...args) => {
    for (const bootChunk of bootArray) {
        if (bootChunk && isFunction(bootChunk)) {
            try {
                await bootChunk(...args)
            } catch (err) {
                console.error('boot error:', err)
            }
        }
    }
}
