import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import mountTest from '@site-pro/tests/shared/mountTest'
import { BaseField, CustomFields } from '../index'

describe('CustomFields', () => {
    mountTest(CustomFields)

    const valueTypeMap = {
        test: ({ props, slots }) => {
            return 'test'
        }
    }

    it(`props valueTypeMap and slots`, async () => {
        const testSpy = vi.spyOn(valueTypeMap, 'test')

        const wrapper = mount(CustomFields, {
            props: { valueTypeMap },
            slots: {
                default: () => <BaseField valueType={'test'}/>
            }
        })

        // run
        expect(testSpy).toHaveBeenCalled()
        // render
        const baseField = wrapper.findComponent(BaseField)
        expect(baseField.text()).toBe('test')
    })
})
