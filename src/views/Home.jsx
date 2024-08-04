import { computed, defineComponent, unref } from 'vue'
import { Button, Card } from 'ant-design-vue'
import { Action, Descriptions as Descs, ModalForm, Number, Table, Text, useSite } from '@site'

export default defineComponent({
    inheritAttrs: false,
    name: 'HomeIndex',
    setup () {
        const $site = useSite()

        const columns = computed(() => {
            return [
                {
                    title: 'Name',
                    search: true,
                    dataIndex: 'name',
                    formItemProps: {
                        tooltip: 'Name'
                    },
                    disabled: true,
                    sorter: true
                },
                {
                    title: 'Tel',
                    search: true,
                    copyable: true,
                    dataIndex: 'tel',
                    hideInSetting: true
                },
                {
                    title: 'Age',
                    search: true,
                    dataIndex: 'age'
                },
                {
                    title: 'Phone',
                    search: true,
                    dataIndex: 'phone'
                },
                {
                    title: 'Addres',
                    search: true,
                    dataIndex: 'address'
                }
            ]
        })

        function onExport (value) {
            console.log(value)
        }

        function onAlertClick (rows, keys) {
            console.log(rows, keys)
        }

        function onFinish (values) {
            console.log(values)
            return Promise.resolve(true)
        }

        function request (params, paginate, filter, sort) {
            console.log(params, paginate, filter, sort)
            return new Promise((resolve) => {
                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        age: 32,
                        tel: '0571-22098909',
                        phone: 18889898989,
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        tel: '0571-22098333',
                        phone: 18889898888,
                        age: 42,
                        address: 'London No. 1 Lake Park',
                    },
                    {
                        key: '3',
                        name: 'Joe Black',
                        age: 32,
                        tel: '0575-22098909',
                        phone: 18900010002,
                        address: 'Sidney No. 1 Lake Park',
                    },
                    {
                        key: '4',
                        name: 'Jim Red',
                        age: 18,
                        tel: '0575-22098909',
                        phone: 18900010002,
                        address: 'London No. 2 Lake Park',
                    },
                    {
                        key: '5',
                        name: 'Jake White',
                        age: 18,
                        tel: '0575-22098909',
                        phone: 18900010002,
                        address: 'Dublin No. 2 Lake Park',
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
                request: request,
                search: { showCollapse: true },
                toolbar: { options: { export: true } },
                rowSelection: true,
                onExport: onExport
            }

            const tableSlots = {
                title: () => 'Title',
                actions: () => (
                    <ModalForm
                        title={'编辑'}
                        grid={true}
                        width={512}
                        onFinish={onFinish}
                        v-slots={{
                            trigger: () => <Button type={'primary'}>Add</Button>
                        }}
                    >
                        <Text
                            label={'文本'}
                            name={'text'}
                            colProps={{ span: 12 }}
                        />
                        <Number
                            label={'数字'}
                            name={'number'}
                            colProps={{ span: 12 }}
                        />
                    </ModalForm>
                ),
                alertOptions: ({ rows, keys }) => (
                    <Action.Group max={$site.screen.lt.sm ? 1 : 3}>
                        <Action onClick={onAlertClick.bind(null, rows, keys)}>
                            批量编辑
                        </Action>
                        <Action onClick={onAlertClick.bind(null, rows, keys)}>
                            批量编辑
                        </Action>
                    </Action.Group>
                ),
                extra: ({ pageData }) => (
                    <Card>
                        <Descs size={'small'}>
                            <Descs.Item label={'Row'}>{pageData.length}</Descs.Item>
                            <Descs.Item label={'Created'}>Cole</Descs.Item>
                            <Descs.Item label={'Association'}>
                                <a>Dublin No. 2 Lake Park</a>
                            </Descs.Item>
                            <Descs.Item label={'Creation Time'}>
                                2024-04-09
                            </Descs.Item>
                            <Descs.Item label={'Effective Time'}>
                                2024-04-09
                            </Descs.Item>
                        </Descs>
                    </Card>
                )
            }

            return (
                <Table {...tableProps} v-slots={tableSlots}/>
            )
        }
    }
})
