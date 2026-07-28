---
title: "Claude Code"
published: 2026-04-10
image: ""
tags: []
category: AI
description: ""
---
# 开始使用
选择你的环境来开始使用。大多数界面需要 [Claude 订阅](https://claude.com/pricing?utm_source=claude_code&utm_medium=docs&utm_content=overview_pricing) 或 [Anthropic 控制台](https://console.anthropic.com/)账户。终端 CLI 和 VS Code 也支持[第三方提供商](https://code.claude.com/docs/zh-CN/third-party-integrations)。
- Terminal
- VS Code
- Desktop app
- Web
- JetBrains

功能完整的 CLI，用于直接在终端中使用 Claude Code。编辑文件、运行命令，并从命令行管理整个项目。To install Claude Code, use one of the following methods:
- Native Install (Recommended)

**macOS:**
```
curl -fsSL https://claude.ai/install.sh | bash
```
！机场IP定位在中国，中道崩殂

## 安装 Claude Code CLI(命令行工具)
https://x509p6c8to.feishu.cn/wiki/TqICw1CjvijlTFkz1jacSaH3nTc
### 使用 npm 安装(推荐)
**安装Node.js**
你的电脑需要安装了 Node.js，在命令行输入：
```shell
node --version
```
如果显示版本号(比如 `v24.17.0`)，说明已安装。如果没有，去 [Node.js — 下载 Node.js®](https://nodejs.org/zh-cn/download) 下载安装
**安装 Claude Code**
打开命令行，输入以下命令:
```shell
npm install -g @anthropic-ai/claude-code
使用国内镜像源安装（建议还是上魔法，开发不会魔法缺手缺脚的）
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```
等待安装完成(可能需要几分钟)。安装完成后，验证一下:
![](https://x509p6c8to.feishu.cn/space/api/box/stream/download/asynccode/?code=MjEwYjUyNDFiZjM4MTA5ZWNiMWM0ODUwNGRhODVhNTZfTTB4SUFyTWdieUpJUURTeUMxdlg1ZzRwdHA2cWN6N1FfVG9rZW46TTltVWJjeXBIbzBxVml4WUxxMmNpMk8ybkRlXzE3ODUwNjA5OTI6MTc4NTA2NDU5Ml9WNA&add_watermark=true&scene_type=CCM)
```shell
claude --version
```
如果显示版本号，说明安装成功!
**卸载&更新**
```text
npm uninstall -g @anthropic-ai/claude-code
npm update -g @anthropic-ai/claude-code
```

## 常见安装问题与解决
**问题 1:** 提示 `npm command not found`
```shell
原因:你的电脑没有安装 Node.js
解决:去 nodejs.org 下载安装,然后重新执行安装命令
```

**问题 2:** 提示 `permission denied`

```shell
原因:没有管理员权限
解决(Mac/Linux):在命令前加 sudo
sudo npm install -g @anthropic-ai/claude-code
解决(Windows):以管理员身份运行 PowerShell
```

**问题 3:** 安装很慢或者卡住

```shell
原因:网络问题
解决:使用国内镜像源
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

**问题4：**执行安装报错：npm : 无法加载文件 xxxx\npm.ps1，因为在此系统上禁止运行脚本。

```text
原因：Windows 默认禁止运行未签名的本地脚本（.ps1 文件），而 npm 就是一个 .ps1 脚本，所以被系统拦截了。RemoteSigned 策略是 Windows 推荐的安全策略，只允许运行信任的本地脚本，不会影响电脑安全。
解决：输入Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
出现提示时，输入 Y 并回车
```

# 常用指令
Claude Code除了常规的语言交互外， 它也是内置了非常多的指令的
## 常用命令速查表
### 项目和内存管理
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/init|初始化项目|创建 CLAUDE.md 项目文档|
|/memory|编辑记忆|编辑 CLAUDE.md 内存文件|

```text
CLAUDE.md 是给 Claude Code 这类 AI 编程助手看的项目说明文件。
它的作用有点像“项目内的 AI 使用说明书”，通常放在仓库根目录，用来告诉 AI：
这个项目是干什么的
怎么安装依赖、怎么启动、怎么测试
代码结构怎么分
有哪些开发规范
哪些文件不要乱改
提交代码前要跑什么命令
项目里一些容易踩坑的约定

说白了，CLAUDE.md 不是运行时必须文件，代码不会自动依赖它；它主要是给 AI 读的，让 AI 在这个项目里少犯蠢、少瞎猜。
```
### 基础命令
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/help|获取帮助|显示所有可用命令的列表|
|/exit|退出会话|结束当前 Claude Code 会话|
|/clear|清空历史|清除对话历史（保留代码改动）|
|/status|查看状态|显示版本、模型、账户和连接状态|
|/config|打开配置|打开设置界面（配置选项卡）|
### 高级功能
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/resume|恢复会话|显示会话选择器恢复旧对话|
|/rewind|撤销改动|撤销代码改动和对话历史|
|/bashes|后台任务|列出和管理后台任务|
|/compact|压缩对话|压缩对话历史（可选重点指令）|
|/plan|计划模式|不做修改，只做计划|
|/export|导出对话|导出当前对话到文件或剪贴板|
|/todos|TODO 列表|列出当前 TODO 项目|
|/context|上下文使用|显示当前上下文使用情况（彩色网格）|
### 模型和成本查看
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/model|选择模型|选择或切换 AI 模型|
|/cost|查看成本|显示 Token 使用统计|
|/stats|查看统计|显示每日使用情况、会话历史、连续记录|
|/usage|查看限额|显示订阅计划限额和速率限制|
### 代码审查和协作
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/review|代码审查|请求代码审查|
|/security-review|安全审查|完成当前分支的安全审查|
### 工具和集成
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/mcp|MCP 管理|管理 MCP 服务器连接和认证|
|/hooks|钩子管理|管理工具事件的钩子配置|
|/ide|IDE 集成|管理 IDE 集成并显示状态|
|/plugin|插件管理|管理 Claude Code 插件|
|/agents|子代理管理|管理自定义 AI 子代理|
### 维护和支持
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/doctor|诊断|检查 Claude Code 安装的健康状况|
|/bug|报告 Bug|向 Anthropic 报告错误（发送对话）|
|/release-notes|发行说明|查看发行说明|
|/vim|Vim 模式|进入 Vim 编辑模式|
|/terminal-setup|终端设置|为 iTerm2 和 VSCode 安装 Shift+Enter 按键绑定|
|/statusline|状态栏|设置 Claude Code 的状态栏 UI|
|/permissions|权限管理|查看或更新权限|
|/sandbox|沙箱设置|启用带有文件系统和网络隔离的沙箱模式|
### 账户和认证
|   |   |   |
|---|---|---|
|命令|用途|说明|
|/login|切换账户|切换 Anthropic 账户|
|/logout|登出|从 Anthropic 账户登出|

### 自定义斜杠命令
自定义命令允许你定义经常使用的提示为 Markdown 文件。
**WIN环境：**
```c
创建项目命令 
1、当前目录下创建.claude/commands文件夹
2、添加optimize.md文件，写入"快速了解下工程，并分析工程的架构"
3、重启后生效，可以使用/optimize触发命令
创建个人命令
1、在个人目录下创建commands文件夹，例如用户名是 admin：
C:\Users\admin\.claude\commands\
2、添加optimize.md文件，写入"快速了解下工程，并分析工程的架构"
3、重启后生效，可以使用/optimize触发命令
```
**Linux环境:**
```c
创建项目命令 
mkdir -p .claude/commands
echo "快速了解下工程，并分析工程的架构" > .claude/commands/optimize.md
# 使用命令，重启后生效
> /optimize

创建个人命令 
mkdir -p ~/.claude/commands
echo "检查这段代码的安全问题" > ~/.claude/commands/security-review.md
# 使用命令，重启后生效
> /security-review
```
---
## 键盘快捷键
### 通用快捷键
|   |   |   |
|---|---|---|
|快捷键|功能|说明|
|Ctrl+C|取消输入/生成|中断当前操作|
|Ctrl+D|退出会话|EOF 信号|
|Ctrl+L|清空屏幕|保留对话历史|
|Ctrl+O|切换详细输出|显示工具使用和执行详情|
|Ctrl+R|反向历史搜索|交互式搜索历史命令|
|Ctrl+V (Linux/Mac) 或 Alt+V (Windows)|粘贴图片|从剪贴板粘贴图片|
|Ctrl+B|后台运行命令|在后台运行长命令|
|Esc + Esc|撤销改动|恢复代码和/或对话到之前的状态|
|Shift+Tab 或 Alt+M|切换权限模式|在自动接受、计划和普通模式间切换|
|Option+P (Mac) 或 Alt+P (Windows/Linux)|切换模型|无需清空提示就切换模型|
|Up/Down 箭头|导航历史|回顾之前的输入|
### 快速命令前缀
|   |   |   |
|---|---|---|
|前缀|功能|说明|
|/ 开头|斜杠命令|执行斜杠命令|
|! 开头|Bash 模式|直接运行命令并添加输出到会话|
|@|文件路径提及|触发文件路径自动完成|

## ClaudeCode插件使用
打开后就可以看到一个界面交互的窗口，基本用法和CLI差不多，但是支持的指令比CLI少一点。
![](https://x509p6c8to.feishu.cn/space/api/box/stream/download/asynccode/?code=MTQzMzM2NmI4NTM2MzVjMDE3ZWY2Mjg0NDRhMWNmYmJfSHhWaHBEVUdDOFQ0OVBsUG1XYVlZMlRHQzZ4cHBFVlJfVG9rZW46Qlc5WGJqU243b1A1ZDR4Qk1FYWNOZ0dHbmVnXzE3ODUwNjA2OTI6MTc4NTA2NDI5Ml9WNA&add_watermark=true&scene_type=CCM)
底部每个菜单的作用：
- +号可以点击选择电脑文件或者工程文件，把文件添加到此次对话中
    
- 命令菜单：点击 `/` 或输入 `/` 以打开命令菜单。选项包括附加文件、切换模型、切换扩展思考、查看计划使用情况。
    
- 底部会有一个刚刚打开的文件名称，因为你在 IDE 里打开了这个文件。VSCode 扩展会把当前打开的文件作为上下文信息发送给 Claude，方便LLM了解你正在查看的内容。
    
- 多行输入：按 `Shift+Enter` 添加新行而不发送。这也适用于问题对话框的”其他”自由文本输入。
    
- 权限模式
    

|   |   |   |   |   |
|---|---|---|---|---|
|模式|编辑前确认|先出计划|自动判断|交互频率|
|Ask before edits|✅|❌|❌|最高|
|Edit automatically|❌|❌|❌|低|
|Plan mode|✅|✅|❌|中等|
|Auto mode|视情况|视情况|✅|最低|

- 怕它乱改：选 Ask before edits
    
- 小修小补：选 Edit automatically
    
- 大功能/重构：选 Plan mode
    
- 懒得切：选 Auto mode
    
- 任务复杂：Effort 拉高一点；普通问题中等就够了。
    

```c
1. Ask before edit（编辑前询问模式-默认模式）
每次编辑文件或运行命令都会暂停，等你按回车确认
控制程度最高，适合处理敏感代码或刚上手时

2. Edit automatically 自动编辑模式
Claude 会直接修改你选中的文本，或者整个文件，不会每次都弹窗问。
但是一些shell指令的其它操作还是会询问你。

3. Plan mode 计划模式
本质区别：不是"少问还是多问"，而是先想后做
Claude 会先读代码、理解项目，然后给你一个修改计划，不会马上动手改。你确认后再进入编辑。适合比较复杂的任务，比如重构、加新功能、改架构、跨多个文件调整。
这个模式最适合“先聊清楚再干活”。

4. Auto mode 自动模式
自动选择权限模式。
Claude 会根据任务判断该问你、该自动改、还是先计划。比如小改动它可能直接编辑，复杂任务可能先进 Plan mode。
适合你不想每次手动切模式，但也愿意让 Claude 自己判断风险。

5.思考力度
有时候你只是想让 Claude 帮你重命名一个变量，它却花了 10 秒钟”深度思考”，然后给你写了一整段分析。有时候你想让它仔细分析一个复杂 bug，它却秒回一个浅尝辄止的答案。问题出在哪？Claude 的”思考力度”和你的任务复杂度不匹配。这时候你需要 /effort——一个让你主动控制 Claude 思考深度的开关。
```

**新思路：遇到不了解的功能，不要去用搜索引擎了，直接问AI即可。**