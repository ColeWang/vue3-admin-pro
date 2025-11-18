import { defineComponent, unref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { LocaleProvider, ConfigProvider } from '@site-pro/components'
import { pick } from 'lodash-es'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// --- hooks
import { createAppReceiver } from '@/hooks/useAppReceiver'
import { useLocaleReceiver } from '@/hooks/useLocaleReceiver'
import { useThemeReceiver } from '@/hooks/useThemeReceiver'

dayjs.extend(utc)
dayjs.extend(timezone)

console.log('time zone:', dayjs.tz.guess())
console.log('time:', dayjs().format('YYYY-MM-DD HH:mm:ss'))

export default defineComponent({
    inheritAttrs: false,
    name: 'ProApp',
    setup () {
        const { message, setMessage } = useLocaleReceiver()
        const { theme, setTheme } = useThemeReceiver()

        watch(message, (value) => {
            value.dayjs && dayjs.locale(value.dayjs)
        }, { immediate: true })

        function onAvatarAction (key) {
            console.log(key)
        }

        createAppReceiver({
            theme: theme,
            setTheme: setTheme,
            setMessage: setMessage,
            onAvatarAction: onAvatarAction
        })

        return () => {
            const { antd, site } = unref(message)

            const configProps = {
                ...pick(unref(theme), Object.keys(ConfigProvider.props)),
                locale: antd
            }

            return (
                <LocaleProvider locale={site}>
                    <ConfigProvider {...configProps}>
                        <RouterView/>
                    </ConfigProvider>
                </LocaleProvider>
            )
        }
    }
})
