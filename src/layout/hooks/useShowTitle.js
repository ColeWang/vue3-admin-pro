import { useI18n } from 'vue-i18n'

function useShowTitle () {
    const { t, te } = useI18n()

    function showTitle (route) {
        const { title } = route.meta || {}
        // 对应 i18n
        const path = `routes.${route.name}`
        const hasKey = te(path)
        if (title && hasKey) {
            return t(path)
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
