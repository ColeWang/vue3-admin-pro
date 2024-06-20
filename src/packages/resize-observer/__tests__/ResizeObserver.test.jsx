import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ResizeObserver from '../index'

describe('ResizeObserver', () => {
    it(`render`, async () => {
        const wrapper = mount(ResizeObserver, {
            slots: {
                default: () => {
                    return (
                        <div style={{ height: '200px' }}/>
                    )
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
