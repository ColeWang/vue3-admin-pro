import dayjs from 'dayjs'
import { isEmpty } from '@/utils'

export function formatDate (text, format) {
    // 可设置时区
    if (isEmpty(text)) return text
    if (typeof format === 'function') {
        return format(dayjs(text))
    } else {
        return dayjs(text).format(format || 'YYYY-MM-DD')
    }
}
