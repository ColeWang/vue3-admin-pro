import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider } from '@site'
import { createAppInstance } from '@/hooks/useAppInstance'
import useLocaleMessage from '@/hooks/useLocaleMessage'
import useThemeConfig from '@/hooks/useThemeConfig'

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
