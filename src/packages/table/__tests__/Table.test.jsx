import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { Action, BaseSearch, Table } from '../index'
import { Text } from '../../form'
import mountTest from '../../../../tests/shared/mountTest'

describe('Table', () => {
    mountTest(Table)
    mountTest(BaseSearch)
    mountTest(Action)
    mountTest(Action.Group)

    it(`test BaseSearch`, async () => {
        const wrapper = mount(BaseSearch, {
            slots: {
                default: () => {
                    return [
                        <Text name={'demo'}/>
                    ]
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })

    it(`test Action`, async () => {
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
