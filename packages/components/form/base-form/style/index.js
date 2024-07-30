import { genComponentStyleHook } from '../../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls, antCls } = token
    return {
        [componentCls]: {
            [`${componentCls}-popup-container`]: {
                position: 'relative'
            },
            [`${antCls}-form`]: {}
        }
    }
}

export default genComponentStyleHook('ProBaseForm', (token) => {
    return [genBaseStyle(token)]
})
