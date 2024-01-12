<h1 align="center">
SideBar - 侧边栏
</h1>


<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const SidebarDemo1 = defineAsyncComponent(() => {
  return import('../demos/sidebar/demo-1');
});
</script>

<style>
.ant-menu-root {
  padding-left: 0 !important;
  margin: 0 !important;
}
</style>

## 基本用法

<ClientOnly>
<SidebarDemo1></SidebarDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/sidebar/demo-1.jsx

</details>

## API

### 属性
| 属性               | 说明                           | 类型                         | 默认值    |
| ----------------- | ------------------------------ | ---------------------------- | ------------- |
| collapsed         | 折叠                            | boolean                     | false           |
| route             | 当前路由                      | Route                       | -          |
| menus             | 菜单数据                        | Route\[]                     | \[]          | 

### 事件
| 事件名称            | 说明                    | 回调参数                         |
| ----------------- | ----------------------- | ---------------------------- |
| onChange          | 数据变化时回调            | Function(name)            |

