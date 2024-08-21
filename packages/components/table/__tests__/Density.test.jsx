import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import mountTest from '@site/tests/shared/mountTest'
import Density from '../compatible/density'

describe('Density', () => {
    mountTest(Density)

    it(`test Density click event`, async () => {
        const wrapper = mount(Density)
        const liAll = wrapper.findAll('li')
        await Promise.all(liAll.map((li) => li.trigger('click')))
        expect(wrapper.exists()).toBeTruthy()
    })
})
