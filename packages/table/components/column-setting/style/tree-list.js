import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            paddingBlockStart: token.paddingXS,
            [`${componentCls}-title`]: {
                fontSize: token.fontSizeSM,
                color: token.colorTextSecondary,
                lineHeight: token.lineHeightSM,
                marginBlock: token.controlHeightSM - token.fontSizeSM * token.lineHeightSM,
                paddingInlineStart: token.controlHeightSM
            },
            [`${antCls}-tree`]: {
                background: token.colorBgLayout,
                [`${antCls}-tree-list-holder`]: {
                    paddingBlockStart: token.paddingXS / 2
                },
                [`${antCls}-tree-indent`]: {
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: `${token.controlHeightSM}px`,
                    width: `${token.controlHeightSM}px`,
                    cursor: 'grab',
                    [`&:before`]: {
                        display: 'block',
                        width: `${token.fontSize}px`,
                        height: `${token.fontSize}px`,
                        lineHeight: `${token.fontSize}px`,
                        fontSize: token.fontSize,
                        textAlign: 'center',
                        content: `url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSI2NCA2NCA4OTYgODk2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZm9jdXNhYmxlPSJmYWxzZSIgZmlsbD0icmdiYSgwLCAwLCAwLCAwLjY1KSI+PHBhdGggZD0iTTMwMCAyNzYuNWE1NiA1NiAwIDEwNTYtOTcgNTYgNTYgMCAwMC01NiA5N3ptMCAyODRhNTYgNTYgMCAxMDU2LTk3IDU2IDU2IDAgMDAtNTYgOTd6TTY0MCAyMjhhNTYgNTYgMCAxMDExMiAwIDU2IDU2IDAgMDAtMTEyIDB6bTAgMjg0YTU2IDU2IDAgMTAxMTIgMCA1NiA1NiAwIDAwLTExMiAwek0zMDAgODQ0LjVhNTYgNTYgMCAxMDU2LTk3IDU2IDU2IDAgMDAtNTYgOTd6TTY0MCA3OTZhNTYgNTYgMCAxMDExMiAwIDU2IDU2IDAgMDAtMTEyIDB6Ii8+PC9zdmc+")`
                    }
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
                        margin: `0 ${(token.controlHeightSM - token.controlInteractiveSize) / 2}px 0 0`,
                        top: 0
                    }
                },
                [`${antCls}-tree-treenode-disabled`]: {
                    [`${antCls}-tree-indent`]: {
                        cursor: 'not-allowed',
                        [`&:before`]: {
                            display: 'none'
                        }
                    }
                }
            }
        }
    }
}

export default genComponentStyleHook('ProTableColumnSettingTreeList', (token) => {
    return [genBaseStyle(token)]
})
