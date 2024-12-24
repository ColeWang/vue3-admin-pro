import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proErrorPageBgColor } = token
    return {
        [componentCls]: {
            width: '100%',
            height: '100%',
            background: proErrorPageBgColor,
            overflow: 'hidden'
        }
    }
}

function styleFn (token) {
    const proErrorPageBgColor = token.colorBgLayout

    const proErrorPageToken = mergeToken(token, {
        proErrorPageBgColor
    })
    return genBaseStyle(proErrorPageToken)
}

export default genComponentStyleHook('ProErrorPage', styleFn)
