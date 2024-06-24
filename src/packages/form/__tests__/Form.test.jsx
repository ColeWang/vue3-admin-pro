import { describe } from 'vitest'
import { BaseForm, DrawerForm, Field, Form, ModalForm, QueryFilter, Submitter } from '../index'
import mountTest from '../../../../tests/shared/mountTest'

describe('Form', () => {
    mountTest(BaseForm)
    mountTest(Submitter)
    mountTest(Field)
    // --
    mountTest(Form)
    mountTest(Form.Item)
    mountTest(Form.Group)
    mountTest(Form.Dependency)
    mountTest(QueryFilter)
    mountTest(ModalForm)
    mountTest(DrawerForm)
})
