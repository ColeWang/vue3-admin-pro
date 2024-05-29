import { getCurrentInstance } from 'vue'
import { isFunction } from 'lodash-es'

function useShowTitle () {
    /**
     * 判断有没有安装 i18n
     * 即使不使用 i18n ,也不用修改这部分代码了
     */
    const { appContext } = getCurrentInstance()
    const { globalProperties } = appContext ? appContext.config : {}
    const { $t, $te } = globalProperties || {}

    const prefix = 'routes.'

    function showTitle (route) {
        const { title } = route.meta || {}
        if (isFunction($t) && isFunction($te) && route.name) {
            const key = prefix + route.name
            return $te(key) ? $t(key) : (title || route.name)
        }
        return title || route.name
    }

    return { showTitle }
}

export default useShowTitle
