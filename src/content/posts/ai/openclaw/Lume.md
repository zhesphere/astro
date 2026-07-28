---
title: "Lume"
published: 2026-03-21
image: ""
tags: [虚拟机]
category: AI
description: ""
---

# 安装Lume
终端执行
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/lume/scripts/install.sh)"
```
执行完运行
```
lume --version
```
# 配置自定义存储位置
默认情况下，虚拟机文件存储在 `~/.lume` 目录，可配置外部 SSD 或自定义路径，节省主机内部存储并提升 I/O 性能：
- 查看所有配置的存储位置：
```
lume config storage list
```
- 添加外部存储位置（命名为 external，路径为外部硬盘的 lume 目录）：
```
lume config storage add external /Volumes/HDD/lume
```
- 将该位置设为默认存储：
```
lume config storage default external
```
- 创建虚拟机时指定存储位置：
```
lume create openclaw --os macos --ipsw latest --storage external
```
# 创建macos VM
https://docs.openclaw.ai/zh-CN/install/macos-vm#4）获取-vm-的-ip-地址
终端执行
```
lume create openclaw --os macos --ipsw latest
```
下载时间非常漫长。VNC 窗口会自动打开。如果没有自动打开可以执行
```
lume run openclaw
```
设置为新机，其他的该跳过跳过
不要在虚拟机中登录apple账户，避免操作iCloud内容导致相册被删。
可以开启文件共享和屏幕共享，方便文件传输和远程控制。
**启动远程登陆**
1. 获取 VM 的 IP 地址
	```
	lume get openclaw
	```
2. 通过 SSH 连接到 VM
	```
	ssh youruser@192.168.64.X
	```
	将 `youruser` 替换为你创建的账号，并将 IP 替换为你的 VM IP。

开启后就可以使用后台服务的方式来运行虚拟机，不需要持续开着终端。
后台执行方式：
```
nohup lume run openclaw --no-display > ~/openclaw.log 2>&1 &
```
执行lume ls可以看到running。
# 安装openclaw（中文版）
中文版对中文环境有优化
```
curl -fsSL https://clawd.org.cn/install.sh | sudo bash -s -- --registry https://registry.npmmirror.com
```
# 安装openclaw（国际版）
可以参考[林粒粒](https://space.bilibili.com/523995133/)提供的教程：
https://n6fo0mbcz6.feishu.cn/wiki/EwWFww8WEiWFrQkPt2Jcl9Fqn4e
## 第一步：安装 Homebrew
1. 打开终端（Terminal）
	点击右上角放大镜（Spotlight），也可以command+空格调出聚焦搜索，搜索终端并打开。
2. 在终端输入安装命令：
	```
	/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
	```
3. 执行后按提示操作：
	1. 选择下载源，输入 1（清华大学镜像）
	2. 输入电脑开机密码
	3. 如果询问是否删除旧版本 Homebrew，输入 Y
	4. 按回车开始安装
	5. 选择镜像源时输入 5（阿里镜像）
4. 安装完成后，关闭终端，再重新打开终端。
Homebrew 安装完成。
## 第二步：安装 Git
在终端输入命令：
```
brew install git
```
回车执行，等待安装完成即可。
Git 安装完成。
## 第三步：安装 Node.js
1. 进入官网下载 macOS 安装程序：
https://nodejs.org/zh-cn/download
2. 安装步骤：
	1. 打开下载好的安装包
	2. 点击“继续”
	3. 同意用户协议
	4. 点击“安装”
	5. 输入电脑密码
	6. 点击“安装软件”
3. 安装完成后，点击“关闭”。
Node.js 安装完成。
## 第四步：安装 OpenClaw
1. 打开终端
2. 切换 npm 下载源为国内镜像：
	```
	npm config set registry https://registry.npmmirror.com
	```
3. 避免 GitHub SSH 配置问题：
	```
	git config --global url."https://github.com/".insteadOf ssh://git@github.com/
	```
4. 执行安装命令：
	```
	sudo npm install -g openclaw@latest
	```
5. 输入电脑密码并回车，等待安装完成。
	如果终端出现类似 added xxx packages 的提示，说明安装成功。
OpenClaw 安装完成。
## 第五步：初始化 OpenClaw
1. 删除旧的飞书插件目录，避免插件冲突：(为什么要删？？)
	```
	sudo rm -rf ~/.openclaw/extensions/feishu
	```
2. 启动初始化向导，后续步骤与 Windows 系统安装相同。
# ollama
https://clawdbook.org/zh/blog/openclaw-best-ollama-models-2026#google_vignette
https://docs.openclaw.ai/zh-CN/providers/ollama