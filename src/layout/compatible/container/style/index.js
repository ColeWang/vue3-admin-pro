import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proLayoutContainerPaddingInline } = token
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            [`${componentCls}-space`]: {
                width: '100%',
                height: '100%',
                paddingInline: proLayoutContainerPaddingInline,
                overflowY: 'auto',
                [`${componentCls}-view`]: {
                    position: 'relative',
                    [`${componentCls}-view-content`]: {
                        position: 'relative'
                    },
                    [`${componentCls}-view-fill`]: {
                        height: proLayoutContainerPaddingInline
                    }
                }
            }
        }
    }
}

function styleFn (token) {
    const proLayoutContainerPaddingInline = token.sizeMS

    const proLayoutContainerToken = mergeToken(token, {
        proLayoutContainerPaddingInline
    })
    return genBaseStyle(proLayoutContainerToken)
}

export default genComponentStyleHook('ProLayoutContainer', styleFn)
