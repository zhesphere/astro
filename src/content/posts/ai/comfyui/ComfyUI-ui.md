---
title: "ComfyUI 界面与节点：按钮都是干什么的"
published: 2026-11-07
description: "侧栏、Run 栏、画布和右侧面板怎么分工；节点、连线、绕过，以及常用节点各管什么。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 2
---

ComfyUI 的难，常常不是「不会点生成」，而是不知道每个图标对应哪一类操作。这篇按官方界面地图，把工作区拆开讲；下一篇才手搭文生图。

先把语言换成中文：左下角 **设置** → `Comfy` → `Locale` → 中文。

## 工作区六块

| 区域 | 干什么 |
|------|--------|
| 左侧边栏 | 资产、节点库、模型库、工作流、Apps；（开启相关设置时还有 Job History） |
| 画布 | 放节点、拉连线 |
| 右侧面板 | 当前选中项的参数、节点信息、设置与报错（从顶栏打开属性面板） |
| 顶栏 | 已打开的工作流标签、登录、属性面板开关等 |
| 左下 | Help Center、底栏（日志 / 快捷键）、设置 |
| 右下 | 画布控制：平移、小地图、连线显示、缩放、适应视图 |

## 左侧栏

自上而下常见是：

- **资产**：生成和导入的媒体
- **节点库**：Essentials（若有）和全部节点；可搜索后拖到画布
- **模型库**：本地 `models` 里已有的模型；拖出来常会自动带上对应加载节点
- **工作流**：本机已保存的工作流
- **Apps**：侧栏应用；另有 App Mode 可把图收成更线性的界面

**模板**入口：侧栏若有 Templates 图标可点；没有就用菜单 **工作流 → 浏览工作流模板**（官方内置与自定义节点附带的示例）。

## Run 栏（真正的「生成」）

画布上方浮着 Run 栏，一次运行相关的入口都在这：

| 控件 | 作用 |
|------|------|
| 拖动手柄 | 把 Run 栏拖到别处；拖到顶部可重新钉住 |
| 批量次数 | 点一次 Run 排队几次，默认 1 |
| **Run** | 把当前工作流加入队列。按住 `Shift` 再点，插到队列最前 |
| 队列模式 | `Run`：只在点击时跑；`Run (On Change)`：有改动就再排队；`Run (Instant)`：当前任务一结束立刻再排 |
| 取消 | 停正在执行的任务；队列空时不可用 |
| 活动任务 | 排队中 / 运行中的数量；点击打开队列，右键可清空 |

快捷键：Mac 上运行用 `Cmd + Enter`（官方也写作 Ctrl/Cmd + Enter）；Windows / Linux 一般是 `Ctrl + Enter`。`Shift` + 运行可插队（与 Shift+Run 同类）。底栏快捷键列表以你本机为准。

注意：`Run (On Change)` 搭配会自动变的种子时，可能一遍接一遍跑；不确定时先用普通 `Run`。

## 画布上怎么加点

- **双击空白处**：搜索并添加节点
- **右键空白处**：节点菜单
- **从端口拖线到空白处松开**：只列出和该数据类型兼容的节点
- **右键某个已有节点**：改标题、颜色、克隆、删除、模式等

节点左侧多是输入，右侧多是输出。**只有兼容类型才能连上**——例如 IMAGE 不能直接接到要数字的口。

### 绕过（Bypass）

选中节点后 `Ctrl + B`（macOS 同样是 Ctrl+B，以你本机快捷键面板为准）：运行时跳过该节点，但下游仍尝试接「未经过它处理」的数据。官方模板里常用它开关可选组（例如 USO 的风格参考组、EasyCache）。

底栏可以打开快捷键列表；记不住时以界面里的为准，版本之间可能微调。

## 右侧面板

选中节点后看参数；报错、缺模型也在这里。加载官方模板后如果节点发红，打开 **错误** 标签，看 Missing Models，按提示 Download 或手动放到对应目录。

不少节点还带应用内说明（节点文档）；选中后可先读一眼，再改参数。

## 节点是什么

节点 = 工作流里的一步：加载文件、改数据、采样、保存结果。

几个入门必认的：

| 节点 | 作用 |
|------|------|
| **Load Checkpoint**（检查点加载） | 读 `.safetensors` 一类检查点，常同时给出 MODEL、CLIP、VAE |
| **CLIP Text Encode** | 把提示词编成条件；接到采样器的 Positive / Negative |
| **Empty Latent Image** | 定义潜空间画布尺寸（宽、高、批量） |
| **KSampler** | 在潜空间里按步数去噪，是文生图的核心 |
| **VAE Decode** | 潜空间 → 像素图 |
| **Save Image** / **Load Image** | 保存到 `output`，或读入参考图 |
| **LoraLoader** / **LoraLoaderModelOnly** | 在模型线上叠 LoRA |
| **Load Diffusion Model** / **DualCLIPLoader** / **Load VAE** | 新模型族（FLUX、Qwen 等）常把 UNet、文本编码器、VAE 拆开加载，不再塞进一个 Checkpoint |

「组」是把一堆节点框在一起，方便整体拖动或绕过；「子图」是可复用的封装节点。进阶用法见 [改模板](/posts/ai/comfyui/ComfyUI-advanced/)。

## 工作流怎么存

- 菜单 **工作流 → 导出**：存成 JSON，方便分享
- 用 Save Image 存的图往往带 workflow metadata：把图拖回画布，或用打开菜单选这张图，可以还原节点图

## 下一步

认完按钮，去搭一条最小链路：[手搭最小文生图](/posts/ai/comfyui/ComfyUI-txt2img/)。已经在用官方模板的，也可以对照着看 [官方模板实战](/posts/ai/comfyui/ComfyUI-templates/)。

## 参考

官方：

- [界面概览](https://docs.comfy.org/zh/interface/overview)
- [工作流概念](https://docs.comfy.org/zh/basic-concepts/workflow)
- [节点库](https://docs.comfy.org/zh/interface/node-library)
- [工作流模板](https://docs.comfy.org/zh/interface/features/template)

社区：

- [SD Note · 界面操作](https://licyk.github.io/SDNote/guide/comfyui/interface_operation/)（快捷键与侧栏说明较细）
- [腾讯云 · 徒手搭建文生图工作流](https://cloud.tencent.com.cn/developer/news/2008302)（节点亮起 = 正在执行该步）
- [UIED · 从零构建首个工作流](https://www.uied.cn/posts/58888)
