---
title: "QQ龙虾"
published: 2026-03-22
description: 
image: ""
tags: []
category: ""
description: ""
slug: ai/openclaw/qq-long-xia
---

https://q.qq.com/qqbot/openclaw/
1.安装OpenClaw开源社区QQBot插件
openclaw plugins install @tencent-connect/openclaw-qqbot@latest
报错：

```text
**🦞 OpenClaw** 2026.3.13 (61d171a) — Shell yeah—I'm here to pinch the toil and leave you the glory.
Downloading @tencent-connect/openclaw-qqbot@latest…
npm pack failed: npm error code EACCES
npm error syscall open
npm error path /Users/crease/.npm/_cacache/tmp/050ce04c
npm error errno EACCES
npm error
npm error Your cache folder contains root-owned files, due to a bug in
npm error previous versions of npm which has since been addressed.
npm error
npm error To permanently fix this problem, please run:
npm error   sudo chown -R 501:20 "/Users/crease/.npm"
npm error A complete log of this run can be found in: /Users/crease/.npm/_logs/2026-03-21T16_09_55_383Z-debug-0.log
```
按照提示操作

2.配置绑定当前QQ机器人
openclaw channels add --channel qqbot --token "xxxxxxxxxx:xxxxxxxxxxxxxxxx"
3.重启本地OpenClaw服务
openclaw gateway restart

如果遇到网络安装问题安装失败，可使用
```
npm config set registry https://registry.npmjs.org/
```
换回官方源
