export function replaceUrl (url) {
    return url.replace(/^(https?:\/\/)(.*)$/, 'https://$2')
}

export function getUrlParam (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    const result = window.location.search.substr(1).match(reg)
    if (result) return unescape(result[2])
    return undefined
}
