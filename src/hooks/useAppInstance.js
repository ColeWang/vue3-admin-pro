import { inject, provide } from 'vue'

const BaseKey = Symbol('App')

export function createAppInstance (instance) {
    provide(BaseKey, instance)
}

export function useAppInstance () {
    return inject(BaseKey, {})
}