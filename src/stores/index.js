import { createPinia } from 'pinia'

export default () => {
    const pinia = createPinia()

    // You can add Pinia plugins here
    // pinia.use(SomePiniaPlugin)

    return pinia
}
