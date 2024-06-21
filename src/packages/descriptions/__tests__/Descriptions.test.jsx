import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Tooltip } from 'ant-design-vue'
import Descriptions from '../index'
import mountTest from '../../../../tests/shared/mountTest'

describe('Descriptions', () => {
    mountTest(Descriptions)
    mountTest(Descriptions.Item)

    const dataSource = {
        text: 'test text',
        test: 'test number'
    }

    const columns = [
        {
            title: () => 'label',
            valueType: 'text',
            dataIndex: 'text',
            index: '1'
        },
        {
            title: 'number',
            valueType: 'number',
            dataIndex: 'number',
            index: '2'
        },
    ]

    const children = [
        <Descriptions.Item label={'label'}/>,
        <Descriptions.Item label={'label'}>
            123
        </Descriptions.Item>,
        <Descriptions.Item valueType={'text'} label={'label'}/>
    ]

    it(`render props columns`, () => {
        const wrapper = mount(Descriptions, {
            props: { columns, dataSource }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
    it(`render slots`, async () => {
        const wrapper = mount(Descriptions, {
            props: { dataSource },
            slots: {
                default: () => children,
                title: () => <Tooltip>Title</Tooltip>,
                extra: () => <div>Extra</div>
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
    it(`test request`, async () => {
        const request = () => Promise.resolve({ data: dataSource })
        const wrapper = mount(Descriptions, {
            props: { columns, request },
            slots: { default: () => children }
        })
        wrapper.vm.reload()
        setTimeout(() => {
            const loadEvent = wrapper.emitted('load')
            expect(loadEvent).toHaveLength(2)
        }, 100)
    })
    it(`test request error`, async () => {
        const request = () => Promise.reject('error')
        const wrapper = mount(Descriptions, {
            props: { columns, request },
            slots: { default: () => children }
        })
        setTimeout(() => {
            expect(wrapper.emitted()).toHaveProperty('requestError')
        }, 100)
    })
})
