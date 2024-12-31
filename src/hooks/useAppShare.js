import { inject, provide } from 'vue'

const BaseKey = Symbol('AppShare')

export function createAppShare (instance) {
    provide(BaseKey, instance)
}

function useAppShare () {
    return inject(BaseKey, {})
}

export default useAppShare
