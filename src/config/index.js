// 首页
export const HOME_NAME = 'HomeIndex'
// 登录页
export const LOGIN_NAME = 'Login'
// iconfont cn
export const scriptUrl = '//at.alicdn.com/t/c/font_3980375_cbczlwhxpvl.js'

const APP_ENV = import.meta.env['VITE_VUE_APP_ENV'] || 'production'
export const isDev = APP_ENV === 'development'
export const isProd = APP_ENV === 'production'
