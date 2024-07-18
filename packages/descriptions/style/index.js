import { genComponentStyleHook } from '../../_utils/extend'

const useStyle = genComponentStyleHook('Descriptions', (token) => {
    const { componentCls } = token
    return {
        [componentCls]: {}
    }
})

export default useStyle
