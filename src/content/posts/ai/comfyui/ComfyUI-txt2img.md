---
title: "手搭最小文生图：Checkpoint 到 Save Image"
published: 2026-11-07
description: "用 SD1.5 走通 Load Checkpoint、CLIP、Empty Latent、KSampler、VAE Decode；并记下 seed、sampler、scheduler 这些参数。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 3
---

这篇用手搭一条最小文生图，把数据流走通。日常出图你可以继续用官方模板；这里是为了以后改模板、排红节点时心里有图。

## 开始前

1. ComfyUI 已能打开（见 [安装](/posts/ai/comfyui/ComfyUI-install/)）。
2. `ComfyUI/models/checkpoints/` 里至少有一个 SD1.5 检查点。官方入门常用：`v1-5-pruned-emaonly-fp16.safetensors`。没有就按缺模型提示下载，或手动放进该目录后按 `R` 刷新。
3. 可选对照：菜单 **工作流 → 浏览工作流模板**，打开 **Text to Image**，和下面手搭的结构对照着看。

## 最小链路长什么样

```text
Load Checkpoint
  ├─ MODEL ──────────────► KSampler
  ├─ CLIP ──► CLIP Text Encode (正) ──► KSampler (positive)
  │      └──► CLIP Text Encode (负) ──► KSampler (negative)
  └─ VAE ───────────────► VAE Decode
Empty Latent Image ─────► KSampler (latent_image)
KSampler (LATENT) ──────► VAE Decode ──► Save Image
```

口诀：模型负责画，CLIP 负责听人话，Latent 是画布，KSampler 去噪，VAE 把潜空间变成能看见的图。

## 按节点搭一遍

在空白画布双击搜索添加（名称以你界面语言为准，英文名更稳）：

1. **Load Checkpoint**  
   选中 `v1-5-pruned-emaonly-fp16.safetensors`（或你放好的其它 SD1.5）。左右切换不要停在 `null`。

2. **CLIP Text Encode** × 2  
   - 接到 KSampler 的 **positive**：写你想要的（正向提示词）  
   - 接到 **negative**：写不想要的（负向提示词）  
   两个节点的 CLIP 输入都来自 Load Checkpoint 的 CLIP 输出。

3. **Empty Latent Image**  
   设宽高。SD1.5 对 **512×512** 最友好；硬拉到 1024 容易糊或畸变。

4. **KSampler**  
   接上 MODEL、positive、negative、latent_image。

5. **VAE Decode**  
   接 KSampler 的 LATENT，以及 Checkpoint 的 VAE。

6. **Save Image**  
   接 VAE Decode 的 IMAGE。结果默认进 `ComfyUI/output`。

点 **Run**，或 `Ctrl + Enter` / `Cmd + Enter`。跑完在 Save Image 上应能看到图；可右键另存。

## KSampler 参数备忘

以官方文生图教程的说明为准，常用项：

| 参数 | 含义 |
|------|------|
| seed | 随机种子；相同种子 + 相同其它条件，结果可复现 |
| control_after_generate | 跑完后种子怎么变：`randomize` 随机 / `fixed` 固定 / `increment` +1 / `decrement` -1 |
| steps | 去噪步数；越多越细，也越慢 |
| cfg | 提示词约束强度；过高容易过拟合、发硬 |
| sampler_name | 采样算法。入门常试 `euler`、`dpmpp_2m` 等 |
| scheduler | 噪声步长怎么排。常与 sampler 搭配，例如 `karras`、`simple` |
| denoise | 对输入 latent 加多少噪声。纯文生图一般用 `1.0`；图生图会小于 1 |

我笔记里常用的一组起步：`sampler_name = dpmpp_2m`，`scheduler = karras`。这不是唯一正确答案；换模型后以该模型官方模板的默认为准（例如 Qwen-Image-2.1 基础模板常用 `euler` + `simple`，且 `cfg` 常为 1）。

## 提示词怎么写（SD1.5）

官方建议对 SD1.5：尽量英文、逗号分隔短语、具体一点；可用 `(keyword:1.2)` 加重。正向接 Positive，负向接 Negative。不满意就多跑几次——`control_after_generate` 为 randomize 时，每次种子不同，画面会变。

## 保存这条工作流

- **工作流 → 导出**：得到 JSON，下次打开或发给别人。
- 生成图拖回画布：若图里嵌了 workflow metadata，可直接还原节点图。

## 和官方模板的关系

手搭是「读懂地图」。真正出片时，优先打开模板库里对应模型的官方图（Qwen、USO、Kontext…），再按 [模板实战](/posts/ai/comfyui/ComfyUI-templates/) 改输入。只有当你要改结构、排错时，才需要回到这条最小链路的思路。

## 参考

官方：

- [第一次生成](https://docs.comfy.org/zh/get_started/first_generation)
- [文生图工作流与节点讲解](https://docs.comfy.org/zh/tutorials/basic/text-to-image)
- [工作流概念](https://docs.comfy.org/zh/basic-concepts/workflow)

社区：

- [UIED · 从零开始构建首个工作流](https://www.uied.cn/posts/58888)（逐步右键添加节点，和本篇对照着练）
- [腾讯云 · 徒手搭建文生图](https://cloud.tencent.com.cn/developer/news/2008302)
- [提效录 · ComfyUI 完全入门](https://www.tixiaolu.com/posts/comfyui-tutorial/)
- [少数派 · Stable Diffusion 原理向](https://sspai.com/post/85704)
