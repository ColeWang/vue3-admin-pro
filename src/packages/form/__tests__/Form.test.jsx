import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { last } from 'lodash-es'
import { BaseForm, DrawerForm, Field, Form, ModalForm, QueryFilter, Submitter } from '../index'
import mountTest from '../../../../tests/shared/mountTest'

describe('Form', () => {
    mountTest(Submitter)
    mountTest(Field)
    mountTest(BaseForm)
    // --
    mountTest(Form)
    mountTest(Form.Item)
    mountTest(Form.Group)
    mountTest(Form.Dependency)
    mountTest(QueryFilter)
    mountTest(ModalForm)
    mountTest(DrawerForm)

    it(`test Submitter emits`, async () => {
        const wrapper = mount(Submitter)
        const buttonAll = wrapper.findAll('button')
        await Promise.all(buttonAll.map((button) => {
            return button.trigger('click')
        }))
        expect(wrapper.emitted()).toHaveProperty('reset')
        expect(wrapper.emitted()).toHaveProperty('submit')
    })

    it(`test BaseForm model change`, async () => {
        const wrapper = mount(BaseForm, {
            slots: {
                default: () => (
                    <Field
                        valueType={'text'}
                        formItemProps={{
                            name: 'text'
                        }}
                    />
                )
            }
        })
        // update:value
        await wrapper.find('input').setValue('new value')
        expect(wrapper.find('input').element.value).toBe('new value')
        expect(last(wrapper.emitted('valuesChange'))).toEqual([{ text: 'new value' }])
        // getModelValue
        expect(wrapper.vm.getModelValue(['text'])).toEqual('new value')
        // setModelValue
        expect(wrapper.vm.setModelValue(['text'], 'new text')).toEqual({ text: 'new text' })
        expect(last(wrapper.emitted('valuesChange'))).toEqual([{ text: 'new text' }])
        // updateModelValue
        expect(wrapper.vm.updateModelValue(['text'], (value) => {
            return value + ' update'
        })).toEqual({ text: 'new text update' })
        expect(last(wrapper.emitted('valuesChange'))).toEqual([{ text: 'new text update' }])
        // deleteModelValue
        expect(wrapper.vm.deleteModelValue(['text'])).toEqual(true)
        expect(last(wrapper.emitted('valuesChange'))).toEqual([{}])
    })
})
