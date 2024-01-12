/**
 * 货币加分位符 支持负数
 * @param {string|number} result - 需要转换的货币金额
 * @param {number} digit - 保留小数点后几位 默认两位
 * @returns {string}
 */
export function formatCurrency (result, digit = 2) {
    result = result + ''
    result = result.replace(/[^-0-9.]/g, '')
    result = parseFloat(result)
    if (isNaN(result)) {
        if (digit < 1) {
            return '0'
        }
        let zero = '0.'
        for (let i = 0; i < digit; i++) {
            zero = zero + '0'
        }
        return zero
    }
    const sign = result < 0 ? '-' : ''
    // 取绝对值
    result = Math.abs(result)
    // 取整
    const integer = parseInt(String(result)) + ''
    const firstComma = integer.length > 3 ? integer.length % 3 : 0
    result = result.toFixed(digit)
    const first = sign + (firstComma ? integer.substr(0, firstComma) + ',' : '')
    const middle = integer.substr(firstComma).replace(/(\d{3})(?=\d)/g, '$1' + ',')
    if (digit < 1) {
        return first + middle
    }
    return first + middle + '.' + result.slice(-(digit))
}

/**
 * 金额输入限制
 * @param {string} result
 * @return {string|*}
 */
export function limitFloat (result) {
    if (result === '0' || result === '') return result
    // 去除开头的 0
    result = result.replace(/^0+/, '')
    if (result === '') return '0'
    // 开头 . 补 0
    if (result.indexOf('.') === 0) {
        result = '0' + result
    }
    // 限制一个 .
    result = result.replace(/\.{2,}/g, '.')
    result = result.replace('.', '$#$')
    result = result.replace(/\./g, '')
    result = result.replace('$#$', '.')
    // 保留两位小数
    result = result.replace(/(\d+)\.(\d\d).*$/, '$1.$2')
    return result
}

