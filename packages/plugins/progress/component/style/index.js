import { genComponentStyleHook } from '@site-pro/components'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            pointerEvents: 'none',
            [`${componentCls}-bar`]: {
                position: 'fixed',
                insetBlockStart: 0,
                insetInline: 0,
                zIndex: token.zIndexPopupBase + 31,
                width: '100%',
                height: token.sizeXXS / 2,
                backgroundColor: token.colorPrimary
            }
        }
    }
}

export default genComponentStyleHook('ProProgress', (token) => {
    return [genBaseStyle(token)]
})
