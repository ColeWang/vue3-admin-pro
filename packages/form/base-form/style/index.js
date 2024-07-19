import { genComponentStyleHook, mergeToken } from '../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, selectIconInset, selectIconMargin } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${antCls}-form`]: {
                [`${antCls}-input-clear-icon`]: {
                    fontSize: token.fontSize
                },
                [`${antCls}-select-arrow, ${antCls}-select-clear`]: {
                    width: token.fontSize,
                    height: token.fontSize,
                    fontSize: token.fontSize,
                    lineHeight: token.fontSize,
                    insetInlineEnd: selectIconInset,
                    marginTop: selectIconMargin
                }
            }
        }
    }
}

export default genComponentStyleHook('ProBaseForm', (token) => {
    const selectIconInset = token.paddingSM - 2
    const selectIconMargin = -(token.fontSize / 2)

    const baseFormToken = mergeToken(token, {
        selectIconInset,
        selectIconMargin
    })
    return [genBaseStyle(baseFormToken)]
})
