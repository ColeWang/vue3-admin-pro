import { isNumber } from 'lodash-es'

const sizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export function unit (value) {
    if (value && isNumber(value)) {
        return `${value}px`
    }
    return undefined
}

export function fieldStyles (style, fieldWidth) {
    const { maxWidth, minWidth, width, ...restStyles } = style || {}
    const fieldSize = isNumber(fieldWidth) ? unit(fieldWidth) : unit(sizeEnum[fieldWidth])
    return {
        ...restStyles,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || unit(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}
