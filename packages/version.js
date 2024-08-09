import { gt, head, lt, split, zipWith } from 'lodash-es'

const version = __SITE_VERSION__ || '0.3.0'

function parse (version) {
    return split(version, '.', 3).map(Number)
}

function compare (v1, v2, operation) {
    const result = zipWith(parse(v1), parse(v2), (a, b) => {
        return (gt(a, b) && 1) || (lt(a, b) && -1) || 0
    }).filter((value) => value !== 0)
    return operation(head(result) || 0)
}

export {
    version,
    compare
}
