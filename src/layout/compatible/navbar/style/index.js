import { genComponentStyleHook, mergeToken } from '@packages/utils/extend'

function genBaseStyle (token) {
    const { componentCls, navbarHeight, navbarPaddingInline, navbarCollapseSize } = token
    return {
        [componentCls]: {
            position: 'relative',
            userSelect: 'none',
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-content`]: {
                height: navbarHeight,
                display: 'flex',
                justifyContent: 'space-between',
                paddingInline: navbarPaddingInline,
                background: token.colorBgContainer,
                [`${componentCls}-left, ${componentCls}-right`]: {
                    height: navbarHeight,
                    display: 'flex',
                    alignItems: 'center'
                },
                [`${componentCls}-collapse`]: {
                    width: navbarCollapseSize,
                    height: navbarCollapseSize,
                    fontSize: navbarCollapseSize,
                    lineHeight: `${navbarCollapseSize}px`,
                    color: token.colorText,
                    textAlign: 'center',
                    cursor: 'pointer',
                    [`&:hover`]: {
                        color: token.colorPrimaryHover
                    },
                    [`&:active`]: {
                        color: token.colorPrimaryActive
                    },
                    [`${componentCls}-collapse-icon`]: {
                        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s',
                        [`&__down`]: {
                            transform: 'rotate(90deg)'
                        }
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProLayoutNavbar', (token) => {
    const navbarHeight = token.controlHeight + token.fontSize * token.lineHeight
    const navbarPaddingInline = token.controlHeight / 2
    const navbarCollapseSize = navbarHeight / 2

    const navbarToken = mergeToken(token, {
        navbarHeight,
        navbarPaddingInline,
        navbarCollapseSize
    })
    return [genBaseStyle(navbarToken)]
})
