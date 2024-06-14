import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BaseField from '../index'
import {
    Cascader,
    Checkbox,
    DatePicker,
    Input,
    InputNumber,
    Radio,
    RangePicker,
    Select,
    Slider,
    Switch,
    TimePicker,
    TimeRangePicker,
    TreeSelect
} from 'ant-design-vue'
import { formatDate } from '../utils'
import dayjs from 'dayjs'

describe('BaseField', () => {
    it('render', () => {
        const fieldProps = {
            'onUpdate:value': (value) => {
                console.log(value)
            }
        }

        const wrapper = mount(BaseField, {
            props: {
                fieldProps: fieldProps
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        // update
        const updateValueSpy = vi.spyOn(fieldProps, 'onUpdate:value')
        const input = wrapper.findComponent(Input)
        const func = input.props('onUpdate:value')
        func && func('test')

        expect(updateValueSpy).toHaveBeenCalled()
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
        const dateRange = wrapper.findComponent(RangePicker)
        expect(dateRange.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText + '~' + emptyText)
        // text
        const text = [dayjs(), dayjs()]
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe(formatDate(text[0]) + '~' + formatDate(text[1]))
    })

    it('props valueType time', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'time'
            }
        })
        const timePicker = wrapper.findComponent(TimePicker)
        expect(timePicker.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        // text
        const text = dayjs()
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe(formatDate(text, 'HH:mm:ss'))
    })

    it('props valueType timeRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'timeRange'
            }
        })
        const timeRange = wrapper.findComponent(TimeRangePicker)
        expect(timeRange.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText + '~' + emptyText)
        // text
        const text = [dayjs(), dayjs()]
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe(formatDate(text[0], 'HH:mm:ss') + '~' + formatDate(text[1], 'HH:mm:ss'))
    })

    it('props valueType select', async () => {
        const valueEnum = {
            '1': '选项一',
            '2': {
                color: '#FF6F1D',
                text: '选项二'
            },
            '3': undefined,
        }
        const options = [
            {
                label: '选项一',
                value: 1
            },
            {
                label: '选项二',
                value: 2
            },
            {
                value: 3
            }
        ]
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'select'
            }
        })
        const select = wrapper.findComponent(Select)
        expect(select.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: {}
        })
        expect(select.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(select.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(select.exists()).toBe(true)

        // 只读
        await wrapper.setProps({
            mode: 'read',
            valueEnum: undefined,
            fieldProps: {}
        })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)

        await wrapper.setProps({
            mode: 'read',
            text: '1',
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('选项一')

        await wrapper.setProps({
            mode: 'read',
            text: 2,
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('选项二')

        await wrapper.setProps({
            mode: 'read',
            text: '3',
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { label: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { value: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe(emptyText)
    })

    it('props valueType treeSelect', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'treeSelect'
            }
        })
        const treeSelect = wrapper.findComponent(TreeSelect)
        expect(treeSelect.exists()).toBe(true)

        const options = [
            {
                label: '选项1',
                value: '1',
                children: [
                    {
                        label: '子项1-1',
                        value: '1-1',
                    }
                ]
            },
            {
                label: '选项2',
                value: '2'
            },
        ]
        await wrapper.setProps({
            fieldProps: { options }
        })
        expect(treeSelect.exists()).toBe(true)

        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        // text
        const text = ['1', '1-1']
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe('选项1,子项1-1')
    })

    it('props valueType cascader', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'cascader'
            }
        })
        const cascader = wrapper.findComponent(Cascader)
        expect(cascader.exists()).toBe(true)

        const options = [
            {
                label: '选项1',
                value: '1',
                children: [
                    {
                        label: '子项1-1',
                        value: '1-1',
                    }
                ]
            },
            {
                label: '选项2',
                value: '2'
            },
        ]
        await wrapper.setProps({
            fieldProps: { options }
        })
        expect(cascader.exists()).toBe(true)

        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        // text
        const text = ['1', '1-1']
        await wrapper.setProps({ mode: 'read', text: text })
        expect(wrapper.text()).toBe('选项1,子项1-1')
    })

    it('props valueType radio', async () => {
        const valueEnum = {
            '1': '选项一',
            '2': {
                color: '#FF6F1D',
                text: '选项二'
            },
            '3': undefined,
        }
        const options = [
            {
                label: '选项一',
                value: 1
            },
            {
                label: '选项二',
                value: 2
            },
            {
                value: 3
            }
        ]
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'radio'
            }
        })
        const radio = wrapper.findComponent(Radio.Group)
        expect(radio.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: {}
        })
        expect(radio.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(radio.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(radio.exists()).toBe(true)

        // 只读
        await wrapper.setProps({
            mode: 'read',
            valueEnum: undefined,
            fieldProps: {}
        })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)

        await wrapper.setProps({
            mode: 'read',
            text: '1',
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('选项一')

        await wrapper.setProps({
            mode: 'read',
            text: 2,
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('选项二')

        await wrapper.setProps({
            mode: 'read',
            text: '3',
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { label: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { value: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe(emptyText)
    })

    it('props valueType checkbox', async () => {
        const valueEnum = {
            '1': '选项一',
            '2': {
                color: '#FF6F1D',
                text: '选项二'
            },
            '3': undefined,
        }
        const options = [
            {
                label: '选项一',
                value: 1
            },
            {
                label: '选项二',
                value: 2
            },
            {
                value: 3
            }
        ]
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'checkbox'
            }
        })
        const checkbox = wrapper.findComponent(Checkbox.Group)
        expect(checkbox.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: {}
        })
        expect(checkbox.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(checkbox.exists()).toBe(true)

        await wrapper.setProps({
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(checkbox.exists()).toBe(true)

        // 只读
        await wrapper.setProps({
            mode: 'read',
            valueEnum: undefined,
            fieldProps: {}
        })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)

        await wrapper.setProps({
            mode: 'read',
            text: '1',
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('选项一')

        await wrapper.setProps({
            mode: 'read',
            text: 2,
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('选项二')

        await wrapper.setProps({
            mode: 'read',
            text: '3',
            valueEnum: valueEnum,
            fieldProps: {}
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { label: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe('3')

        await wrapper.setProps({
            mode: 'read',
            text: { value: '3' },
            valueEnum: undefined,
            fieldProps: { options }
        })
        expect(wrapper.text()).toBe(emptyText)
    })

    it('props valueType switch', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'switch'
            }
        })
        const switchCom = wrapper.findComponent(Switch)
        expect(switchCom.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        expect(wrapper.text()).toBe('关闭')
        await wrapper.setProps({ mode: 'read', text: true })
        expect(wrapper.text()).toBe('打开')
        // update
        const func = switchCom.props('onUpdate:checked')
        func && func()
    })

    it('props valueType slider', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'slider'
            }
        })
        const slider = wrapper.findComponent(Slider)
        expect(slider.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        await wrapper.setProps({ mode: 'read', text: [] })
        expect(wrapper.text()).toBe(emptyText + '~' + emptyText)
        await wrapper.setProps({ mode: 'read', text: [0, 90] })
        expect(wrapper.text()).toBe('0~90')
    })

    it('props valueType number', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'number'
            }
        })
        const inputNumber = wrapper.findComponent(InputNumber)
        expect(inputNumber.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        await wrapper.setProps({ mode: 'read', text: 1 })
        expect(wrapper.text()).toBe('1')
    })

    it('props valueType textarea', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'textarea'
            }
        })
        const inputTextArea = wrapper.findComponent(Input.TextArea)
        expect(inputTextArea.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        await wrapper.setProps({ mode: 'read', text: '长文本' })
        expect(wrapper.text()).toBe('长文本')
    })

    it('props valueType password', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'password'
            }
        })
        const inputPassword = wrapper.findComponent(Input.Password)
        expect(inputPassword.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        // click
        await wrapper.setProps({ mode: 'read', text: '123456' })
        const tagA = wrapper.find('a')
        await tagA.trigger('click')
        expect(wrapper.text()).toBe('123456')
    })

    it('props valueType text', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'text'
            }
        })
        const input = wrapper.findComponent(Input)
        expect(input.exists()).toBe(true)
        // 只读
        await wrapper.setProps({ mode: 'read' })
        const emptyText = wrapper.props('emptyText')
        expect(wrapper.text()).toBe(emptyText)
        await wrapper.setProps({ mode: 'read', text: '文本' })
        expect(wrapper.text()).toBe('文本')
    })

    // -------
    it('props valueType dateWeek', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateWeek'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateWeekRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateWeekRange'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateMonth', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateMonth'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateMonthRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateMonthRange'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateQuarter', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateQuarter'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateQuarterRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateQuarterRange'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateYear', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateYear'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateYearRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateYearRange'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateTime', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateTime'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('props valueType dateTimeRange', async () => {
        const wrapper = mount(BaseField, {
            props: {
                valueType: 'dateTimeRange'
            }
        })
        expect(wrapper.exists()).toBe(true)
    })
})
