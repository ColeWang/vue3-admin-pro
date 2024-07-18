import { Form as AForm } from 'ant-design-vue'
import Form from './Form'
import Item from './Item'
import List from './List'
import Dependency from './Dependency'
import Group from './Group'

Form.useForm = AForm.useForm
Form.Item = Item
Form.Group = Group
Form.List = List
Form.Dependency = Dependency

export const useForm = AForm.useForm
export { Item as FormItem }
export { List as FormList }
export { Dependency as FormDependency }
export { Group as FormGroup }

export default Form
