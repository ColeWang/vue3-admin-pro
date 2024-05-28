import { createI18n } from 'vue-i18n'
import zhCN from '@/locale/zh-CN'
import enUS from '@/locale/en-US'

export default ({ app }) => {
    const i18n = createI18n({
        legacy: false,
        locale: 'zh-CN',
        messages: {
            'zh-CN': zhCN,
            'en-US': enUS
        }
    })
    app.use(i18n)
}
