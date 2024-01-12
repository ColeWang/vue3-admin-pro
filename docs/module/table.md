<h1 align="center">
Table - 表格
</h1>

Table 在 [Antd Table](https://www.antdv.com/components/table-cn) 上进行了一层封装，支持了一些预设，并且封装了一些行为。
Table 是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。
依托于 Form 的能力，Table 的搜索变得简单。request 是 Table 最重要的 API，request 会接收一个对象。对象中必须要有 data。
如果需要手动分页 total 也是必需的。 request 会接管 loading 的设置，同时在查询表单查询时和 params 参数发生修改时重新执行。 查询表单的值和 params 参数也会带入。


<script setup>
import { defineAsyncComponent } from 'vue';
import '../packages/style.css';

const TableDemo1 = defineAsyncComponent(() => {
  return import('../demos/table/demo-1');
});
const TableDemo2 = defineAsyncComponent(() => {
  return import('../demos/table/demo-2');
});
const TableDemo3 = defineAsyncComponent(() => {
  return import('../demos/table/demo-3');
});
const TableDemo4 = defineAsyncComponent(() => {
  return import('../demos/table/demo-4');
});
</script>

<style>
.ant-table-wrapper table {
  display: table !important;
  text-align: start !important;
  border-collapse: separate !important;
  margin: 0 !important;
  border-radius: 8px 8px 0 0 !important;
}

.ant-table-wrapper td, .ant-table-wrapper th {
  border: none !important;
}

.ant-table-wrapper a {
  text-decoration: none;
}

.ant-pagination-options {
  margin-top: 0 !important;
}
</style>

## 基本用法

<ClientOnly>
<TableDemo1></TableDemo1>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/table/demo-1.jsx

</details>

## 隐藏搜索栏

<ClientOnly>
<TableDemo2></TableDemo2>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/table/demo-2.jsx

</details>

## 隐藏工具栏

<ClientOnly>
<TableDemo3></TableDemo3>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/table/demo-3.jsx

</details>

## 数据处理

<ClientOnly>
<TableDemo4></TableDemo4>
</ClientOnly>

<details>
<summary>显示代码</summary>

<<< @/demos/table/demo-4.jsx

</details>


## API

### 属性
| 属性                | 说明                           | 类型                          | 默认值         |
| ------------------ | ------------------------------ | ---------------------------- | ------------- |
| title              | 表单 Title                      | string \| Slot               | -              |
| manualRequest      | 是否需要手动触发首次请求            | boolean                      | false          |
| request            | 数据的获取                       | (params, paginate, filter, sort) => Promise.resolve(\{ data, success, total }) | -              |
| params             | request的参数 修改之后会触发更新    | object                       | -              |
| beforeSearchSubmit | 表单提交前的数据处理               | (values) => values           | -              |
| postData           | 对 request 获取的数据进行处理      | (data, params, paginate, filter, sort) => \[]                  | -              |
| action             | Table action 的引用 便于自定义触发 | object                       | -               |
| search             | 搜索表单                         | object \| false              | -               |
| toolbar            | 工具栏                           | object \| false              | -              |

### 事件
| 事件名称            | 说明                    | 回调参数                                               |
| ----------------- | ----------------------- | ----------------------------------------------------- |
| onChange          | Table 数据变化的回调       | Function(paginate, filters, sorter, extra)            |
| onPaginateChange  | 分页变化的回调            | Function(paginate)                                    |
| onFilterChange    | 过滤的回调                 | Function(filter)                                       |
| onSortChange      | 排序变化的回调            | Function(sort)                                         |
| onLoadingChange   | loading 变化的回调       | Function(value)                                        |
| onSizeChange      | size 变化的回调          | Function(size)                                        |
| onLoad            | 数据请求成功的回调        | Function(data)                                        |
| onRequestError    | 数据请求失败的回调        | Function(err)                                          |
| onSubmit          | 表单提交回调             | Function(values)                                       |
| onReset           | 表单重置回调             | Function(params)                                       |

### 方法
| 名称                   | 描述                                |
| --------------------- | ----------------------------------- |
| reload(resetCurrent?) | 重置表单 参数为 true 时分页回到 第一页    |

## Columns 列定义
| 名称                   | 描述                                | 类型                          | 默认值                      |
| ---------------------- | ----------------------------------- | --------------------------- | -------------------------- |
| title                  | 列头显示文字                          | string                      | -                           |
| dataIndex              | 列数据在数据项中对应的路径              | string                      | -                           |
| key                    | dataIndex 的变体                     | string                      | -                           |
| customRender           | 渲染函数                             | Function(text, record, number, action, column) | -        |
| filters                | 表头的筛选菜单项                      | object\[]                    | -                           |
| sorter                 | 排序函数                             | Function \| boolean         | -                           |
| onFilter               | 作为 filter 事件使用                  | Function                   | -                           |
| fixed                  | 固定列                               | 'left' \| 'right'           | -                            |
| width                  | 列宽度                                | string \| number            | -                            |
| ellipsis               | 自动省略                              | boolean \| { showTitle?\: boolean } | false              |
| copyable               | 可复制的                            | boolean                      | false                       |
| disable                | 禁用表头的 显示隐藏                     | boolean                     | false                       |
| search                 | 是否为搜索项                          | boolean                      | false                       |
| hideInTable            | 在 Table 中隐藏                      | boolean                      | false                        |
| valueType              | 搜索的输入框类型                       | string                      | 'text'                      |
| initialValue           | 初始值                              | all                         |  -                      |
| valueEnum              | 选择框的枚举值 同时也根据 value 返回对应项 | object                      | -                           |
| fieldProps             | 输入框的 props                       | object                      | -                           |
| formItemProps          | Form.Item 的 props                  | object                      | -                           |


## valueType 值类型
| 名称       | 描述                                |
| --------- | ----------------------------------- |
| text      | Text 组件                            |
| number    | Number 组件                          |
| select    | Select 组件                          |
| textarea  | TextArea 组件                        |
| date       | DatePicker 组件                     |
| dateRange  | RangePicker 组件                    |

## Action
| 属性                | 说明                           | 类型                          | 默认值         |
| ------------------ | ------------------------------ | ---------------------------- | ------------- |
| max                | 子元素超过 max 将生成下拉菜单     | number                         | 3              |
| size               | 间距                            | number                      | 8          |

## Action.Item
| 属性                | 说明                           | 类型                                   | 默认值         |
| ------------------ | ------------------------------ | ----------------------------------- | ------------- |
| type               | 类型                            | 'primary' \| 'warning' \| 'error'  | 'primary'     |

