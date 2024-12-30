import { ref, watch } from 'vue'
import { tryOnScopeDispose } from '@site-pro/hooks'
import { useSite } from '@site-pro/plugins'
import { localCache, THEME__LOCAL } from '@/utils/storage'

function useTheme () {
    const themeCache = localCache.getObj(THEME__LOCAL)
    const $site = useSite()

    const theme = ref(themeCache || {
        sideDark: true,
        dark: false,
        compact: false,
        token: { colorPrimary: '#1677ff' }
    })

    const stopWatchScreen = watch(() => $site.screen, (value) => {
        // 监听屏幕小于 768 时开启紧凑模式
        theme.value.compact = value.lt.md
    }, { immediate: true, deep: true })

    function setTheme (value) {
        theme.value = value
        localCache.setObj(THEME__LOCAL, value)
    }

    tryOnScopeDispose(() => {
        stopWatchScreen && stopWatchScreen()
    })

    return { theme, setTheme }
}

export default useTheme
