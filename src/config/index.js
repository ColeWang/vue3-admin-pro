// 首页 (路由的拦截、以及 TagsNav 不关闭的路由 name 。)
export const HOME_ROUTE_NAME = 'HomeIndex'
// 登录页 (路由的拦截)
export const LOGIN_ROUTE_NAME = 'Login'

// iconfont 的在线地址 src/components/icon/IconFont.jsx
export const scriptUrl = ''

// 账户密码的加密密钥 记得修改
// src/views/login/ase.js
export const AES_KEY = 'D4ZX47FC4QWE12AS'

// 页面内使用的环境变量
const APP_ENV = import.meta.env['VITE_VUE_APP_ENV'] || 'production'
export const isDev = APP_ENV === 'development'
export const isProd = APP_ENV === 'production'
