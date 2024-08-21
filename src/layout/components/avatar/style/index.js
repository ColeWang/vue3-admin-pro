import { genComponentStyleHook, mergeToken } from '@site/components'

function genBaseStyle (token) {
    const { componentCls, avatarMenuMinWidth } = token
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
                minWidth: avatarMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

export default genComponentStyleHook('ProAvatar', (token) => {
    const avatarMenuMinWidth = token.fontSize * 8

    const avatarToken = mergeToken(token, {
        avatarMenuMinWidth
    })
    return [genBaseStyle(avatarToken)]
})
