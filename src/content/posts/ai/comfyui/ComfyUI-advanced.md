---
title: "进阶：改官方模板，而不是从零发明"
published: 2026-11-07
description: "五步把官方模板变成自己的默认：只改输入、Ctrl+B 绕过、加 LoRA、收组导出，以及何时才装自定义节点。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 5
---

进阶不是「每天空白画布炫技」。对已经在用 Qwen / USO / Kontext 的人，下一步是：**读懂官方图，敢改，并固定成可复现流程**。

下面五步按顺序做；每步都先在**一份已跑通的官方模板**上练。

## 1. 只改输入，导出成默认

在不动连线的前提下，只动这些：

- 提示词（Kontext 用英文；Qwen 编辑用 `<image1>` 索引指图）
- 参考图 / Load Image
- 种子：要复现就 `fixed`，要探索就 `randomize`
- 尺寸 / 分辨率选择器（先降分辨率排查「慢」，再追求 2K）

满意后：**工作流 → 导出**，文件名写清楚，例如 `qwen21-poster-mine.json`。以后打开这份，而不是每次从模板库重新摸。

## 2. 用 Ctrl+B 开关可选组

官方模板常把「加速」「风格支路」「提示词增强」收成组。

- 选中组或节点 → `Ctrl + B` 绕过  
- USO：绕过 style / content / EasyCache，在四种变体间切换（见 [模板实战](/posts/ai/comfyui/ComfyUI-templates/)）  
- Qwen：提示词增强默认常关；只有当你理解 Preview 里真正送进模型的提示词时，再开 `refine_prompt`

改完跑一张对照：同一 seed，只开关一个组，避免一次改十处。

## 3. 在官方图上加 LoRA

前提：LoRA 与当前底模匹配（Qwen 的 LoRA 不要硬接到无关的 SD1.5 链上）。

1. 把 `.safetensors` 放进 `ComfyUI/models/loras/`  
2. 添加 **LoraLoaderModelOnly**（或模板里已有的同类节点）  
3. 接到送进采样器的 **MODEL** 线上（插在 Checkpoint / Diffusion Model 之后、KSampler 之前）  
4. 强度从低到高试；官方若写了推荐 steps / cfg，优先跟官方，而不是跟 SD1.5 的旧习惯  

例如 Qwen-Image-2.1 基础检查点可用官方仓库里的 Turbo LoRA，把 steps 收到约 8、保持 `cfg` 1 等路径——以 [Qwen 文档](https://docs.comfy.org/zh/tutorials/image/qwen/qwen-image-2-1) 当前说明为准。

## 4. 收成组 / 子图，下次拖出来用

- **组（Group）**：框住一组节点，方便整体移动和绕过。排错时仍看得到内部。  
- **子图（Subgraph）**：把稳定模块收成可复用节点（界面能力见官方「子图」说明）。适合「角色参考预处理」「固定的保存与缩放」这类重复块。

原则：先稳定一周再封装。封装太早，出了红节点更难拆。

## 5. 自定义节点：什么时候才装

官方模板要求尽量只用 Core 节点，就是为了减少「缺节点」。社区 JSON（Civitai 等）则经常依赖自定义节点。

再装自定义节点的合理时机：

- 官方模板做不到的功能（特定预处理、业务节点）  
- 你下载的社区工作流明确要求某扩展  
- 你已经能判断是「缺自定义节点」还是「缺模型 / 连线错误」

常见做法是装 **ComfyUI Manager**（在 `custom_nodes` 里 git clone 后重启），用界面搜索节点，或对当前图一键补缺失扩展。少数派实战指南也把它当成「应用商店」式入口。安装方式以 Manager 仓库当前 README 为准。

装完若模板变红：

1. 看报错是 missing node 还是 missing model  
2. 更新 ComfyUI / 前端 / 模板包  
3. 排查时可用便携版加 `--disable-all-custom-nodes` 对比（见官方自定义节点排查）  

不要为了「显得专业」一次装几十个节点包——版本冲突比不会搭图更耗时间。

## 可复现检查清单

交付或自己存档前，固定这几样：

- [ ] 工作流 JSON（或带 metadata 的输出图）  
- [ ] 模型文件名与目录（含 LoRA）  
- [ ] seed 与 `control_after_generate`  
- [ ] 分辨率 / 步数 / cfg / sampler / scheduler  
- [ ] ComfyUI 版本或更新通道（稳定 / latest）

## 下一步

工具侧会改模板之后，差距更多在审美、素材规范和整条内容管线。见 [能力上限](/posts/ai/comfyui/ComfyUI-ceiling/)。

## 参考

官方：

- [界面概览 · 子图 / 部分执行](https://docs.comfy.org/zh/interface/overview)
- [USO 中的组与 Bypass](https://docs.comfy.org/zh/tutorials/flux/flux-1-uso)
- [Qwen-Image-2.1 采样与 LoRA](https://docs.comfy.org/zh/tutorials/image/qwen/qwen-image-2-1)
- [自定义节点问题排查](https://docs.comfy.org/zh/troubleshooting/custom-node-issues)

社区：

- [少数派 · ComfyUI 实战指南](https://sspai.com/post/105918)（Manager、Civitai 工作流）
- [Comflowy 中级 / 高级路径](https://www.comflowy.com/zh-CN/docs)（ControlNet、IPAdapter、视频等延伸）
