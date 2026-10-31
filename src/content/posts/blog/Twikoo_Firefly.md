---
title: Firefly 博客接入 Twikoo 评论（MongoDB + Vercel）
published: 2026-10-30
description: 从零部署 Twikoo 后端并接入 Firefly：MongoDB Atlas、Vercel、自定义域名与 commentConfig。
tags: [Twikoo, 评论, Firefly, Vercel, MongoDB]
category: "博客"
series: "博客搭建"
seriesOrder: 4
draft: false

---

本文记录本站从「评论未配置」到启用 [Twikoo](https://twikoo.js.org/) 的完整流程：用 **MongoDB Atlas** 存评论，用 **Vercel** 跑云函数，再绑到自己的子域名，最后在 Firefly 里改一行配置。

本站示例域名：评论 API 为 `https://twikoo.orbitvo.com`，博客为 `https://blog.orbitvo.com`。你换成自己的域名即可。

## 背景：为什么不用 LeanCloud

很多旧教程（含早期 Waline）默认用 LeanCloud 当数据库。LeanCloud 已公告逐步停服：自 2026-01-12 起停止新用户注册与新建应用，并将于 2027-01-12 正式停止服务。详见官方说明：

- [关于 LeanCloud 停止对外提供服务的通知](https://docs.leancloud.app/sdk/announcements/sunset-announcement/)

因此新站更适合直接上 **Twikoo + MongoDB**，避免再迁一次库。中文个人博客里 Twikoo 也很常见（例如不少主题文档默认支持）。

## 整体架构

```text
访客浏览器
  → 博客页面（Firefly，加载 twikoo.js）
  → https://twikoo.你的域名（Vercel 上的 Twikoo 云函数）
  → MongoDB Atlas（评论数据）
```

要点：

- MongoDB 是给 **Vercel 后端**连的，不是给访客浏览器直连。选区域时优先靠近常见 Vercel 区域，而不是盲目选离自己最近的城市。
- 前端配置里的 `envId`，在 Vercel / 自建场景下填的是 **云函数根地址**（带 `https://`，不要带路径）。

## 1. 准备 MongoDB Atlas

### 1.1 注册并创建免费集群

1. 打开 [MongoDB Atlas 注册页](https://www.mongodb.com/cloud/atlas/register) 注册 / 登录。
2. 创建一个 **M0 免费集群**（界面会标明 Free forever）。

创建集群时建议：

| 选项 | 建议 |
|------|------|
| Provider | **AWS** |
| Region | 不确定就选 **Oregon (`us-west-2`)**（Twikoo 文档也常以此为例） |
| Automate security setup | **勾选**（自动建用户等，省事） |
| Preload sample dataset | **取消勾选**（不要示例数据集，空库即可） |
| Name | 例如 `Cluster0`，创建后不能改，随意 |

官方部署说明里也会要求先准备 MongoDB 连接串，见：[Twikoo 云函数部署](https://twikoo.js.org/backend.html)。

### 1.2 放行网络与拿到连接串

1. **Network Access**：添加 IP，填 `0.0.0.0/0`（允许从任意地址访问）。Vercel 函数出口 IP 不固定，个人博客一般这样配；生产若有固定 IP 可再收紧。
2. **Database Access**：确认有数据库用户，并**自己记住密码**（后面要用）。
3. 在集群上点 **Connect** → 选 Drivers / Client Library。
4. Language 选 **JavaScript**，Driver 选 **Node.js**（Twikoo 跑在 Node 上；这里不是编程语言 C）。
5. 复制连接串，形如：

```text
mongodb+srv://<db_username>:<db_password>@xxxxx.mongodb.net/
```

把 `<db_username>`、`<db_password>` 换成真实值。密码里若有 `@`、`#`、`%` 等特殊字符，需要做 **URL 编码**。

得到的整串就是后面的环境变量 `MONGODB_URI`。不要把真实密码提交到 Git 或发到公开文章里。

## 2. 在 Vercel 上部署 Twikoo

步骤以官方文档为准（含一键 Deploy 按钮与视频）：

- [Twikoo 云函数部署 · Vercel](https://twikoo.js.org/backend.html)

摘要如下：

1. 用 GitHub / 邮箱登录 [Vercel](https://vercel.com/)，按文档一键部署 Twikoo（模板会拉起云函数项目）。
2. 进入项目 **Settings → Environment Variables**，新增：
   - Name：`MONGODB_URI`
   - Value：上一步的完整连接串  
   建议 Production / Preview / Development 都勾上。
3. **Settings → Deployment Protection**：把 **Vercel Authentication** 设为 **Disabled** 并保存。否则访客和博客前端会被登录墙拦住，评论无法调用。
4. **Deployments** 里对最新部署执行一次 **Redeploy**（改环境变量后必须重新部署才生效）。
5. 打开项目默认域名，例如 `https://你的项目.vercel.app/`，应看到类似：

```json
{"code":100,"message":"Twikoo 云函数运行正常，请参考 https://twikoo.js.org/frontend.html 完成前端的配置","version":"2.0.17"}
```

`version` 以你实际部署为准；后面前端 `jsUrl` 尽量与它对齐。

补充踩坑（非官方，可作对照）：

- [Twikoo 评论系统免费部署全流程：Vercel + MongoDB Atlas](https://xkbk.cn/posts/twikoo-comment-deploy)

## 3. 绑定自定义域名

`*.vercel.app` 在国内有时偏慢，建议绑自己的子域名，例如 `twikoo.orbitvo.com`。

1. Vercel 项目 → **Settings → Domains** → 添加 `twikoo.你的域名`。
2. 到域名 DNS 控制台，按 Vercel 提示添加 **CNAME**（常见指向 `cname.vercel-dns.com`，以面板显示为准）。
3. 等证书生效后，浏览器访问：

```text
https://twikoo.你的域名/
```

仍应显示「Twikoo 云函数运行正常」。**这个带 `https://`、不带路径的根地址，就是前端的 `envId`。**

## 4. 配置 Firefly 前端

Firefly 评论开关在 [`src/config/commentConfig.ts`](https://github.com/CuteLeaf/Firefly) 主题配置里（你自己的仓库对应同名文件）。只需启用 Twikoo，不必改页面组件。

示例（版本号请与后端返回的 `version` 对齐）：

```ts
export const commentConfig: CommentConfig = {
	type: "twikoo",
	twikoo: {
		envId: "https://twikoo.你的域名",
		lang: "zh-CN",
		visitorCount: true,
		jsUrl: "https://cdn.jsdelivr.net/npm/twikoo@2.0.17/dist/twikoo.min.js",
		cssUrl: "/assets/css/twikoo-custom.css",
	},
};
```

说明：

- Vercel 部署 **不要填** `region`（那是腾讯云环境用的）。
- `jsUrl` 国内也可改用 npmmirror / zstatic，见配置文件注释。
- 留言板、文章、友链等是否出评论区，还受各自页面开关影响；留言板在全局 `type !== "none"` 时会挂载评论。

本地 `pnpm dev` 打开 `/guestbook/` 或任意开启评论的文章，应能看到评论框。确认无误后再推送到线上。

前端更多选项见官方：

- [Twikoo 前端部署](https://twikoo.js.org/frontend.html)

## 5. 管理入口在哪

Twikoo **没有** Waline 那种单独的 `/ui` 后台地址。

1. 打开已加载评论的页面（如留言板）。
2. 等评论区渲染完成后，点评论区 **右上角齿轮 / 管理** 图标。
3. **首次**设置管理员密码并登录。
4. 之后删除评论、导入导出等，都在这个面板里操作。

把密码记在密码管理器里；忘记后需按 Twikoo / 数据库文档重置，没有邮件找回那么省事。

## 常见问题

**评论区空白或请求失败**

- 确认 `https://twikoo.你的域名/` 能返回「运行正常」。
- 确认已关闭 Vercel Authentication。
- 确认 Atlas Network Access 含 `0.0.0.0/0`，且 `MONGODB_URI` 用户名密码正确并已 Redeploy。

**版本对不齐**

- 打开云函数根地址看 `version`，把 `jsUrl` 改成同一主版本的 CDN。

**旧 Waline / LeanCloud 数据**

- 本文按「评论从零开始」。若仍要迁旧数据，需先能登录旧库并导出，再导入 MongoDB；LeanCloud 停服后务必尽早处理。

## 参考链接

| 说明 | 链接 |
|------|------|
| Twikoo 云函数部署（含 Vercel） | https://twikoo.js.org/backend.html |
| Twikoo 前端配置 | https://twikoo.js.org/frontend.html |
| MongoDB Atlas 注册 | https://www.mongodb.com/cloud/atlas/register |
| LeanCloud 停服公告 | https://docs.leancloud.app/sdk/announcements/sunset-announcement/ |
| Vercel + MongoDB 社区实战（补充） | https://xkbk.cn/posts/twikoo-comment-deploy |
| Twikoo 官网 | https://twikoo.js.org/ |
| Firefly 主题 | https://github.com/CuteLeaf/Firefly |
