import { computed, defineComponent, inject, provide, reactive, unref, watch } from 'vue'
import { get } from 'lodash-es'
import zhCN from '../../locale/zh-CN'

const BaseKey = Symbol('LocaleData')

export function useLocaleReceiver (path, defaultLocale, propsLocale) {
    const state = inject(BaseKey, {})

    const locale = computed(() => {
        const locale = unref(defaultLocale) || get(zhCN, (path || ['global']), {})
        const localeContext = (path && state.locale) ? get(state.locale, path, {}) : {}
        return { ...locale, ...localeContext, ...(unref(propsLocale) || {}) }
    })

    function translate (path) {
        return get(unref(locale), path, path)
    }

    return { locale, t: translate }
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        locale: {
            type: Object,
            default: () => ({})
        }
    },
    setup (props, { slots }) {
        const state = reactive({
            locale: { ...props.locale, exist: true },
            __MARK__: 'internal'
        })

        provide(BaseKey, state)

        watch(() => props.locale, (locale) => {
            state.locale = { ...locale, exist: true }
        }, { immediate: true })

        return () => {
            return slots.default && slots.default()
        }
    }
})
