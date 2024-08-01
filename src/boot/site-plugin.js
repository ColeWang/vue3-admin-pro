import { createSite } from '@site'

export default ({ app }) => {
    const site = createSite()
    // 注入
    app.use(site)
}
