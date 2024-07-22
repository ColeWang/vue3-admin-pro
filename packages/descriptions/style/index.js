import { genComponentStyleHook, mergeToken } from '../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, fieldTextareaReadCls, descsHeaderMarginBottom } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {
                [`${componentCls}-header`]: {
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: descsHeaderMarginBottom,
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
    const descsHeaderMarginBottom = token.sizeMS
    const fieldTextareaReadCls = `${antCls}-pro-field-textarea__read`

    const descriptionsToken = mergeToken(token, {
        descsHeaderMarginBottom,
        fieldTextareaReadCls
    })
    return [genBaseStyle(descriptionsToken)]
})
