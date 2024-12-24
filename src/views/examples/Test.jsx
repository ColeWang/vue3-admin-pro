import { defineComponent, Fragment } from 'vue'
import { Button } from 'ant-design-vue'
import { Loading, useSite } from '@site-pro/plugins'

export default defineComponent({
    inheritAttrs: false,
    name: 'ExamplesTest',
    setup () {
        const $site = useSite()

        function onClick () {
            $site.loading.show()
            setTimeout(() => {
                $site.loading.hide()
            }, 1500)
        }

        function onClickLoading () {
            Loading.show()
            setTimeout(() => {
                Loading.hide()
            }, 1500)
        }

        return () => {
            return (
                <Fragment>
                    <Button onClick={onClick}>点击</Button>
                    <Button onClick={onClickLoading}>点击 Loading</Button>
                </Fragment>
            )
        }
    }
})
