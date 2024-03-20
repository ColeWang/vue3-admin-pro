import { Form as AntForm } from 'ant-design-vue'
import Form from './Form'
import Group from './Group'
import Dependency from './Dependency'

Form.useForm = AntForm.useForm
Form.Item = AntForm.Item
Form.Group = Group
Form.Dependency = Dependency

export const useForm = AntForm.useForm
export const FormItem = AntForm.Item
export { Group as FormGroup }
export { Dependency as FormDependency }

export default Form
