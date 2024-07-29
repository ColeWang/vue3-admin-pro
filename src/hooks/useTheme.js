import { computed, ref, unref } from 'vue'
import { theme as antTheme } from 'ant-design-vue'
import { localCache, THEME__LOCAL } from '@/utils/storage'

const defaultValues = {
    theme: 'dark',
    primary: 'blue',
    compact: false
}

function useTheme () {
    const themeCache = localCache.getObj(THEME__LOCAL)
    const { darkAlgorithm, compactAlgorithm } = antTheme
    const { token } = antTheme.useToken()

    const themeConfig = ref(themeCache || defaultValues)

    const themeProvider = computed(() => {
        const { theme, primary, compact } = unref(themeConfig)
        const algorithm = [
            theme === 'real-dark' ? darkAlgorithm : null,
            compact ? compactAlgorithm : null
        ]
        return {
            algorithm: algorithm.filter((value) => !!value),
            token: { colorPrimary: unref(token)[primary] }
        }
    })

    function setThemeConfig (value) {
        themeConfig.value = value
        localCache.setObj(THEME__LOCAL, value)
    }

    return { themeConfig, themeProvider, setThemeConfig }
}

export default useTheme
