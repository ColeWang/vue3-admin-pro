import { Form as AntForm } from 'ant-design-vue'
import Form from './Form'
import Item from './Item'
import List from './List'
import Dependency from './Dependency'
import Group from './Group'

Form.useForm = AntForm.useForm
Form.Item = Item
Form.Group = Group
Form.List = List
Form.Dependency = Dependency

export const useForm = AntForm.useForm
export { Item as FormItem }
export { List as FormList }
export { Dependency as FormDependency }
export { Group as FormGroup }

export default Form
