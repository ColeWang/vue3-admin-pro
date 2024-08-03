import { genComponentStyleHook } from '../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, iconCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-mask`]: {
                position: 'fixed',
                inset: 0,
                zIndex: token.zIndexPopupBase + 30,
                backgroundColor: token.colorBgMask,
                userSelect: 'none',
                [`${componentCls}-spin`]: {
                    position: 'absolute',
                    insetBlockStart: '50%',
                    insetInlineStart: '50%',
                    transform: 'translate3d(-50%, -50%, 0)',
                    [iconCls]: {
                        fontSize: token.sizeXXL,
                        opacity: 0.8
                    }
                }
            },
            [`${componentCls}-mask-fade`]: {
                [`&-enter-active, &-appear-active, &-leave-active`]: {
                    transition: `all ${token.motionDurationMid}`
                },
                [`&-enter-from, &-appear-from`]: {
                    opacity: 0
                },
                [`&-enter-to, &-appear-to`]: {
                    opacity: 1
                },
                [`&-leave-from`]: {
                    opacity: 1
                },
                [`&-leave-to`]: {
                    opacity: 0
                }
            }
        }
    }
}

export default genComponentStyleHook('ProLoading', (token) => {
    return [genBaseStyle(token)]
})
