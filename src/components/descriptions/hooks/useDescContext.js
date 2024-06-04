import { inject, provide } from 'vue'

const BaseKey = Symbol('DescContext')

export function createDescContext (instance) {
    provide(BaseKey, instance)
}

export function useDescContext () {
    return inject(BaseKey, {})
}
