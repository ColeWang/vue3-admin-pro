import { genComponentStyleHook, mergeToken } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const {
        componentCls,
        antCls,
        treeListTitleMargin,
        treeListHolderPadding,
        treeCheckboxMargin
    } = token
    return {
        [componentCls]: {
            paddingBlockStart: token.paddingXS,
            [`${componentCls}-title`]: {
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                lineHeight: token.lineHeightSM,
                marginBlock: treeListTitleMargin,
                paddingInlineStart: token.controlHeightSM
            },
            [`${antCls}-tree`]: {
                background: token.colorFillQuaternary,
                [`${antCls}-tree-list-holder`]: {
                    paddingBlockStart: treeListHolderPadding
                },
                [`${antCls}-tree-node-content-wrapper`]: {
                    backgroundColor: 'transparent !important',
                    [`&:hover`]: {
                        // Tree Node
                        [`${antCls}-pro-table-column-setting-tree-node-option-icon`]: {
                            display: 'block'
                        }
                    }
                },
                [`${antCls}-tree-treenode`]: {
                    alignItems: 'center',
                    [`${antCls}-tree-checkbox`]: {
                        margin: `0 ${treeCheckboxMargin}px 0 0`,
                        top: 0
                    }
                },
                [`${antCls}-tree-draggable-icon`]: {
                    cursor: 'pointer',
                    opacity: '1 !important'
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableColumnSettingTreeList', (token) => {
    const treeListTitleMargin = token.controlHeightSM - token.fontSizeSM * token.lineHeightSM
    const treeListHolderPadding = token.sizeXS / 2
    const treeCheckboxMargin = (token.controlHeightSM - token.controlHeight / 2) / 2

    const treeListToken = mergeToken(token, {
        treeListTitleMargin,
        treeListHolderPadding,
        treeCheckboxMargin
    })
    return [genBaseStyle(treeListToken)]
})
