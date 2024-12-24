import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, proLayoutNavbarHeight, proLayoutNavbarPaddingInline, proLayoutNavbarCollapseSize } = token
    return {
        [componentCls]: {
            position: 'relative',
            userSelect: 'none',
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${componentCls}-content`]: {
                height: proLayoutNavbarHeight,
                display: 'flex',
                justifyContent: 'space-between',
                paddingInline: proLayoutNavbarPaddingInline,
                background: token.colorBgContainer,
                [`${componentCls}-left, ${componentCls}-right`]: {
                    height: proLayoutNavbarHeight,
                    display: 'flex',
                    alignItems: 'center'
                },
                [`${componentCls}-collapse`]: {
                    width: proLayoutNavbarCollapseSize,
                    height: proLayoutNavbarCollapseSize,
                    fontSize: proLayoutNavbarCollapseSize,
                    lineHeight: `${proLayoutNavbarCollapseSize}px`,
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

function styleFn (token) {
    const proLayoutNavbarHeight = token.controlHeight + token.fontSize * token.lineHeight
    const proLayoutNavbarPaddingInline = token.controlHeight / 2
    const proLayoutNavbarCollapseSize = proLayoutNavbarHeight / 2

    const proLayoutNavbarToken = mergeToken(token, {
        proLayoutNavbarHeight,
        proLayoutNavbarPaddingInline,
        proLayoutNavbarCollapseSize
    })
    return genBaseStyle(proLayoutNavbarToken)
}

export default genComponentStyleHook('ProLayoutNavbar', styleFn)
