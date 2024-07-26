import { genComponentStyleHook, mergeToken } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, sidebarLogoHeight, sidebarLightBg, sidebarDarkBg } = token
    return {
        [componentCls]: {
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none',
            [`&-light`]: {
                background: sidebarLightBg,
                borderInlineEnd: `1px solid ${token.colorSplit}`
            },
            [`&-dark`]: {
                background: sidebarDarkBg,
                borderInlineEnd: `1px solid ${sidebarDarkBg}`
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
                        height: sidebarLogoHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
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

export default genComponentStyleHook('ProLayoutSidebar', (token) => {
    const sidebarLogoHeight = token.controlHeight + token.sizeMS * 2
    const sidebarLightBg = token.colorBgContainer
    const sidebarDarkBg = '#001529'

    const sidebarToken = mergeToken(token, {
        sidebarLogoHeight,
        sidebarLightBg,
        sidebarDarkBg
    })
    return [genBaseStyle(sidebarToken)]
})
