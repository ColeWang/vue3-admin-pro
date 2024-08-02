import { createReactivePlugin } from '../../utils/create'

const Plugin = createReactivePlugin({
    isActive: false
}, {
    show (options) {
    },
    hide () {

    },
    install (app, options, $site) {
        $site && ($site.loading = this)
    }
})

export default Plugin
