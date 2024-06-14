import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseField from '../index'
import { DatePicker, RangePicker } from 'ant-design-vue'
import { formatDate } from '../utils'
import dayjs from 'dayjs'

describe('BaseField', () => {
    it('render', () => {
        const wrapper = mount(() => <BaseField/>)
        expect(wrapper.exists()).toBeTruthy()
    })
    it('props valueType date', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'date'
            }
        })
        const datePicker = wrapper.findComponent(DatePicker)
        expect(datePicker.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        // text
        const text = dayjs()
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe(formatDate(text))
    })
    it('props valueType dateRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateRange'
            }
        })
        const rangePicker = wrapper.findComponent(RangePicker)
        expect(rangePicker.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText + '~' + emptyText)
        // text
        const text = [dayjs(), dayjs()]
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe(formatDate(text[0]) + '~' + formatDate(text[1]))
    })
})
