import { genComponentStyleHook, mergeToken } from '../../../../theme'

function genBaseStyle (token) {
    const { componentCls, actionTransition } = token
    return {
        [componentCls]: {
            display: 'inline-block',
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            color: token.colorText,
            transition: actionTransition,
            textDecoration: 'none',
            outline: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            [`&-primary`]: {
                color: token.colorLink,
                [`&:hover`]: {
                    color: token.colorLinkHover
                },
                [`&:active`]: {
                    color: token.colorLinkActive
                }
            },
            [`&-warning`]: {
                color: token.colorWarning,
                [`&:hover`]: {
                    color: token.colorWarningHover
                },
                [`&:active`]: {
                    color: token.colorWarningActive
                }
            },
            [`&-error`]: {
                color: token.colorError,
                [`&:hover`]: {
                    color: token.colorErrorHover
                },
                [`&:active`]: {
                    color: token.colorErrorActive
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableAction', (token) => {
    const actionTransition = `all ${token.motionDurationMid} ${token.motionEaseInOut}`

    const actionToken = mergeToken(token, {
        actionTransition
    })
    return [genBaseStyle(actionToken)]
})
