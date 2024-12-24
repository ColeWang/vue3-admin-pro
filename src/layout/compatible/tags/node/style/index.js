import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proLayoutTagsNodePadding, proLayoutTagsNodeCloseFontSize } = token
    return {
        [componentCls]: {
            position: 'relative',
            display: 'inline-block',
            [`${componentCls}-content`]: {
                height: token.controlHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${token.colorBorder}`,
                borderRadius: token.borderRadiusSM,
                paddingInline: proLayoutTagsNodePadding,
                transition: 'all 0.2s',
                cursor: 'pointer',
                background: token.colorBgContainer,
                overflow: 'hidden',
                [`${componentCls}-text`]: {
                    fontSize: token.fontSizeSM,
                    lineHeight: token.lineHeightSM,
                    color: token.colorText
                },
                [`${componentCls}-dot-inner`]: {
                    width: token.fontSizeSM,
                    height: token.fontSizeSM,
                    borderRadius: '50%',
                    marginInlineEnd: proLayoutTagsNodePadding,
                    background: token.colorFill,
                    transition: 'all 0.2s',
                    [`&-primary`]: {
                        background: token.colorPrimary,
                    }
                },
                [`${componentCls}-close`]: {
                    width: token.fontSize,
                    height: token.fontSize,
                    fontSize: proLayoutTagsNodeCloseFontSize,
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
}

function styleFn (token) {
    const proLayoutTagsNodePadding = token.sizeMS / 2
    const proLayoutTagsNodeCloseFontSize = 10

    const proLayoutTagsNodeToken = mergeToken(token, {
        proLayoutTagsNodePadding,
        proLayoutTagsNodeCloseFontSize
    })
    return genBaseStyle(proLayoutTagsNodeToken)
}

export default genComponentStyleHook('ProLayoutTagsNode', styleFn)
