import { genComponentStyleHook } from '../../../../_utils/extend'

function genBaseStyle (token) {
    const { componentCls, iconCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-collapse-button`]: {
                padding: 0,
                [iconCls]: {
                    marginInlineStart: token.marginXS / 2
                }
            }
        }
    }
}

export default genComponentStyleHook('ProQueryFilterActions', (token) => {
    return [genBaseStyle(token)]
})
