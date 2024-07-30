import { genComponentStyleHook, mergeToken } from '../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, fieldTextareaReadCls, descsHeaderMargin } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {
                [`${componentCls}-header`]: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBlockEnd: descsHeaderMargin,
                    [`${componentCls}-title`]: {
                        flex: 'auto',
                        fontSize: token.fontSizeLG,
                        color: token.colorText,
                        lineHeight: token.lineHeightLG,
                        fontWeight: token.fontWeightStrong,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    },
                    [`${componentCls}-extra`]: {
                        fontSize: token.fontSize,
                        color: token.colorText,
                        marginInlineStart: 'auto'
                    }
                },
                [fieldTextareaReadCls]: {
                    padding: '0 !important'
                }
            }
        }
    }
}

export default genComponentStyleHook('ProDescriptions', (token) => {
    const { antCls } = token

    // const descsHeaderMarginBottom = token.fontSizeSM * token.lineHeightSM
    const descsHeaderMargin = token.sizeMS
    const fieldTextareaReadCls = `${antCls}-pro-field-textarea__read`

    const descriptionsToken = mergeToken(token, {
        descsHeaderMargin,
        fieldTextareaReadCls
    })
    return [genBaseStyle(descriptionsToken)]
})
