import { genComponentStyleHook, mergeToken } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, iconCls, treeNodeTitleMaxWidth, treeNodeOptionWidth } = token
    return {
        [componentCls]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [`${componentCls}-title`]: {
                maxWidth: treeNodeTitleMaxWidth,
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: `${token.controlHeightSM}px`,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            },
            [`${componentCls}-option`]: {
                width: `${treeNodeOptionWidth}px`,
                [`${componentCls}-option-icon`]: {
                    paddingInline: token.sizeXS,
                    display: 'none',
                    [`${iconCls}`]: {
                        width: `${token.fontSize}px`,
                        height: `${token.fontSize}px`,
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

export default genComponentStyleHook('ProTableColumnSettingTreeNode', (token) => {
    const treeNodeTitleMaxWidth = token.controlHeightSM * 7
    const treeNodeOptionWidth = token.fontSize * 2 + token.sizeXS * 2 + token.sizeXXS

    const treeNodeToken = mergeToken(token, {
        treeNodeTitleMaxWidth,
        treeNodeOptionWidth
    })
    return [genBaseStyle(treeNodeToken)]
})
