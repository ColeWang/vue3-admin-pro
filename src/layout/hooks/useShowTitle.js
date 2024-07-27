import useGlobalProperties from '@utils/hooks/useGlobalProperties'

function useShowTitle () {
    const { $t, $te } = useGlobalProperties()

    const prefix = 'routes.'

    function showTitle (route) {
        const { title } = route.meta || {}
        if ($t && $te && route.name) {
            const key = prefix + route.name
            return $te(key) ? $t(key) : (title || route.name)
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
