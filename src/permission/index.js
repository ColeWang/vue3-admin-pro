import { isArray } from 'lodash-es'
import { hasOneOf } from '@/utils/tools'

const RoleAdmin = 'Admin'

export function hasAccess (target, access) {
    if (access && isArray(access)) {
        return hasOneOf(target, access)
    }
    return hasOneOf(target, [])
}
