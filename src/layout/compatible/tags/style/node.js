import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, tagPadding, tagCloseFontSize } = token
    return {
        [componentCls]: {
            height: token.controlHeight,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${token.colorBorder}`,
            borderRadius: token.borderRadiusSM,
            paddingInline: tagPadding,
            transition: 'all 0.2s',
            cursor: 'pointer',
            background: token.colorBgContainer,
            [`${componentCls}-text`]: {
                fontSize: token.fontSizeSM,
                lineHeight: token.lineHeightSM,
                color: token.colorText
            },
            [`${componentCls}-dot-inner`]: {
                width: token.fontSizeSM,
                height: token.fontSizeSM,
                borderRadius: '50%',
                marginInlineEnd: tagPadding,
                background: token.colorFill,
                transition: 'all 0.2s',
                [`&-primary`]: {
                    background: token.colorPrimary,
                }
            },
            [`${componentCls}-close`]: {
                width: token.fontSize,
                height: token.fontSize,
                fontSize: tagCloseFontSize,
                color: token.colorText,
                lineHeight: `${token.fontSize}px`,
                textAlign: 'center',
                marginInlineStart: token.sizeXXS,
                cursor: 'pointer',
                [`&:hover`]: {
                    color: token.colorError
                },
                [`&:active`]: {
                    color: token.colorErrorActive
                }
            }
        }
    }
}

export default genComponentStyleHook('ProLayoutTagsNode', (token) => {
    const tagPadding = token.sizeMS / 2
    const tagCloseFontSize = 10

    const tagToken = mergeToken(token, {
        tagPadding,
        tagCloseFontSize
    })
    return [genBaseStyle(tagToken)]
})
