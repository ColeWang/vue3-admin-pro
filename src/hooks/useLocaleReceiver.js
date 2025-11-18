import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE__LOCAL } from '@/config/symbols'
import { localCache } from '@/utils/storage'

export function useLocaleReceiver () {
    const language = navigator.language
    const lang = (language === 'zh-CN' || language === 'en-US') ? language : false
    const localeLang = localCache.get(LOCALE__LOCAL) || lang || 'zh-CN'

    const { locale, getLocaleMessage } = useI18n()

    const message = ref({})

    function setMessage (value) {
        locale.value = value
        localCache.set(LOCALE__LOCAL, value)
        // --
        message.value = getLocaleMessage(value)
    }

    // 先执行 缓存的 locale
    setMessage(localeLang)

    return { message, setMessage }
}
