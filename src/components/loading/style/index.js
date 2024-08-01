import { genComponentStyleHook } from '@site/utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {

        }
    }
}

export default genComponentStyleHook('ProLoading', (token) => {

    return [genBaseStyle(token)]
})
