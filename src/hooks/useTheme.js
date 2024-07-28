import { computed, ref, unref } from 'vue'
import { theme as antTheme } from 'ant-design-vue'

function useTheme () {
    const { darkAlgorithm, compactAlgorithm } = antTheme
    const { token } = antTheme.useToken()

    // @todo 添加缓存
    const themeConfig = ref({
        theme: 'dark',
        primary: 'blue',
        compact: false
    })

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
    }

    return { themeConfig, themeProvider, setThemeConfig }
}

export default useTheme
