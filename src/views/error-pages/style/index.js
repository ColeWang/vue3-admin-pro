import { genComponentStyleHook, mergeToken } from '@site-pro/components'

function genBaseStyle (token) {
    const { componentCls, errorPageBgColor } = token
    return {
        [componentCls]: {
            width: '100%',
            height: '100%',
            background: errorPageBgColor,
            overflow: 'hidden'
        }
    }
}

export default genComponentStyleHook('ProErrorPage', (token) => {
    const errorPageBgColor = token.colorBgLayout

    const errorPageToken = mergeToken(token, {
        errorPageBgColor
    })
    return [genBaseStyle(errorPageToken)]
})
