import { isArray, isNumber, reduce, toString } from 'lodash-es'

const sizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export function toPx (value) {
    if (value && isNumber(value)) {
        return `${value}px`
    }
    return undefined
}

export function fieldStyle (style, fieldWidth) {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize = isNumber(fieldWidth) ? toPx(fieldWidth) : toPx(sizeEnum[fieldWidth])
    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || toPx(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}

export function genFormItemFixStyle (labelWidth, layout) {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: {
                flex: `0 0 ${labelWidth}px`,
            },
            wrapperCol: {
                style: {
                    maxWidth: `calc(100% - ${labelWidth}px)`,
                }
            },
            style: {
                flexWrap: 'nowrap'
            }
        }
    }
    return undefined
}

export function namePathToString (namePath) {
    if (namePath && isArray(namePath)) {
        const pathString = reduce(namePath, (total, value, index) => {
            const result = isNumber(value) && index > 0 ? `[${value}]` : `.${value}`
            return total + result
        }, '')
        return pathString.replace(/^\./, '')
    }
    return toString(namePath)
}

