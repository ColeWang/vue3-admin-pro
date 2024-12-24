import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls } = token
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
            }
        }
    }
}

function styleFn (token) {
    const proLayoutFullscreenToken = mergeToken(token, {})
    return genBaseStyle(proLayoutFullscreenToken)
}

export default genComponentStyleHook('ProLayoutFullscreen', styleFn)
