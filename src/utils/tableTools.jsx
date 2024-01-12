import { isMillisecond } from '@/utils/tools'
import { formatCurrency } from '@/utils/format'
import dayjs from 'dayjs'

export function renderTableMoney (digit, divided = 100) {
    return function (text, record, index, action, column) {
        const n = parseInt(text)
        if (!isNaN(n)) return formatCurrency(n / divided, digit)
        return '0.00'
    }
}

export function renderTableTime (template = 'YYYY/MM/DD') {
    return function (text, record, index, action, column) {
        const n = parseInt(text)
        if (!isNaN(n) && n > 0) {
            if (isMillisecond(text)) return dayjs(text).format(template)
            return dayjs(text * 1000).format(template)
        }
        return undefined
    }
}
