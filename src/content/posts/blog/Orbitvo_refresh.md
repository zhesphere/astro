---
title: 博客更新后自动刷新主站（Vercel Deploy Hook）
published: 2026-11-05
description: 博客部署成功后，用 GitHub Actions 调用 Orbitvo 的 Vercel Deploy Hook，让首页 Latest Signals 读到最新 RSS。
tags: [Vercel, GitHub Actions, RSS, Orbitvo]
category: "博客"
series: "博客搭建"
seriesOrder: 5
draft: false
---

本站博客在 [`blog.orbitvo.com`](https://blog.orbitvo.com)，个人主页在 [`orbitvo.com`](https://orbitvo.com)。主页上的 Latest Signals 不是实时去拉博客，而是 **主站构建时** 读取 `https://blog.orbitvo.com/rss.xml`。所以只发博客、不重建主站，首页会停在上一次构建看到的文章。

这篇记录现在用的做法：博客仓库的 GitHub Actions 在发布成功后，调用主站的 **Vercel Deploy Hook**，让 Orbitvo 再构建一次。系列前文见 [从 Hexo 到 Astro](/posts/blog/Hexo_to_Astro/) 和 [Twikoo 接入](/posts/blog/Twikoo_Firefly/)。

## 整体顺序

配置在博客仓库的 [`.github/workflows/deploy.yml`](https://github.com/zhesphere/astro/blob/main/.github/workflows/deploy.yml)，job 名叫 `refresh-orbitvo`。它 **依赖** 前面的 `deploy`，博客没发成功就不会去捅主站。

```text
博客构建，并部署到 GitHub Pages
→ 等当前这次提交的 Firefly Vercel 部署变成 success
→ 确认生产环境 RSS 能打开
→ POST Orbitvo 的 Vercel Deploy Hook
→ orbitvo.com 按 main 重新构建，构建时读到最新 RSS
```

Hook 地址不进仓库，放在 GitHub Actions 的 Repository Secret：`ORBITVO_VERCEL_DEPLOY_HOOK_URL`。刷新失败时，这个 job 会红；博客那一步已经结束，不会把已发布的文章撤回去。也不需要 Vercel Token，只要 Deploy Hook。

## 1. 在主站项目里建 Deploy Hook

打开 Orbitvo 对应的 Vercel 项目（仓库是 [zhesphere/me](https://github.com/zhesphere/me)）：

1. **Settings → Git → Deploy Hooks**
2. 新建一条，名字随便，例如 `refresh-from-blog`
3. Branch 选 **main**（主站实际构建的分支）
4. 创建后复制那条 URL。它等价于「请按这个分支再部署一次」，拿到的人就能触发构建，不要写进文章或提交到 git。

## 2. 把 URL 存成博客仓库的 Secret

在博客仓库（[zhesphere/astro](https://github.com/zhesphere/astro)）：

**Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|------|--------|
| `ORBITVO_VERCEL_DEPLOY_HOOK_URL` | 上一步复制的 Hook URL |

名字必须和 workflow 里的 `secrets.ORBITVO_VERCEL_DEPLOY_HOOK_URL` 一致。Secret 为空时，刷新 job 会直接失败并打印 `ORBITVO_VERCEL_DEPLOY_HOOK_URL is not configured.`

## 3. Workflow 里三段各自在做什么

`refresh-orbitvo` 设了 `needs: deploy`，并且 `if: needs.deploy.result == 'success'`。超时 10 分钟。下面三段对应三个 step。

### 3.1 等博客的 Vercel 部署

GitHub Pages 的 `deploy` 绿了，不代表 `blog.orbitvo.com` 上的 Vercel 已经换上这次提交。主站如果这时就去读 RSS，可能还是旧列表。

这一步用当前 commit 的 [Commit Status API](https://docs.github.com/en/rest/commits/statuses) 看 context 为 `Vercel` 的状态，最多 60 次、每次隔 10 秒：

```yaml
- name: Wait for Firefly Vercel deployment
  env:
    GH_TOKEN: ${{ github.token }}
    REPOSITORY: ${{ github.repository }}
    COMMIT_SHA: ${{ github.sha }}
  run: |
    for attempt in {1..60}; do
      response="$(curl --fail-with-body --silent --show-error \
        --header "Accept: application/vnd.github+json" \
        --header "Authorization: Bearer ${GH_TOKEN}" \
        --header "X-GitHub-Api-Version: 2022-11-28" \
        "https://api.github.com/repos/${REPOSITORY}/commits/${COMMIT_SHA}/status")"
      state="$(jq -r '[.statuses[] | select(.context == "Vercel")][0].state // "pending"' <<<"${response}")"

      case "${state}" in
        success) break ;;
        error|failure) exit 1 ;;
        *) sleep 10 ;;
      esac
    done
```

`success` 才继续。`error` / `failure` 直接失败。一直是 `pending` 或没有这条 status，第 60 次超时退出。

### 3.2 确认生产 RSS 能访问

用这次 commit SHA 当查询参数，避免打到缓存里的旧 XML：

```bash
curl --fail-with-body --silent --show-error --location --max-time 30 \
  --output /dev/null \
  "https://blog.orbitvo.com/rss.xml?deployment=${COMMIT_SHA}"
```

HTTP 非 2xx 时这一步失败，不会去触发主站。

### 3.3 调用 Deploy Hook

```yaml
- name: Trigger Orbitvo rebuild
  env:
    DEPLOY_HOOK_URL: ${{ secrets.ORBITVO_VERCEL_DEPLOY_HOOK_URL }}
  run: |
    if [[ -z "${DEPLOY_HOOK_URL:-}" ]]; then
      echo "::error::ORBITVO_VERCEL_DEPLOY_HOOK_URL is not configured."
      exit 1
    fi
    curl --fail-with-body --silent --show-error \
      --request POST --output /dev/null \
      "${DEPLOY_HOOK_URL}"
```

POST 成功只表示 Vercel **接受了一次新部署**。主站构建还要再等它自己的队列；构建过程中去拉 `https://blog.orbitvo.com/rss.xml`，Latest Signals 才会换成新文章。

## 4. 怎么确认两边都成功

推到博客 `main` 后打开该仓库的 Actions，看同一次 **Deploy to GitHub Pages**：

| 检查 | 成功时 |
|------|--------|
| job `build` / `deploy` | 绿。博客已发布 |
| job `Refresh Orbitvo homepage` | 绿。Hook 已发出 |
| 博客仓库该 commit 的 Vercel status | `success`（第 3.1 步在等的就是它） |
| Orbitvo 的 Vercel 项目 | 出现一次由 Deploy Hook 触发的部署，并成功 |
| [orbitvo.com](https://orbitvo.com) 首页 | Latest Signals 里能看到刚发的文章 |

刷新 job 红了时，对一下日志落在哪一步：Vercel status 失败或超时、RSS curl 失败，还是 Secret 没配。博客文章本身此时通常已经在线上。

## 5. 怎么拆掉

三处一起删，缺一处会留下一个还能被调用的入口，或者一次必红的 job：

1. `deploy.yml` 里的 `refresh-orbitvo` job
2. 博客仓库 Secret `ORBITVO_VERCEL_DEPLOY_HOOK_URL`
3. Orbitvo Vercel 项目里对应的 Deploy Hook

不改主题、不改 `pnpm build`，也不动文章内容。
