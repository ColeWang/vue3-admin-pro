import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: 'Admin ',
    base: '/docs/',
    themeConfig: {
        siteTitle: 'Admin',
        lastUpdated: true,
        nav: [
            {
                text: '指南',
                link: '/intro/introduce',
            },
            {
                text: '组件',
                link: '/module/loading',
            },
        ],
        sidebar: {
            '/intro/': [
                {
                    text: '指南',
                    items: [
                        {
                            text: '介绍',
                            link: '/intro/introduce',
                        },
                        {
                            text: '快速上手',
                            link: '/intro/started',
                        },
                        {
                            text: '目录结构',
                            link: '/intro/structure',
                        },
                    ]
                },
                {
                    text: '模板深入',
                    items: [
                        {
                            text: 'Layout - 布局',
                            link: '/intro/layout',
                        },
                        {
                            text: 'SideBar - 侧边栏',
                            link: '/intro/sidebar'
                        },
                        {
                            text: 'NavBar - 导航栏',
                            link: '/intro/navbar'
                        },
                        {
                            text: 'TagsNav - 标签导航',
                            link: '/intro/tags-nav'
                        }
                    ]
                }
            ],
            '/module/': [
                {
                    text: '通用',
                    items: [
                        {
                            text: 'Loading - 全局加载',
                            link: '/module/loading',
                        },
                        {
                            text: 'Icon - 图标',
                            link: '/module/icon',
                        },
                    ],
                },
                {
                    text: '数据录入',
                    items: [
                        {
                            text: 'Form - 表单',
                            link: '/module/form',
                        },
                        {
                            text: 'Fields - 表单项',
                            link: '/module/fields',
                        },
                        {
                            text: 'ModalForm - 浮层表单',
                            link: '/module/modal-form',
                        },
                        {
                            text: 'QueryFilter - 筛选表单',
                            link: '/module/query-filter',
                        },
                        {
                            text: 'Field - 原子组件',
                            link: '/module/field',
                        }
                    ],
                },
                {
                    text: '数据展示',
                    items: [
                        {
                            text: 'Table - 表格',
                            link: '/module/table',
                        },
                        {
                            text: 'EditTable - 可编辑表格',
                            link: '/module/edit-table',
                        }
                    ],
                }
            ],
        }
    },
})
