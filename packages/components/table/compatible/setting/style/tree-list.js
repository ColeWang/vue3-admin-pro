import { genComponentStyleHook, mergeToken } from '../../../../theme'

function genBaseStyle (token) {
    const { componentCls, antCls, listTitleMargin, listHolderPadding, listCheckboxMargin } = token
    return {
        [componentCls]: {
            paddingBlockStart: token.paddingXS,
            [`${componentCls}-title`]: {
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                lineHeight: token.lineHeightSM,
                marginBlock: listTitleMargin,
                paddingInlineStart: token.controlHeightSM
            },
            [`${antCls}-tree`]: {
                background: token.colorFillQuaternary,
                [`${antCls}-tree-list-holder`]: {
                    paddingBlockStart: listHolderPadding
                },
                [`${antCls}-tree-node-content-wrapper`]: {
                    backgroundColor: 'transparent !important',
                    [`&:hover`]: {
                        // Tree Node
                        [`${antCls}-pro-table-setting-node-option-icon`]: {
                            display: 'block'
                        }
                    }
                },
                [`${antCls}-tree-treenode`]: {
                    alignItems: 'center',
                    [`${antCls}-tree-checkbox`]: {
                        margin: `0 ${listCheckboxMargin}px 0 0`,
                        insetBlockStart: 0
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

export default genComponentStyleHook('ProTableSettingList', (token) => {
    const listTitleMargin = token.controlHeightSM - token.fontSizeSM * token.lineHeightSM
    const listHolderPadding = token.sizeXS / 2
    const listCheckboxMargin = (token.controlHeightSM - token.controlHeight / 2) / 2

    const treeListToken = mergeToken(token, {
        listTitleMargin,
        listHolderPadding,
        listCheckboxMargin
    })
    return [genBaseStyle(treeListToken)]
})
