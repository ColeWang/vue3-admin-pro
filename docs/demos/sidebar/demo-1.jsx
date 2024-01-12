import { defineComponent, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { Sidebar } from '@/packages/index.mjs'

export default defineComponent({
    setup () {
        const collapsed = ref(false)

        const route = ref({
            name: 'menu-1',
            meta: { title: '菜单一' }
        })

        const menus = ref([
            {
                name: 'menu-1',
                meta: { title: '菜单一' }
            },
            {
                name: 'menu-2',
                meta: { title: '菜单二' }
            },
            {
                name: 'menu-3',
                meta: { title: '菜单三' }
            },
        ])

        function onChange (name) {
            const value = unref(menus).find((item) => {
                return name === item.name
            })
            if (value) {
                route.value = value
            }
        }

        function onClick () {
            collapsed.value = !collapsed.value
        }

        return () => {
            const sidebarProps = {
                route: unref(route),
                collapsed: unref(collapsed),
                menus: unref(menus)
            }

            return (
                <div>
                    <Button style={{ marginBottom: '24px' }} onClick={onClick}>折叠/展开</Button>
                    <Sidebar {...sidebarProps} onChange={onChange}/>
                </div>
            )
        }
    }
})
