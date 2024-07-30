import { genComponentStyleHook, mergeToken } from '@packages/utils/extend'

function genBaseStyle (token) {
    const { componentCls, containerPaddingInline } = token
    return {
        [componentCls]: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            [`${componentCls}-space`]: {
                width: '100%',
                height: '100%',
                paddingInline: containerPaddingInline,
                overflowY: 'auto',
                [`${componentCls}-view`]: {
                    position: 'relative',
                    [`${componentCls}-view-content`]: {
                        position: 'relative'
                    },
                    [`${componentCls}-view-fill`]: {
                        height: containerPaddingInline
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProLayoutContainer', (token) => {
    const containerPaddingInline = token.sizeMS

    const containerToken = mergeToken(token, {
        containerPaddingInline
    })
    return [genBaseStyle(containerToken)]
})
