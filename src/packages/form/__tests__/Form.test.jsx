import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Form, Text } from '../index'

describe('Form', () => {
    it('render', async () => {
        const wrapper = mount(Form, {
            slots: {
                default: () => {
                    return [
                        <Text name={'text'}/>
                    ]
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
