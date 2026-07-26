import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
// import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 站点配置项
const config: Config = {
    title: 'Joker 沉寂',
    tagline: '「没必要的事不做，必要的事尽快做」', // TODO[可选]: 原作者座右铭，可换成你自己的
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // 生产环境站点地址（GitHub Pages 用户主页站）
    url: 'https://7756jokerqaq.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages 部署配置
    organizationName: '7756JokerQAQ', // 你的 GitHub 用户名
    projectName: '7756JokerQAQ.github.io', // 仓库名（用户主页站）

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-Hans',
        locales: ['zh-Hans'],
    },

    // 文章发布页配置
    presets: [
        [
            'classic',
            {
                // 文章配置
                docs: {
                    sidebarPath: './sidebars.ts',
                    remarkPlugins: [remarkMath],
                    // rehypePlugins: [rehypeKatex],
                    async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
                        const items = await defaultSidebarItemsGenerator(args);
                        if (args.item.dirName === 'diary' || args.item.dirName?.startsWith('diary/')) {
                            const reverseDeep = (list: any[]): any[] =>
                                list
                                    .map((it) =>
                                        it.type === 'category'
                                            ? {...it, items: reverseDeep(it.items)}
                                            : it,
                                    )
                                    .reverse();
                            return reverseDeep(items);
                        }
                        return items;
                    },
                },
                // 博客配置
                blog: {
                    blogTitle: '沉寂 个人博客',
                    blogDescription: '分享',
                    postsPerPage: 10,

                    blogSidebarTitle: '博客列表',
                    blogSidebarCount: 'ALL',

                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                // TODO[统计]: 启用 Google Analytics —— 填入你自己的 trackingID 后取消注释
                /*
                gtag: {
                    trackingID: 'G-XXXXXXXXXX',
                    anonymizeIP: true,
                },
                */
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    // 主题配置
    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus.yaml-social-card.jpg',

        // 站点元信息配置
        metadata: [
            {
                name: 'keywords',
                content: 'joker, 沉寂, blog, javascript, typescript, node, react, vue, web, 前端, 后端',
            },
            // TODO[SEO]: 在 Google / 百度站长平台申请收录验证后，取消注释并填入你的验证码
            // {
            //     name: 'algolia-site-verification',
            //     content: '你的验证码'
            // },
            // {
            //     name: 'baidu-site-verification',
            //     content: '你的验证码'
            // }
        ],

        // 顶部导航栏
        navbar: {
            title: 'Joker',
            // logo: {
            //     alt: 'My Site Logo',
            //     src: 'img/logo.png',
            // },
            // 导航栏配置
            items: [
                // TODO[导航]: computerSidebar 尚未在 sidebars.ts 定义、docs 目录也无内容，先注释（否则 build 报错）。开放步骤：① docs/ 下建目录放文档 ② sidebars.ts 里定义该 sidebarId ③ 取消本段注释
                /*
                {
                    type: 'docSidebar',
                    sidebarId: 'computerSidebar',
                    position: 'left',
                    label: '计算机基础',
                },
                */
                // TODO[导航]: llmSidebar 尚未定义，先注释（开放步骤同上）
                /*
                {
                    type: 'docSidebar',
                    label: 'AI Agent',
                    sidebarId: 'llmSidebar',
                    position: 'left',
                },
                */
                // TODO[导航]: dataStructuresSidebar 尚未定义，先注释（开放步骤同上）
                /*
                {
                    type: 'docSidebar',
                    label: '数据结构与算法',
                    sidebarId: 'dataStructuresSidebar',
                    position: 'left',
                },
                */
                // 计算机理论-下拉菜单
                // {
                //     type: 'dropdown',
                //     label: '计算机基础理论',
                //     position: 'left',
                //     items: [
                //         {
                //             type: 'docSidebar',
                //             label: '数字电路',
                //             sidebarId: 'digitalCircuit',
                //         },
                //         {
                //             type: 'docSidebar',
                //             label: '计算机组成原理',
                //             sidebarId: 'computerComposition',
                //         },
                //         {
                //             type: 'docSidebar',
                //             label: '计算机操作系统',
                //             sidebarId: 'computerOperatingSystem',
                //         },
                //         {
                //             type: 'docSidebar',
                //             label: '计算机网络',
                //             sidebarId: 'computerNetwork',
                //         },
                //     ],
                // },
                // {
                //     type: 'docSidebar',
                //     label: '编程语言',
                //     sidebarId: 'programSidebar',
                //     position: 'left',
                // },
                // TODO[导航]: cloudNativeSidebar 尚未定义，先注释（开放步骤同上）
                /*
                {
                    type: 'docSidebar',
                    label: 'DevOps',
                    sidebarId: 'cloudNativeSidebar',
                    position: 'left',
                },
                */
                // TODO[导航]: 「项目」下拉里放你自己的项目链接后取消注释
                /*
                {
                    type: 'dropdown',
                    label: '项目',
                    position: 'right',
                    items: [
                        {
                            href: 'https://github.com/your-name/your-project',
                            label: '项目一',
                        },
                    ]
                },
                */
                // {
                //     type: 'dropdown',
                //     label: '记录',
                //     position: 'right',
                //     items: [
                //         // {
                //         //     to: '/blog',
                //         //     label: '博客',
                //         // },
                //         // {
                //         //     type: 'docSidebar',
                //         //     label: '日志',
                //         //     sidebarId: 'diarySidebar',
                //         // },
                //         // {
                //         //     to: '/resume',
                //         //     label: '简历',
                //         // },
                //     ]
                // },
                {
                    type: 'docSidebar',
                    sidebarId: 'blogSidebar',
                    label: '博客',
                    position: 'left',
                },
                {
                    to: '/about',
                    label: '关于我',
                    position: 'right',
                },
                // {
                //     to: '/friendship',
                //     label: '友链',
                //     position: 'right',
                // },
                // {
                //     href: 'https://github.com/your-name',
                //     label: 'GitHub',
                //     position: 'right',
                // },
            ],
        },

        // 设置文章展示导航级别
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 5,
        },

        // TODO[搜索]: 启用 Algolia 全文搜索 —— 在 https://docsearch.algolia.com 申请后填入配置并取消注释
        /*
        algolia: {
            appId: '你的-appId',
            apiKey: '你的-apiKey',  // 公开 key，可安全提交
            indexName: '你的-indexName',
            contextualSearch: true,
            searchParameters: {},
            searchPagePath: 'search',
            insights: false,
        },
        */

        // 页脚配置
        footer: {
            copyright: `Copyright © ${new Date().getFullYear()} Joker 沉寂.`,
        },

        // 权限配置
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },

        // Mermaid 图表配置
        mermaid: {
            // theme: {light: 'neutral', dark: 'forest'},
        },
    } satisfies Preset.ThemeConfig,

    markdown: {
        // 开启Mermaid图表语法，支持直接在MD中进行展示渲染
        mermaid: true
    },
    themes: ['@docusaurus/theme-mermaid'],
};

export default config;
