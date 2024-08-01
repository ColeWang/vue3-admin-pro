import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResizeObserver } from '../index'
import mountTest from '../../../tests/shared/mountTest'
import MockResizeObserver from '../../../tests/__mocks__/resize-observer'

describe('ResizeObserver', () => {
    beforeEach(() => {
        window.ResizeObserver = MockResizeObserver
    })

    mountTest(ResizeObserver)

    it(`emits resize`, async () => {
        const wrapper = mount(ResizeObserver)
        expect(wrapper.emitted()).toHaveProperty('resize')
    })
})
