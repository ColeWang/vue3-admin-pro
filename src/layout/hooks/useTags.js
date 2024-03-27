import { ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tryOnScopeDispose from '@/utils/hooks/tryOnScopeDispose'
import { localCache, TAGS__LOCAL } from '@/utils/storage'
import { cloneProxyToRaw } from '@/utils/props-util'

function useTags (menus, homeName) {
    const router = useRouter()
    const route = useRoute()

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
                setTagsValue([...unref(tags), cloneProxyToRaw({ name, meta, query, params })])
            }
        }
    }, { immediate: true, deep: true })

    function filterCache (menus, values) {
        return values.filter((item) => {
            return !!getCurrentRoute(menus, item.name)
        })
    }

    function getCurrentRoute (menus, name) {
        for (let item of menus) {
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

    function onTagClick (route) {
        const { name, query, params } = route
        router.push({ name, query, params })
    }

    function onTagClose (values, toName) {
        setTagsValue(values)
        if (toName) {
            const result = values.find((item) => {
                return item.name === toName
            })
            const { name, query, params } = result || {}
            router.push({ name, query, params })
        }
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
