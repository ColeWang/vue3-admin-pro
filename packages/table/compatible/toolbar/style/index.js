import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            paddingBlock: token.padding,
            [`${componentCls}-popup-container`]: {
                position: 'relative',
                [`${antCls}-popover`]: {
                    paddingTop: 0
                },
                [`${antCls}-popover-arrow`]: {
                    display: 'none'
                },
                [`${antCls}-popover-inner-content`]: {
                    padding: `0 0 ${token.paddingXS}px`
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
                    whiteSpace: 'nowrap'
                },
                [`${componentCls}-actions`]: {
                    paddingInlineStart: token.padding,
                    whiteSpace: 'nowrap'
                },
            }
        }
    }
}

export default genComponentStyleHook('ProTableToolbar', (token) => {
    return [genBaseStyle(token)]
})
