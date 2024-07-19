import { ref, unref, watch } from 'vue'
import tryOnScopeDispose from './tryOnScopeDispose'
import { isNil, mapValues } from 'lodash-es'

// const defaultValues = {
//     xs: '(max-width: 575px)',
//     sm: '(min-width: 576px) and (max-width: 767px)',
//     md: '(min-width: 768px) and (max-width: 991px)',
//     lg: '(min-width: 992px) and (max-width: 1199px)',
//     xl: '(min-width: 1200px) and (max-width: 1599px)',
//     xxl: '(min-width: 1600px)'
// }

const defaultValues = {
    xs: [null, 575],
    sm: [576, 767],
    md: [768, 991],
    lg: [992, 1199],
    xl: [1200, 1599],
    xxl: [1600, null]
}

function genMediaQueryEnum (values) {
    const inner = (key, width) => {
        if (key && width) {
            return `(${key}: ${width}px)`
        }
        return null
    }

    return mapValues(values, (value) => {
        const minWidth = inner('min-width', value[0])
        const maxWidth = inner('max-width', value[1])
        if (isNil(minWidth) || isNil(maxWidth)) {
            return minWidth || maxWidth
        }
        return `${minWidth} and ${maxWidth}`
    })
}

function onMediaQuery (mediaQuery) {
    const mediaQueryList = window.matchMedia(mediaQuery)
    const matches = ref(mediaQueryList.matches)
    const listener = (e) => {
        matches.value = e.matches
    }
    mediaQueryList.addListener(listener)

    function onStop () {
        mediaQueryList.removeListener(listener)
    }

    tryOnScopeDispose(onStop)
    return matches
}

export default function (values = defaultValues) {
    const mediaQueryEnum = genMediaQueryEnum(values)
    const matchesEnum = mapValues(mediaQueryEnum, (value) => onMediaQuery(value))

    const className = ref('md')

    const stopWatch = watch(() => matchesEnum, (values) => {
        const name = Object.keys(values).find((key) => unref(values[key]))
        if (name && name !== unref(className)) {
            setClassName(name)
        }
    }, { immediate: true, deep: true })

    function setClassName (value) {
        className.value = value
    }

    function onStop () {
        stopWatch && stopWatch()
    }

    tryOnScopeDispose(onStop)

    return { className, onStop }
}
