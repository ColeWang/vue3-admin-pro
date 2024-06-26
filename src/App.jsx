import { defineComponent, ref, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import LocaleProvider from '@/packages/locale-provider'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { createAppInstance } from './useAppInstance'

export default defineComponent({
    setup () {
        const { locale, getLocaleMessage } = useI18n()

        const localeMessage = ref({})

        function setLocale (value) {
            if (locale && getLocaleMessage) {
                const message = getLocaleMessage(value)
                locale.value = value
                localeMessage.value = message
                dayjs.locale(message.dayjs)
            }
        }

        function onLogout () {
            console.log('退出登录')
        }

        createAppInstance({
            setLocale: setLocale,
            onLogout: onLogout
        })

        return () => {
            const { antd, comps } = unref(localeMessage)

            return (
                <ConfigProvider locale={antd}>
                    <LocaleProvider locale={comps}>
                        <RouterView/>
                    </LocaleProvider>
                </ConfigProvider>
            )
        }
    }
})
