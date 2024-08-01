import { genComponentStyleHook, mergeToken } from '@site/utils/extend'

function genBaseStyle (token) {
    const { componentCls, layoutBgColor } = token
    return {
        [componentCls]: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            background: layoutBgColor,
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

export default genComponentStyleHook('ProBaseLayout', (token) => {
    const layoutBgColor = token.colorBgLayout

    const layoutToken = mergeToken(token, {
        layoutBgColor
    })
    return [genBaseStyle(layoutToken)]
})
