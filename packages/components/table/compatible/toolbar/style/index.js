import { genComponentStyleHook } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
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
                overflow: 'hidden',
                paddingBlock: token.sizeMS,
                [`&__nowrap`]: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                [`${componentCls}-title`]: {
                    fontSize: token.fontSizeLG,
                    color: token.colorText,
                    lineHeight: token.lineHeightLG,
                    fontWeight: token.fontWeightStrong,
                    whiteSpace: 'nowrap',
                    marginBlockEnd: token.sizeMS,
                    [`&__nowrap`]: {
                        marginBlockEnd: 0
                    }
                },
                [`${componentCls}-actions`]: {
                    textAlign: 'end',
                    whiteSpace: 'nowrap'
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableToolbar', (token) => {
    return [genBaseStyle(token)]
})
