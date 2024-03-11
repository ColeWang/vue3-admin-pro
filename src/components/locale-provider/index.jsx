import { computed, defineComponent, inject, provide, reactive, unref, watch } from 'vue'
import defaultLocaleData from './lang/zh-CN'

const BaseKey = Symbol('LocaleData')

export function useLocaleReceiver (name, defaultLocale, propsLocale) {
    const state = inject(BaseKey, {})

    const locale = computed(() => {
        const locale = unref(defaultLocale) || getValue(defaultLocaleData, name || 'global', {})
        const localeContext = (name && state.locale) ? getValue(state.locale, name, {}) : {}
        return {
            ...(locale || {}),
            ...localeContext,
            ...(unref(propsLocale) || {})
        }
    })

    function getValue (value, field = '', defaultValue) {
        const fields = field.split('.')
        const result = fields.reduce((pre, curr) => {
            return pre ? pre[curr] : null
        }, value)
        return result || defaultValue
    }

    function translate (path) {
        const result = getValue(unref(locale), path)
        return result || path
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
