import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { localCache, LOCALE__LOCAL } from '@/utils/storage'

function useLocale () {
    const language = navigator.language
    const lang = (language === 'zh-CN' || language === 'en-US') ? language : false
    const localeLang = localCache.get(LOCALE__LOCAL) || lang || 'zh-CN'

    const { locale, getLocaleMessage } = useI18n()
    const localeMessage = ref({})

    // 先执行 缓存的 locale
    setLocaleMessage(localeLang)

    function setLocaleMessage (value) {
        locale.value = value
        localCache.set(LOCALE__LOCAL, value)
        const message = getLocaleMessage(value)
        dayjs.locale(message.dayjs)
        localeMessage.value = message
    }

    return { localeMessage, setLocaleMessage }
}

export default useLocale
