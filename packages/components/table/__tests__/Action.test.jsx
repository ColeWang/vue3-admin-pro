import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import mountTest from '@site/tests/shared/mountTest'
import { Action } from '../index'

describe('Action', () => {
    mountTest(Action)
    mountTest(Action.Group)

    it(`test Action Group click event`, async () => {
        const onClick = vi.fn()
        const wrapper = mount(Action.Group, {
            slots: {
                default: () => {
                    return [
                        <Action onClick={onClick}>操作一</Action>,
                        <Action>操作二</Action>,
                        <Action>操作三</Action>,
                        <Action>操作四</Action>
                    ]
                }
            }
        })
        const linkAll = wrapper.findAll('a')
        await Promise.all(linkAll.map((button) => button.trigger('click')))
        expect(onClick).toHaveBeenCalled()
    })
})
