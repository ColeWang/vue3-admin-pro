import { ref } from 'vue'
import { localCache, THEME__LOCAL } from '@/utils/storage'

function useTheme () {
    const themeCache = localCache.getObj(THEME__LOCAL)

    const theme = ref(themeCache || {
        sideDark: true
    })

    function setTheme (value) {
        theme.value = value
        localCache.setObj(THEME__LOCAL, value)
    }

    return { theme, setTheme }
}

export default useTheme
