import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            paddingInline: token.sizeMD,
            [`${antCls}-breadcrumb`]: {
                [`ol`]: {
                    flexWrap: 'nowrap'
                },
                [`${antCls}-breadcrumb-link`]: {
                    whiteSpace: 'nowrap'
                }
            }
        }
    }
}

function styleFn (token) {
    const proLayoutBreadcrumbToken = mergeToken(token, {})
    return genBaseStyle(proLayoutBreadcrumbToken)
}

export default genComponentStyleHook('ProLayoutBreadcrumb', styleFn)
