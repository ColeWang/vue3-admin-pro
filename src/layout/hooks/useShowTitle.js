import { useI18n } from 'vue-i18n'

function useShowTitle () {
    const { t, te } = useI18n()

    function showTitle (route) {
        const { title } = route.meta || {}
        const hasKey = te(route.name)
        if (title && hasKey) {
            return t(route.name)
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
