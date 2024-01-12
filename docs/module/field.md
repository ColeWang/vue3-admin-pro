<h1 align="center">
Field - 原子组件
</h1>

内部组件。

---
- 原子组件，统一 Form、Table 等组件里面的字段定义

<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const FieldDemo1 = defineAsyncComponent(() => {
  return import('../demos/field/demo-1');
});
</script>

## 基本用法

<ClientOnly>
<FieldDemo1></FieldDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/field/demo-1.jsx

</details>

