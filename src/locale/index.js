import { ref, unref } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

// const language = navigator.language
// const localLang = (language === 'zh-CN' || language === 'en-US') ? language : false
// let lang = localRead('local') || localLang || 'zh-CN'

const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS
    }
})

export function useLocale () {
    const { getLocaleMessage, locale } = useI18n()

    const ant = ref({})
    const provider = ref({})

    setLocale(unref(locale))

    function setLocale (value) {
        locale.value = value
        const message = getLocaleMessage(value)
        dayjs.locale(message.dayjs)
        ant.value = message.ant
        provider.value = message.provider
    }

    return { setLocale, ant, provider }
}


export default i18n
