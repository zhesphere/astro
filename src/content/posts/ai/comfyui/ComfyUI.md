---
title: ComfyUI
published: 2025-10-29
description: ComfyUI学习
tags: []
category: 人工智能
---
Stable Diffusion
comfy 舒适的；轻松的
WebUI
# AI绘画原理
Diffusion-扩散(增加噪声)-生成(去除噪声)
ControlNet
# ComfyUI安装

# 运用并搭建工作流
工作流(workflow)
add node-loaders-load checkpoint-conditioning-CLIP text encode(Prompt)
CLIP(对比性语言-图像预训练)
sampling-KSampler(K采样器)
:::
control_after_generate-randomize(随机新种子)/fixed(固定种子不变)/increment(生成后种子+1)/decrement(生成后种子-1)
sampler_name-dpmpp_2m
scheduler(调度器)-karras
:::
Latent(潜空间)-Empty Latent Image(空白潜空间图像)
;;;Latent
图像的编解码(VAE)
尺寸定义及缩放
;;;

