import { genComponentStyleHook } from '../../../../theme'

function genBaseStyle (token) {
    const { componentCls, iconCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-collapse-button`]: {
                padding: 0,
                [iconCls]: {
                    marginInlineStart: token.sizeXXS
                }
            }
        }
    }
}

export default genComponentStyleHook('ProQueryFilterActions', (token) => {
    return [genBaseStyle(token)]
})
