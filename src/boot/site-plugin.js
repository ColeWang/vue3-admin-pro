import { createSite } from '@site/plugins'

export default ({ app }) => {
    const site = createSite({
        screen: {
            classes: true
        }
    })
    // 注入
    app.use(site)
}
