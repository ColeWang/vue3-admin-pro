import dayjs from 'dayjs'
import { isEmpty } from '@/utils'
import { isFunction } from 'lodash-es'

export function formatDate (text, format) {
    // 可设置时区
    if (isEmpty(text)) return text
    if (isFunction(format)) return format(dayjs(text))
    return dayjs(text).format(format || 'YYYY-MM-DD')
}
