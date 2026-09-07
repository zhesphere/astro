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