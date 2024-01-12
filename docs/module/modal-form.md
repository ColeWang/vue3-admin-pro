<h1 align="center">
ModalForm - 浮层表单
</h1>

ModalForm 是 Form 的一个变体，表现与 Form 相同，是 Form 于 [Antd Modal](https://www.antdv.com/components/modal-cn) 的结合。
ModalForm 本质上仍然是个表单，所以无法通过 footer 来自定义页脚。

---
- ModalForm 提供了 trigger 来减少 state 的使用，如果你需要使用 state 来控制可以使用 open 和 close 来控制打开与关闭
- ModalForm 的 onFinish onSubmit 与 Form 不同，是个 Promise，如果你正常返回 Promise 会自动为你设置按钮的加载效果

<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const ModalFormDemo1 = defineAsyncComponent(() => {
  return import('../demos/modal-form/demo-1');
});
const ModalFormDemo2 = defineAsyncComponent(() => {
  return import('../demos/modal-form/demo-2');
});
</script>

## 基本用法

<ClientOnly>
<ModalFormDemo1></ModalFormDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/modal-form/demo-1.jsx

</details>

## 可控的

<ClientOnly>
<ModalFormDemo2></ModalFormDemo2>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/modal-form/demo-2.jsx

</details>

## API

### 属性
| 属性               | 说明                    | 类型                         | 默认值    |
| ----------------- | ----------------------- | ---------------------------- | ------------- |
| title             | 弹框 Title               | string                       | -            |
| width             | 弹框宽度                 | number                        | 800          |
| maskClosable      | 点击蒙层是否关闭           | boolean                      | true          |
| modalProps        | Modal 的 Props          | object                        | -            |
| submitText        | 提交按钮文字              | string                        | '确认'        |
| resetText         | 重置按钮文字              | string                        | '取消'        |
| onFinish          | 提交                 | (values) => Promise.resolve(true) | -            |
| onSubmit          | 提交                 | (values) => Promise.resolve(true) | -            |

### 事件
| 事件名称            | 说明                  | 回调参数                       |
| ----------------- | --------------------- | ---------------------------- |
| onOpen            | 打开的回调              | Function()                   |
| onCancel          | 关闭的回调              | Function()                   |
| onAfterClose      | 关闭后的回调            | Function()                   |
| onLoadingChange   | loading 变化的回调      | Function(value)              |
| onOpenChange      | open 变化的回调         | Function(value)              |


### 方法
| 名称               | 描述                     |
| ----------------- | ----------------------- |
| getFormInstance()  | 获取 Form 实例  |
| open()             | 打开          |
| close()            | 关闭           |
