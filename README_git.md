# 日常写作 / 修改配置 工作流

## 每次开始前

```bash
git pull
```

## 写文章

文章放在 `src/content/posts/` 目录下，Markdown 格式。

```bash
# 本地预览（可选）
pnpm dev
# 浏览器打开 http://localhost:4321
```

## 提交并推送

```bash
git add -A
git commit -m "描述你改了什么"
git push
```

推送后 GitHub Actions 自动构建部署到 `blog.orbitvo.com`，无需手动 `pnpm build`。

## 避免冲突

- 两台电脑不要同时编辑同一篇文章
- 每次坐下来写之前先 `git pull`
- 如果遇到冲突：`git pull` → 手动解决冲突 → `git add -A` → `git commit` → `git push`

## 常用命令速查

| 操作 | 命令 |
|------|------|
| 拉取最新 | `git pull` |
| 本地预览 | `pnpm dev` |
| 构建检查 | `pnpm build` |
| 查看状态 | `git status` |
| 查看历史 | `git log --oneline` |
