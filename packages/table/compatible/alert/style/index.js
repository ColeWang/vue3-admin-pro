import { genComponentStyleHook, mergeToken } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, alertMarginBottom } = token
    return {
        [componentCls]: {
            marginBlockEnd: alertMarginBottom,
            border: 'none',
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-container`]: {
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: token.lineHeight,
                paddingBlock: token.paddingSM,
                paddingInline: token.paddingLG,
                backgroundColor: token.colorFillAlter,
                borderRadius: token.borderRadius,
                [`${componentCls}-wrapper`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: token.colorTextSecondary,
                    whiteSpace: 'nowrap',
                    [`${componentCls}-content`]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        whiteSpace: 'nowrap'
                    },
                    [`${componentCls}-options`]: {
                        paddingInlineStart: token.padding,
                        whiteSpace: 'nowrap'
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableAlert', (token) => {
    const alertMarginBottom = token.sizeMS

    const alertToken = mergeToken(token, {
        alertMarginBottom
    })
    return [genBaseStyle(alertToken)]
})
