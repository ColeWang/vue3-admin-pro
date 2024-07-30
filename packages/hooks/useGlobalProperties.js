import { getCurrentInstance } from 'vue'

function useGlobalProperties () {
    const instance = getCurrentInstance()
    if (!instance) {
        throw new Error(`no instance found`)
    }
    return instance.appContext.config.globalProperties
}

export default useGlobalProperties
