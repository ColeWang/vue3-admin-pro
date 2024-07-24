import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, iconCls, tagsHeight } = token
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            borderBlock: `1px solid ${token.colorBorder}`,
            userSelect: 'none',
            [`${componentCls}-content`]: {
                width: '100%',
                height: tagsHeight,
                display: 'flex',
                [`${componentCls}-button`]: {
                    height: '100%',
                    fontSize: token.fontSizeSM,
                    color: token.colorText,
                    lineHeight: token.lineHeightSM,
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
                    [`&-left`]: {
                        borderInlineEnd: `1px solid ${token.colorBorder}`,
                    },
                    [`&-right`]: {
                        borderInlineStart: `1px solid ${token.colorBorder}`,
                    }
                },
                [`${componentCls}-close-wrap`]: {
                    height: tagsHeight,
                    paddingInlineEnd: '8px',
                    borderInlineStart: `1px solid ${token.colorBorder}`,
                    [`${componentCls}-button`]: {
                        position: 'relative',
                        [`&:before`]: {
                            position: 'absolute',
                            top: 0,
                            right: '-8px',
                            bottom: 0,
                            left: 0,
                            content: '""',
                        },
                        [`${iconCls}-close-circle`]: {
                            marginInlineEnd: '-8px'
                        }
                    }
                },
                [`${componentCls}-scroll-outer`]: {
                    position: 'relative',
                    flex: 1,
                    paddingBlock: token.sizeXXS,
                    boxShadow: 'inset 0 0 3px 2px hsla(0, 0%, 39.2%, .1)',
                    overflow: 'hidden',
                    [`${componentCls}-scroll-body`]: {
                        position: 'absolute',
                        display: 'inline-block',
                        paddingInline: token.sizeXXS,
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                        transition: 'left .3s ease'
                    }
                },
                [`${componentCls}-tag`]: {
                    marginInlineEnd: token.sizeXXS
                }
            }
        }
    }
}

export default genComponentStyleHook('ProLayoutTags', (token) => {
    const tagsHeight = token.controlHeight + token.sizeXXS * 2

    const tagsToken = mergeToken(token, {
        tagsHeight
    })
    return [genBaseStyle(tagsToken)]
})
