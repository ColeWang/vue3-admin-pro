import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider } from '@packages'
import { createAppInstance } from '@/hooks/useAppInstance'
import useTheme from '@/hooks/useTheme'
import useLocale from '@/hooks/useLocale'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const { themeConfig, themeProvider, setThemeConfig } = useTheme()
        const { localeMessage, setLocaleMessage } = useLocale()

        function onAvatarAction (key) {
            console.log(key)
        }

        createAppInstance({
            themeConfig: themeConfig,
            setThemeConfig: setThemeConfig,
            setLocaleMessage: setLocaleMessage,
            onAvatarAction: onAvatarAction
        })

        return () => {
            const { antd, packages } = unref(localeMessage)

            return (
                <ConfigProvider locale={antd} theme={unref(themeProvider)}>
                    <LocaleProvider locale={packages}>
                        <RouterView/>
                    </LocaleProvider>
                </ConfigProvider>
            )
        }
    }
})
