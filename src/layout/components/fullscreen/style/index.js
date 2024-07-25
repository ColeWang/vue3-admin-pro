import { genComponentStyleHook } from '@utils/extend'

function genBaseStyle (token) {
    const { componentCls } = token
    return {
        [componentCls]: {
            height: '100%',
            fontSize: token.fontSizeLG,
            color: token.colorText,
            lineHeight: token.lineHeightLG,
            paddingInline: token.fontSizeSM,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            [`&:hover`]: {
                color: token.colorPrimaryHover,
                background: token.colorFillQuaternary
            },
            [`&:active`]: {
                color: token.colorPrimaryActive,
                background: token.colorFillQuaternary
            }
        }
    }
}

export default genComponentStyleHook('ProFullscreen', (token) => {
    return [genBaseStyle(token)]
})
