import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
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
})
