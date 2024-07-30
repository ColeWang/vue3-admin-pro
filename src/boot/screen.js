import { createScreen } from '@packages/plugins/screen'

export default ({ app }) => {
    const screen = createScreen({ classes: true })
    // 屏幕插件
    app.use(screen)
}
