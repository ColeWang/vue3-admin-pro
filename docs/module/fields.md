<h1 align="center">
Fields - 表单项
</h1>

Form 自带了一些表单项, 这些组件本质上是 [Antd Form.Item](https://www.antdv.com/components/form-cn#form-item) 和 组件的结合。
可以把他们当成一个 Antd Form.Item 来使用，并且支持各种 props。
每个表单项都支持 fieldProps 属性来支持设置输入组件的 props。
支持了 placeholder 的透传，你可以直接在组件上设置 placeholder。

---
- Field 组件是 BaseField + Form.Item 的结合
- Field 是内部底层原子化的表单组件，应减少对 Field 的使用，转为使用 Field 的拓展组件
- Field 的拓展组件可将 props 直接作用到 formItemProps，所以我们给 Field 拓展组件设置的 props 其实是 Antd Form.Item 的，fieldProps 才是包含的组件的
- width 指的是输入框的宽度，不包括 label


<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const FieldsDemo1 = defineAsyncComponent(() => {
  return import('../demos/fields/demo-1');
});
</script>

## 基本用法

<ClientOnly>
<FieldsDemo1></FieldsDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/fields/demo-1.jsx

</details>

## API

### 通用的属性

| 属性               | 说明                           | 类型                                                  | 默认值         |
| ----------------- | ------------------------------ | ---------------------------------------------------- | ------------- |
| width             | Field 的宽度，支持了一些枚举       | number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'       | -             |
| mode              | 组件模式                         | 'read' \| 'edit'                                     | 'edit'        |
| text              | 显示文字 和 value 对称            | any                                                  | -             |
| placeholder       | 占位符                           | string                                               | -            |
| valueEnum         | Select 的枚举值                  | object                                               | -              |
| fieldProps        | Antd 组件的 props                | object                                                | -            |
| formItemProps     | Form.Item 组件的 props           | object                                                | -            |
| colProps          | 开启 grid 模式并传递给 Antd Col    | object                                               | -             |

```js
const SizeEnum = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}
```

## 组件列表

| 组件              | 描述                                                             |
| ----------------- | ----------------------------------------------------------------- |
| Text             | 与 [Antd Input](https://www.antdv.com/components/input-cn) 相同。        |
| Number           | 与 [Antd Number](https://www.antdv.com/components/input-number-cn) 相同。     |
| Select           | 与 [Antd Select](https://www.antdv.com/components/select-cn) 相同。     |
| DatePicker       | 与 [Antd DatePicker](https://www.antdv.com/components/date-picker-cn) 相同。     |
| RangePicker       | 与 [Antd RangePicker](https://www.antdv.com/components/date-picker-cn) 相同。 |
| TextArea       | 与 [Antd TextArea](https://www.antdv.com/components/input-cn#components-input-demo-textarea) 相同。|

## 更多原子化组件开发中...
