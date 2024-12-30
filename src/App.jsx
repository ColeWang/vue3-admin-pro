import { defineComponent, unref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import { LocaleProvider, ThemeProvider } from '@site-pro/components'
import { createAppShare } from '@/hooks/useAppShare'
import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import dayjs from 'dayjs'

export default defineComponent({
    inheritAttrs: false,
    setup () {
        const { message, setLocale } = useLocale()
        const { theme, setTheme } = useTheme()

        watch(message, (value) => {
            value.dayjs && dayjs.locale(value.dayjs)
        }, { immediate: true })

        function onAvatarAction (key) {
            console.log(key)
        }

        createAppShare({
            theme: theme,
            setTheme: setTheme,
            setLocale: setLocale,
            onAvatarAction: onAvatarAction
        })

        return () => {
            const { antd, site } = unref(message)

            return (
                <ThemeProvider {...unref(theme)}>
                    <LocaleProvider locale={site}>
                        <ConfigProvider locale={antd}>
                            <RouterView/>
                        </ConfigProvider>
                    </LocaleProvider>
                </ThemeProvider>
            )
        }
    }
})
