import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
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
                minWidth: 200,
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }
}

export default genComponentStyleHook('ProTableColumnSetting', (token) => {
    return [genBaseStyle(token)]
})
