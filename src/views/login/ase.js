import AES from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

// 密钥
const KEY = 'D4ZX47FC4QWE12AS'

// 加密方法
export function AesEncode (word) {
    try {
        const cipher = AES.encrypt(word, KEY)
        return cipher.toString()
    } catch (err) {
        console.warn('AES Error: encode error')
        return undefined
    }
}

// 解密方法
export function AesDecode (ciphertext) {
    try {
        const bytes = AES.decrypt(ciphertext, KEY)
        return bytes.toString(encUtf8)
    } catch (err) {
        console.warn('AES Error: decode error')
        return undefined
    }
}
