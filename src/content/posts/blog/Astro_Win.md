---
title: Astro_Win
published: 2026-04-10
description: 
image: ""
tags: [Astro]
category: blog
description: ""
---
[博客构建历程：从 Hexo 到 Astro - Water Space](https://www.waterwater.moe/posts/2024/blog-migration/)
[从零搭建Astro博客：1小时完成首页到部署的完整指南 · 比邻](https://eastondev.com/blog/zh/posts/dev/20251202-astro-blog-tutorial/)
[Astro 博客搭建全过程：从零到上线 | Lu's Blog](https://llxx.cc/posts/2026/04/astro-blog-setup-guide)
# 环境准备
## 安装Node.js(如果还没装的话)
Astro需要Node.js v18或更高版本。先检查一下你的版本:
```
node -v
npm -v
```
如果显示版本号了,那就跳过这步。如果还没装,去[Node.js官网](https://nodejs.org/)下载LTS版本就行。
**Windows用户的小坑**:安装时记得勾选”Add to PATH”,不然后面命令找不到。还有就是有些杀毒软件会拦截npm安装,装完后最好重启一次命令行。
# 通过 CLI 向导安装
## 方式二：使用社区主题模板（推荐）
如果你不想从零搭 UI，直接用成熟的博客主题。以 [🍥Fuwari](https://github.com/saicaca/fuwari/tree/1399bd9bc790d53ac0ca6ffa8d983ae4c3ee6608) 为例：
在你的终端中运行以下命令，可以替换为你想使用的主题的 GitHub 用户名和仓库：
```
pnpm create astro@latest -- --template "saicaca/fuwari"
```
默认情况下，此命令将使用模板仓库的 `main` 分支。如果要使用不同的分支名称，请在 `--template` 参数中指定：`<github-username>/<github-repo>#<branch>`。

然后会弹出一堆选项:
1. **项目名称**：指定安装地点和名称`C:\Users\admin\Desktop\my-blog`
2. **安装依赖**：选 **Yes**
3. **初始化Git仓库**：选 **Yes**
```
#权限问题报错
error Error: Process exited with code 1
error Dependencies failed to install, please run npm install to install them manually after setup.
Project initialized!
      ■ Template copied
      ■ Dependencies installed
      ■ Git initialized
```

```
Enter your project directory using cd ./Desktop\Alyz
Run npm run dev to start the dev server. q + ENTER to stop.
Add frameworks like react or tailwind using astro add.
```
# 主题指南
## How to Use
1. [Generate a new repository](https://github.com/saicaca/fuwari/generate) from this template or fork this repository.
2. To edit your blog locally, clone your repository, run AND to install dependencies. `pnpm install``pnpm add sharp`
    - Install [pnpm](https://pnpm.io/) if you haven't.`npm install -g pnpm`
3. Edit the config file to customize your blog.`src/config.ts`
4. Run to create a new post and edit it in .`pnpm new-post <filename>``src/content/posts/`
5. Deploy your blog to Vercel, Netlify, GitHub Pages, etc. following [the guides](https://docs.astro.build/en/guides/deploy/). You need to edit the site configuration in before deployment.`astro.config.mjs`
## Frontmatter of Posts
```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: /images/cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```
## Commands
All commands are run from the root of the project, from a terminal:

|Command|Action|
|:--|:--|
|`pnpm install` AND `pnpm add sharp`|Installs dependencies|
|`pnpm dev`|Starts local dev server at `localhost:4321`|
|`pnpm build`|Build your production site to `./dist/`|
|`pnpm preview`|Preview your build locally, before deploying|
|`pnpm new-post <filename>`|Create a new post|
|`pnpm astro ...`|Run CLI commands like , `astro add``astro check`|
|`pnpm astro --help`|Get help using the Astro CLI|

# Astro_Paper
```
pnpm create astro@latest --template satnaing/astro-paper
.../19dfae01ade-1054                     |  +23 ++
.../19dfae01ade-1054                     | Progress: resolved 23, reused 23, downloaded 0, added 23, done

 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         ./C:\Users\admin\Desktop\Alyz
      ◼  tmpl Using satnaing/astro-paper as project template

  deps   Install dependencies?
         Yes
      ◼  warn Third-party template detected. Installing dependencies may run lifecycle scripts. Continue only if you trust this template. Use --no-install to skip automatic install.

   git   Initialize a new git repository?
         Yes

      ✔  Project initialized!
         ■ Template copied
         ■ Dependencies installed
         ■ Git initialized

  next   Liftoff confirmed. Explore your project!

         Enter your project directory using cd ./Alyz
         Run pnpm dev to start the dev server. q + ENTER to stop.
         Add frameworks like react or tailwind using astro add.

         Stuck? Join us at https://astro.build/chat
```

# Upgrade to Astro v6
Update your project’s version of Astro to the latest version using your package manager:
- pnpm
```
# Upgrade Astro and official integrations together
pnpm dlx @astrojs/upgrade
```