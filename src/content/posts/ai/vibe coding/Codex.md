---
title: "Codex"
published: 2026-04-11
image: ""
tags: []
category: AI
description: ""
---
[Codex官网](https://developers.openai.com/codex/cli)
https://johng.cn/ai/codex-cli-guide
# Codex 安装与使用
Codex 可以通过多种方式使用，根据开发者的习惯，大致可以分为五种方式：

|安装方式|使用场景|推荐程度|
|---|---|---|
|Codex 应用|直接下载 Codex 应用|⭐⭐⭐⭐|
|Codex CLI|在终端使用|⭐⭐⭐⭐⭐|
|IDE 插件|在 VS Code / Cursor 使用|⭐⭐⭐⭐|
|Homebrew 安装|Mac 用户|⭐⭐⭐⭐|
|GitHub Release 二进制|手动安装|⭐⭐⭐|
## 2、Codex CLI（最常用）
开发者最常用的方式是 **Codex CLI**。
CLI 是一个运行在终端中的 AI 编程代理，可以：
- 阅读代码
- 修改代码
- 执行 shell 命令
- 自动修复 bug
Codex CLI 在本地运行，因此代码不会被上传到云端，只有 prompt 和必要的上下文会发送给模型。
### 安装 Codex CLI
使用 npm 安装：
```
npm install -g @openai/codex

# 使用国内镜像安装更快
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```
验证
```
codex --version
```
安装完成后运行：
```
codex
```
即可启动 Codex。
### 登录 Codex
首次运行需要登录。
有两种方式：
#### 方法一：ChatGPT 登录（推荐）
```
codex
```
选择：
```
Sign in with ChatGPT
```
然后浏览器会打开登录页面。
登录完成即可使用。
#### 方法二：API Key 登录
如果是开发者模式，可以使用 API Key：
```
# macOS / Linux - 临时设置（仅当前终端会话有效）
export OPENAI_API_KEY="sk-你的API密钥"

# 永久配置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export OPENAI_API_KEY="sk-你的API密钥"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
$env:OPENAI_API_KEY="sk-你的API密钥"

# 配置后启动（指定模型）
codex --model gpt-5-codex
```
然后运行：
```
codex
```
#### 方式三：auth.json 文件配置
手动编辑认证文件, 创建目录:
```
mkdir -p ~/.codex
```
写入 API key:
```
cat > ~/.codex/auth.json << 'EOF'
{
  "OPENAI_API_KEY": "sk-你的API密钥"
}
EOF
```
#### 配置第三方API
https://zhuanlan.zhihu.com/p/2002679138566283974
Codex CLI 会读取你的配置文件：一般在 ~/.codex/（Windows 也是用户目录下的 .codex）。创建两份文件：
- auth.json：放密钥
- config.toml：放模型与网关配置
##### macOS / Linux 配置命令
创建文件：
```
确保配置目录存在。
macOS/Linux 用户可运行 mkdir -p ~/.codex 创建目录。
cd ~/.codex
touch ~/.codex/auth.json
touch ~/.codex/config.toml
```
编辑 auth.json（粘贴同样的 JSON）与 config.toml。**要保证上下一致**：model_provider = "xxx" 要和 [model_providers.xxx]的段名一致。
##### 配置改完一定要“重启终端”
关闭终端/重启终端后再启动 codex，让配置生效。


### 第一次运行 Codex
进入项目目录：
```
cd my-project
```
启动 Codex：
```
codex
```
然后输入：
```
分析下当前的项目结构
```
Codex 会自动：
1. 扫描代码库
2. 分析项目结构
3. 输出系统架构说明
例如，我们创建一个目录：
```
mkdir codex-runoob-test
```
进入目录：
```
cd codex-runoob-test
```
新建 test.py 文件，代码如下：
```
print("Hello Runoob!")
```
启动 Codex：
```
codex
```
选第一个 Yes, continue 回车，这样就可以开始使用 Codex Cli 开始写代码了:
![](https://www.runoob.com/wp-content/uploads/2026/03/8afd5f03-d5bb-452b-b66a-537aaafb8aa6.png)
### Codex 的三种运行模式
Codex CLI 提供三种安全模式。

|模式|功能|
|---|---|
|Suggest|只建议修改|
|Auto Edit|自动修改文件|
|Full Auto|自动执行所有操作|

默认模式：
```
Suggest
```
切换模式：
```
codex --auto-edit
```
或者：
```
codex --full-auto
```
Full Auto 模式可以自动执行代码修复和任务。 
### 更新与卸载
```
# 更新到最新版本
npm update -g @openai/codex

# 或强制重装最新版
npm install -g @openai/codex@latest

# 卸载
npm uninstall -g @openai/codex

# Homebrew 卸载
brew uninstall --cask codex
```
