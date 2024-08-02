import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, toolbarTitlePadding } = token
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
            [`${componentCls}-space`]: {
                position: 'relative',
                width: '100%',
                overflowY: 'auto',
                [`${componentCls}-container`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBlock: token.sizeMS,
                    [`${componentCls}-title`]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontSize: token.fontSizeLG,
                        color: token.colorText,
                        lineHeight: token.lineHeightLG,
                        fontWeight: token.fontWeightStrong,
                        whiteSpace: 'nowrap',
                        paddingInlineEnd: toolbarTitlePadding
                    },
                    [`${componentCls}-actions`]: {
                        whiteSpace: 'nowrap'
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableToolbar', (token) => {
    const toolbarTitlePadding = token.sizeMS / 2

    const toolbarToken = mergeToken(token, {
        toolbarTitlePadding
    })
    return [genBaseStyle(toolbarToken)]
})
