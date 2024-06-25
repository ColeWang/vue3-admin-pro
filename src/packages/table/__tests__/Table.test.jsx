import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { last } from 'lodash-es'
import { Tooltip } from 'ant-design-vue'
import { Action, BaseSearch, Table } from '../index'
import Search from '../compatible/search'
import Toolbar from '../compatible/toolbar'
import Alert from '../compatible/alert'
import Density from '../components/density'
import ColumnSetting from '../components/column-setting'
import { BaseForm, Text } from '../../form'
import mountTest from '../../../../tests/shared/mountTest'

describe('Table', () => {
    mountTest(Table)
    mountTest(BaseSearch)
    mountTest(Action)
    mountTest(Action.Group)
    // ---
    mountTest(Search)
    mountTest(Toolbar)
    mountTest(Alert)
    mountTest(Density)
    mountTest(ColumnSetting)

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

    it(`test Action`, async () => {
        const onClick = vi.fn()
        const wrapper = mount(Action.Group, {
            slots: {
                default: () => {
                    return [
                        <Action onClick={onClick}>操作一</Action>,
                        <Action>操作二</Action>,
                        <Action>操作三</Action>,
                        <Action>操作四</Action>
                    ]
                }
            }
        })
        const linkAll = wrapper.findAll('a')
        await Promise.all(linkAll.map((button) => button.trigger('click')))
        expect(onClick).toHaveBeenCalled()
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
})
