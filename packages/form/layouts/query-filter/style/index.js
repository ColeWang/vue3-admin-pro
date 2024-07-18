import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            position: 'relative',
            rowGap: token.paddingLG,
            [`${antCls}-form-item`]: {
                marginBlock: 0
            },
            [`${componentCls}-form-item__vertical`]: {
                marginBlockStart: token.fontSize * token.lineHeight + token.paddingXS
            },
            [`${componentCls}-action-col`]: {
                textAlign: 'end',
                [`${componentCls}-collapse-button`]: {
                    padding: 0,
                    [`> span:last-child`]: {
                        marginInlineStart: token.marginXXS
                    }
                }
            },
            [`${componentCls}-col-hidden`]: {
                display: 'none'
            }
        }
    }
}

export default genComponentStyleHook('QueryFilter', (token) => {
    return [genBaseStyle(token)]
})
