import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, antCls, proLayoutSidebarLogoHeight, proLayoutSidebarLightBg, proLayoutSidebarDarkBg } = token
    return {
        [componentCls]: {
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            userSelect: 'none',
            [`&-light`]: {
                background: proLayoutSidebarLightBg,
                borderInlineEnd: `1px solid ${token.colorSplit}`
            },
            [`&-dark`]: {
                background: proLayoutSidebarDarkBg,
                borderInlineEnd: `1px solid ${proLayoutSidebarDarkBg}`
            },
            [`${componentCls}-space`]: {
                height: '100%',
                paddingBlockStart: 0.1,
                marginBlockStart: -0.1,
                overflowY: 'auto',
                willChange: 'scroll-position',
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
                '-webkit-overflow-scrolling': 'touch',
                [`&::-webkit-scrollbar`]: {
                    width: 0,
                    height: 0,
                    display: 'none'
                },
                [`${componentCls}-content`]: {
                    position: 'relative',
                    [`${componentCls}-logo`]: {
                        height: proLayoutSidebarLogoHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    [`${antCls}-menu-light`]: {
                        borderInlineEnd: 'none'
                    },
                    [`${antCls}-menu-dark`]: {
                        borderInlineEnd: 'none'
                    }
                }
            }
        }
    }
}

function styleFn (token) {
    const proLayoutSidebarLogoHeight = token.controlHeight + token.sizeMS * 2
    const proLayoutSidebarLightBg = token.colorBgContainer
    const proLayoutSidebarDarkBg = '#001529'

    const proLayoutSidebarToken = mergeToken(token, {
        proLayoutSidebarLogoHeight,
        proLayoutSidebarLightBg,
        proLayoutSidebarDarkBg
    })
    return genBaseStyle(proLayoutSidebarToken)
}

export default genComponentStyleHook('ProLayoutSidebar', styleFn)
