import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const {
        componentCls,
        iconCls,
        proLayoutTagsHeight,
        proLayoutTagsButtonWidth,
        proLayoutTagsCloseRight,
        proLayoutTagsMenuMinWidth
    } = token
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            borderBlock: `1px solid ${token.colorBorder}`,
            userSelect: 'none',
            [`${componentCls}-popup-container`]: {
                position: 'relative',
            },
            [`${componentCls}-content`]: {
                width: '100%',
                height: proLayoutTagsHeight,
                display: 'flex',
                [`${componentCls}-button`]: {
                    width: proLayoutTagsButtonWidth,
                    height: '100%',
                    fontSize: token.fontSizeSM,
                    color: token.colorText,
                    lineHeight: token.lineHeightSM,
                    padding: 0,
                    border: 'none',
                    background: 'transparent !important',
                    [`&:hover`]: {
                        color: token.colorPrimaryHover
                    },
                    [`&:active`]: {
                        color: token.colorPrimaryActive
                    },
                },
                [`${componentCls}-button-wrapper`]: {
                    height: proLayoutTagsHeight,
                    background: token.colorBgContainer,
                    [`&-left`]: {
                        borderInlineEnd: `1px solid ${token.colorBorder}`,
                    },
                    [`&-right`]: {
                        borderInlineStart: `1px solid ${token.colorBorder}`,
                    }
                },
                [`${componentCls}-close-wrapper`]: {
                    height: proLayoutTagsHeight,
                    paddingInlineEnd: proLayoutTagsCloseRight,
                    background: token.colorBgContainer,
                    borderInlineStart: `1px solid ${token.colorBorder}`,
                    [`${componentCls}-button`]: {
                        position: 'relative',
                        [`&:before`]: {
                            position: 'absolute',
                            insetInlineEnd: -proLayoutTagsCloseRight,
                            insetInlineStart: 0,
                            insetBlock: 0,
                            content: '""',
                        },
                        [`${iconCls}-close-circle`]: {
                            marginInlineEnd: -proLayoutTagsCloseRight
                        }
                    }
                },
                [`${componentCls}-scroll-outer`]: {
                    position: 'relative',
                    flex: 1,
                    paddingBlock: token.sizeXXS,
                    boxShadow: `inset 0 0 3px 2px ${token.colorFillTertiary}`,
                    overflow: 'hidden',
                    [`${componentCls}-scroll-body`]: {
                        position: 'absolute',
                        display: 'inline-block',
                        paddingInline: token.sizeXXS,
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                        transition: 'inset-inline-start .3s ease'
                    }
                }
            },
            [`${componentCls}-menu`]: {
                minWidth: proLayoutTagsMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

function styleFn (token) {
    const proLayoutTagsHeight = token.controlHeight + token.sizeXXS * 2
    const proLayoutTagsButtonWidth = Math.ceil(proLayoutTagsHeight * 0.65)
    const proLayoutTagsCloseRight = 6
    const proLayoutTagsMenuMinWidth = token.fontSize * 7

    const proLayoutTagsToken = mergeToken(token, {
        proLayoutTagsHeight,
        proLayoutTagsButtonWidth,
        proLayoutTagsCloseRight,
        proLayoutTagsMenuMinWidth
    })
    return genBaseStyle(proLayoutTagsToken)
}

export default genComponentStyleHook('ProLayoutTags', styleFn)
