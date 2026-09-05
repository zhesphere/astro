---
title: "OpenCode"
published: 2026-09-05
description: ""
image: ""
tags: []
category: ""
---
# 安装
安装方式最好统一，可以汇总安装的所有CLI
mac查看命令
```
npm list -g --depth=0
```
安装opencode
```
npm i -g opencode-ai
```
提示
```
added 2 packages in 19s

**npm** warn allow-scripts 1 package has install scripts not yet covered by allowScripts:

**npm** warn allow-scripts   opencode-ai@1.18.29 (postinstall: node ./postinstall.mjs)

**npm** warn allow-scripts

**npm** warn allow-scripts Run `npm install -g --allow-scripts=opencode-ai` to allow these scripts once, or `npm config set allow-scripts=opencode-ai --location=user` to allow them for all global installs.

```
npm 现在提示：这个脚本还没有被你的 `allowScripts` 策略允许，所以建议你明确授权。npm 官方文档也说明，`allow-scripts` 就是用来控制全局安装时哪些包可以运行 `preinstall/install/postinstall` 这类脚本的。
```
npm install -g --allow-scripts=opencode-ai opencode-ai
```
我对该环境持谨慎态度，所以直接试了一下输出版本号和打开opencode，所以就先这么用着
```
opencode --version
opencode
```
我在vscode终端里使用的，他应该会自动安装依赖



# OpenCode 安装与使用教程：从 npm 安装到 Ollama 本地模型与联网搜索

  

OpenCode 是一个开源的 AI Coding Agent，可以在终端中读取项目文件、修改代码、执行命令、调用工具，并连接云端模型或本地模型。

  

这篇文章既是我的配置记录，也整理成一套适合新手复现的流程。本文主要使用：

  

- macOS

- VS Code

- nvm

- Node.js / npm

- OpenCode

- Ollama

- Qwen3.6 本地模型

  

> 本文测试时 OpenCode CLI 版本为 `1.18.29`。AI 工具更新很快，如果后续版本界面或命令有变化，建议同时参考官方文档。

  

---

  

## 一、OpenCode 到底是什么？

  

可以把 OpenCode 理解成一个“AI 程序员外壳”。

  

它本身负责：

  

- 读取项目目录

- 搜索代码

- 编辑文件

- 执行终端命令

- 调用工具

- 管理 Agent 工作流

  

真正负责“思考”的模型可以来自不同地方，例如：

  

- OpenCode 官方模型

- OpenAI

- Anthropic

- Gemini

- GLM

- OpenRouter

- Ollama 本地模型

  

所以 OpenCode 和模型是分开的。

  

一个比较典型的组合是：

  

```text

VS Code

└── OpenCode

    ├── 云端模型

    └── Ollama 本地模型

```

  

---

  

## 二、需要专门安装 WezTerm、Ghostty 等终端吗？

  

OpenCode 官方建议使用现代终端，例如：

  

- WezTerm

- Alacritty

- Ghostty

- Kitty

  

但这并不代表必须额外安装这些终端。

  

如果平时已经使用 VS Code，完全可以先使用：

  

```text

VS Code + Integrated Terminal + OpenCode

```

  

这样做对刚开始 Vibe Coding 的人反而更直观。

  

VS Code 左侧可以看到：

  

- 项目目录

- `.env`

- `.gitignore`

- `.vscode`

- 配置文件

- OpenCode 新建或修改的代码

  

下面的 Terminal 则用于运行 OpenCode。

  

打开 VS Code 内置终端的快捷键通常为：

  

```text

Control + `

```

  

如果后续长期大量使用终端，再考虑 Ghostty、WezTerm 等独立终端即可。

  

---

  

## 三、使用 npm 安装 OpenCode

  

如果 Codex、Claude Code 等 CLI 本身就是通过 npm 安装的，那么 OpenCode 继续使用 npm 管理会比较统一。

  

先确认 Node.js 和 npm：

  

```bash

node -v

npm -v

```

  

例如：

  

```text

v24.14.1

11.17.0

```

  

查看已经安装的全局 npm 包：

  

```bash

npm list -g --depth=0

```

  

如果使用 nvm，路径可能类似：

  

```text

~/.nvm/versions/node/v24.14.1/lib

```

  

安装 OpenCode：

  

```bash

npm install -g opencode-ai

```

  

也可以简写：

  

```bash

npm i -g opencode-ai

```

  

检查版本：

  

```bash

opencode --version

```

  

如果能够输出版本号，说明 CLI 已经安装成功。

  

### 为什么推荐 `-g`？

  

这里的：

  

```text

-g

```

  

代表全局安装。

  

这样 OpenCode 是一个系统级 CLI 工具，而不会成为某个项目的 dependency。

  

不要在项目目录里误写成：

  

```bash

npm install opencode-ai

```

  

否则可能把 OpenCode 写进当前项目的 `package.json` / `node_modules`。

  

---

  

## 四、npm 11 的 `allow-scripts` 警告

  

新版 npm 可能在安装时提示：

  

```text

npm warn allow-scripts

opencode-ai@... (postinstall: node ./postinstall.mjs)

```

  

这表示 npm 检测到了包的 `postinstall` 安装脚本，并提醒当前安全策略没有显式批准该脚本。

  

这里首先检查：

  

```bash

opencode --version

```

  

再尝试：

  

```bash

opencode

```

  

如果 CLI 可以正常运行，就不必仅仅为了消除 warning 修改长期 npm 配置。

  

如果确实因为安装脚本未执行导致 OpenCode 无法正常使用，可以按照 npm 给出的提示，仅针对 OpenCode 允许脚本，例如：

  

```bash

npm install -g --allow-scripts=opencode-ai opencode-ai

```

  

不建议为了省事直接开放所有包的安装脚本。

  

---

  

## 五、nvm 用户要注意 Node 版本切换

  

如果 OpenCode、Codex、Claude Code 都安装在某个 nvm Node 版本下面，例如：

  

```text

~/.nvm/versions/node/v24.14.1/

```

  

以后切换 Node：

  

```bash

nvm use 26

```

  

可能会发现：

  

```text

opencode: command not found

```

  

原因通常不是 OpenCode 被删除，而是新的 Node 版本拥有另一套 global npm packages。

  

因此：

  

- 当前环境稳定时没有必要频繁切 Node

- 升级 Node 后可以重新安装需要的全局 CLI

- 遇到 CLI 突然消失时先检查：

  

```bash

which node

which npm

which opencode

node -v

```

  

---

  

## 六、启动 OpenCode

  

进入项目目录：

  

```bash

**cd** ~/Projects/my-app

```

  

启动：

  

```bash

opencode

```

  

如果只是测试，也可以先建一个空项目：

  

```bash

mkdir ~/Documents/opencode-**test**

**cd** ~/Documents/opencode-**test**

opencode

```

  

---

  

## 七、常用基础命令

  

查看版本：

  

```bash

opencode --version

```

  

查看模型：

  

```bash

opencode models

```

  

进入 OpenCode 后连接云端模型 Provider：

  

```text

/connect

```

  

选择模型：

  

```text

/models

```

  

直接指定模型运行：

  

```bash

opencode -m provider/model

```

  

非交互运行一次任务：

  

```bash

opencode run -m provider/model "你的任务"

```

  

打印日志排错：

  

```bash

opencode --print-logs

```

  

---

  

## 八、如何用 OpenCode 做第一个小软件

  

进入一个空目录：

  

```bash

mkdir my-first-app

**cd** my-first-app

opencode

```

  

然后不要只说：

  

```text

做一个记账软件

```

  

更推荐描述清楚功能和限制：

  

```text

我要做一个本地运行的简单记账软件。

  

功能：

1. 添加收入和支出

2. 可以填写金额、类别、备注和日期

3. 首页显示本月收入、支出和余额

4. 可以删除记录

5. 数据保存在本地

6. 界面简单清爽

  

我是新手，不需要复杂架构。

请选择容易运行和维护的技术栈。

先查看当前目录并给出计划，确认方案后再开始创建。

```

  

对于稍大的修改，可以先要求：

  

```text

先不要修改代码。

先查看当前项目结构，然后告诉我你的实现计划。

```

  

确认没问题之后：

  

```text

按照这个方案执行。

```

  

这样可以降低 Agent 大范围误改代码的概率。

  

---

  

## 九、OpenCode 接入 Ollama：不改配置文件的方式

  

如果已经安装 Ollama，最省事的方式不是手写 `opencode.json`，而是让 Ollama 启动 OpenCode。

  

直接运行：

  

```bash

ollama launch opencode

```

  

指定模型：

  

```bash

ollama launch opencode --model qwen3.6

```

  

只生成/准备配置但不启动：

  

```bash

ollama launch opencode --config

```

  

Ollama 官方说明，`ollama launch opencode` 会通过：

  

```text

OPENCODE_CONFIG_CONTENT

```

  

把配置以内联环境变量的方式传递给 OpenCode，因此不需要为了试用本地模型手工编辑全局配置文件。

  

这特别适合：

  

- 想快速测试本地模型

- 不想污染 OpenCode 配置

- 想随时换 Ollama 模型

  

---

  

## 十、为什么 `opencode models ollama` 可能提示 Provider not found？

  

可能出现：

  

```text

Error: Provider not found: ollama

```

  

这不代表 Ollama 坏了。

  

OpenCode 的 provider 是否已经存在，取决于当前版本、配置方式和启动方式。

  

如果直接运行：

  

```bash

opencode

```

  

而没有配置 Ollama provider，那么：

  

```bash

opencode models ollama

```

  

可能找不到 `ollama`。

  

这时最简单的处理方式是：

  

```bash

ollama launch opencode --model qwen3.6

```

  

如果希望 OpenCode 永久把 Ollama 当作一个自定义 provider，也可以在 `opencode.json` 中配置 OpenAI-compatible endpoint，但对于新手测试并不是必须的。

  

---

  

## 十一、手动配置 Ollama Provider（可选）

  

如果希望直接运行：

  

```bash

opencode

```

  

后也能长期看到 Ollama provider，可以配置：

  

```text

~/.config/opencode/opencode.json

```

  

示例：

  

```json

{

  "$schema": "https://opencode.ai/config.json",

  "provider": {

    "ollama": {

      "npm": "@ai-sdk/openai-compatible",

      "name": "Ollama (local)",

      "options": {

        "baseURL": "http://localhost:11434/v1"

      },

      "models": {

        "qwen3.6:latest": {

          "name": "Qwen 3.6 Local"

        }

      }

    }

  }

}

```

  

配置后模型名称通常为：

  

```text

ollama/qwen3.6:latest

```

  

---

  

## 十二、本地模型也可以联网搜索

  

“模型在本地运行”和“OpenCode 能联网”并不冲突。

  

架构可以是：

  

```text

OpenCode

├── Ollama / Qwen3.6    ← 本地推理

├── webfetch             ← 读取网页

└── websearch            ← 搜索互联网

```

  

### webfetch

  

OpenCode 可以读取指定网页。

  

例如可以让 Agent：

  

```text

阅读 React 最新官方文档，然后按照当前推荐方案修改项目。

```

  

### websearch

  

OpenCode 当前文档说明，`websearch` 在使用 OpenCode provider 时可用；使用其他 provider（例如 Ollama）时，可以通过环境变量启用 Exa 搜索：

  

```bash

OPENCODE_ENABLE_EXA=1 opencode

```

  

如果通过 Ollama 启动：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

这样就可以做到：

  

```text

本地模型负责推理

+

OpenCode 联网搜索最新资料

+

OpenCode 修改本地代码

```

  

### 隐私边界

  

需要注意：

  

只要启用了 `websearch` / `webfetch`，搜索关键词或网页请求就需要访问互联网。

  

因此：

  

```text

本地推理 ≠ 完全离线

```

  

如果项目包含敏感信息，不要把敏感代码、密钥或内部数据直接拼进联网搜索请求。

  

---

  

## 十三、推荐的日常使用方式

  

对于刚开始使用 OpenCode 的用户，我比较推荐：

  

```text

VS Code

│

├── Explorer：查看项目和隐藏文件

├── Git：查看 diff

└── Terminal

    └── OpenCode

        ├── 免费模型

        ├── 云端模型

        └── Ollama 本地模型

```

  

平时直接：

  

```bash

opencode

```

  

需要本地模型时：

  

```bash

ollama launch opencode --model qwen3.6

```

  

需要本地模型同时联网：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

这套方式的好处是配置简单，而且本地/云端可以随时切换。

  

---

  

## 十四、常见排错

  

### 1. OpenCode 安装后没有命令

  

检查：

  

```bash

which opencode

npm list -g --depth=0

node -v

npm -v

```

  

如果使用 nvm，再检查当前 Node 版本是否与安装 OpenCode 时一致。

  

### 2. OpenCode 启动后直接退出

  

尝试：

  

```bash

opencode --print-logs

```

  

如果在某个终端中 TUI 显示异常，也可以换 macOS Terminal、Ghostty、WezTerm 等终端测试。

  

### 3. Ollama API 正常，但 OpenCode 找不到 Ollama

  

先确认：

  

```bash

curl http://127.0.0.1:11434/api/tags

```

  

如果能返回模型列表，说明 Ollama 服务正常。

  

然后优先尝试：

  

```bash

ollama launch opencode --model 模型名

```

  

### 4. 本地模型能聊天，却不会正常改代码

  

Coding Agent 不只是要求“会生成代码”，还需要较好的：

  

- Tool Calling

- 长上下文

- 代码推理

- 多步骤任务能力

  

OpenCode 官方建议，如果 Ollama 下工具调用表现不稳定，可以尝试提高 context / `num_ctx`。实际使用 OpenCode 时，Ollama 官方集成文档建议至少准备约 64K context。

  

---

  

## 十五、参考资料

  

- OpenCode 官方文档：https://opencode.ai/docs/

- OpenCode Provider 文档：https://opencode.ai/docs/providers/

- OpenCode Tools 文档：https://opencode.ai/docs/tools/

- Ollama × OpenCode 集成：https://docs.ollama.com/integrations/opencode

- Ollama：https://ollama.com/

  

---

  

## 总结

  

如果本身已经习惯 VS Code、npm 和终端，那么 OpenCode 的门槛其实很低：

  

```bash

npm install -g opencode-ai

opencode

```

  

本地模型则可以进一步简化为：

  

```bash

ollama launch opencode --model qwen3.6

```

  

需要联网搜索时：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

这套工作流最大的优势是：****编辑器、Agent 和模型彼此独立****。可以先用免费模型、本地模型做小软件，真正遇到复杂任务时再切换更强的云端模型，不必一开始就承担固定订阅成本。