## Table
```text
request (params,paginate,filter,sort) => {data,success,total}
manualRequest
params
beforeSearchSubmit 格式化搜索表单提交数据
postData
action
search
toolbar
labelWidth
* @todo
span 配置查询表单的列数
```



## Columns
```text
customRender 渲染函数 Function({text, record, index, column}) {}
ellipsis 自动省略
key
colSpan
align
fixed
width
maxWidth
minWidth
filters 过滤
sorter 排序
onFilter 本地模式下 确定筛选的运行函数
*
title FormItem.label
dataIndex FormItem.name
*
initialValue 默认值
valueType 搜索组件类型
valueEnum 值的枚举
fieldProps 搜索组件参数
formItemProps FormItem组件参数
customRender 渲染函数 Function(text, record, number, action, column) {}
disable 列设置中disabled的状态
copyable 是否支持复制
search 是否搜索项
hideInTable 在 Table 中不展示 (存在搜索项 不展示的)
* @todo
editable 在编辑表格中是否可编辑
```
