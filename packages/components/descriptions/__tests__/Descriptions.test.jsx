import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Tooltip } from 'ant-design-vue'
import { Descriptions } from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Descriptions', () => {
    mountTest(Descriptions)
    mountTest(Descriptions.Item)

    const dataSource = {
        text: 'test text',
        number: 'test number'
    }

    const columns = [
        {
            title: () => 'label1',
            valueType: 'text',
            dataIndex: 'text',
            index: '1'
        },
        {
            title: 'label2',
            valueType: 'number',
            dataIndex: 'number',
            index: '2'
        },
    ]

    const children = [
        <Descriptions.Item label={'label3'}/>,
        <Descriptions.Item label={'label4'}>
            123
        </Descriptions.Item>,
        <Descriptions.Item label={'label5'} valueType={'text'} name={'text'}/>
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
        await new Promise((resolve) => setTimeout(resolve, 100))
        wrapper.vm.reload()
        await new Promise((resolve) => setTimeout(resolve, 100))
        const loadEvent = wrapper.emitted('load')
        expect(loadEvent).toHaveLength(2)
    })

    it(`test request error`, async () => {
        const request = () => Promise.reject('error')
        const wrapper = mount(Descriptions, {
            props: { columns, request },
            slots: { default: () => children }
        })
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(wrapper.emitted()).toHaveProperty('requestError')
    })
})
