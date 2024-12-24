import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, antCls, proLoginBgColor, proLoginFormWidth, proLoginFormRight } = token
    const headMinHeight = token.fontSize * token.lineHeight + token.sizeSM * 2
    const errorHeight = token.controlHeight + token.sizeLG
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            background: proLoginBgColor,
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
                insetBlockStart: '50%',
                insetInlineEnd: proLoginFormRight,
                width: proLoginFormWidth,
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
                insetInline: 0,
                margin: 'auto'
            }
        }
    }
}

function styleFn (token) {
    const proLoginBgColor = token.colorBgLayout
    const proLoginFormWidth = token.controlHeight * 10 + 20
    const proLoginFormRight = token.controlHeight * 10 - 80

    const proLoginToken = mergeToken(token, {
        proLoginBgColor,
        proLoginFormWidth,
        proLoginFormRight
    })
    return genBaseStyle(proLoginToken)
}

export default genComponentStyleHook('ProLogin', styleFn)
