import axios from './axios'
import i18n from './i18n'
import { isFunction } from 'lodash-es'

const bootArray = [axios, i18n]

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
