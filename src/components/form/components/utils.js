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

export function fieldStyle (style, fieldWidth) {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize = isNumber(fieldWidth) ? unit(fieldWidth) : unit(sizeEnum[fieldWidth])
    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || unit(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}
