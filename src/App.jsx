import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider } from '@site-pro/components'
import { createAppInstance, useLocaleMessage, useThemeConfig } from '@/hooks'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const { localeMessage, setLocaleMessage } = useLocaleMessage()
        const { themeConfig, themeProvider, setThemeConfig } = useThemeConfig()

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
            const { antd, site } = unref(localeMessage)

            return (
                <ConfigProvider locale={antd} theme={unref(themeProvider)}>
                    <LocaleProvider locale={site}>
                        <RouterView/>
                    </LocaleProvider>
                </ConfigProvider>
            )
        }
    }
})
