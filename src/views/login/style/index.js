import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, loginBgColor, loginFormWidth, loginFormRight } = token
    const headMinHeight = token.fontSize * token.lineHeight + token.sizeSM * 2
    const errorHeight = token.controlHeight + token.sizeLG
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            background: loginBgColor,
            overflow: 'hidden',
            [`${antCls}-card`]: {
                [`${antCls}-card-head`]: {
                    fontSize: token.fontSize,
                    lineHeight: token.lineHeight,
                    color: token.colorTextSecondary,
                    minHeight: headMinHeight
                },
                [`${antCls}-card-body`]: {
                    padding: token.sizeMS
                }
            },
            [`${componentCls}-form`]: {
                position: 'absolute',
                top: '50%',
                right: loginFormRight,
                width: loginFormWidth,
                transform: 'translateY(-60%)',
                [`${componentCls}-checkbox-warp`]: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBlockEnd: token.sizeMS
                },
                [`${componentCls}-form-item-error`]: {
                    marginBlockEnd: 0,
                    minHeight: errorHeight,
                    [`${antCls}-form-show-help`]: {
                        height: token.sizeLG,
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    }
                }
            },
            [`${componentCls}-form-center`]: {
                right: 0,
                left: 0,
                margin: 'auto'
            }
        }
    }
}

export default genComponentStyleHook('ProLogin', (token) => {
    const loginBgColor = token.colorBgLayout
    const loginFormWidth = token.controlHeight * 10 + 20
    const loginFormRight = token.controlHeight * 10 - 80

    const loginToken = mergeToken(token, {
        loginBgColor,
        loginFormWidth,
        loginFormRight
    })
    return [genBaseStyle(loginToken)]
})
