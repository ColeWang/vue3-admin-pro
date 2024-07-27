import { defineComponent, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider } from '@packages'
import { createAppInstance } from './useAppInstance'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const localeMessage = ref({})
        const customTheme = ref({})

        function setCustomTheme (value) {
            customTheme.value = value
        }

        function setLocaleMessage (value) {
            localeMessage.value = value
        }

        function onAvatarAction (key) {
            console.log(key)
        }

        createAppInstance({
            setCustomTheme: setCustomTheme,
            setLocaleMessage: setLocaleMessage,
            onAvatarAction: onAvatarAction
        })

        return () => {
            const { antd, packages } = unref(localeMessage)

            return (
                <ConfigProvider locale={antd} theme={unref(customTheme)}>
                    <LocaleProvider locale={packages}>
                        <RouterView/>
                    </LocaleProvider>
                </ConfigProvider>
            )
        }
    }
})
