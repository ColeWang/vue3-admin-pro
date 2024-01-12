export function hasOneOf (target, overall) {
    return overall.some((_) => {
        return target.indexOf(_) > -1
    })
}

export function oneOf (value, overall) {
    for (let i = 0; i < overall.length; i++) {
        if (value === overall[i]) {
            return true
        }
    }
    return false
}

export function randomNum (min, max) {
    const range = max - min
    const rand = Math.random()
    return min + Math.round(rand * range)
}

export function isMillisecond (timeStamp) {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}

export function replaceUrl (url) {
    return url.replace(/^(https?:\/\/)(.*)$/, 'https://$2')
}

export function getUrlParam (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const result = window.location.search.substr(1).match(reg)
    if (result) return unescape(result[2])
    return undefined
}
