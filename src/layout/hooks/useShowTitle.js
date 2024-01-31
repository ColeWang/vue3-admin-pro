import { unref } from 'vue'
import { useI18n } from 'vue-i18n'

function useShowTitle () {
    const { locale, getLocaleMessage } = useI18n()

    function showTitle (route) {
        const { title } = route.meta || {}
        const { routes } = getLocaleMessage(unref(locale))
        // 对应 i18n routes
        if (title && routes[route.name]) {
            return routes[route.name]
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
