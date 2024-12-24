import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proLayoutLanguageMenuMinWidth } = token
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
                minWidth: proLayoutLanguageMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

function styleFn (token) {
    const proLayoutLanguageMenuMinWidth = token.fontSize * 8

    const proLayoutLanguageToken = mergeToken(token, {
        proLayoutLanguageMenuMinWidth
    })
    return genBaseStyle(proLayoutLanguageToken)
}

export default genComponentStyleHook('ProLayoutLanguage', styleFn)
