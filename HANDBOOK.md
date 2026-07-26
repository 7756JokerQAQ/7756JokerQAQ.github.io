# Joker 沉寂 站点 · 完整项目手册

> 本手册面向**项目维护者与二次开发者**，系统说明本仓库的架构、配置、自定义组件、内容写作方式以及构建部署流程。
>
> - **站点名称**：Joker 沉寂
> - **线上地址**：`https://blog.aiseek.site`
> - **框架**：Docusaurus 3.8.1 + React 19 + TypeScript
> - **手册版本**：v1.2 ｜ 最后更新：2026-07-27
>
> ℹ 注：项目迭代较快，手册正文部分示例值可能尚未完全同步，请以实际源码为准。

---

## 目录

1. [项目概览](#1-项目概览)
2. [快速开始](#2-快速开始)
3. [目录结构详解](#3-目录结构详解)
4. [核心配置详解](#4-核心配置详解)
5. [页面与路由](#5-页面与路由)
6. [自定义组件详解](#6-自定义组件详解)
7. [主题覆写（Theme Swizzle）](#7-主题覆写theme-swizzle)
8. [内容写作指南](#8-内容写作指南)
9. [特色功能专题](#9-特色功能专题)
10. [构建与部署](#10-构建与部署)
11. [已知问题与待办](#11-已知问题与待办)
12. [常用命令速查](#12-常用命令速查)
13. [附录](#13-附录)

---

## 1. 项目概览

本仓库是一个基于 **Docusaurus** 的个人博客 + 技术文档站点，集成了 Algolia 全文搜索、Google Analytics、Giscus 评论、Mermaid 图表、数学公式、PDF 在线阅读，以及一套很有特色的「君子锁」内容加密机制。

### 技术栈

| 类别 | 选型 | 说明 |
|------|------|------|
| 文档框架 | Docusaurus 3.8.1 | 已开启 `future.v4` 兼容 |
| UI | React 19 + TypeScript 5.6 | |
| 国际化 | `zh-Hans`（简体中文） | 单语言 |
| 搜索 | Algolia DocSearch | 需在 Algolia 后台配置爬虫 |
| 流量分析 | `@docusaurus/plugin-google-gtag` | 跟踪 ID `G-0C3BKNP664` |
| 评论 | Giscus（GitHub Discussions） | 两处实现，见 [§7](#7-主题覆写theme-swizzle) |
| 图表 | `@docusaurus/theme-mermaid` | Markdown 内直接写 Mermaid |
| 数学公式 | `remark-math` | ⚠ `rehype-katex` 当前被注释，见 [§11](#11-已知问题与待办) |
| PDF 阅读 | `pdfjs-dist` + `react-zoom-pan-pinch` | 自研双页阅读器 |
| 图标 | `@iconify/react` | 首页技能图标 |
| 内容加密 | 自研 TOTP（RFC 6238） | 装饰性「君子锁」，见 [§9.1](#91-君子锁内容加密) |

### 站点关键信息（来自 `docusaurus.config.ts`）

| 项 | 值 |
|----|----|
| `title` | Joker 沉寂 |
| `tagline` | 「没必要的事不做，必要的事尽快做」 |
| `url` | `https://blog.aiseek.site` |
| `baseUrl` | `/` |
| GitHub 部署 | `organizationName: 7756JokerQAQ` / `projectName: 7756JokerQAQ.github.io` |
| `onBrokenLinks` | `throw`（链接断裂直接报错，要求严格） |

---

## 2. 快速开始

### 环境要求

- **Node.js ≥ 18**（见 `package.json` 的 `engines`）
- npm（仓库自带 `package-lock.json`）

### 安装与本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（默认 http://localhost:3000）
npm start
```

### 生产构建与本地预览

```bash
# 3. 构建生产产物到 build/
npm run build

# 4. 本地预览构建产物
npm run serve
```

> ⚠ 首次构建前请先阅读 [§11 已知问题](#11-已知问题与待办)：当前导航栏引用了若干尚未在 `sidebars.ts` 中定义的侧边栏，可能导致 `npm run build` 报错。

---

## 3. 目录结构详解

```
learn.github.io/
├── docusaurus.config.ts   # 【核心】站点配置：标题/导航/主题/搜索/SEO/分析
├── sidebars.ts            # 【核心】文档侧边栏配置（目前仅定义 diarySidebar）
├── package.json           # 依赖与 npm 脚本
├── tsconfig.json          # TypeScript 配置
├── README.md              # GitHub 仓库展示用简介
├── LICENSE                # MIT
├── HANDBOOK.md            # 本手册
│
├── blog/                  # 博客内容目录
│   ├── authors.yml        #   作者定义（当前：Joker = 沉寂）
│   └── tags.yml           #   标签定义（当前：computer → 个人博客）
│   （尚无文章 *.md/*.mdx）
│
├── docs/                  # 文档内容目录
│   └── diary/             #   日志类文档（侧边栏会按时间倒序展示）
│       └── test.md        #   （当前仅一个测试文件）
│
├── src/
│   ├── pages/             # 独立页面（对应一级路由）
│   │   ├── index.tsx          # 首页
│   │   ├── about.mdx          # 关于我
│   │   ├── resume.mdx         # 简历
│   │   ├── friendship.mdx     # 友链
│   │   ├── unlock.tsx         # 动态验证码展示页（配合君子锁）
│   │   └── pdf-viewer.tsx     # PDF 在线阅读页（/pdf-viewer?file=...）
│   │
│   ├── components/        # 自定义业务组件
│   │   ├── HomePage/          # 首页：Layout / Header / Features / Skills
│   │   ├── ContentLock/       # 君子锁：内容截断 + 解锁卡片
│   │   ├── Comment/           # Giscus 评论（@giscus/react 版）
│   │   ├── PdfViewer/         # 自研 PDF 双页阅读器
│   │   ├── Mermaid/           # Mermaid 图表 + 全屏缩放
│   │   ├── Resume/            # 简历渲染（数据驱动）
│   │   └── Friendship/        # 友链渲染
│   │
│   ├── theme/             # 主题覆写（swizzle），见 §7
│   │   ├── BlogPostPage/      # 博客文章详情页（注入评论）
│   │   ├── BlogPostItem/Content/  # 博客正文（接入君子锁）
│   │   ├── DocItem/Layout/    # 文档页布局（底部追加评论）
│   │   └── DocItem/Content/   # 文档正文（接入君子锁）
│   │
│   ├── lib/totp.ts        # TOTP（RFC 6238）实现，君子锁校验用
│   └── css/custom.css     # 全局自定义样式
│
├── static/                # 原样复制到构建产物的静态资源
│   ├── img/               #   图片（favicon、首页背景、首页 gif、logo 等）
│   ├── pdfs/              #   PDF 文件（供 PdfViewer 阅读）
│   └── .nojekyll          #   告知 GitHub Pages 不走 Jekyll 处理
│
└── .docusaurus/           # Docusaurus 构建缓存（可被 npm run clear 清除）
```

---

## 4. 核心配置详解

配置集中在 `docusaurus.config.ts`，下面按功能块说明。

### 4.1 预设（presets）

使用 `classic` 预设，内含 docs、blog、gtag、theme 四块：

- **docs**
  - `sidebarPath: './sidebars.ts'`
  - `remarkPlugins: [remarkMath]`（解析 `$...$` 数学语法）
  - 自定义 `sidebarItemsGenerator`：当目录是 `diary` 或其子目录时，**整棵子树倒序**，使最新日志排在最前。
- **blog**
  - `postsPerPage: 1`（每页 1 篇）
  - `blogSidebarCount: 'ALL'`（侧边栏列出全部文章）
  - `showReadingTime: true`（显示阅读时长）
  - `feedOptions.type: ['rss', 'atom']`（生成 RSS / Atom 订阅源）
  - `onInlineTags/Authors: 'warn'`、`onUntruncatedBlogPosts: 'warn'`（鼓励规范写作）
- **gtag**：跟踪 ID `G-0C3BKNP664`，`anonymizeIP: true`
- **theme.customCss**：`./src/css/custom.css`

### 4.2 主题配置（themeConfig）

- **navbar**：左侧为文档分区入口（计算机基础 / AI Agent / 数据结构与算法 / DevOps），右侧为「项目」下拉（指向两个学习导航仓库）和「关于我」。
- **tableOfContents**：展示 `h2 ~ h5` 级别的目录。
- **algolia**：`appId: 25YYWI12TQ`，`indexName: 'Joker Web Site'`，`contextualSearch: true`。
- **metadata**（SEO）：`keywords`、`algolia-site-verification`、`baidu-site-verification`（同时做 Google / 百度收录验证）。
- **prism**：亮色 `github` / 暗色 `dracula` 代码主题。
- **footer**：`Copyright © 2021 - <今年> Joker 沉寂.`

### 4.3 Mermaid 与数学

```ts
markdown: { mermaid: true },
themes: ['@docusaurus/theme-mermaid'],
```

- Mermaid 已启用，可在 Markdown 中用 ` ```mermaid ` 代码块直接画图。
- 数学公式仅启用了 `remark-math`（解析），**渲染所需的 `rehype-katex` 与 KaTeX 样式当前被注释/未引入**，详见 [§11](#11-已知问题与待办)。

### 4.4 sidebars.ts

```ts
const sidebars = {
    diarySidebar: [{ type: 'autogenerated', dirName: 'diary' }],
};
```

目前**只定义了 `diarySidebar`**。但导航栏还引用了 `computerSidebar`、`llmSidebar`、`dataStructuresSidebar`、`cloudNativeSidebar`——它们尚未在此定义，对应的文档目录也暂无内容。这是一个需要补全的配置缺口（见 [§11](#11-已知问题与待办)）。

---

## 5. 页面与路由

`src/pages/` 下的文件会生成一级路由页面：

| 文件 | 路由 | 作用 |
|------|------|------|
| `index.tsx` | `/` | 首页，渲染 `<HomePage />` 组件 |
| `about.mdx` | `/about` | 关于我 |
| `resume.mdx` | `/resume` | 简历 |
| `friendship.mdx` | `/friendship` | 友链（导航栏当前未展示） |
| `unlock.tsx` | `/unlock` | 动态验证码展示页（每 30s 刷新） |
| `pdf-viewer.tsx` | `/pdf-viewer` | PDF 阅读页，需带 `?file=` 查询参数 |

PDF 阅读页用法：

```
/pdf-viewer?file=/pdfs/your.pdf&title=文档标题
```

缺参时会显示用法提示。

---

## 6. 自定义组件详解

### 6.1 HomePage（首页）

首页由 `src/components/HomePage/Layout/index.tsx` 组装，左右两栏：

- **左侧**：个人标题（"Hi，这里是 沉寂 👋"，带逐级延迟的入场动画）→ 简介 → `<SkillsInfo/>` 技能图标条 → "关于我"按钮。
- **右侧**：`/img/homepage/homepage.gif` 动画图。

辅助子组件：

- **Header**：随机从 4 张 `background-0X.png` 中选一张作 Hero 背景，展示站点 `title` / `tagline`。
- **Features**：三张特性卡片（408 备考中 / ALL IN AI / 持续学习），图标取自 `static/img/homepage-0X.svg`。
- **Skills**：根据 `Skills/data.ts` 渲染 Iconify 图标，链接到 GitHub / Gitee / 知乎 / 掘金 / 微信 / 邮箱。

> 想修改首页文字、社交链接、技能图标 → 改 `src/components/HomePage/**/data.ts` 与对应 `index.tsx`。

### 6.2 ContentLock（君子锁）🔒

**位置**：`src/components/ContentLock/index.tsx`

**机制**：

1. 内容**照常渲染**，但外层容器限高（默认 `380px`，可用 frontmatter `lock_preview` 覆盖）。
2. 底部用不透明锁定面板 + 解锁卡片盖住被截断的部分；标题与开头仍可见，形成"预览"。
3. 用户输入 6 位动态验证码 → 调 `verifyTOTP()` 校验 → 通过则解锁，状态写入 `sessionStorage`（**仅当次会话有效**，刷新仍保持，关标签页失效）。

**重要性质（务必了解）**：

> 这是"**君子锁**"——密钥是公开的（打包进静态站点），任何人 F12 / 禁用 JS / 看源码都能绕过。它只挡普通读者，**不是真正的安全边界**。真正的"防读取"需要内容不下发到客户端。

**触发方式**：在文章 / 文档的 frontmatter 加 `lock: true`（可选 `lock_preview: 500`）。组件通过主题覆写自动接入，无需手动包裹，见 [§7](#7-主题覆写theme-swizzle)。

### 6.3 PdfViewer（PDF 双页阅读器）📄

**位置**：`src/components/PdfViewer/index.tsx`

特性：

- **永远双页对开**展示，按容器高度自适应缩放；放不下时横向滚动。
- 工具栏：上/下页（步进 2）、页码输入、缩放（40%–400%）、重置、下载、全屏。
- **键盘左右方向键翻页**（焦点在 input/textarea 时不拦截）。
- 顶部阅读进度条；加载中 spinner；错误兜底提示。
- 使用 `pdfjs-dist`，cMap 与标准字体从 `unpkg` 按 pdfjs 版本动态加载，保证中文等字符正常显示。
- 通过 `/pdf-viewer?file=...` 页面调用，也可作为组件直接嵌入 MDX（`<PdfViewer file="/pdfs/x.pdf" />`）。

### 6.4 Mermaid（图表 + 全屏）📊

**位置**：`src/components/Mermaid/index.tsx`

- 普通态：静态展示 Mermaid 图，右上角「全屏」按钮。
- 全屏态：遮罩层 + `react-zoom-pan-pinch` 支持滚轮缩放（0.5×–8×）、双击切换、拖拽平移；ESC 退出并恢复背景滚动。
- 全屏强制浅色不透明背景，保证 Mermaid 线条/文字清晰。

### 6.5 Comment（评论）💬

**位置**：`src/components/Comment/Comment.tsx`

- 基于 `@giscus/react`，仓库 `7756JokerQAQ/7756JokerQAQ.github.io` 的 `General` 分类。
- `mapping: 'specific'` + `strict: '1'`：用根据路径生成的 term 精确匹配 GitHub Discussion，避免父子路径评论串台。
- 根据当前颜色模式切换 `light` / `transparent_dark` 主题。
- 该组件被 `DocItem/Layout` 覆写调用（文档页底部评论）。

### 6.6 Resume / Friendship

- **Resume**：数据驱动，技能列表与个人优势在 `Resume/data.ts` 维护。
- **Friendship**：友链渲染。

---

## 7. 主题覆写（Theme Swizzle）

`src/theme/` 下是对 Docusaurus 内部组件的覆写（swizzle），用于在不改源码的前提下注入自定义行为。

| 覆写路径 | 作用 |
|----------|------|
| `theme/BlogPostPage` | 博客文章详情页：注入 TOC、分页、并**通过 `<script>` 注入 Giscus**（旧式脚本注入法） |
| `theme/BlogPostItem/Content` | 博客正文：读取 frontmatter，若 `lock: true` 则用 `<ContentLock>` 包裹（仅详情页锁定，列表页摘要正常） |
| `theme/DocItem/Layout` | 文档页布局：在原布局下方追加 `<Comment/>`（@giscus/react 版评论） |
| `theme/DocItem/Content` | 文档正文：读取 frontmatter，若 `lock: true` 则用 `<ContentLock>` 包裹 |

> **关于两套评论实现**：博客详情页（`BlogPostPage`）用原始 `<script>` 注入 Giscus；文档页（`DocItem/Layout`）用 `@giscus/react` 的 `<Comment/>` 组件。两套实现并存，未来可考虑统一为 `Comment` 组件以降低维护成本。

---

## 8. 内容写作指南

### 8.1 新增博客文章

在 `blog/` 下新建 `YYYY-MM-DD-my-post.mdx`（或 `.md`），典型 frontmatter：

```mdx
---
title: 文章标题
description: 摘要描述
tags: [computer]            # 引用 tags.yml 中定义的标签
authors: [Joker]            # 引用 authors.yml 中定义的作者
date: 2026-07-26            # 文件名已含日期时可不写
draft: false                # true 则不发布
# —— 可选：开启君子锁 ——
lock: true
lock_preview: 380           # 可见预览高度 px
---

正文内容……支持 $E=mc^2$（需先修复 KaTeX）、` ```mermaid ` 图、
`<PdfViewer file="/pdfs/xxx.pdf" />` 等组件。
```

- **作者**：在 `blog/authors.yml` 维护。当前 `Joker` → name "沉寂"。
- **标签**：在 `blog/tags.yml` 维护。当前 `computer` → label "个人博客"。
- 每页 1 篇（`postsPerPage: 1`），侧边栏展示全部文章。

### 8.2 新增文档

在 `docs/<分区>/` 下新建 `.md`。文档按目录结构自动生成侧边栏。

要让导航栏的「计算机基础 / AI Agent / 数据结构与算法 / DevOps」可用，需要：

1. 在 `docs/` 下建立对应目录并放入文档；
2. 在 `sidebars.ts` 中定义对应的 `sidebarId`（`computerSidebar` / `llmSidebar` / `dataStructuresSidebar` / `cloudNativeSidebar`），各指向自己的 `dirName`。

`diary/` 目录已配置好：其文档会按时间**倒序**展示（最新在最前）。

### 8.3 使用特色组件

| 需求 | 写法 |
|------|------|
| 锁定文章 | frontmatter 加 `lock: true`（详见 §6.2） |
| 获取解锁码 | 访问 `/unlock` 页查看当前 6 位动态码（每 30s 更新） |
| 嵌入 PDF | `<PdfViewer file="/pdfs/xxx.pdf" title="标题" />`，或用 `/pdf-viewer?file=...` 页 |
| 画 Mermaid 图 | ` ```mermaid ` 代码块；需要全屏缩放可用 `<MermaidChart mermaidData={\`...代码...\`} />` |
| 数学公式 | `$inline$` / `$$block$$`（⚠ 需先修复 KaTeX，见 §11） |

---

## 9. 特色功能专题

### 9.1 君子锁（内容加密）

**组成**：`src/lib/totp.ts` + `src/components/ContentLock/` + `src/pages/unlock.tsx` + 主题覆写接入。

**完整链路**：

1. 文章 frontmatter 设 `lock: true` → 主题覆写用 `<ContentLock>` 包裹正文。
2. 正文限高截断，底部出现解锁卡片（含公众号二维码引导）。
3. 读者访问 `/unlock` 页 → 页面用**公开密钥** `JOKERBLOGUNLOCK` 实时生成当前 6 位 TOTP 码（每 30s 一变）。
4. 读者把码填回文章解锁框 → `verifyTOTP()` 校验（±1 个时间窗，共 90s 时钟容错，恒定时间比较）→ 通过则解锁并存 `sessionStorage`。

**TOTP 实现**（`src/lib/totp.ts`）：标准的 RFC 6238——Base32 解码密钥 → HMAC-SHA1（用 Web Crypto）→ 动态截断 → 模 10^6 得 6 位码。

> 想换"密码"？改 `UNLOCK_SECRET`（仅 Base32 字符 A–Z / 2–7），并同步 `/unlock` 页与公众号回复来源即可——但记住它仍然是公开的、可被绕过的装饰性锁。

### 9.2 PDF 在线阅读器

见 [§6.3](#63-pdfviewer-pdf-双页阅读器)。PDF 文件放在 `static/pdfs/` 下，通过 `/pdf-viewer?file=/pdfs/xxx.pdf` 阅读。

### 9.3 Mermaid 全屏交互

见 [§6.4](#64-mermaid-图表--全屏)。

### 9.4 Algolia 搜索

配置在 `themeConfig.algolia`。注意 `apiKey` 是**公开可提交的搜索 key**（安全）；但搜索结果依赖 Algolia 后台爬虫定期抓取站点，需自行在 Algolia DocSearch 配置。

### 9.5 SEO 与流量分析

- Google Analytics（gtag `G-0C3BKNP664`）
- 收录验证：Google（`algolia-site-verification`）+ 百度（`baidu-site-verification`）
- `keywords` meta 覆盖中英文技术关键词

---

## 10. 构建与部署

### 10.1 构建产物

`npm run build` 输出到 `build/`，是一组纯静态文件，可托管在任意静态服务器。

### 10.2 GitHub Pages 部署

配置中已设置 `organizationName: '7756JokerQAQ'` / `projectName: '7756JokerQAQ'`。可使用：

```bash
# 使用 Docusaurus 内置部署命令（需配置好 GitHub Pages 与环境变量 GH_TOKEN 等）
npm run deploy
```

`static/.nojekyll` 文件确保 GitHub Pages 跳过 Jekyll 处理，保留下划线开头的资源文件。

> 实际仓库地址与 `README.md` 中克隆链接（`7756JokerQAQ/7756JokerQAQ.github.io`）需以实际为准，二者命名不一致，部署时请核对。

### 10.3 其他命令

```bash
npm run clear             # 清除 .docusaurus 缓存（遇到诡异构建问题时先清缓存）
npm run typecheck         # TypeScript 类型检查（tsc）
npm run write-translations    # 生成 i18n 翻译文件
npm run write-heading-ids     # 为 Markdown 标题自动生成锚点 id
```

---

## 11. 已知问题与待办

> 这些是分析项目时发现的、值得在后续维护中处理的事项。

1. **导航栏与侧边栏配置不一致（可能导致 build 失败）**
   导航栏引用 `computerSidebar` / `llmSidebar` / `dataStructuresSidebar` / `cloudNativeSidebar`，但 `sidebars.ts` 仅定义了 `diarySidebar`，且对应 `docs/` 目录尚无内容。在 `onBrokenLinks: 'throw'` 下，`npm run build` 可能报错。
   **建议**：要么补全各 `sidebarId` 定义并放入文档，要么先在导航栏中注释掉对应入口。

2. **内容尚未填充**
   `blog/` 暂无文章，`docs/` 仅 `diary/test.md`（且为空文件）。站点处于"骨架就绪、等内容"状态。

3. **数学公式渲染未完成**
   仅启用了 `remark-math`（解析 `$...$`），渲染所需的 `rehype-katex` 与 KaTeX CSS 被注释/未引入，当前公式语法不会真正渲染成数学式。
   **建议**：取消 `docusaurus.config.ts` 中 `rehypeKatex` 的注释，并按 Docusaurus 官方文档引入 KaTeX 样式。

4. **两套评论实现并存**
   博客详情页用 `<script>` 注入 Giscus，文档页用 `@giscus/react` 组件。可统一以降低维护成本。

5. **README 信息略有滞后**
   克隆地址与 `cd blog` 的运行说明与实际仓库结构不完全一致，建议校正。

6. **君子锁二维码占位**
   `ContentLock` 引用 `/img/wechat-qr.png`，且在加载失败时自动隐藏。需放置实际公众号二维码后该引导才生效。

---

## 12. 常用命令速查

| 命令 | 作用 |
|------|------|
| `npm install` | 安装依赖 |
| `npm start` | 启动开发服务器（热更新） |
| `npm run build` | 生产构建到 `build/` |
| `npm run serve` | 本地预览构建产物 |
| `npm run deploy` | 部署到 GitHub Pages |
| `npm run clear` | 清除 `.docusaurus` 缓存 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run write-translations` | 生成 i18n 文件 |
| `npm run write-heading-ids` | 为标题生成锚点 id |

---

## 13. 附录

### 13.1 关键文件清单

| 文件 | 用途 |
|------|------|
| `docusaurus.config.ts` | 站点总配置 |
| `sidebars.ts` | 文档侧边栏 |
| `src/pages/index.tsx` | 首页入口 |
| `src/components/HomePage/Layout/index.tsx` | 首页组装 |
| `src/components/ContentLock/index.tsx` | 君子锁组件 |
| `src/lib/totp.ts` | TOTP 算法 + 公开密钥 |
| `src/pages/unlock.tsx` | 动态码展示页 |
| `src/components/PdfViewer/index.tsx` | PDF 阅读器 |
| `src/pages/pdf-viewer.tsx` | PDF 阅读页路由 |
| `src/components/Mermaid/index.tsx` | Mermaid 全屏组件 |
| `src/components/Comment/Comment.tsx` | Giscus 评论组件 |
| `src/theme/**` | 主题覆写（评论接入 + 锁接入） |
| `blog/authors.yml` / `blog/tags.yml` | 博客作者 / 标签 |
| `src/css/custom.css` | 全局自定义样式 |

### 13.2 外部依赖参考

- Docusaurus 文档：https://docusaurus.io/
- Algolia DocSearch：https://docsearch.algolia.com/
- Giscus：https://giscus.app/
- Mermaid：https://mermaid.js.org/
- pdfjs-dist：https://github.com/mozilla/pdf.js
- Iconify：https://iconify.design/

---

*如需将本手册发布到站点上：把 `HANDBOOK.md` 移入 `docs/` 下某个分区，并在 `sidebars.ts` 中为其配置侧边栏即可被 Docusaurus 渲染为文档页。*
