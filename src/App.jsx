import { defineComponent, unref } from 'vue'
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'ant-design-vue'
import LocaleProvider from '@/components/locale-provider'
import { useLocale } from '@/locale'
import { createAppInstance } from './useAppInstance'

export default defineComponent({
    setup () {
        const { ant, provider, setLocale } = useLocale()

        createAppInstance({
            setLocale: setLocale
        })

        return () => {
            const configProviderProps = {
                locale: unref(ant)
            }
            return (
                <ConfigProvider {...configProviderProps}>
                    <LocaleProvider locale={unref(provider)}>
                        <RouterView/>
                    </LocaleProvider>
                </ConfigProvider>
            )
        }
    }
})
