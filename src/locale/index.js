import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'

export function localRead () {

}

export function localSave () {

}

// const language = navigator.language
// const localLang = (language === 'zh-CN' || language === 'en-US') ? language : false
// let lang = localLang || localRead('local') || 'zh-CN'

const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages: {
        'zh-CN': zhCN,
        'en-US': enUS
    }
})

export default i18n
