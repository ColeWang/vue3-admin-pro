const SIZE = {
    fontSize: 14,

    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeXL: 20,

    fontSizeHeading5: 16,
    fontSizeHeading4: 20,
    fontSizeHeading3: 24,
    fontSizeHeading2: 30,
    fontSizeHeading1: 38,

    lineHeight: 22, // (fontSize + 8) / fontSize
    lineHeightSM: 20, // (fontSize + 8) / fontSize
    lineHeightLG: 24, // (fontSize + 8) / fontSize
    lineHeightXL: 28, // (fontSize + 8) / fontSize

    lineHeightHeading5: 24,
    lineHeightHeading4: 28,
    lineHeightHeading3: 32,
    lineHeightHeading2: 38,
    lineHeightHeading1: 46,

    // Size
    sizeUnit: 4,
    sizeStep: 4,

    // Control Base
    controlHeight: 32,
    controlHeightSM: controlHeight * 0.75, // 24
    controlHeightXS: controlHeight * 0.5, // 16
    controlHeightLG: controlHeight * 1.25, // 40

    sizeXXL: sizeUnit * (sizeStep + 8), // 48
    sizeXL: sizeUnit * (sizeStep + 4), // 32
    sizeLG: sizeUnit * (sizeStep + 2), // 24
    sizeMD: sizeUnit * (sizeStep + 1), // 20
    sizeMS: sizeUnit * sizeStep, // 16
    size: sizeUnit * sizeStep, // 16
    sizeSM: sizeUnit * (sizeStep - 1), // 12
    sizeXS: sizeUnit * (sizeStep - 2), // 8
    sizeXXS: sizeUnit * (sizeStep - 3), // 4

    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,

    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,

    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,

    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
}

const compactSize = {
    fontSize: 12,

    fontSizeSM: 10,
    fontSizeLG: 14,
    fontSizeXL: 16,

    fontSizeHeading5: 14,
    fontSizeHeading4: 16,
    fontSizeHeading3: 20,
    fontSizeHeading2: 26,
    fontSizeHeading1: 32,

    lineHeight: 20, // (fontSize + 8) / fontSize
    lineHeightSM: 18, // (fontSize + 8) / fontSize
    lineHeightLG: 22, // (fontSize + 8) / fontSize
    lineHeightXL: 24, // (fontSize + 8) / fontSize

    lineHeightHeading5: 22,
    lineHeightHeading4: 24,
    lineHeightHeading3: 28,
    lineHeightHeading2: 32,
    lineHeightHeading1: 40,

    controlHeight: controlHeight - 4, // 28
    controlHeightSM: controlHeight * 0.75, // 21
    controlHeightXS: controlHeight * 0.5, // 14
    controlHeightLG: controlHeight * 1.25, // 35

    // const compactSizeStep = sizeStep - 2
    sizeXXL: sizeUnit * (compactSizeStep + 10), // 48
    sizeXL: sizeUnit * (compactSizeStep + 6), // 32
    sizeLG: sizeUnit * (compactSizeStep + 2), // 16
    sizeMD: sizeUnit * (compactSizeStep + 2), // 16
    sizeMS: sizeUnit * (compactSizeStep + 1), // 12
    size: sizeUnit * compactSizeStep, // 8
    sizeSM: sizeUnit * compactSizeStep, // 8
    sizeXS: sizeUnit * (compactSizeStep - 1), // 4
    sizeXXS: sizeUnit * (compactSizeStep - 1), // 4
}
