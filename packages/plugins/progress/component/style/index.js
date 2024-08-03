import { genComponentStyleHook } from '../../../../utils/extend'

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
                height: 2,
                backgroundColor: token.colorPrimary,
                [`${componentCls}-peg`]: {
                    position: 'absolute',
                    insetInlineEnd: 0,
                    width: 100,
                    height: '100%',
                    boxShadow: `0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary}`,
                    transform: `rotate(3deg) translate(0px, -4px)`
                }
            }
        }
    }
}

export default genComponentStyleHook('ProProgress', (token) => {
    return [genBaseStyle(token)]
})
