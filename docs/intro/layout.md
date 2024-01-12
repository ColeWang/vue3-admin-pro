<h1 align="center">
Layout - 布局
</h1>


## 布局视图

<img  src="@/layout.jpg"/>

## Layout 目录结构
```
├── components                组件
│   ├─ avatar                     头像组件
│   ├─ breadcrumb                 面包屑组件
│   ├─ fullscreen                 全屏组件
│   ├─ navbar                     导航组件
│   ├─ sidebar                    侧边栏组件
│   └─ tags-nav                   标签导航组件
├── style                     样式文件
├── AppContent.jsx            中心容器
├── AppMain.jsx               整体布局处理
├── index.jsx                  处理组件间关联逻辑并与外部逻辑承接
└── utils.js                  工具库
```

## Route 元信息

### 属性
| 属性               | 说明                                | 类型                         |
| ----------------- | ----------------------------------- | ---------------------------- |
| title             | 导航栏 title                         | string                     |
| icon              | 导航栏 icon                          | string \| () => Icon         |
| hideInMenu        | 设为 true 后在左侧菜单不会显示该页面选项   | boolean                     |
| hltInName         | 非当前路由的 高亮菜单 name              | string                     |
| access            | 可访问该页面的权限数组                  | array                     |
| notCache          | KeepAlive 不缓存此路由                | boolean                     |

## 菜单权限
getMenuList 函数会处理菜单的权限逻辑，控制菜单的显示隐藏

```jsx
const routes = [
    {
        name: 'test',
        meta: {
            // 例如 此路由只有管理员可见
            access: ['admin']
        }
    }
]

// 登陆人员的权限
const userinfo = {
    access: ['admin']
}

// getMenuList 起到过滤权限的作用
const menus = getMenuList(routes, userinfo.access)
```
