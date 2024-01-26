import { inject, provide } from 'vue'

const BaseKey = Symbol('BaseForm')

export function createFromInstance (instance) {
    provide(BaseKey, instance)
}

export function useFormInstance () {
    return inject(BaseKey, {})
}