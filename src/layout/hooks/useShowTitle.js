import { getCurrentInstance } from 'vue'

function useShowTitle () {
    /**
     * 判断有没有安装 i18n
     * 即使不使用 i18n ,也不用修改这部分代码了
     */
    const { appContext } = getCurrentInstance()
    const { globalProperties } = appContext ? appContext.config : {}

    function showTitle (route) {
        const { $t, $te } = globalProperties || {}
        const { title } = route.meta || {}
        if (title && $t && $te) {
            const key = 'routes.' + route.name
            return $te(key) ? $t(key) : title
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
