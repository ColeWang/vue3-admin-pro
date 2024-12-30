import { inject, provide } from 'vue'

const BaseKey = Symbol('App')

export function createAppShare (instance) {
    provide(BaseKey, instance)
}

function useAppShare () {
    return inject(BaseKey, {})
}

export default useAppShare
