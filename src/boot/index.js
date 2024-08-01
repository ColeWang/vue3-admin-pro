import sitePlugin from './site-plugin'
import i18n from './i18n'
import axios from './axios'
import { isFunction } from 'lodash-es'

const bootArray = [sitePlugin, i18n, axios]

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
