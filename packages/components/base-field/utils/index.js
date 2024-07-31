import { isEmpty } from '../../../utils/is'
import { isFunction } from 'lodash-es'
import dayjs from 'dayjs'

export function formatDate (text, format) {
    // 可设置时区
    if (isEmpty(text)) return text
    if (isFunction(format)) return format(dayjs(text))
    return dayjs(text).format(format || 'YYYY-MM-DD')
}
