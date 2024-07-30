import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, extraMarginBottom } = token
    return {
        [componentCls]: {
            marginBlockEnd: extraMarginBottom,
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {}
        }
    }
}

export default genComponentStyleHook('ProTableExtra', (token) => {
    const extraMarginBottom = token.sizeMS

    const extraToken = mergeToken(token, {
        extraMarginBottom
    })
    return [genBaseStyle(extraToken)]
})
