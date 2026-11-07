---
title: "ComfyUI 入门：从 WebUI 到节点工作流"
published: 2025-10-29
description: "ComfyUI 是节点式工作流：和 WebUI 差在哪、扩散在干什么，以及本系列怎么读。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 0
---

这篇是「ComfyUI 入门」系列的总览。安装、界面、手搭最小图、官方模板、改模板、能力上限各自成篇；这里只回答三件事：**ComfyUI 是什么、和 WebUI 差在哪、你该按什么顺序学**。

## ComfyUI 是什么

ComfyUI 是一套**基于节点的生成式 AI 引擎**。你在画布上放节点、用线把数据接起来，组成一份工作流（workflow），用来出图、改图，也可以接到视频、音频等流程。

官方把工作流比作食谱：食谱是整张图，每一步指令是一个节点，提示词和模型是食材，跑完得到图或别的输出。你不用写代码，但要把「数据从哪流到哪」看懂。

## 和 WebUI 差在哪

很多人从 Stable Diffusion WebUI（A1111 一类）过来。WebUI 把常用选项收进页面；ComfyUI 把同一步骤拆成节点，连线可见。

对我有用的差别主要是：

- **可复现**：工作流能存成 JSON，也能嵌进生成图的 metadata，拖回画布就能还原。
- **可改**：官方模板不是终点。懂连线之后，可以绕过一组节点、换模型、加 LoRA，而不用从零重搭。
- **成本**：上手比 WebUI 陡一点。所以本系列先认界面，再手搭一条最小文生图，再回到你已经在用的官方模板。

## 扩散在干什么（够用版）

文生图常用的是扩散模型：训练时学会「加噪声」，推理时从噪声一步步**去噪**成图。

你需要记住的只有两层空间：

- **潜空间（Latent）**：模型实际算噪声的地方，省显存、好改。
- **像素空间**：你最终看见的图。VAE 负责在潜空间和像素之间编解码。

提示词不能直接喂给模型，要先经 **CLIP**（或其它文本编码器）变成条件向量，再送给采样器（常见是 KSampler）。

更细的节点拆解见 [手搭最小文生图](/posts/ai/comfyui/ComfyUI-txt2img/)。

## 模板还是自己搭？

结论先写清楚，后面几篇按这个口径写：

- **日常出图、学新模型：先加载，再构建。** 官方模板、Civitai 上别人分享的 JSON、社区教程附带的工作流都可以。少数派《AI 绘画实战指南 Vol.3》也强调：新手误以为必须自己搭满屏连线，其实创作者的首要任务是**使用**现成工作流。
- **从空白画布手搭**：用来学透数据流，方便排错；不是生产默认路径。
- **专业分水岭**：不是「拒绝模板」，而是**读得懂、敢改模板**——换提示与参考图、用 Ctrl+B 绕过可选组、加 LoRA、导出成自己的默认工作流。

你如果已经在用 Qwen / USO / Kontext，说明工具侧入门过了；接下来练的是「红节点、缺模型、效果不对时，能顺着连线查」。

## 本系列怎么读

| 顺序 | 文章 | 用途 |
|------|------|------|
| 1 | [安装 ComfyUI](/posts/ai/comfyui/ComfyUI-install/) | Mac Desktop 详解、Hugging Face 下模型；Windows 短节 |
| 2 | [界面与节点](/posts/ai/comfyui/ComfyUI-ui/) | 侧栏、Run 栏、节点是什么 |
| 3 | [手搭最小文生图](/posts/ai/comfyui/ComfyUI-txt2img/) | Checkpoint → CLIP → KSampler → VAE |
| 4 | [官方模板实战](/posts/ai/comfyui/ComfyUI-templates/) | Qwen-Image-2.1、USO、Kontext |
| 5 | [进阶：改模板](/posts/ai/comfyui/ComfyUI-advanced/) | 绕过组、加 LoRA、收成自己的默认 |
| 6 | [能力上限](/posts/ai/comfyui/ComfyUI-ceiling/) | 专业管线能到哪，你差哪一步 |

建议顺序：1 → 2 → 3，然后直接看 4（对照你正在用的模板），再按需读 5 和 6。

## 参考

官方：

- [ComfyUI 工作流概念](https://docs.comfy.org/zh/basic-concepts/workflow)
- [界面概览](https://docs.comfy.org/zh/interface/overview)
- [文生图教程](https://docs.comfy.org/zh/tutorials/basic/text-to-image)

社区（结构与观念可参考，参数以你本机官方模板为准）：

- [少数派 · AI 绘画实战指南 Vol.3：ComfyUI](https://sspai.com/post/105918)（「先加载，再构建」）
- [少数派 · JimmyWang 推荐的 Comflowy 教程入口](https://sspai.com/post/85770) → [Comflowy 文档](https://www.comflowy.com/zh-CN/docs)
- [少数派 · 深入浅出理解 Stable Diffusion](https://sspai.com/post/85704)
- [提效录 · ComfyUI 完全入门](https://www.tixiaolu.com/posts/comfyui-tutorial/)
