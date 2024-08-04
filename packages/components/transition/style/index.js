import { genComponentStyleHook } from '../../../utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [`${componentCls}`]: {
            [`${componentCls}-collapse`]: {
                transition: 'height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
                overflow: 'hidden'
            }
        }
    }
}

export default genComponentStyleHook('ProTransition', (token) => {
    return [genBaseStyle(token)]
})
