<h1 align="center">
TagsNav - 标签导航
</h1>

<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const TagsNavDemo1 = defineAsyncComponent(() => {
  return import('../demos/tags-nav/demo-1');
});
</script>

## 基本用法

<ClientOnly>
<TagsNavDemo1></TagsnavDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/tags-nav/demo-1.jsx

</details>

## API

### 属性
| 属性               | 说明                           | 类型                         | 默认值    |
| ----------------- | ------------------------------ | ---------------------------- | ------------- |
| homeName         | 保留的标签                        | string                     | -           |
| route            | 当前路由                         | Route                     | -           |
| tags             | 展示的标签                      | Route[\]                 | \[]           |

### 事件
| 事件名称            | 说明                    | 回调参数                         |
| ----------------- | ----------------------- | ---------------------------- |
| onClick           | 标签点击回调             | Function(current)            |
| onClose           | 数据变化时回调            | Function(values, name?)      |