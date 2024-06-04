import { computed, defineComponent, unref } from 'vue'
import { Action, Table } from '@/components/table'
import { ModalForm, Number, Text } from '@/components/form'
import { default as Descs } from '@/components/descriptions'
import { Button, Card } from 'ant-design-vue'

export default defineComponent({
    name: 'HomeIndex',
    setup () {
        const columns = computed(() => {
            return [
                {
                    title: 'Name',
                    search: true,
                    dataIndex: 'name',
                    formItemProps: {
                        tooltip: 'Name'
                    }
                },
                {
                    title: 'Tel',
                    search: true,
                    copyable: true,
                    dataIndex: 'tel'
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
                    title: 'Address',
                    search: true,
                    dataIndex: 'address'
                }
            ]
        })

        function onAlertClick (rows, keys) {
            console.log(rows, keys)
        }

        function onFinish (values) {
            console.log(values)
            return Promise.resolve(true)
        }

        function request (params, paginate, filter, sort) {
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
                rowSelection: true
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
                    <Action onClick={onAlertClick.bind(null, rows, keys)}>
                        批量编辑
                    </Action>
                ),
                extra: ({ pageData }) => (
                    <Card bodyStyle={{ padding: '24px 24px 17px' }}>
                        <Descs size={'small'} column={3} model={pageData}>
                            <Descs.Item label={'Row'}>
                                <Descs.Field name={['length']}/>
                            </Descs.Item>
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
