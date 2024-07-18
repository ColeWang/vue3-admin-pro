import { ref, unref } from 'vue'
import { localCache, PASSWORD__LOCAL, USERNAME__LOCAL } from '@/utils/storage'
import { AesDecode, AesEncode } from './ase'

/**
 * 考虑要不要提供 aes 的加密, 以及密码的缓存？？
 */
function useRemember (options) {
    const { setState } = options

    const checked = ref(false)

    const username = localCache.get(USERNAME__LOCAL)
    const password = localCache.get(PASSWORD__LOCAL)
    if (username && password) {
        checked.value = true
        const data = {
            username: AesDecode(username),
            password: AesDecode(password)
        }
        setState && setState(data)
    }

    function setChecked (evt) {
        const { target } = evt
        checked.value = target.checked
    }

    function localRemember (state) {
        const nextUsername = AesEncode(state.username)
        const nextPassword = AesEncode(state.password)
        if (unref(checked) && nextUsername && nextPassword) {
            localCache.set(USERNAME__LOCAL, nextUsername)
            localCache.set(PASSWORD__LOCAL, nextPassword)
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
