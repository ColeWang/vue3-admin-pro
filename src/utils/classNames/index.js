import { isArray, isObject, isString } from 'lodash-es'

function classNames (...args) {
    const classes = []
    for (let i = 0; i < args.length; i++) {
        const value = args[i]
        if (!value) continue
        if (isString(value)) {
            classes.push(value)
        } else if (isArray(value)) {
            const inner = classNames.apply(null, value)
            inner && classes.push(inner)
        } else if (isObject(value)) {
            Object.keys(value).forEach((key) => {
                value[key] && classes.push(key)
            })
        }
    }
    return classes.join(' ')
}

export default classNames
