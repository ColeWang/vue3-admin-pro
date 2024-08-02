import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
// --
import { BaseField } from '../index'
import FieldDatePicker from '../components/DatePicker'
import FieldRangePicker from '../components/RangePicker'
import FieldTimePicker from '../components/TimePicker'
import FieldTimeRangePicker from '../components/TimeRangePicker'
import FieldSelect from '../components/Select'
import FieldTreeSelect from '../components/TreeSelect'
import FieldCascader from '../components/Cascader'
import FieldRadio from '../components/Radio'
import FieldCheckbox from '../components/Checkbox'
import FieldSwitch from '../components/Switch'
import FieldSlider from '../components/Slider'
import FieldNumber from '../components/Number'
import FieldTextArea from '../components/TextArea'
import FieldText from '../components/Text'
import FieldPassword from '../components/Password'
import mountTest from '../../../tests/shared/mountTest'
import { formatDate } from '../utils'
import dayjs from 'dayjs'

function mountFieldTest (valueType, Component, props) {
    it(`${valueType}`, async () => {
        const needProps = { valueType, ...props }
        const wrapper = mount(BaseField, { props: needProps })
        const target = wrapper.findComponent(Component)
        expect(target.exists()).toBe(true)
    })
}

function mountFieldReadTest (valueType, text, props, emptyValue, expectValue) {
    it(`${valueType}`, async () => {
        const needProps = { mode: 'read', valueType, ...props }
        const wrapper = mount(BaseField, { props: needProps })

        // 空数据
        const emptyText = wrapper.props('emptyText')
        const resultEmpty = typeof emptyValue === 'function' ? emptyValue(emptyText) : emptyValue
        expect(wrapper.text()).toBe(resultEmpty)

        // 预期值
        await wrapper.setProps({ text: text })
        const resultExpect = typeof expectValue === 'function' ? expectValue(text, emptyText) : expectValue
        expect(wrapper.text()).toBe(resultExpect)
    })
}

describe('BaseField', () => {
    mountTest(BaseField)
    // ---
    mountTest(FieldDatePicker)
    mountTest(FieldRangePicker)
    mountTest(FieldTimePicker)
    mountTest(FieldTimeRangePicker)
    mountTest(FieldSelect)
    mountTest(FieldTreeSelect)
    mountTest(FieldCascader)
    mountTest(FieldRadio)
    mountTest(FieldCheckbox)
    mountTest(FieldSwitch)
    mountTest(FieldSlider)
    mountTest(FieldNumber)
    mountTest(FieldTextArea)
    mountTest(FieldText)
    mountTest(FieldPassword)

    const mockValueEnum = {
        '1': '选项一',
        '2': {
            color: '#FF6F1D',
            text: '选项二'
        },
        '3': undefined,
    }
    const mockOptions = [
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
    const mockOptionsChildren = [
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
        {
            value: 3
        }
    ]

    describe('render field types', () => {
        // Date
        mountFieldTest('date', FieldDatePicker)
        mountFieldTest('dateRange', FieldRangePicker)
        // Week
        mountFieldTest('dateWeek', FieldDatePicker)
        mountFieldTest('dateWeekRange', FieldRangePicker)
        // Month
        mountFieldTest('dateMonth', FieldDatePicker)
        mountFieldTest('dateMonthRange', FieldRangePicker)
        // Quarter
        mountFieldTest('dateQuarter', FieldDatePicker)
        mountFieldTest('dateQuarterRange', FieldRangePicker)
        // Year
        mountFieldTest('dateYear', FieldDatePicker)
        mountFieldTest('dateYearRange', FieldRangePicker)
        // DateTime
        mountFieldTest('dateTime', FieldDatePicker)
        mountFieldTest('dateTimeRange', FieldRangePicker)
        // Time
        mountFieldTest('time', FieldTimePicker)
        mountFieldTest('timeRange', FieldTimeRangePicker)
        // Select
        mountFieldTest('select', FieldSelect)
        it(`select options`, async () => {
            const needProps = { valueType: 'select', fieldProps: { options: mockOptions } }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        it(`select valueEnum`, async () => {
            const needProps = { valueType: 'select', valueEnum: mockValueEnum }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        // TreeSelect
        mountFieldTest('treeSelect', FieldTreeSelect)
        it(`treeSelect options`, async () => {
            const needProps = { valueType: 'treeSelect', fieldProps: { options: mockOptionsChildren } }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        // Cascader
        mountFieldTest('cascader', FieldCascader)
        it(`cascader options`, async () => {
            const needProps = { valueType: 'cascader', fieldProps: { options: mockOptionsChildren } }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        // Radio
        mountFieldTest('radio', FieldRadio)
        it(`radio options`, async () => {
            const needProps = { valueType: 'radio', fieldProps: { options: mockOptions } }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        it(`radio valueEnum`, async () => {
            const needProps = { valueType: 'radio', valueEnum: mockValueEnum }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        // Checkbox
        mountFieldTest('checkbox', FieldCheckbox)
        it(`checkbox options`, async () => {
            const needProps = { valueType: 'checkbox', fieldProps: { options: mockOptions } }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        it(`checkbox valueEnum`, async () => {
            const needProps = { valueType: 'checkbox', valueEnum: mockValueEnum }
            const wrapper = mount(BaseField, { props: needProps })
            expect(wrapper.exists()).toBe(true)
        })
        // Switch
        mountFieldTest('switch', FieldSwitch)
        it(`emits update:value event when switch changes`, async () => {
            const updateValue = vi.fn()
            const wrapper = mount(BaseField, {
                props: { valueType: 'switch', fieldProps: { ['onUpdate:value']: updateValue } }
            })
            await wrapper.find('button').trigger('click')
            expect(updateValue).toHaveBeenCalledWith(true)
        })
        // Slider
        mountFieldTest('slider', FieldSlider)
        // Number
        mountFieldTest('number', FieldNumber)
        // Textarea
        mountFieldTest('textarea', FieldTextArea)
        // Password
        mountFieldTest('password', FieldPassword)
        // Text
        mountFieldTest('text', FieldText)
    })

    describe('render read only mode field types', () => {
        const mockDate = dayjs()
        it(`formatDate`, () => {
            expect(formatDate(mockDate)).toBe(mockDate.format('YYYY-MM-DD'))
            expect(formatDate(mockDate, (time) => time.format('YYYY'))).toBe(mockDate.format('YYYY'))
        })
        // Date
        mountFieldReadTest(
            'date',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY-MM-DD')
        )
        mountFieldReadTest(
            'dateRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY-MM-DD')}~${formatDate(mockDate, 'YYYY-MM-DD')}`
        )
        // Week
        mountFieldReadTest(
            'dateWeek',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY-wo')
        )
        mountFieldReadTest(
            'dateWeekRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY-wo')}~${formatDate(mockDate, 'YYYY-wo')}`
        )
        // Month
        mountFieldReadTest(
            'dateMonth',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY-MM')
        )
        mountFieldReadTest(
            'dateMonthRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY-MM')}~${formatDate(mockDate, 'YYYY-MM')}`
        )
        // Quarter
        mountFieldReadTest(
            'dateQuarter',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY-[Q]Q')
        )
        mountFieldReadTest(
            'dateQuarterRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY-[Q]Q')}~${formatDate(mockDate, 'YYYY-[Q]Q')}`
        )
        // Year
        mountFieldReadTest(
            'dateYear',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY')
        )
        mountFieldReadTest(
            'dateYearRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY')}~${formatDate(mockDate, 'YYYY')}`
        )
        // DateTime
        mountFieldReadTest(
            'dateTime',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'YYYY-MM-DD HH:mm:ss')
        )
        mountFieldReadTest(
            'dateTimeRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'YYYY-MM-DD HH:mm:ss')}~${formatDate(mockDate, 'YYYY-MM-DD HH:mm:ss')}`
        )
        // Time
        mountFieldReadTest(
            'time',
            mockDate,
            {},
            (empty) => empty,
            formatDate(mockDate, 'HH:mm:ss')
        )
        mountFieldReadTest(
            'timeRange',
            [mockDate, mockDate],
            {},
            (empty) => `${empty}~${empty}`,
            () => `${formatDate(mockDate, 'HH:mm:ss')}~${formatDate(mockDate, 'HH:mm:ss')}`
        )
        // Select
        mountFieldReadTest(
            'select',
            '1',
            { valueEnum: mockValueEnum },
            (empty) => empty,
            '选项一'
        )
        mountFieldReadTest(
            'select',
            '1',
            { fieldProps: { options: mockOptions } },
            (empty) => empty,
            '选项一'
        )
        mountFieldReadTest(
            'select',
            '2',
            { valueEnum: mockValueEnum },
            (empty) => empty,
            '选项二'
        )
        mountFieldReadTest(
            'select',
            3,
            { valueEnum: mockValueEnum },
            (empty) => empty,
            '3'
        )
        // TreeSelect
        mountFieldReadTest(
            'treeSelect',
            ['1', '1-1'],
            { fieldProps: { options: mockOptionsChildren } },
            (empty) => empty,
            '选项1,子项1-1'
        )
        // Cascader
        mountFieldReadTest(
            'cascader',
            ['1', '1-1'],
            { fieldProps: { options: mockOptionsChildren } },
            (empty) => empty,
            '选项1,子项1-1'
        )
        // Radio
        mountFieldReadTest(
            'radio',
            '1',
            { valueEnum: mockValueEnum },
            (empty) => empty,
            '选项一'
        )
        mountFieldReadTest(
            'radio',
            '1',
            { fieldProps: { options: mockOptions } },
            (empty) => empty,
            '选项一'
        )
        // Checkbox
        mountFieldReadTest(
            'checkbox',
            '1',
            { valueEnum: mockValueEnum },
            (empty) => empty,
            '选项一'
        )
        mountFieldReadTest(
            'checkbox',
            '1',
            { fieldProps: { options: mockOptions } },
            (empty) => empty,
            '选项一'
        )
        // Switch
        mountFieldReadTest(
            'switch',
            true,
            {},
            () => '关闭',
            '打开'
        )
        // Slider
        mountFieldReadTest(
            'slider',
            [1, 90],
            {},
            (empty) => empty,
            '1~90'
        )
        mountFieldReadTest(
            'slider',
            90,
            {},
            (empty) => empty,
            '90'
        )
        mountFieldReadTest(
            'slider',
            [],
            {},
            (empty) => empty,
            (value, empty) => `${empty}~${empty}`
        )
        // Number
        mountFieldReadTest(
            'number',
            1,
            {},
            (empty) => empty,
            '1'
        )
        // TextArea
        mountFieldReadTest(
            'textarea',
            '一段长文本',
            {},
            (empty) => empty,
            '一段长文本'
        )
        // Password
        mountFieldReadTest(
            'password',
            '123456',
            {},
            (empty) => empty,
            '＊＊＊＊＊'
        )
        mountFieldReadTest(
            'password',
            '123456',
            { fieldProps: { visible: true } },
            (empty) => empty,
            '123456'
        )
        it(`password visibleClick`, async () => {
            const needProps = { valueType: 'password', mode: 'read', text: '123456' }
            const wrapper = mount(BaseField, { props: needProps })
            await wrapper.find('a').trigger('click')
            expect(wrapper.text()).toBe('123456')
        })
        // Text
        mountFieldReadTest(
            'text',
            '文本',
            {},
            (empty) => empty,
            '文本'
        )
    })

    it(`emits update:value event when input changes`, async () => {
        const updateValue = vi.fn()
        const wrapper = mount(BaseField, {
            props: { fieldProps: { ['onUpdate:value']: updateValue } }
        })
        await wrapper.find('input').setValue('new value')
        expect(wrapper.find('input').element.value).toBe('new value')
        expect(updateValue).toHaveBeenCalledWith('new value')
    })
})
