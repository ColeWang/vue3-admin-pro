import { genComponentStyleHook, mergeToken } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, toolbarPadding } = token
    return {
        [componentCls]: {
            paddingBlock: toolbarPadding,
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
                justifyContent: 'space-between',
                [`${componentCls}-title`]: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    fontSize: token.fontSizeLG,
                    color: token.colorText,
                    lineHeight: token.lineHeightLG,
                    fontWeight: token.fontWeightStrong,
                    whiteSpace: 'nowrap',
                    paddingInlineEnd: token.sizeXS,
                },
                [`${componentCls}-actions`]: {
                    whiteSpace: 'nowrap'
                },
            }
        }
    }
}

export default genComponentStyleHook('ProTableToolbar', (token) => {
    const toolbarPadding = token.sizeMS

    const toolbarToken = mergeToken(token, {
        toolbarPadding
    })
    return [genBaseStyle(toolbarToken)]
})
