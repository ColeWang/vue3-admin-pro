class GalleryCache {
    cache = null

    constructor (target) {
        this.cache = target
    }

    set (key, value) {
        if (key && value) {
            try {
                this.cache.setItem(key, value)
            } catch (e) {
                console.warn('Exceeding the available storage space')
            }
        }
    }

    setObj (key, value) {
        if (key && value) {
            try {
                this.cache.setItem(key, JSON.stringify(value))
            } catch (e) {
                console.warn('Exceeding the available storage space')
            }
        }
    }

    get (key) {
        if (key) {
            return this.cache.getItem(key) || undefined
        }
        return undefined
    }

    getObj (key) {
        if (key) {
            let value = undefined
            try {
                value = JSON.parse(this.cache.getItem(key) || 'null')
            } catch (e) {
                console.warn('Error JSON.parse()')
            }
            return value === null ? undefined : value
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

// 用户账号
export const USERNAME__LOCAL = 'username'
export const PASSWORD__LOCAL = 'password'
