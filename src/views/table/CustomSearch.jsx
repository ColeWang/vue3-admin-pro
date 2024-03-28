import { defineComponent, Fragment, ref, unref } from 'vue'
import { Button, Card, Descriptions } from 'ant-design-vue'
import { CustomFields } from '@/components/base-field'
import { HocField, Radio, Select } from '@/components/form'
import { Action, ActionGroup, BaseSearch, Table } from '@/components/table'

const Test = HocField('test')

export default defineComponent({
    name: 'TableCustomSearch',
    setup () {
        const model = ref({
            age: '1',
            radio: '1'
        })

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Radio',
                dataIndex: 'radio',
                valueEnum: {
                    '1': '选项一',
                    '2': '选项二'
                }
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Action',
                customRender: () => {
                    return (
                        <ActionGroup>
                            <Action>操作</Action>
                        </ActionGroup>
                    )
                }
            }
        ]

        function request (params, paginate, filter, sort) {
            return new Promise((resolve) => {
                console.log(params)
                console.log(unref(model))

                const data = [
                    {
                        key: '1',
                        name: 'John Brown',
                        radio: '1',
                        address: 'New York No. 1 Lake Park',
                    },
                    {
                        key: '2',
                        name: 'Jim Green',
                        radio: ['2', '1'],
                        address: 'London No. 1 Lake Park',
                    }
                ]

                setTimeout(() => {
                    resolve({ data: data })
                }, 1000)
            })
        }

        return () => {
            const tableProps = {
                columns: columns,
                request: request,
                rowSelection: true,
                toolbar: { export: false },
                options: false
            }

            return (
                <div>
                    <CustomFields valueTypeMap={{
                        test: (text, props) => {
                            console.log(typeof text, props)
                            return '123'
                        }
                    }}>
                        <Table {...tableProps} v-slots={{
                            search: (slotScope) => (
                                <BaseSearch {...slotScope} span={12} model={unref(model)}>
                                    <Select
                                        label={'Age'}
                                        name={'age'}
                                        required={true}
                                        valueEnum={{
                                            '1': '选项一',
                                            '2': '选项二',
                                        }}
                                    />
                                    <Radio
                                        label={'Radio'}
                                        name={'radio'}
                                        required={true}
                                        fieldProps={{ optionType: 'button' }}
                                        valueEnum={{
                                            '1': '选项一',
                                            '2': '选项二',
                                        }}
                                    />
                                    <Test
                                        label={'Test'}
                                        name={'test'}
                                    />
                                </BaseSearch>
                            ),
                            actions: () => (
                                <Fragment>
                                    <Button>123</Button>
                                    <Button>321</Button>
                                </Fragment>
                            ),
                            title: () => 'Title',
                            alertOptions: () => (
                                <Fragment>
                                    <Action>批量下载</Action>
                                    <Action>批量编辑</Action>
                                </Fragment>
                            ),
                            extra: () => (
                                <Card bodyStyle={{ padding: '24px 24px 17px' }}>
                                    <Descriptions size={'small'} column={3}>
                                        <Descriptions.Item label={'Row'}>10</Descriptions.Item>
                                        <Descriptions.Item label={'Created'}>Cole</Descriptions.Item>
                                        <Descriptions.Item label={'Association'}>
                                            <a>421421</a>
                                        </Descriptions.Item>
                                        <Descriptions.Item label={'Creation Time'}>
                                            2017-01-10
                                        </Descriptions.Item>
                                        <Descriptions.Item label={'Effective Time'}>
                                            2017-10-10
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            )
                        }}/>
                    </CustomFields>
                </div>
            )
        }
    }
})