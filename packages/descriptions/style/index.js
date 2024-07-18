import { genComponentStyleHook } from '../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-header`]: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: token.fontSizeSM * token.lineHeightSM,
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
            [`.field-textarea__read`]: {
                padding: '0 !important'
            }
        }
    }
}

export default genComponentStyleHook('Descriptions', (token) => {
    return [genBaseStyle(token)]
})
