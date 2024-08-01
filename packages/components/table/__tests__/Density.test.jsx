import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Density from '../compatible/density'
import mountTest from '../../../tests/shared/mountTest'

describe('Density', () => {
    mountTest(Density)

    it(`test Density click event`, async () => {
        const wrapper = mount(Density)
        const liAll = wrapper.findAll('li')
        await Promise.all(liAll.map((li) => li.trigger('click')))
        expect(wrapper.exists()).toBeTruthy()
    })
})
