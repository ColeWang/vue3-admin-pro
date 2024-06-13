import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseField from '../index'

describe('BaseField', () => {
    it('test', () => {
        const wrapper = mount(BaseField)
        expect(wrapper.element).toMatchSnapshot()
    })
})
