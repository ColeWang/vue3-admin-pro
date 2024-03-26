import { defineComponent, ref, unref } from 'vue'
import { Checkbox, Radio, Select, Slider, Switch } from '@/components/form'
import { Action, ActionGroup, BaseSearch, Table } from '@/components/table'
import dayjs from 'dayjs'

export default defineComponent({
    name: 'TableCustomSearch',
    setup () {
        const model = ref({
            age: '1',
            radio: '1',
            checkbox: ['1', '2', '3', '4', '5', '6'],
            slider: [10, 80]
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
                request: request
            }

            return (
                <div>
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
                                <Switch
                                    label={'Switch'}
                                    name={'switch'}
                                />
                                <Checkbox
                                    label={'Box'}
                                    name={'checkbox'}
                                    valueEnum={{
                                        '1': '选项一',
                                        '2': '选项二',
                                        '3': '选项一',
                                        '4': '选项二',
                                        '5': '选项一',
                                        '6': '选项二',
                                    }}
                                />
                                <Slider
                                    label={'Slider'}
                                    name={'slider'}
                                    mode={'read'}
                                    fieldProps={{ range: true }}
                                />
                            </BaseSearch>
                        )
                    }}/>
                </div>
            )
        }
    }
})