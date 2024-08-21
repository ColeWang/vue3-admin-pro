import { genComponentStyleHook, mergeToken } from '../../../../theme'

function genBaseStyle (token) {
    const { componentCls, iconCls, nodeTitleMaxWidth, nodeOptionWidth, nodeOptionPaddingInline } = token
    return {
        [componentCls]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [`${componentCls}-title`]: {
                maxWidth: nodeTitleMaxWidth,
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: `${token.controlHeightSM}px`,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            },
            [`${componentCls}-option`]: {
                width: nodeOptionWidth,
                [`${componentCls}-option-icon`]: {
                    paddingInline: nodeOptionPaddingInline,
                    display: 'none',
                    [`${iconCls}`]: {
                        width: token.fontSize,
                        height: token.fontSize,
                        lineHeight: `${token.fontSize}px`,
                        fontSize: token.fontSize,
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: token.colorLink
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableSettingNode', (token) => {
    const nodeTitleMaxWidth = token.controlHeightSM * 7
    const nodeOptionWidth = token.fontSize * 2 + token.sizeMS + token.sizeXXS
    const nodeOptionPaddingInline = token.sizeMS / 2

    const treeNodeToken = mergeToken(token, {
        nodeTitleMaxWidth,
        nodeOptionWidth,
        nodeOptionPaddingInline
    })
    return [genBaseStyle(treeNodeToken)]
})
