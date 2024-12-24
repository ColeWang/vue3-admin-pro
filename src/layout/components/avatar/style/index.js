import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proLayoutAvatarMenuMinWidth } = token
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
                minWidth: proLayoutAvatarMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

function styleFn (token) {
    const proLayoutAvatarMenuMinWidth = token.fontSize * 8

    const proLayoutAvatarToken = mergeToken(token, {
        proLayoutAvatarMenuMinWidth
    })
    return genBaseStyle(proLayoutAvatarToken)
}

export default genComponentStyleHook('ProLayoutAvatar', styleFn)
