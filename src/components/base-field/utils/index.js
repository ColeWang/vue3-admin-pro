import dayjs from 'dayjs'

export function formatDate (text, format) {
    if (!text) return text
    if (typeof format === 'function') {
        return format(dayjs(text))
    } else {
        return dayjs(text).format(format || 'YYYY-MM-DD')
    }
}