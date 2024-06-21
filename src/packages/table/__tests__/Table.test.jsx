import { describe } from 'vitest'
import { Action, BaseSearch, Table } from '../index'
import mountTest from '../../../../tests/shared/mountTest'

describe('Table', () => {
    mountTest(Table)
    mountTest(BaseSearch)
    mountTest(Action)
    mountTest(Action.Group)
})
