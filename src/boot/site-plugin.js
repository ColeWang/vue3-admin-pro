import { createSite } from '@site-pro/plugins'

export default ({ app }) => {
    const site = createSite({
        screen: {
            classes: true
        }
    })
    // 注入
    app.use(site)
}
