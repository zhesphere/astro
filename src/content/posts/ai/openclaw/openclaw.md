---
title: "openclaw"
published: 2026-03-21
description: 
image: ""
tags: [openclaw]
category: AI
description: ""
---

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
	```
	openclaw onboard
	```
3. I understand this is personal-by-default and shared/multi-user use requires lock-down. Continue?
	yes
4. Onboarding mode
	选择 `QuickStart`，它将自动帮你配置好大部分默认设置，对新手最友好。
	```
	QuickStart (Configure details later via openclaw configure.)
	```
5. Model/auth provider
	1. ollama本地模型(https://apifox.com/apiskills/openclaw-ollama-provider-tutorial/)
		1.  Ollama base URL
			http://127.0.0.1:11434
			它会询问你的 Ollama 服务地址，默认是 `http://127.0.0.1:11434`，如果 Ollama 运行在本地，直接按回车确认即可
		2. Ollama mode
			| 模式 | 描述 | 适用模型 |
			|----------|---------|-------------------------|
			| Local | 仅使用在本地计算机上通过 Ollama 运行的模型。 | 仅限本地已通过 ollama pull 下载的模型。 |
			| Cloud + Local | 同时使用本地模型和 Ollama 提供的云端模型，此模式需要登录 Ollama 账户。 | 本地模型与云端托管模型（如 kimi-k2.5:cloud）均可使用。 |
			
			选择模式后，向导会自动发现本地可用的 Ollama 模型，并推荐一个默认模型。如果本地没有该模型，它还会提示并自动下载。
			最好选 Cloud + Local 模式，不然可能会检索不到本地模型。

		3. Default model
		```
		ollama/qwen3-coder:30b (ctx 256k)
		```
		选择下载好的本地模型
6. Select channel (QuickStart)(https://www.chunqiujinjing.com/2026/03/14/openclaw-install/)
	```
	Skip for now (You can add channels later via `openclaw channels add`)
	```
7. Web search
	```
	Web search lets your agent look things up online.
	Choose a provider and paste your API key.
	Docs: https://docs.openclaw.ai/tools/web
	```
8. Search provider
	```
	Skip for now (Configure later with openclaw configure --section web)
	```
9. Configure skills now? (recommended)
	yes
10. Install missing skill dependencies
	选上clawhub就行了，它是一个“安装技能的技能”，有了它等需要技能的时候它会自动检索合适的技能并安装。
	按空格选择
	安装出错：

```text
	Install failed: clawhub (exit 1) — npm error A complete log of this run can be found in: /Users/crease/.npm/_logs/2026-03-21T15_21_12_802Z-debug-0.log	
	npm error code EACCES
	npm error syscall open
	npm error path /Users/crease/.npm/_cacache/tmp/77865dd5
	npm error errno EACCES
	npm error
	npm error Your cache folder contains root-owned files, due to a bug in
	npm error previous versions of npm which has since been addressed.
	npm error
	npm error To permanently fix this problem, please run:
	npm error   sudo chown -R 501:20 "/Users/crease/.npm"
	npm error A complete log of this run can be found in: /Users/crease/.npm/_logs/2026-03-21T15_21_12_802Z-debug-0.log
	Tip: run `openclaw doctor` to review skills + requirements.
	Docs: https://docs.openclaw.ai/skills
	```
11. Preferred node manager for skill installs
	选npm
12. 全选no
13. Hooks
	```
	Hooks let you automate actions when agent commands are issued.         
	Example: Save session context to memory when you issue /new or /reset.
	Learn more: https://docs.openclaw.ai/automation/hooks
	```
14. Enable hooks?
	Skip for now
15. Control UI
	```
	Web UI: http://127.0.0.1:18789/                                      
	Web UI (with token):http://127.0.0.1:18789/#token=3981d2b40069b65fc9c73a0bba026e7cc49367a56e147b83
	Gateway WS: ws://127.0.0.1:18789                                       
	Gateway: reachable                                                     
	Docs: https://docs.openclaw.ai/web/control-ui
	```
16. How do you want to hatch your bot?
	```
	Open the Web UI
	```
	选择WebUI后机会自动打开网页窗口

# ollama
https://clawdbook.org/zh/blog/openclaw-best-ollama-models-2026#google_vignette
https://docs.openclaw.ai/zh-CN/providers/ollama
