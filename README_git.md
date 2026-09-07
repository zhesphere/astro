# 日常写作 / 修改配置 工作流

## 每次开始前

建议开始写作前先同步远程最新内容：

```bash
git pull
```

如果你只在一台电脑上工作，也可以直接开始编辑，最终发布时 `pnpm pub` 会自动进行同步。

本地预览：

```bash
pnpm dev
```

浏览器打开：

```text
http://localhost:4321
```

本地预览不是发布的必要步骤，需要检查文章显示效果时再使用即可。

---

## 推荐：一条命令发布

文章写完后，直接执行：

```bash
pnpm pub "描述这次修改了什么"
```

例如：

```bash
pnpm pub "新增MAC使用指南"
```

脚本会自动完成：

```text
git add -A
↓
git commit
↓
git pull --rebase
↓
git push
↓
GitHub Actions 自动构建部署
```

如果不想填写提交说明，也可以：

```bash
pnpm pub
```

此时会使用默认提交信息：

```text
update content
```

推送完成后，GitHub Actions 会自动构建并部署到：

```text
blog.orbitvo.com
```

无需手动执行：

```bash
pnpm build
```

---

## 原来的手动发布方式

如果不想使用自动脚本，仍然可以按照原来的 Git 流程操作。

### 暂存修改

```bash
git add -A
```

### 提交

```bash
git commit -m "描述你修改了什么"
```

### 同步远程

```bash
git pull --rebase
```

### 推送

```bash
git push
```

推送后同样会触发 GitHub Actions 自动部署。

---

## 避免冲突

- 两台电脑尽量不要同时编辑同一篇文章。
- 每次开始写之前可以先执行：

```bash
git pull
```

- 使用 `pnpm pub` 时，会在本地提交之后自动执行：

```bash
git pull --rebase
```

再进行推送。

- 如果远程和本地修改了同一位置，Git 仍然可能产生冲突，需要手动解决。

遇到冲突时：

```bash
git status
```

查看冲突文件。

手动修改冲突内容后：

```bash
git add -A
git rebase --continue
```

如果已经不处于 rebase 流程，则正常提交：

```bash
git add -A
git commit -m "解决冲突"
git push
```

---

## 常用命令速查

| 操作 | 命令 |
|---|---|
| 拉取最新 | `git pull` |
| 一键发布 | `pnpm pub "修改说明"` |
| 一键发布（默认说明） | `pnpm pub` |
| 本地预览 | `pnpm dev` |
| 构建检查 | `pnpm build` |
| 查看状态 | `git status` |
| 查看历史 | `git log --oneline` |
| 暂存全部修改 | `git add -A` |
| 提交 | `git commit -m "修改说明"` |
| 推送 | `git push` |

---

## 一键发布脚本

项目中新增：

```text
scripts/publish.sh
```

内容：

```bash
#!/bin/bash
set -e

MESSAGE="${1:-update content}"

echo "＋ 暂存修改"
git add -A

if ! git diff --cached --quiet; then
  echo "✓ 提交"
  git commit -m "$MESSAGE"
else
  echo "没有新的本地修改"
fi

echo "↓ 同步远程"
git pull --rebase

echo "↑ 推送"
git push

echo "✅ 已推送，等待 GitHub Actions 自动部署"
```

这个脚本负责：

```text
暂存修改
→ 创建 commit
→ 同步远程
→ push
```

其中：

```bash
set -e
```

表示任意一步出错后立即停止，不继续执行后面的操作。

如果没有新的本地修改，也不会因为 `git commit` 没有内容而报错。

---

## package.json 修改

在 `package.json` 的 `scripts` 中新增：

```json
"pub": "bash scripts/publish.sh"
```

例如：

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "pub": "bash scripts/publish.sh"
  }
}
```

因此：

```bash
pnpm pub "新增MAC使用指南"
```

本质上等同于执行：

```bash
bash scripts/publish.sh "新增MAC使用指南"
```

这样以后不依赖 VS Code，无论使用 macOS Terminal、Warp、iTerm2 或其他终端，只要进入 Firefly 项目根目录，都可以直接用：

```bash
pnpm pub
```

完成发布。