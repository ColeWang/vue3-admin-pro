<h1 align="center">
NavBar - 导航栏
</h1>


<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const NavbarDemo1 = defineAsyncComponent(() => {
  return import('../demos/navbar/demo-1');
});
</script>

## 基本用法

<ClientOnly>
<NavbarDemo1></NavbarDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/navbar/demo-1.jsx

</details>

## API

### 属性
| 属性               | 说明                           | 类型                         | 默认值    |
| ----------------- | ------------------------------ | ---------------------------- | ------------- |
| collapsed         | 折叠                            | boolean                     | false           |

### 事件
| 事件名称            | 说明                    | 回调参数                         |
| ----------------- | ----------------------- | ---------------------------- |
| onChange          | 数据变化时回调            | Function(value)            |


