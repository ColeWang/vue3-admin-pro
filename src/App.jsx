import { defineComponent, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider } from '@packages'
import { createAppInstance } from './useAppInstance'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        /**
         * 实际开发中，可能不需要【多语言、定制主题】等。为方便删除相关逻辑、以及理解数据流向。没有在这里初始化，可能会导致一些问题。
         * 例如非 Layout 组件内没有多语言、定制主题等。
         *
         * 如有需要，请把初始化相关逻辑迁移到 App.jsx
         * src/layout/components/language/index.jsx
         * src/layout/components/settings/ThemeSettings.jsx
         */
        const localeMessage = ref({})

        const theme = ref('dark')
        const themeProvider = ref({})

        function setConfigTheme (name, value) {
            theme.value = name
            themeProvider.value = value
        }

        function setLocaleMessage (value) {
            localeMessage.value = value
        }

        function onAvatarAction (key) {
            console.log(key)
        }

        createAppInstance({
            theme: theme,
            setConfigTheme: setConfigTheme,
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
