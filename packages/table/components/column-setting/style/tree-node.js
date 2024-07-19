import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls, iconCls } = token
    return {
        [componentCls]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [`${componentCls}-title`]: {
                maxWidth: 168,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            },
            [`${componentCls}-option`]: {
                width: `${token.fontSize * 2 + token.paddingXS * 2 + token.paddingXS / 2}px`,
                [`${componentCls}-option-icon`]: {
                    paddingInline: token.paddingXS,
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
    return [genBaseStyle(token)]
})
