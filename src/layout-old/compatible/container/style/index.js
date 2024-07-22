import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, containerPaddingInline } = token
    return {
        [`${antCls}-layout ${componentCls}`]: {
            [`${componentCls}-space`]: {
                paddingInline: containerPaddingInline,
                overflowY: 'auto'
            },
            [`${componentCls}-view-fill`]: {
                height: containerPaddingInline
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
