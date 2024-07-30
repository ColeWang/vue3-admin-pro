import { genComponentStyleHook, mergeToken } from '../../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, listMinWidth } = token
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
                minWidth: listMinWidth,
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }
}

export default genComponentStyleHook('ProTableSetting', (token) => {
    const listMinWidth = token.controlHeightSM * 8

    const columnSettingToken = mergeToken(token, {
        listMinWidth
    })
    return [genBaseStyle(columnSettingToken)]
})
