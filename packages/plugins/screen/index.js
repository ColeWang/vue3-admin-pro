import { createReactivePlugin } from '../../utils/create'
import { addClass, getWindowSize, removeClass } from '../../utils/dom'
import { addEvt } from '../../utils/event'
import { debounce, pick } from 'lodash-es'

const SIZE_LIST = ['sm', 'md', 'lg', 'xl', 'xxl']

export default createReactivePlugin({
    width: 0,
    height: 0,
    name: 'xs',
    sizes: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1600
    },
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
}, {
    install (app, options, $site) {
        const { sizes = {}, delay = 16, classes } = options || {}

        $site && ($site.screen = this)

        this.sizes = pick({ ...this.sizes, ...sizes }, SIZE_LIST)

        const update = () => {
            const [width, height] = getWindowSize()
            const { sizes } = this

            this.width = width
            this.height = height

            this.lt.sm = width < sizes.sm
            this.lt.md = width < sizes.md
            this.lt.lg = width < sizes.lg
            this.lt.xl = width < sizes.xl
            this.lt.xxl = width < sizes.xxl

            this.gt.xs = width >= sizes.sm
            this.gt.sm = width >= sizes.md
            this.gt.md = width >= sizes.lg
            this.gt.lg = width >= sizes.xl
            this.gt.xl = width >= sizes.xxl

            this.xs = this.lt.sm
            this.sm = this.gt.xs === true && this.lt.md === true
            this.md = this.gt.sm === true && this.lt.lg === true
            this.lg = this.gt.md === true && this.lt.xl === true
            this.xl = this.gt.lg === true && this.lt.xxl === true
            this.xxl = this.gt.xl

            const name = (this.xs === true && 'xs')
                || (this.sm === true && 'sm')
                || (this.md === true && 'md')
                || (this.lg === true && 'lg')
                || (this.xl === true && 'xl')
                || 'xxl'

            if (name !== this.name) {
                if (classes === true) {
                    removeClass(document.body, `screen--${this.name}`)
                    addClass(document.body, `screen--${name}`)
                }
                this.name = name
            }
        }

        const updateEvent = debounce(update, delay)
        // @todo visualViewport
        addEvt(window, 'resize', updateEvent, { passive: true })

        update()

        if (classes === true && this.name === 'xs') {
            addClass(document.body, `screen--xs`)
        }
    }
})
