import { defineComponent, ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { TagsNav } from '@/packages/index.mjs'

export default defineComponent({
    setup () {
        let key = 3

        const route = ref({
            name: 'menu-1',
            meta: { title: '菜单一' }
        })


        const tags = ref([
            {
                name: 'menu-1',
                meta: { title: '菜单-1' }
            },
            {
                name: 'menu-2',
                meta: { title: '菜单-2' }
            },
            {
                name: 'menu-3',
                meta: { title: '菜单-3' }
            },
        ])

        function onClick (current) {
            route.value = current
        }

        function onClose (values, toName) {
            tags.value = values
            if (toName) {
                const value = unref(values).find((item) => {
                    return toName === item.name
                })
                if (value) {
                    route.value = value
                }
            }
        }

        function onAddClick () {
            key += 1
            const next = {
                name: `menu-${key}`,
                meta: { title: `菜单-${key}` }
            }
            tags.value = [...unref(tags), next]
        }

        return () => {
            const tagsNavProps = {
                homeName: 'menu-1',
                route: unref(route),
                tags: unref(tags),
                onClick: onClick,
                onClose: onClose
            }

            return (
                <div>
                    <Button style={{ marginBottom: '24px' }} onClick={onAddClick}>添加标签</Button>
                    <TagsNav {...tagsNavProps}/>
                </div>
            )
        }
    }
})
