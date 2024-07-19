import { genComponentStyleHook, mergeToken } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, treeListMinWidth } = token
    return {
        [componentCls]: {
            position: 'relative',
            [`${componentCls}-title`]: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: token.fontSize,
                color: token.colorText,
                lineHeight: token.lineHeight,
                fontWeight: token.fontWeightStrong
            },
            [`${componentCls}-tree-list-group`]: {
                minWidth: treeListMinWidth,
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }
}

export default genComponentStyleHook('ProTableColumnSetting', (token) => {
    const treeListMinWidth = 200

    const columnSettingToken = mergeToken(token, {
        treeListMinWidth
    })
    return [genBaseStyle(columnSettingToken)]
})
