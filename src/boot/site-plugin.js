import { createSite } from '@site'

export default ({ app }) => {
    const site = createSite({
        screen: {
            classes: true
        }
    })
    // 注入
    app.use(site)
}
