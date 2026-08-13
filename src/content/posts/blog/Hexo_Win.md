---
title: "Hexo_Win"
published: 2026-04-10
description: ""
image: ""
tags: [Hexo]
category: blog
---
# 安装 Git
下载并安装 [git](https://git-scm.com/download/win)。
# 安装 Node.js
Node.js 为大多数平台提供了官方的 [安装程序](https://nodejs.org/zh-cn/download/)。
其它的安装方法：
通过 [nvs](https://github.com/jasongin/nvs/)（推荐）或者 [nvm](https://github.com/nvm-sh/nvm) 安装。
使用 Node.js 官方安装程序时，请确保勾选 **Add to PATH** 选项（默认已勾选）
**建议安装偶数版本，为了以后尝试Astro(只适配偶数版本)**
# 安装 Hexo
## 全局安装 Hexo CLI
所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。
```
npm install -g hexo-cli
```
## 初始化 Hexo 博客
1. 新建一个文件夹作为博客根目录（如 hexo-blog），进入该文件夹：
```
# Mac/Linux/Windows Git Bash
mkdir hexo-blog
cd hexo-blog
```
2. 执行初始化命令，生成 Hexo 博客基础结构：
```
hexo init
```

PowerShell 遇到 .ps1，因为在此系统上禁止运行脚本
解决方法：
	以管理员身份打开PowerShell：
查看当前的执行策略：
	Get-ExecutionPolicy
	- `Restricted`：不允许任何脚本运行。这是默认设置，也是最安全的设置。  
	- `AllSigned`：只允许运行由受信任的发布者签名的脚本。  
	- `RemoteSigned`：从Internet下载的脚本必须签名才能运行，但本地脚本可以不受限制地运行。  
	- `Unrestricted`：允许所有脚本运行。这是风险最高的设置。为了允许本地脚本运行，你可以使用以下命令（以管理员身份）：
更改：
	Set-ExecutionPolicy RemoteSigned
3. 安装博客依赖包：
```
npm install
```




