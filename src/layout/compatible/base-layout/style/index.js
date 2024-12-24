import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proBaseLayoutBgColor } = token
    return {
        [componentCls]: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            background: proBaseLayoutBgColor,
            overflow: 'hidden',
            [`${componentCls}-prime`]: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                [`${componentCls}-content`]: {
                    flex: 1,
                    overflow: 'hidden'
                }
            }
        }
    }
}

function styleFn (token) {
    const proBaseLayoutBgColor = token.colorBgLayout

    const proBaseLayoutToken = mergeToken(token, {
        proBaseLayoutBgColor
    })
    return genBaseStyle(proBaseLayoutToken)
}

export default genComponentStyleHook('ProBaseLayout', styleFn)
