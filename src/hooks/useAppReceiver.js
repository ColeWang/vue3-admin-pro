import { inject, provide } from 'vue'

const BaseKey = Symbol('AppShare')

export function createAppReceiver (instance) {
    provide(BaseKey, instance)
}

export function useAppReceiver () {
    return inject(BaseKey, {})
}
