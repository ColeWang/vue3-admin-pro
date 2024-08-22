import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import mountTest from '@site-pro/tests/shared/mountTest'
import MockResizeObserver from '@site-pro/tests/__mocks__/resize-observer'
import { ResizeObserver } from '../index'

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
