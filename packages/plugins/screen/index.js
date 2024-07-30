import { inject, reactive } from 'vue'
import { addClass, getWindowSize, on, removeClass } from '../../utils/dom'
import { debounce, pick } from 'lodash-es'

const SIZE_LIST = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

const BaseKey = Symbol('Screen')

export function createScreen (options) {
    const { sizes = {}, delay = 16, classes } = options || {}

    const baseSizes = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1600
    }

    const needSizes = pick({ ...baseSizes, ...sizes }, SIZE_LIST)

    const screen = reactive({
        width: 0,
        height: 0,
        name: 'xs',
        sizes: needSizes,
        lt: {
            sm: true,
            md: true,
            lg: true,
            xl: true,
            xxl: true
        },
        gt: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false
        },
        xs: true,
        sm: false,
        md: false,
        lg: false,
        xl: false,
        xxl: false
    })

    function update () {
        const [width, height] = getWindowSize()
        const { sizes } = screen

        screen.width = width
        screen.height = height

        screen.lt.sm = width < sizes.sm
        screen.lt.md = width < sizes.md
        screen.lt.lg = width < sizes.lg
        screen.lt.xl = width < sizes.xl
        screen.lt.xxl = width < sizes.xxl

        screen.gt.xs = width >= sizes.sm
        screen.gt.sm = width >= sizes.md
        screen.gt.md = width >= sizes.lg
        screen.gt.lg = width >= sizes.xl
        screen.gt.xl = width >= sizes.xxl

        screen.xs = screen.lt.sm
        screen.sm = screen.gt.xs === false && screen.lt.md === true
        screen.md = screen.gt.sm === false && screen.lt.lg === true
        screen.lg = screen.gt.md === false && screen.lt.xl === true
        screen.xl = screen.gt.lg === false && screen.lt.xxl === true
        screen.xxl = screen.gt.xl

        const name = (screen.xs === true && 'xs')
            || (screen.sm === true && 'sm')
            || (screen.md === true && 'md')
            || (screen.lg === true && 'lg')
            || (screen.xl === true && 'xl')
            || 'xxl'

        if (name !== screen.name) {
            if (classes === true) {
                removeClass(document.body, `screen--${screen.name}`)
                addClass(document.body, `screen--${name}`)
            }
            screen.name = name
        }
    }

    const updateEvent = debounce(update, delay)

    return {
        install: (app) => {
            // @todo visualViewport
            on(window, 'resize', updateEvent, { passive: true })

            update()

            if (classes === true && screen.name === 'xs') {
                addClass(document.body, `screen--xs`)
            }

            app.provide(BaseKey, screen)
        }
    }
}

export function useScreen () {
    return inject(BaseKey, {})
}
