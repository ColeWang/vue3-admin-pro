import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BaseField, { CustomFields } from '../index'

describe('CustomFields', () => {
    it('render', async () => {
        const valueTypeMap = {
            test: ({ props, slots }) => {
                // console.log('cole', props, slots)
                return '123'
            }
        }
        const wrapper = mount(CustomFields, {
            slots: {
                default: () => <BaseField valueType={'test'}/>
            }
        })
        // 自定义的值
        const testSpy = vi.spyOn(valueTypeMap, 'test')
        await wrapper.setProps({ valueTypeMap: valueTypeMap })
        expect(wrapper.exists()).toBeTruthy()

        const baseField = wrapper.findComponent(BaseField)
        expect(testSpy).toHaveBeenCalled()
        expect(baseField.text()).toBe('123')
    })
})
