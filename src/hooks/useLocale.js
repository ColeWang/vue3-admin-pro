import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { localCache, LOCALE__LOCAL } from '@/utils/storage'

function useLocale () {
    const language = navigator.language
    const lang = (language === 'zh-CN' || language === 'en-US') ? language : false
    const localeLang = localCache.get(LOCALE__LOCAL) || lang || 'zh-CN'

    const { locale, getLocaleMessage } = useI18n()
    const message = ref({})

    function setLocale (value) {
        locale.value = value
        localCache.set(LOCALE__LOCAL, value)
        // --
        message.value = getLocaleMessage(value)
    }

    // 先执行 缓存的 locale
    setLocale(localeLang)

    return { message, setLocale }
}

export default useLocale
