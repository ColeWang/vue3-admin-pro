import { hasAccess as hasRoleAccess } from '@/permission'
import { isArray } from 'lodash-es'

export function hasChild (item) {
    return !!(item.children && item.children.length !== 0)
}

export function showChildren (item) {
    return !!(item.children && item.children.length > 1)
}

export function hasAccess (route, access) {
    if (route.meta && isArray(route.meta.access)) {
        return hasRoleAccess(route.meta.access, access)
    } else {
        return true
    }
}

export function getMenuList (routers, access) {
    const result = []
    if (isArray(routers) && routers.length !== 0) {
        routers.forEach((route) => {
            const { name, meta, children } = route
            if (!meta || (meta && !meta.hideInMenu)) {
                const obj = { name, meta, icon: (meta && meta.icon) }
                if (hasChild(route) && hasAccess(route, access)) {
                    obj.children = getMenuList(children, access)
                }
                if (hasAccess(route, access)) {
                    result.push(obj)
                }
            }
        })
    }
    return result
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
