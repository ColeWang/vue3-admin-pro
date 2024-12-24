## Boot files (app initialization code)

- 你的 Vue 插件有安装说明，就像需要调用 Vue.use() 一样。
- 你的 Vue 插件需要实例化添加到根实例的数据 - 一个例子是 vue-i18n 。
- 您想使用 app.mixin() 添加全局 mixin 。
- 您想添加一些东西到 Vue 应用 globalProperties 以方便访问 - 一个例子是在Vue文件中方便地使用 this.$axios (Options API) 而不是在每个这样的文件中导入 Axios 。
