import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            color: token.colorText,
            transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
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
    return [genBaseStyle(token)]
})
