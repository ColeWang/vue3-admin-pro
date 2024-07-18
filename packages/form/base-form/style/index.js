import { genComponentStyleHook } from '../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${antCls}-input-clear-icon`]: {
                fontSize: `${token.fontSize}px !important`
            },
            [`${antCls}-select-arrow, ${antCls}-select-clear`]: {
                width: `${token.fontSize}px !important`,
                height: `${token.fontSize}px !important`,
                fontSize: `${token.fontSize}px !important`,
                insetInlineEnd: `${token.paddingSM - 2}px !important`,
                marginTop: `${-token.fontSize / 2}px !important`
            }
        }
    }
}

export default genComponentStyleHook('ProBaseForm', (token) => {
    return [genBaseStyle(token)]
})
