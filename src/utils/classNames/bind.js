import { isArray, isObject, isString } from 'lodash-es'

function classNames (...args) {
    const classes = []
    for (let i = 0; i < args.length; i++) {
        const value = args[i]
        if (!value) continue
        if (isString(value)) {
            classes.push((this && this[value]) || value)
        } else if (isArray(value)) {
            const inner = classNames.apply(this, value)
            inner && classes.push(inner)
        } else if (isObject(value)) {
            Object.keys(value).forEach((key) => {
                value[key] && classes.push((this && this[key]) || key)
            })
        }
    }
    return classes.join(' ')
}

export default classNames
