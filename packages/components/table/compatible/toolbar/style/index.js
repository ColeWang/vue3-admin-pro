import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, toolbarSettingsPaddingLeft } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${componentCls}-popup-container`]: {
                position: 'relative',
                [`${antCls}-popover`]: {
                    paddingTop: 0
                },
                [`${antCls}-popover-arrow`]: {
                    display: 'none'
                },
                [`${antCls}-popover-inner-content`]: {
                    padding: `0 0 ${token.sizeXS}px`
                }
            },
            [`${componentCls}-container`]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBlock: token.sizeMS,
                overflow: 'hidden',
                [`${componentCls}-header`]: {
                    flex: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    [`${componentCls}-title`]: {
                        fontSize: token.fontSizeLG,
                        color: token.colorText,
                        lineHeight: token.lineHeightLG,
                        fontWeight: token.fontWeightStrong,
                        whiteSpace: 'nowrap',
                    },
                    [`${componentCls}-actions`]: {}
                },
                [`${componentCls}-settings`]: {
                    textAlign: 'end',
                    whiteSpace: 'nowrap',
                    paddingInlineStart: toolbarSettingsPaddingLeft
                },
                [`&__word-wrap`]: {
                    display: 'block',
                    [`${componentCls}-header`]: {
                        marginBlockEnd: token.sizeMS
                    },
                    [`${componentCls}-settings`]: {
                        paddingInlineStart: 0
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableToolbar', (token) => {
    const toolbarSettingsPaddingLeft = token.sizeMS / 2

    const toolbarToken = mergeToken(token, {
        toolbarSettingsPaddingLeft
    })
    return [genBaseStyle(toolbarToken)]
})
