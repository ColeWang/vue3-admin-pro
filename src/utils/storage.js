import { isEmpty } from '@site/utils/is'

class GalleryCache {
    cache = null

    constructor (target) {
        this.cache = target
    }

    set (key, value) {
        try {
            this.cache.setItem(key, value)
        } catch (err) {
            console.warn(err.message)
        }
    }

    setObj (key, value) {
        try {
            const nextValue = JSON.stringify(value)
            this.cache.setItem(key, nextValue)
        } catch (err) {
            console.warn(err.message)
        }
    }

    get (key) {
        try {
            const value = this.cache.getItem(key)
            return !isEmpty(value) ? value : undefined
        } catch (err) {
            console.warn(err.message)
        }
        return undefined
    }

    getObj (key) {
        try {
            const value = this.cache.getItem(key)
            const nextValue = JSON.parse(value || 'null')
            return !isEmpty(nextValue) ? nextValue : undefined
        } catch (err) {
            console.warn(err.message)
        }
        return undefined
    }

    remove (key) {
        key && this.cache.removeItem(key)
    }

    clear () {
        this.cache.clear()
    }
}

export const localCache = new GalleryCache(localStorage)
export const sessionCache = new GalleryCache(sessionStorage)

export const TAGS__LOCAL = 'tags'
export const LOCALE__LOCAL = 'locale'
export const THEME__LOCAL = 'theme'

// 用户账号
export const USERNAME__LOCAL = 'username'
export const PASSWORD__LOCAL = 'password'
