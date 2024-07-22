import { ref, unref, watch } from 'vue'
import tryOnScopeDispose from '@utils/hooks/tryOnScopeDispose'
import { localCache, TAGS__LOCAL } from '@/utils/storage'
import { cloneProxyToRaw } from '@utils/props-util'

function useTags (menus, options) {
    const { homeName, route, router } = options || {}

    const homeRoute = getCurrentRoute(menus, homeName)
    const cacheTags = localCache.getObj(TAGS__LOCAL)
    const tags = ref(cacheTags ? [...filterCache(menus, cacheTags)] : [homeRoute])

    const stopWatch = watch(route, (currentRoute) => {
        if (currentRoute && currentRoute.name) {
            const { query, meta, params, name } = currentRoute
            const result = unref(tags).findIndex((item) => {
                return item.name === name
            })
            if (result === -1) {
                const newValue = cloneProxyToRaw({ name, meta, query, params })
                setTagsValue([...unref(tags), newValue])
            }
        }
    }, { immediate: true, deep: true })

    function filterCache (menus, values) {
        return values.filter((item) => {
            return !!getCurrentRoute(menus, item.name)
        })
    }

    function getCurrentRoute (menus, name) {
        for (const item of menus) {
            if (item.name === name) {
                return item
            } else if (item.children && item.children.length) {
                const result = getCurrentRoute(item.children, name)
                if (result) return result
            }
        }
    }

    function setTagsValue (values) {
        tags.value = values
        localCache.setObj(TAGS__LOCAL, values)
    }

    function onTagClick (currentRoute) {
        const { name, query, params } = currentRoute
        router && router.push({ name, query, params })
    }

    function onTagClose (values, toName) {
        if (toName) {
            const result = values.find((item) => {
                return item.name === toName
            })
            const { name, query, params } = result || {}
            router && router.push({ name, query, params })
        }
        setTagsValue(values)
    }

    function onStop () {
        stopWatch && stopWatch()
    }

    tryOnScopeDispose(onStop)

    return {
        tags,
        onTagClick,
        onTagClose
    }
}

export default useTags
