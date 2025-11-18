import { isArray } from 'lodash-es'

const RoleAdmin = 'Admin'

function hasOneOf (target, access) {
    return access.some((_) => {
        return target.includes(_)
    })
}

export function hasAccess (target, access) {
    if (access && isArray(access)) {
        return hasOneOf(target, access)
    }
    return hasOneOf(target, [])
}
