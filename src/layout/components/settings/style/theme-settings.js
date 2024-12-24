import { genComponentStyleHook, mergeToken } from '@site-pro/components/theme'

function genBaseStyle (token) {
    const { componentCls, iconCls } = token
    const themeBlock = {
        [`${componentCls}-theme-block`]: {
            display: 'flex',
            [`${componentCls}-theme`]: {
                position: 'relative',
                width: token.controlHeight * 2,
                height: token.controlHeight * 1.5,
                borderRadius: token.borderRadius,
                marginInlineEnd: token.sizeMS,
                backgroundColor: '#f5f5f5',
                border: `1px solid ${token.colorBorder}`,
                cursor: 'pointer',
                overflow: 'hidden',
                [`&:after`]: {
                    position: 'absolute',
                    insetBlockStart: 0,
                    insetInlineStart: 0,
                    width: '100%',
                    height: '25%',
                    backgroundColor: '#ffffff',
                    content: '""'
                },
                [`&:before`]: {
                    position: 'absolute',
                    insetBlockStart: 0,
                    insetInlineStart: 0,
                    width: '33%',
                    height: '100%',
                    backgroundColor: '#ffffff',
                    zIndex: 1,
                    content: '""'
                },
                [`&-dark`]: {
                    [`&:before`]: {
                        backgroundColor: '#001529',
                    }
                },
                [`&-real-dark`]: {
                    backgroundColor: '#262626',
                    [`&:after`]: {
                        backgroundColor: '#181818'
                    },
                    [`&:before`]: {
                        backgroundColor: '#181818',
                    }
                },
                [`${iconCls}`]: {
                    position: 'absolute',
                    insetInlineEnd: token.sizeXXS,
                    insetBlockEnd: token.sizeXXS,
                    fontSize: token.fontSize,
                    color: token.colorPrimary
                }
            }
        }
    }

    const primaryBlock = {
        [`${componentCls}-primary-block`]: {
            display: 'flex',
            [`${componentCls}-primary`]: {
                width: token.controlHeight / 2 + 4,
                height: token.controlHeight / 2 + 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: token.borderRadiusSM,
                marginInlineEnd: token.sizeSM,
                cursor: 'pointer',
                [`${iconCls}`]: {
                    fontSize: token.fontSize,
                    color: token.colorWhite
                }
            }
        }
    }

    return {
        [componentCls]: {
            [`${componentCls}-block-wrapper`]: {
                marginBlockEnd: token.sizeLG
            },
            [`${componentCls}-title`]: {
                fontSize: token.fontSizeLG,
                lineHeight: token.lineHeightLG,
                color: token.colorText,
                fontWeight: token.fontWeightStrong,
                marginBlockEnd: token.sizeSM
            },
            ...themeBlock,
            ...primaryBlock
        }
    }
}

export default genComponentStyleHook('ProSettingsTheme', (token) => {
    return [genBaseStyle(token)]
})
