import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-row`]: {
                position: 'relative',
                rowGap: token.paddingLG,
            },
            [`${antCls}-form-item`]: {
                marginBlock: 0
            },
            [`${componentCls}-form-item__vertical`]: {
                marginBlockStart: token.fontSize * token.lineHeight + token.paddingXS
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
    return [genBaseStyle(token)]
})
