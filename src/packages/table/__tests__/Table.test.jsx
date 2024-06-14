import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Table } from '../index'
import ColumnSetting from '../components/column-setting'
import { Tooltip } from 'ant-design-vue'

describe('Table', () => {
    it('render', async () => {
        const wrapper = mount(Table, {
            props: {
                columns: [
                    {
                        title: 'test1',
                        dataIndex: 'test1'
                    },
                    {
                        title: 'test2',
                        dataIndex: 'test2'
                    }
                ],
                dataSource: [
                    {
                        test1: 'test1',
                        test2: 'test2'
                    }
                ]
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        // column-setting
        const columnSetting = wrapper.findComponent(ColumnSetting)
        const button = columnSetting.get('button')
        button.trigger('click')
    })

    it('render slots', async () => {
        const wrapper = mount(Table, {
            props: {
                columns: [
                    {
                        title: 'test1',
                        dataIndex: 'test1'
                    },
                    {
                        title: 'test2',
                        dataIndex: 'test2'
                    }
                ],
                request: () => {
                    return Promise.resolve({
                        data: [
                            {
                                test1: 'test1',
                                test2: 'test2'
                            }
                        ]
                    })
                }
            },
            slots: {
                extra: () => {
                    return (<Tooltip>Extra</Tooltip>)
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
