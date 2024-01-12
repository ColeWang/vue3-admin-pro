import { isArray } from 'lodash-es'
import { hasAccess as hasRoleAccess } from '@/permission'

export function hasChild (item) {
    return !!(item.children && item.children.length !== 0)
}

export function hasAccess (route, access) {
    if (route.meta && isArray(route.meta.access)) {
        return hasRoleAccess(route.meta.access, access)
    } else {
        return true
    }
}

export function getMenuList (routers, access) {
    const arr = []
    routers.forEach((item) => {
        if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
            const obj = {
                icon: (item.meta && item.meta.icon),
                name: item.name,
                meta: item.meta
            }
            if (hasChild(item) && hasAccess(item, access)) {
                obj.children = getMenuList(item.children, access)
            }
            if (hasAccess(item, access)) {
                arr.push(obj)
            }
        }
    })
    return arr
}

export function canTurnTo (name, routes, access) {
    function loopJudge (list) {
        return list.some((item) => {
            if (hasChild(item) && hasAccess(item, access)) {
                return loopJudge(item.children)
            } else if (item.name === name) {
                return hasAccess(item, access)
            }
        })
    }

    return loopJudge(routes)
}
