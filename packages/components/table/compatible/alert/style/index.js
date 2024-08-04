import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

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
                paddingBlock: token.sizeSM,
                paddingInline: token.sizeSM,
                backgroundColor: token.colorFillQuaternary,
                borderRadius: token.borderRadius,
                [`${componentCls}-wrapper`]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: token.colorTextSecondary,
                    overflow: 'hidden',
                    [`${componentCls}-content`]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        whiteSpace: 'nowrap'
                    },
                    [`${componentCls}-options`]: {
                        paddingInlineStart: token.size,
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
