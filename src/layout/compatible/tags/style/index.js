import { genComponentStyleHook, mergeToken } from '@site/utils/extend'

function genBaseStyle (token) {
    const { componentCls, iconCls, tagsHeight, tagsButtonWidth, tagsCloseRight, tagsMenuMinWidth } = token
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
                height: tagsHeight,
                display: 'flex',
                [`${componentCls}-button`]: {
                    width: tagsButtonWidth,
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
                [`${componentCls}-button-wrap`]: {
                    height: tagsHeight,
                    background: token.colorBgContainer,
                    [`&-left`]: {
                        borderInlineEnd: `1px solid ${token.colorBorder}`,
                    },
                    [`&-right`]: {
                        borderInlineStart: `1px solid ${token.colorBorder}`,
                    }
                },
                [`${componentCls}-close-wrap`]: {
                    height: tagsHeight,
                    paddingInlineEnd: tagsCloseRight,
                    background: token.colorBgContainer,
                    borderInlineStart: `1px solid ${token.colorBorder}`,
                    [`${componentCls}-button`]: {
                        position: 'relative',
                        [`&:before`]: {
                            position: 'absolute',
                            right: -tagsCloseRight,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            content: '""',
                        },
                        [`${iconCls}-close-circle`]: {
                            marginInlineEnd: -tagsCloseRight
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
                        transition: 'left .3s ease'
                    }
                }
            },
            [`${componentCls}-menu`]: {
                minWidth: tagsMenuMinWidth,
                whiteSpace: 'nowrap'
            }
        }
    }
}

export default genComponentStyleHook('ProLayoutTags', (token) => {
    const tagsHeight = token.controlHeight + token.sizeXXS * 2
    const tagsButtonWidth = Math.ceil(tagsHeight * 0.65)
    const tagsCloseRight = 6
    const tagsMenuMinWidth = token.fontSize * 7

    const tagsToken = mergeToken(token, {
        tagsHeight,
        tagsButtonWidth,
        tagsCloseRight,
        tagsMenuMinWidth
    })
    return [genBaseStyle(tagsToken)]
})
