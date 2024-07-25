import { genComponentStyleHook } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            paddingInline: token.sizeMD,
            [`ol`]: {
                flexWrap: 'nowrap'
            },
            [`${antCls}-breadcrumb-link`]: {
                whiteSpace: 'nowrap'
            }
        }
    }
}

export default genComponentStyleHook('ProBreadcrumb', (token) => {
    return [genBaseStyle(token)]
})
