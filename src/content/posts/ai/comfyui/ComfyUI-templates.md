---
title: "官方模板实战：Qwen、USO 与 Kontext"
published: 2026-11-07
description: "专业出图也从官方模板起步；对照 Qwen-Image-2.1、USO、FLUX.1 Kontext 该下哪些模型、改哪些输入。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 4
---

你如果已经在模板库里点过 **Qwen-Image-2.1**、**USO**，以及口语里常说成「cntext」的 **FLUX.1 Kontext**，这篇就是对着这三条写的：模板怎么开、缺模型怎么办、每条改哪里。

## 先统一口径：专业也用模板（不限于官方）

能直接跑的工作流有三类，都可以当起点：

1. **官方模板库**（本篇重点：Qwen / USO / Kontext）  
2. **社区分享的 JSON**：Civitai、教程仓库、别人导出的图（拖进画布可还原）  
3. **产品 / 课程附带模板**：例如 Comflowy 文档里按章节配的工作流  

少数派写得很直白：正确姿势是「加载」不是一上来就「构建」。专业用法通常是：

1. 打开一条能跑通的图（官方或社区）  
2. 按提示补齐模型 / 缺的自定义节点  
3. 只改提示词、参考图、尺寸等输入  
4. 效果稳定后再导出成「我的默认」，或在上面加 LoRA / 绕过可选组  

从空白画布发明整条 Qwen / USO 图，性价比很低。手搭最小 SD1.5 是为了懂数据流，见 [上一篇](/posts/ai/comfyui/ComfyUI-txt2img/)。

## 怎么打开模板

- 侧栏 **模板**，或菜单 **工作流 → 浏览工作流模板**
- 搜索模板名，点进去加载
- 缺模型时：节点发红 → 看右侧 **错误** → Missing Models → Download / Download all。链接多半指向 **[Hugging Face](https://huggingface.co/)**；下不动就浏览器打开同一链接，或到 HF / [魔搭](https://www.modelscope.cn/) 搜同名 `.safetensors`，放进提示的子目录（详见 [安装篇](/posts/ai/comfyui/ComfyUI-install/)）

模板依赖包会随 ComfyUI 更新。找不到新模板时，先更新 ComfyUI 及其 `comfyui-workflow-templates` 一类依赖（见 [模板文档](https://docs.comfy.org/zh/interface/features/template)）。

## Qwen-Image-2.1

阿里 Qwen 团队的开放权重：同一套权重可做文生图和指令式图像编辑，支持原生约 2K、排版、Alpha 等。模板库搜索 **`Qwen-Image-2.1`** 或 **`Qwen Image 2.1 Turbo`**。

### 你会看到的几种模板

| 用途 | 搜什么 | 注意 |
|------|--------|------|
| 文生图 | Qwen-Image-2.1 | 用分辨率选择器设宽高比和百万像素目标；约 4.0 MP ≈ 2048×2048 方形 |
| 图像编辑 | 同上系列的编辑模板 | `image_1` 是被改的图，其它槽位是参考内容；提示词里用 `<image1>`、`<image2>` 这类索引指图 |
| Turbo | Qwen Image 2.1 Turbo | 蒸馏权重，约 **8 步**；不要照搬基础模板的 25 步习惯乱加步数 |

### 模型大致放哪（以官方文档为准）

```text
ComfyUI/models/
├── text_encoders/     # 如 qwen3vl_8b_int8_convrot.safetensors，以及可选的提示词增强编码器
├── diffusion_models/  # qwen_image_2.1_*.safetensors 或 turbo 版本
└── vae/               # qwen_image_2.1_vae_bf16.safetensors
```

模板默认常加载 int8 等更省内存的文件；bf16 更吃内存。具体文件名以你加载的那张模板里的 Missing Models 列表为准——官方会随版本增补。

### 采样上容易踩的坑

- 官方基础路径常用 **`cfg = 1`、`euler`、`simple`**。`cfg` 为 1 时，ComfyUI **会跳过负向条件**，负向提示词基本不起作用。
- 想让负向生效再考虑提高 `cfg`；官方说明里提到 `cfg` 2 更跟复杂提示，再往上（到 5）质量会明显变差。一次只改一个值，固定种子对比。
- Turbo 模板带固定的 8 步 `ManualSigmas` 调度，不要随便改成「步数越多越好」。
- 编辑时画布尺寸跟 `image_1` 和 `resolution` 有关：超大参考图会极慢；先检查分辨率再怪机器。

更细的提示词增强、KV 缓存、VAE 纹理等，直接看官方长文，本篇不复制参数表：[Qwen-Image-2.1（官方）](https://docs.comfy.org/zh/tutorials/image/qwen/qwen-image-2-1)。

## USO（字节跳动，基于 FLUX.1-dev）

USO（Unified Style-Subject Optimized）把 **主体一致** 和 **风格迁移** 收进同一套参考工作流。模板库搜 **USO** / FLUX USO 相关名称；官方教程页标题是「字节跳动 USO」。

### 三种用法

- 主体驱动：人 / 物放到新场景，尽量保住身份  
- 风格驱动：把参考图的画风套到新内容  
- 组合：主体 + 风格一起用  

同一张官方图里，常用 **`Ctrl + B` 绕过** 某些组来切换变体：只内容参考、只风格参考、两者都要，或当普通文生图用。

### 模型目录（官方示例）

```text
ComfyUI/models/
├── checkpoints/     # flux1-dev-fp8.safetensors
├── loras/           # uso-flux1-dit-lora-v1.safetensors
├── model_patches/   # uso-flux1-projector-v1.safetensors
└── clip_visions/    # sigclip_vision_patch14_384.safetensors
```

跑之前核对：Load Checkpoint、LoraLoaderModelOnly、ModelPatchLoader、Load CLIP Vision 是否都选中上表对应文件（界面显示名可能缩短，以实际文件名为准）。

### 实操要点

1. 给 content / style 的 `Load Image` 上传参考图。  
2. `ImageScaleToMaxDimension`：官方说内容参考缩到 **1024** 往往比 512 构图更自然；512 更抠脸部特征，但容易「脸过大」。  
3. EasyCache 一类加速组会换一点质量；不需要就 `Ctrl + B` 绕过。  
4. 改提示词和尺寸后 Run。

详情与示例输入图：[USO（官方）](https://docs.comfy.org/zh/tutorials/flux/flux-1-uso)。

## FLUX.1 Kontext（你说的 cntext）

模板库请搜 **`FLUX Kontext Dev`**（或 Kontext 相关官方模板）。这是 Black Forest Labs 的图像编辑模型：**看懂图再按英文指令改**，强项是角色一致、局部改、风格参考、多轮迭代。

口语里的「cntext」一般就是这条线；和 USO、Qwen 编辑不是同一个模板。

### 模型目录（Dev 本地版）

```text
ComfyUI/models/
├── diffusion_models/  # flux1-dev-kontext_fp8_scaled.safetensors
├── vae/               # ae.safetensors
└── text_encoders/     # clip_l.safetensors + t5xxl_fp16 或 t5xxl_fp8_e4m3fn_scaled
```

### 怎么跑

1. Load Diffusion Model / DualCLIP / Load VAE 选齐上表文件  
2. 在 Load Image（或 from output）里放入要改的图  
3. **CLIP Text Encode 只写英文指令**（官方明确写了仅支持英文）  
4. Run；多轮编辑时可继续用输出图当下一轮输入  

提示词要写具体：改什么、**保留什么**。官方反例是笼统的 `Transform the person into a Viking`；正例是改服装并写明保留面部特征。完整技巧见：[FLUX.1 Kontext Dev（官方）](https://docs.comfy.org/zh/tutorials/flux/flux-1-kontext-dev)。

Pro / Max 走合作节点（云 API），和本地 Dev 不是同一条安装路径。

## 三条怎么选（实用）

| 你想做的事 | 优先模板 |
|------------|----------|
| 文生图、海报字、透明底、指令改图 | Qwen-Image-2.1 |
| 同一角色换场景 / 换画风 | USO |
| 对已有照片做精确英文指令编辑、多轮精修 | FLUX.1 Kontext Dev |

显存不够时：先用模板默认的 fp8 / int8；仍爆再降分辨率或改云端。

## 下一步

模板能稳定出图之后，不要急着装一堆自定义节点。先练 [改模板](/posts/ai/comfyui/ComfyUI-advanced/)：绕过、加 LoRA、导出自己的默认。

## 参考

官方：

- [工作流模板](https://docs.comfy.org/zh/interface/features/template)
- [Qwen-Image-2.1](https://docs.comfy.org/zh/tutorials/image/qwen/qwen-image-2-1)
- [字节跳动 USO](https://docs.comfy.org/zh/tutorials/flux/flux-1-uso)
- [FLUX.1 Kontext Dev](https://docs.comfy.org/zh/tutorials/flux/flux-1-kontext-dev)

社区：

- [少数派 · ComfyUI 节点式工作流](https://sspai.com/post/105918)（先加载模板 / Civitai JSON）
- [Comflowy 教程](https://www.comflowy.com/zh-CN/docs)（系统入门路径，少数派作者推荐）
- 模型与组织页：[Hugging Face](https://huggingface.co/)、[Comfy-Org](https://huggingface.co/Comfy-Org)
- 工作流素材站：[Civitai](https://civitai.com/)（下载 JSON 前注意作者写的依赖节点与模型）
