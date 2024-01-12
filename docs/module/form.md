<h1 align="center">
Form - 表单
</h1>

Form 在原来的 [Antd Form](https://www.antdv.com/components/form-cn) 的基础上增加了一些语法糖，快速开发表单。

---
- 如果想要设置默认值，请使用 initialValues，任何直接使用组件 value 和 onChange 的方式都有可能导致 model 值绑定失效
- 如果想要监听某个值，建议使用 onValuesChange
- Form 只是 Antd Form 的封装，如果要使用自定义的组件可以用 Antd Form.Item 包裹后使用，支持混用


<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const FormDemo1 = defineAsyncComponent(() => {
  return import('../demos/form/demo-1');
});
const FormDemo2 = defineAsyncComponent(() => {
  return import('../demos/form/demo-2');
});
const FormDemo3 = defineAsyncComponent(() => {
  return import('../demos/form/demo-3');
});
const FormDemo4 = defineAsyncComponent(() => {
  return import('../demos/form/demo-4');
});
const FormDemo5 = defineAsyncComponent(() => {
  return import('../demos/form/demo-5');
});
const FormDemo6 = defineAsyncComponent(() => {
  return import('../demos/form/demo-6');
});
</script>

## 基本用法

<ClientOnly>
<FormDemo1></FormDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-1.jsx

</details>

## 布局

<ClientOnly>
<FormDemo2></FormDemo2>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-2.jsx

</details>

## 栅格化布局

<ClientOnly>
<FormDemo3></FormDemo3>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-3.jsx

</details>

## 表单联动

<ClientOnly>
<FormDemo4></FormDemo4>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-4.jsx

</details>

## 表单方法调用

<ClientOnly>
<FormDemo5></FormDemo5>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-5.jsx

</details>

## Form.useForm

<ClientOnly>
<FormDemo6></FormDemo6>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/form/demo-6.jsx

</details>


## API

### 属性
| 属性               | 说明                           | 类型                         | 默认值    |
| ----------------- | ------------------------------ | ---------------------------- | ------------- |
| initialValues     | 初始值 key 对应 Form.Item name   | object                       | -              |
| submitOnReset     | 提交后是否重置表单数据             | boolean                      | false          |
| grid              | 开启 grid 模式                   | boolean                      | false          |
| rowProps          | grid 模式下传递给 Antd Row        | object                       | { gutter: \[32, 0] } |

### 事件
| 事件名称            | 说明                    | 回调参数                         |
| ----------------- | ----------------------- | ---------------------------- |
| onValuesChange    | 数据变化时回调            | Function(values)            |
| onSubmit          | 提交时并且校验通过的回调     | Function(values)              |
| onFinish          | 提交时并且校验通过的回调    | Function(values)              |
| onReset           | 重置表单回调             | Function(values)              |

### 方法
| 名称               | 描述                     |
| ----------------- | ----------------------- |
| getFormInstance() | 获取 Form 实例           |

### Form 实例
| 名称                          | 描述                     |
| ---------------------------- | ----------------------- |
| formInstanceRef               | Form 实例对象            |
| model                         | 表单数据                 |
| formProps                     | Form props              |
| setModelValue(value, name?)   | 设置表单数据 (name 不传视为重置全部 model = value)  |
| getModelValue(name)           | 获取表单数据              |
| submit()                      | 提交表单                  |
| validate(names)               | 校验表单                  |
| resetFields(names)            | 重置部分表单               |
| resetForm()                   | 重置整个表单               |

## Form.Group
| 属性                | 说明                           | 类型                          | 默认值         |
| ------------------ | ------------------------------ | ---------------------------- | ------------- |
| title              | 表单组的 title                  | string \| Slot                | -              |
| size               | 间距                            | number                      | 32          |

