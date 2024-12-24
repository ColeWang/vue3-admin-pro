import sitePlugin from './site-plugin'
import i18n from './i18n'
import axios from './axios'

const bootArray = [sitePlugin, i18n, axios]

export default async (...args) => {
    for (const bootChunk of bootArray) {
        if (bootChunk && typeof bootChunk === 'function') {
            try {
                await bootChunk(...args)
            } catch (err) {
                console.error('boot error:', err)
            }
        }
    }
}
