import { Form as AForm } from 'ant-design-vue'
// ---
import Form from './Form'
import { default as FormItem } from './Item'
import { default as FormList } from './List'
import { default as FormGroup } from './Group'
import { default as FormDependency } from './Dependency'

const useForm = AForm.useForm

Form.useForm = useForm
Form.Item = FormItem
Form.List = FormList
Form.Group = FormGroup
Form.Dependency = FormDependency

export {
    useForm,
    Form,
    FormItem,
    FormList,
    FormGroup,
    FormDependency
}
