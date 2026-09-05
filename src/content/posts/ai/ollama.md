---
title: "ollama"
published: 2026-09-05
description: ""
image: ""
tags: []
category: "AI"
---
# Ollama 本地大模型实用教程：模型管理、Context Length 与 OpenCode 集成

  

Ollama 是目前非常方便的本地大模型运行工具之一。安装好之后，可以直接在 Mac、Windows 或 Linux 上下载和运行模型，也能作为本地 API Server 给 OpenCode 等 AI Coding 工具使用。

  

这篇文章记录一套实际使用流程，包括：

  

- 查看本地模型

- 检查 Ollama API

- 理解模型能力

- 调整 Context Length

- 接入 OpenCode

- 使用本地模型进行 Vibe Coding

- 本地模型与联网搜索同时使用

- 常见排错

  

本文示例环境：

  

```text

Mac：M5 Pro / 48GB Unified Memory

Ollama 模型：qwen3.6:latest

OpenCode：1.18.29

```

  

---

  

## 一、先检查 Ollama 是否正常

  

查看本机已有模型：

  

```bash

ollama list

```

  

示例：

  

```text

NAME                  SIZE

qwen3.6:latest        22 GB

qwen3-embedding:4b    2.5 GB

```

  

如果能看到模型列表，说明 Ollama CLI 能正常读取本地模型。

  

---

  

## 二、普通模型和 Embedding 模型不是一回事

  

例如：

  

```text

qwen3.6:latest

```

  

属于生成式模型，可以用于：

  

- 对话

- 写代码

- 推理

- Tool Calling

- Agent

  

而：

  

```text

qwen3-embedding:4b

```

  

属于 Embedding 模型。

  

Embedding 主要用于把文本转换成向量，例如：

  

- RAG

- 语义搜索

- 知识库检索

- 文档相似度

  

它不能当作 OpenCode 的“主脑”来完成 Coding Agent 任务。

  

所以 OpenCode 这类 Coding Agent 应该选择：

  

```text

completion / tools / thinking

```

  

类型的模型，而不是只支持：

  

```text

embedding

```

  

的模型。

  

---

  

## 三、检查 Ollama API 是否正常

  

Ollama 默认在本机提供 HTTP API：

  

```text

http://127.0.0.1:11434

```

  

查看模型列表：

  

```bash

curl http://127.0.0.1:11434/api/tags

```

  

如果返回 JSON：

  

```json

{

  "models": [

    {

      "name": "qwen3.6:latest"

    }

  ]

}

```

  

说明：

  

```text

Ollama Server

+

本地 API

+

模型索引

```

  

都正常。

  

如果 OpenCode 等第三方工具连不上 Ollama，这条命令是最值得先做的检查。

  

---

  

## 四、查看一个模型有什么能力

  

Ollama API 返回的信息中可能有：

  

```json

"capabilities": [

  "completion",

  "tools",

  "thinking",

  "vision"

]

```

  

它们大致代表：

  

### completion

  

可以进行普通文本生成。

  

### tools

  

支持工具调用。

  

对于 OpenCode、Claude Code 这类 Agent，这是非常重要的能力。

  

Agent 工作流通常是：

  

```text

读取文件

→ 思考

→ 调用工具

→ 修改代码

→ 执行命令

→ 读取错误

→ 再次修改

```

  

如果模型 Tool Calling 很差，即使它会写代码，也可能不适合 Agent Coding。

  

### thinking

  

支持推理模式。

  

### vision

  

可以处理图像输入。

  

---

  

## 五、Qwen3.6 为什么适合 Coding Agent？

  

本文使用：

  

```text

qwen3.6:latest

```

  

Ollama 官方模型页目前将 Qwen3.6 定位为强化了：

  

- Agentic Coding

- Repository-level reasoning

- Thinking preservation

  

的模型。

  

目前 `qwen3.6:latest` 约 23GB，官方模型页标注 256K context window，并支持 Tools / Thinking / Vision。

  

运行：

  

```bash

ollama run qwen3.6

```

  

如果只是想测试问答，可以直接这样使用。

  

---

  

## 六、Context Length 到底是什么？

  

Ollama 设置里可以看到：

  

```text

Context length

4k / 8k / 16k / 32k / 64k / 128k / 256k

```

  

它决定模型一次推理过程中最多可以利用多少上下文。

  

对于普通聊天，上下文里主要是：

  

```text

System Prompt

+

历史对话

+

当前问题

```

  

对于 OpenCode 这种 Coding Agent，还会加入：

  

```text

你的需求

+

项目文件

+

源代码

+

终端输出

+

错误日志

+

Tool Call 结果

+

之前的修改记录

```

  

所以 Agent Coding 往往比普通聊天更需要长上下文。

  

---

  

## 七、Context Length 调大会发生什么？

  

上下文越大，模型理论上能同时看到更多：

  

- 文件

- 对话

- 代码

- 日志

- 工具输出

  

优点：

  

- 更不容易忘记前面的需求

- 多文件项目更稳定

- 长时间 Debug 时更连贯

- 更适合 Repository-level Coding

  

但代价也很明显：

  

- KV Cache 占用增加

- 内存压力增加

- 首 Token 延迟可能增加

- 长 Prompt 的 Prefill 时间更长

- 实际推理速度可能下降

  

因此不是越大越好。

  

---

  

## 八、Context Length 该设多少？

  

可以粗略按用途选择：

  

| Context | 推荐用途 |

| --- | --- |

| 8K–16K | 简单聊天、小脚本 |

| 32K | 小型 Coding 项目，速度和内存比较均衡 |

| 64K | Coding Agent 推荐起点之一 |

| 128K | 较大项目、长会话 |

| 256K | 超长上下文，需要较大内存，不建议默认拉满 |

  

Ollama 的 OpenCode 集成文档建议 OpenCode 使用至少约 ****64K tokens**** 的上下文窗口。

  

---

  

## 九、M5 Pro 48GB 怎么设置？

  

以：

  

```text

M5 Pro

48GB Unified Memory

qwen3.6:latest ≈ 23GB

```

  

为例。

  

比较推荐：

  

```text

64K Context

```

  

原因是 48GB Unified Memory 不只是给模型使用，还需要同时留给：

  

- macOS

- Ollama

- VS Code

- OpenCode

- Browser

- Terminal

- KV Cache

- 其他应用

  

因此：

  

### 32K

  

更省内存，速度更轻快。

  

适合非常小的项目。

  

### 64K

  

更适合实际 OpenCode Coding Agent 工作流。

  

对于 48GB Mac，我会优先选择这一档。

  

### 128K

  

项目真的变大、OpenCode 经常忘前面的代码时再尝试。

  

### 256K

  

虽然 Qwen3.6 本身支持更长 Context，但不代表日常必须使用最大值。

  

在 48GB 内存设备上默认拉满一般没有必要。

  

---

  

## 十、在哪里调整 Ollama Context Length？

  

如果使用 Ollama Desktop，可以打开：

  

```text

Settings

→ Context length

```

  

然后拖动：

  

```text

32K → 64K

```

  

修改后，重新加载模型或重启相关会话，让新的 Context 设置生效。

  

---

  

## 十一、Ollama 接入 OpenCode：最简单的方法

  

如果 OpenCode 已经安装：

  

```bash

opencode --version

```

  

则 Ollama 官方提供了非常方便的集成命令：

  

```bash

ollama launch opencode

```

  

指定模型：

  

```bash

ollama launch opencode --model qwen3.6

```

  

这样无需手工修改 OpenCode 的 JSON 配置。

  

Ollama 会通过：

  

```text

OPENCODE_CONFIG_CONTENT

```

  

向 OpenCode 传递内联配置。

  

所以很适合临时测试：

  

```text

今天用 Qwen3.6

明天换另一个 Ollama 模型

```

  

而不用反复改 OpenCode 全局配置文件。

  

---

  

## 十二、只配置但不启动 OpenCode

  

可以：

  

```bash

ollama launch opencode --config

```

  

这适合想查看/准备 OpenCode 集成配置，但不立即启动会话的情况。

  

---

  

## 十三、为什么 OpenCode 可能找不到 `ollama` Provider？

  

可能运行：

  

```bash

opencode models ollama

```

  

得到：

  

```text

Error: Provider not found: ollama

```

  

先不要怀疑 Ollama。

  

执行：

  

```bash

curl http://127.0.0.1:11434/api/tags

```

  

如果 API 能正常返回模型，那么 Ollama 本身就是好的。

  

原因通常是：

  

```text

OpenCode 当前没有配置名为 ollama 的 Provider

```

  

最简单的解决方式：

  

```bash

ollama launch opencode --model qwen3.6

```

  

让 Ollama 在启动时自动给 OpenCode 注入 provider 配置。

  

---

  

## 十四、如果想长期手动配置 OpenCode

  

如果不想每次用：

  

```bash

ollama launch opencode

```

  

也可以让 OpenCode 永久连接：

  

```text

http://localhost:11434/v1

```

  

Ollama 提供 OpenAI-compatible API，因此 OpenCode 可以通过：

  

```text

@ai-sdk/openai-compatible

```

  

连接它。

  

OpenCode 官方 Provider 文档给出的基本结构类似：

  

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

  

但只是想体验本地 Coding Agent 的话，没有必要一开始就手改配置。

  

---

  

## 十五、本地 Ollama 可以和联网搜索同时使用吗？

  

可以。

  

这里需要分清两件事：

  

### 模型推理

  

```text

Ollama / Qwen3.6

```

  

在本地运行。

  

### 搜索和网页获取

  

由 OpenCode 的工具负责。

  

例如：

  

```text

webfetch

websearch

```

  

所以可以形成：

  

```text

OpenCode

│

├── Qwen3.6 → 本地推理

├── websearch → 联网搜索

└── webfetch → 获取网页

```

  

使用非 OpenCode provider（例如 Ollama）时，OpenCode 文档目前提供：

  

```bash

OPENCODE_ENABLE_EXA=1 opencode

```

  

来启用 web search。

  

如果通过 Ollama 启动：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

然后就可以给 OpenCode 类似的任务：

  

```text

先搜索 React 当前最新官方文档，

确认推荐的项目创建方式，

然后按照最新方案修改当前项目。

```

  

---

  

## 十六、本地模型联网后的隐私边界

  

这一点很容易被忽略。

  

如果只运行：

  

```bash

ollama run qwen3.6

```

  

并且没有任何联网工具，那么推理可以完全在本机进行。

  

但如果使用：

  

```text

websearch

webfetch

```

  

则：

  

- 搜索请求需要发往互联网

- 网页 URL 会被访问

- 搜索词会经过外部服务

  

因此：

  

```text

Ollama 本地推理

```

  

并不自动等于：

  

```text

整个 Agent 工作流完全离线

```

  

如果代码仓库包含：

  

- API Key

- 客户数据

- 公司内部代码

- 私有地址

- Token

- 密码

  

不要把这些内容直接作为搜索关键词发到公网。

  

---

  

## 十七、常用 Ollama 命令速查

  

查看模型：

  

```bash

ollama list

```

  

运行模型：

  

```bash

ollama run qwen3.6

```

  

检查 API：

  

```bash

curl http://127.0.0.1:11434/api/tags

```

  

启动 OpenCode：

  

```bash

ollama launch opencode

```

  

指定模型启动 OpenCode：

  

```bash

ollama launch opencode --model qwen3.6

```

  

只准备 OpenCode 配置：

  

```bash

ollama launch opencode --config

```

  

本地模型 + OpenCode 联网搜索：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

---

  

## 十八、排错思路

  

### Ollama CLI 能看到模型，但第三方软件连不上

  

先测试：

  

```bash

curl http://127.0.0.1:11434/api/tags

```

  

如果正常，说明问题更可能出在第三方工具的 Provider 配置。

  

### 模型会回答问题但 OpenCode Tool Call 不稳定

  

优先检查：

  

1. 模型是否声明 `tools` capability

2. Context 是否过小

3. 模型本身是否针对 Agent Coding 优化

  

OpenCode 官方建议 Ollama Tool Calling 有问题时尝试增加 `num_ctx`，而 Ollama 的 OpenCode 集成文档则建议使用至少约 64K Context。

  

### 内存压力很大

  

降低 Context：

  

```text

128K → 64K

64K → 32K

```

  

或者换更小的量化/模型。

  

---

  

## 十九、我当前比较喜欢的本地 Coding 工作流

  

```text

VS Code

│

├── 查看项目结构和 Git diff

│

└── Terminal

    │

    └── Ollama launch OpenCode

        │

        └── Qwen3.6

```

  

启动：

  

```bash

ollama launch opencode --model qwen3.6

```

  

需要最新资料时：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

对于小软件、个人工具、原型来说，这套方案最大的好处是：

  

- 模型可以完全在自己电脑上跑

- 没有按 Token 计费

- OpenCode 仍然保留完整 Agent 工作流

- 需要时再打开联网工具

- 云端模型和本地模型可以按任务自由切换

  

---

  

## 二十、参考资料

  

- Ollama 官方文档：https://docs.ollama.com/

- Ollama × OpenCode：https://docs.ollama.com/integrations/opencode

- Qwen3.6 on Ollama：https://ollama.com/library/qwen3.6

- OpenCode Provider：https://opencode.ai/docs/providers/

- OpenCode Tools：https://opencode.ai/docs/tools/

  

---

  

## 总结

  

如果已经有 Ollama，使用本地模型驱动 OpenCode 并不复杂。

  

最核心的几条命令其实就是：

  

```bash

ollama list

curl http://127.0.0.1:11434/api/tags

ollama launch opencode --model qwen3.6

```

  

需要联网搜索再加：

  

```bash

OPENCODE_ENABLE_EXA=1 ollama launch opencode --model qwen3.6

```

  

Context Length 则不要盲目拉满。对于 48GB Unified Memory 的 Mac 和约 23GB 的 Qwen3.6，64K 是一个比较实用的起点；项目很小时可以退回 32K，真正遇到大项目再尝试 128K。