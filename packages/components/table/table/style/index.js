import { genComponentStyleHook } from '../../../theme'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {}
        }
    }
}

export default genComponentStyleHook('ProTable', (token) => {
    return [genBaseStyle(token)]
})
