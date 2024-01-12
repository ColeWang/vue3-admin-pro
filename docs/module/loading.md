<h1 align="center">
Loading - 全局加载
</h1>

全局 loading，将覆盖整个屏幕，一般用于初始化加载。

<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const LoadingDemo1 = defineAsyncComponent(() => {
  return import('../demos/loading/demo-1');
});
</script>

## 基本用法

<ClientOnly>
<LoadingDemo1></LoadingDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/loading/demo-1.jsx

</details>