import { Form as AForm } from 'ant-design-vue'
import Form from './Form'
import Item from './Item'
import List from './List'
import Deps from './Deps'
import Group from './Group'

Form.useForm = AForm.useForm
Form.Item = Item
Form.Group = Group
Form.List = List
Form.Deps = Deps

export const useForm = AForm.useForm
export { Item as FormItem }
export { List as FormList }
export { Deps as FormDeps }
export { Group as FormGroup }

export default Form
