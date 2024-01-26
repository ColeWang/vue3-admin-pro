import { computed, defineComponent, unref, ref } from 'vue'
import { Button } from 'ant-design-vue'
import { Table } from '@/components/table'
import LocaleProvider from '@/components/locale-provider'
import zhCN from '@/components/locale-provider/lang/zh-CN'
import enUS from '@/components/locale-provider/lang/en-US'
import { useI18n } from 'vue-i18n'

export default defineComponent({
    setup () {
        const comLocale = ref(zhCN)

        const { t, locale, getLocaleMessage } = useI18n({
            messages: {
                'zh-CN': {
                    component: zhCN,
                    name: '名字',
                    age: '年龄'
                },
                'en-US': {
                    component: enUS,
                    name: 'Name',
                    age: 'Age'
                }
            }
        })

        const columns = computed(() => {
            return [
                {
                    title: t('name'),
                    search: true,
                    dataIndex: 'name'
                },
                {
                    title: t('age'),
                    search: true,
                    dataIndex: 'age'
                }
            ]
        })

        function onClick (value) {
            locale.value = value
            const { component } = getLocaleMessage(value)
            comLocale.value = component
        }

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        age: 32
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        age: 42
                    }
                ]

                setTimeout(() => {
                    resolve({ data: data })
                }, 500)
            })
        }

        return () => {
            const tableProps = {
                columns: unref(columns),
                request: request
            }

            const tableSlots = {
                toolbar: () => {
                    return [
                        <Button onClick={onClick.bind(null, 'zh-CN')}>zh-CN</Button>,
                        <Button onClick={onClick.bind(null, 'en-US')}>en-US</Button>
                    ]
                }
            }

            return (
                <LocaleProvider locale={unref(comLocale)}>
                    <Table {...tableProps} v-slots={tableSlots}/>
                </LocaleProvider>
            )
        }
    }
})
