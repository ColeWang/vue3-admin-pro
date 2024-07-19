import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            marginBlockEnd: token.margin,
            backgroundColor: token.colorBgLayout,
            borderRadius: token.borderRadius,
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
    return [genBaseStyle(token)]
})
