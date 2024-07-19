import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            marginBlockEnd: token.margin,
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {}
        }
    }
}

export default genComponentStyleHook('ProTableExtra', (token) => {
    return [genBaseStyle(token)]
})
