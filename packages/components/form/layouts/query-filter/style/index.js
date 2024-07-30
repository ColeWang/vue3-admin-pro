import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, formItemVerticalMargin } = token
    return {
        [componentCls]: {
            [`${antCls}-form-item`]: {
                marginBlock: 0
            },
            [`${componentCls}-form-item__vertical`]: {
                marginBlockStart: formItemVerticalMargin
            },
            [`${componentCls}-action-col`]: {
                textAlign: 'end'
            },
            [`${componentCls}-col-hidden`]: {
                display: 'none'
            }
        }
    }
}

export default genComponentStyleHook('ProQueryFilter', (token) => {
    const formItemVerticalMargin = token.fontSize * token.lineHeight + token.sizeXS

    const queryFilterToken = mergeToken(token, {
        formItemVerticalMargin
    })
    return [genBaseStyle(queryFilterToken)]
})
