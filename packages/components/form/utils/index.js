export function genFormItemFixStyle (labelWidth, layout) {
    if (labelWidth && layout !== 'vertical' && labelWidth !== 'auto') {
        return {
            labelCol: {
                flex: `0 0 ${labelWidth}px`,
            },
            wrapperCol: {
                style: {
                    maxWidth: `calc(100% - ${labelWidth}px)`,
                }
            },
            style: {
                flexWrap: 'nowrap'
            }
        }
    }
    return {}
}
