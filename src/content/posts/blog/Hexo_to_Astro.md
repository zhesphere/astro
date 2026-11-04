---
title: 从 Hexo 到 Astro：博客搭建复盘
published: 2026-11-04
description: 本站从 Hexo 迁到 Astro / Firefly 的完整路径：为什么换、踩过哪些坑、以及系列文章怎么读。
tags: [Hexo, Astro, Firefly, 博客]
category: "博客"
series: "博客搭建"
seriesOrder: 0
draft: false
---

这篇是「博客搭建」系列的总览。Hexo 安装、Astro 脚手架、Twikoo 评论都有单独教程；这里只讲**我为什么迁、怎么迁、迁完还差什么**，方便后来的你按路径跳读。

本站：[`blog.orbitvo.com`](https://blog.orbitvo.com)（品牌名 Zsphere）。

## 走了哪条路

按时间线大致是：

```text
Mac / Win 上搭 Hexo
  → 试着迁到 Astro（Fuwari 一类主题模板）
  → 落到 Firefly（功能更全的 Astro 主题）
  → 评论：Twikoo + MongoDB Atlas + Vercel
```

对应本系列：

| 顺序 | 文章 | 用途 |
|------|------|------|
| 1 | [Hexo_mac](/posts/blog/Hexo_mac/) | Mac 装 Hexo |
| 2 | [Hexo_Win](/posts/blog/Hexo_Win/) | Windows 装 Hexo |
| 3 | [Astro_Win](/posts/blog/Astro_Win/) | Windows 用模板起 Astro 站 |
| 4 | [Twikoo 接入 Firefly](/posts/blog/Twikoo_Firefly/) | 评论后端与前端配置 |

早期几篇偏「对着终端敲命令」；本篇和 Twikoo 那篇更偏**决策与踩坑**。两边合在一起看会顺一些。

## 为什么离开 Hexo

Hexo 对我来说够用、资料也多，迁走不是因为它「不能写博客」，而是后面这几件事越来越烦：

1. **主题与插件版本缠在一起**  
   改导航、加功能经常要同时碰主题文件和一堆 `hexo-` 插件，升级一次就怕整站花掉。

2. **想要的交互越来越不像「纯静态主题」**  
   搜索、设置面板、相册、评论、SPA 式切换——用 Hexo 硬接也能做，但心智负担已经不像「写 Markdown 就完事」。

3. **后面想统一到自己的域名与工具站**  
   博客会挂在 `blog.orbitvo.com`，评论、图床、小工具也往同一套域名体系靠；换栈时正好一起理顺，而不是在旧站上无限打补丁。

如果你只是要一个极简日记站、几乎不改主题，Hexo 仍然很合适。我这边是**功能预期涨了**，才换。

## 为什么选 Astro，又落到 Firefly

Astro 的吸引力很直接：

- 默认**少 JS**，文章页基本是静态 HTML，打开快；
- 内容用 Content Collections，frontmatter 有类型，比散落的 `_config.yml` + 主题约定好管；
- 需要交互时再挂岛屿（本站用 Svelte），而不是整站上一个前端框架。

上手时我先走了社区模板路线（见 [Astro_Win](/posts/blog/Astro_Win/) 里的 Fuwari 示例）。后来站定在 **Firefly**：在 Astro 主题上把侧栏、评论、相册、搜索、壁纸等配好，配置集中在 `src/config/`，改站点信息时不用到处翻主题源码。

选型上可以记一句：**Astro 是底座，Firefly 是我实际日更用的壳**。你也可以用别的 Astro 主题，迁移思路差不多。

## 迁移时真正费神的几件事

### 1. 文章不是「复制粘贴就完」

Hexo 的 `_posts` 和 Astro 的 `src/content/posts` 都是 Markdown，但约定不同：

- frontmatter 字段名、日期格式、`tags` / `categories` 写法要对齐新主题的 schema；
- 内链、资源路径（`{% asset_path %}` 一类）要改成普通相对路径或统一图床 URL；
- 草稿、置顶、加密文等能力，以主题文档为准，不要假设 Hexo 插件语义还在。

我的做法是：**先迁正文能读的文章，再按栏目慢慢补 description / 系列 / 封面**，而不是一次追求和旧站 1:1。

### 2. 环境与包管理

Astro / Firefly 这边更推荐 **pnpm + 较新的 Node**（本站文档要求 Node ≥ 22）。  
Windows 上还要注意 PATH、杀毒拦截 npm、PowerShell 执行策略——这些在 [Hexo_Win](/posts/blog/Hexo_Win/) 和 [Astro_Win](/posts/blog/Astro_Win/) 里都出现过，换栈也不会消失。

### 3. 部署与域名

静态输出仍然适合丢到 Vercel / Cloudflare 一类平台。迁域名时建议一次想清楚：

- 博客主域（如 `blog.orbitvo.com`）
- 评论 API 子域（本站是 `twikoo.orbitvo.com`，见 [Twikoo 文](/posts/blog/Twikoo_Firefly/)）
- 图床 / 小工具是否共用同一品牌域名

比「先上线再到处改 CORS / 回调地址」省事。

### 4. 评论不要再绑即将停的服务

旧教程常推 LeanCloud。它已在逐步停服，新站直接上 **Twikoo + MongoDB** 更划算，细节整篇写在系列第 4 篇，这里不重复。

## 迁完之后，站长日常变成什么样

和 Hexo 比，我现在更常碰的是：

- 在 `src/content/posts/` 里写 md，用 frontmatter 控制分类、系列、草稿；
- 站点文案、友链、评论、壁纸等进 `src/config/` 改；
- `pnpm dev` 本地预览，`pnpm build` 走完整构建（含 LQIP、字体子集、Pagefind 等）。

写作体验仍是「Markdown 优先」；变重的是**配置面更清晰**，以及构建步骤比 `hexo g` 长一点——换来的是主题功能不用自己东拼西凑。

## 如果你也要迁：一条最短路径

1. 用模板或 Firefly 起一个空站，先让首页和一篇测试文能在本地打开。  
2. 挑 3～5 篇旧文改 frontmatter 迁过来，确认列表、标签、内链无误。  
3. 配好生产域名与 HTTPS，再接评论（Twikoo 文可直接跟）。  
4. 旧站先 301 / 保留一段时间，确认搜索引擎与友链都指向新址后再下线。

逐步安装命令仍以系列里的 Hexo / Astro 专文为准；卡在评论就只看 Twikoo 那篇。

## 写在后面

迁栈不是为了追逐新技术名词，而是让「写文章、改站点、加评论」三条线别再互相绊脚。Hexo 教会我把博客跑起来；Astro / Firefly 让我把站点收成现在的 Zsphere。

系列还会补：公开上线前的配置清理、以及更多「能独立成篇」的硬件 / 工具文。若你卡在某一步，欢迎在文末评论区留言。
