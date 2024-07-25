import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, languageMenuMinWidth } = token
    return {
        [componentCls]: {
            position: 'relative',
            height: '100%',
            [`${componentCls}-content`]: {
                height: '100%',
                fontSize: token.fontSizeLG,
                color: token.colorText,
                lineHeight: token.lineHeightLG,
                paddingInline: token.fontSizeSM,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                [`&:hover`]: {
                    color: token.colorPrimaryHover,
                    background: token.colorFillQuaternary
                },
                [`&:active`]: {
                    color: token.colorPrimaryActive,
                    background: token.colorFillQuaternary
                }
            },
            [`${componentCls}-menu`]: {
                minWidth: languageMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

export default genComponentStyleHook('ProLanguage', (token) => {
    const languageMenuMinWidth = token.fontSize * 8

    const languageToken = mergeToken(token, {
        languageMenuMinWidth
    })
    return [genBaseStyle(languageToken)]
})
