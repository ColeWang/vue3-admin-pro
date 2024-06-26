import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { last } from 'lodash-es'
import { Tooltip } from 'ant-design-vue'
import { BaseSearch, EditableTable, Table } from '../index'
import Search from '../compatible/search'
import Toolbar from '../compatible/toolbar'
import Alert from '../compatible/alert'
import { BaseForm, Text } from '../../form'
import mountTest from '../../../../tests/shared/mountTest'

describe('Table', () => {
    mountTest(Table)
    mountTest(EditableTable)
    mountTest(BaseSearch)
    // ---
    mountTest(Search)
    mountTest(Toolbar)
    mountTest(Alert)

    it(`test BaseSearch`, async () => {
        const wrapper = mount(BaseSearch, {
            slots: {
                default: () => {
                    return [
                        <Text name={'demo'}/>
                    ]
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`test Table Search`, async () => {
        const onValuesChange = vi.fn()
        const wrapper = mount(Table, {
            props: {
                search: { onValuesChange: onValuesChange },
                columns: [
                    {
                        title: 'Title 1',
                        dataIndex: 'demo1',
                        search: true,
                        initialValue: 'demo 1 value'
                    },
                    {
                        title: 'Title 2',
                        dataIndex: ['demo2'],
                        search: true,
                        initialValue: 'demo 2 value'
                    },
                    {
                        title: 'Title 3',
                        dataIndex: [null],
                        search: true
                    }
                ]
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        const baseForm = wrapper.findComponent(BaseForm)
        const changeEvents = baseForm.emitted('valuesChange')
        expect(last(changeEvents)).toEqual([{
            demo1: 'demo 1 value',
            demo2: 'demo 2 value'
        }])
        expect(onValuesChange).toHaveBeenCalledWith({
            demo1: 'demo 1 value',
            demo2: 'demo 2 value'
        })
    })

    it(`test Table Toolbar`, async () => {
        const wrapper = mount(Table, {
            props: { search: false, options: { export: true } }
        })
        const toolbar = wrapper.findComponent(Toolbar)
        const buttonAll = toolbar.findAll('button')
        await Promise.all(buttonAll.map((button) => button.trigger('click')))
        expect(wrapper.emitted()).toHaveProperty('export')
    })

    it(`test Table Extra`, async () => {
        const wrapper = mount(Table, {
            props: { search: false },
            slots: {
                extra: () => (<div>Demo</div>)
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`test Table Alert`, async () => {
        const wrapper = mount(Table, {
            props: {
                search: false,
                dataSource: [{ demo1: 'demo1', key: 'key-1' }],
                columns: [
                    {
                        title: 'Title 1',
                        dataIndex: 'demo1',
                        search: true,
                        initialValue: 'demo 1 value'
                    }
                ],
                rowSelection: {
                    selectedRowKeys: ['key-1']
                }
            },
            slots: {
                alertOptions: () => <Tooltip>Alert Options</Tooltip>
            }
        })
        await new Promise((resolve) => setTimeout(resolve, 100))
        const alert = wrapper.findComponent(Alert)
        await alert.find('a').trigger('click')
        expect(alert.emitted()).toHaveProperty('cleanSelected')
    })

    it(`test Table request`, async () => {
        const request = vi.fn(() => {
            const demo = {
                demo1: 'demo1',
                demo2: 'demo2',
                demo3: 'demo3',
                demo4: 'demo4',
                demo5: 'demo5',
                demo6: 'demo6'
            }
            return Promise.resolve({
                data: [demo]
            })
        })
        const wrapper = mount(Table, {
            props: {
                request: request,
                columns: [
                    {
                        title: 'Title 1',
                        dataIndex: 'demo1',
                        search: true,
                        valueEnum: {},
                        initialValue: 'demo 1 value'
                    },
                    {
                        title: 'Title 2',
                        dataIndex: 'demo2',
                        copyable: true
                    },
                    {
                        title: 'Title 3',
                        dataIndex: 'demo3',
                        copyable: { tooltip: true }
                    },
                    {
                        title: 'Title 4',
                        dataIndex: 'demo4',
                        ellipsis: true
                    },
                    {
                        title: 'Title 5',
                        dataIndex: 'demo5',
                        ellipsis: { showTitle: false }
                    },
                    {
                        title: 'Title 6',
                        children: [
                            {
                                title: 'Title 6-1',
                                customRender: (value, row) => {
                                    return row.demo6
                                }
                            }
                        ]
                    }
                ]
            }
        })
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(wrapper.emitted()).toHaveProperty('loadingChange')
        expect(wrapper.emitted()).toHaveProperty('load')
    })

    it(`test Table request error`, async () => {
        const request = vi.fn(() => Promise.reject(false))
        const wrapper = mount(Table, {
            props: { request: request }
        })
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(wrapper.emitted()).toHaveProperty('loadingChange')
        expect(wrapper.emitted()).toHaveProperty('requestError')
    })
})
