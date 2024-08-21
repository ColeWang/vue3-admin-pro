import { defineComponent, Fragment, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { Transition } from '@site/components'
import { Loading, useSite } from '@site/plugins'

export default defineComponent({
    inheritAttrs: false,
    name: 'ExamplesTest',
    setup () {
        const $site = useSite()

        const open = ref(true)

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

        function onClickOpen () {
            open.value = !open.value
        }

        return () => {
            return (
                <Fragment>
                    <Button onClick={onClick}>点击</Button>
                    <Button onClick={onClickLoading}>点击 Loading</Button>
                    <Button onClick={onClickOpen}>点击 Transition</Button>
                    <Transition>
                        <div v-show={unref(open)} style={{ background: 'pink' }}>
                            <div>Transition</div>
                            <div>Transition</div>
                            <div>Transition</div>
                            <div>Transition</div>
                        </div>
                    </Transition>
                </Fragment>
            )
        }
    }
})
