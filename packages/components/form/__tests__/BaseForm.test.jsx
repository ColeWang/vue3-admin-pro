import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button, Tooltip } from 'ant-design-vue'
import { BaseForm, Field, HocField, Submitter } from '../index'
import mountTest from '../../../tests/shared/mountTest'
import { last } from 'lodash-es'

describe('Form', () => {
    const FieldDemo = HocField('text')

    mountTest(Submitter)
    mountTest(Field)
    mountTest(FieldDemo)
    mountTest(BaseForm)

    it(`test Submitter emits`, async () => {
        const wrapper = mount(Submitter)
        const buttonAll = wrapper.findAll('button')
        await Promise.all(buttonAll.map((button) => {
            return button.trigger('click')
        }))
        expect(wrapper.emitted()).toHaveProperty('reset')
        expect(wrapper.emitted()).toHaveProperty('submit')
    })

    it(`test Field namePath`, async () => {
        const wrapper = mount(Field, {
            props: { formItemProps: { name: ['demo'] } }
        })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`test BaseForm model change`, async () => {
        const wrapper = mount(BaseForm, {
            slots: {
                default: () => <FieldDemo name={'demo'}/>
            }
        })
        const changeEvents = wrapper.emitted('valuesChange')
        // update:value
        await wrapper.find('input').setValue('new value')
        expect(wrapper.find('input').element.value).toBe('new value')
        expect(last(changeEvents)).toEqual([{ demo: 'new value' }])
        // getModelValue
        expect(wrapper.vm.getModelValue(['demo'])).toEqual('new value')
        // setModelValue
        expect(wrapper.vm.setModelValue(['demo'], 'new text')).toEqual({ demo: 'new text' })
        expect(last(changeEvents)).toEqual([{ demo: 'new text' }])
        // updateModelValue
        expect(wrapper.vm.updateModelValue(['demo'], (value) => {
            return value + ' update'
        })).toEqual({ demo: 'new text update' })
        expect(last(changeEvents)).toEqual([{ demo: 'new text update' }])
        // deleteModelValue
        expect(wrapper.vm.deleteModelValue(['demo'])).toEqual(true)
        expect(last(changeEvents)).toEqual([{}])
    })

    it(`test BaseForm submit`, async () => {
        const transform = vi.fn(() => ({}))
        const finishFailed = vi.fn()
        const wrapper = mount(BaseForm, {
            props: {
                transform,
                onFinishFailed: finishFailed,
                scrollToFirstError: true,
                submitOnReset: true
            },
            slots: {
                default: () => {
                    return [
                        <Tooltip>getPopupContainer</Tooltip>,
                        <FieldDemo name={'demo'} required={true}/>,
                        <Button html-type={'submit'}>提交</Button>
                    ]
                }
            }
        })
        await wrapper.find('button').trigger('submit')
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(finishFailed).toHaveBeenCalled()
        // submit
        wrapper.vm.submit()
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(wrapper.emitted()).toHaveProperty('finishFailed')
        // input
        await wrapper.find('input').setValue('new value')
        wrapper.vm.submit()
        await new Promise((resolve) => setTimeout(resolve, 100))
        expect(wrapper.emitted()).toHaveProperty('finish')
        expect(transform).toHaveBeenCalledWith({ demo: 'new value' })
        // reset
        wrapper.vm.resetFields()
        await new Promise((resolve) => setTimeout(resolve, 100))
        const resetEvents = wrapper.emitted('reset')
        const changeEvents = wrapper.emitted('valuesChange')
        expect(last(resetEvents)).toEqual([{ demo: undefined }])
        expect(last(changeEvents)).toEqual([{ demo: undefined }])
    })
})
