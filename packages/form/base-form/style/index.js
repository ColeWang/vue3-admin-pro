import { genComponentStyleHook } from '../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${antCls}-form`]: {
                [`${antCls}-input-clear-icon`]: {
                    fontSize: token.fontSize
                },
                [`${antCls}-select-arrow, ${antCls}-select-clear`]: {
                    width: token.fontSize,
                    height: token.fontSize,
                    fontSize: token.fontSize,
                    insetInlineEnd: token.paddingSM - 2,
                    marginTop: -token.fontSize / 2
                }
            }
        }
    }
}

export default genComponentStyleHook('ProBaseForm', (token) => {
    return [genBaseStyle(token)]
})
