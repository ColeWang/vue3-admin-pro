import { genComponentStyleHook } from '../../../utils/extend.js'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${antCls}-form`]: {}
        }
    }
}

export default genComponentStyleHook('ProLoading', (token) => {
    return [genBaseStyle(token)]
})

