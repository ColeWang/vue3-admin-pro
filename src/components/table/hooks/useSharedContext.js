import { inject, provide } from 'vue'

const BaseKey = Symbol('TableContext')

export function createSharedContext (instance) {
    provide(BaseKey, instance)
}

export function useSharedContext () {
    return inject(BaseKey, {})
}
