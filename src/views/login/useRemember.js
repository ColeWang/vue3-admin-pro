import { ref, unref } from 'vue'
import { localCache, PASSWORD__LOCAL, USERNAME__LOCAL } from '@/utils/storage'
import { AesDecode, AesEncode } from '@/common/ase'

function useRemember (options) {
    const { setState } = options

    const checked = ref(false)

    const username = localCache.get(USERNAME__LOCAL)
    const password = localCache.get(PASSWORD__LOCAL)
    if (username && password) {
        checked.value = true
        setState({
            username: AesDecode(username),
            password: AesDecode(password)
        })
    }

    function setChecked (evt) {
        const { target } = evt
        checked.value = target.checked
    }

    function localRemember (state) {
        if (unref(checked)) {
            const username = localCache.get(USERNAME__LOCAL)
            const password = localCache.get(PASSWORD__LOCAL)
            const nextUsername = AesEncode(state.username)
            const nextPassword = AesEncode(state.password)
            if (username !== nextUsername && password !== nextPassword) {
                localCache.set(USERNAME__LOCAL, nextUsername)
                localCache.set(PASSWORD__LOCAL, nextPassword)
            }
        } else {
            localCache.remove(USERNAME__LOCAL)
            localCache.remove(PASSWORD__LOCAL)
        }
    }

    return {
        checked,
        setChecked,
        localRemember
    }
}

export default useRemember
