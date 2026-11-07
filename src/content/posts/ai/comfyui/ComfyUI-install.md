---
title: "安装 ComfyUI：Mac 详细步骤与模型下载"
published: 2026-11-07
description: "Apple Silicon Mac 用 Comfy Desktop 逐步安装；模型多从 Hugging Face 下到 models 目录。Windows 便携版另作短节。"
image: ""
tags: [ComfyUI]
category: "人工智能"
series: "ComfyUI 入门"
seriesOrder: 1
---

这篇按 **Mac（Apple Silicon）** 写细，因为我自己也是这边为主。Windows 只在文末单独短写。装完以后，**模型从哪下、放到哪**是全平台共通的，单独成节。

界面和第一次出图见同系列后面几篇。

## 我选哪条路

| 路径 | 适合谁 |
|------|--------|
| **Comfy Desktop（推荐 Mac）** | 不想自己配 Python；官方代管依赖与多实例 |
| Windows 便携版 | 只要 Windows、想解压即用（见文末短节） |
| 手动 git | 要深度定制；本篇不展开，文末给官方链接 |

Mac 要求（官方 Desktop 文档）：

- **macOS 13（Ventura）或更新**
- **Apple Silicon（M1 及更新）**——Intel Mac 不在这条 Desktop 安装说明里
- 每个安装建议至少约 **4.85 GB** 磁盘；跑大模型还要再留模型体积（动辄数 GB～十几 GB 一个文件）
- 内存：Desktop 总览写的是 **8 GB** 起、**16 GB** 更合适；统一内存还要扛模型和系统，Qwen / FLUX 一类会再吃紧

本机偏慢或显存（统一内存）吃紧时，首次启动可以选 **Comfy Cloud**，算力在云端。

## Mac：安装 Comfy Desktop

官方步骤页：[适用于 macOS 的 Comfy Desktop](https://docs.comfy.org/zh/installation/desktop/macos)。

### 1. 下载与装进「应用程序」

1. 打开上述页面，下载 macOS 安装包（`.dmg`；页面一般会按平台推荐）。
2. 打开 `.dmg`，把 **Comfy Desktop** 拖进 **应用程序（Applications）**。
3. 用 Launchpad 或 Spotlight（`Command + 空格`）打开。

若 macOS 弹出安全提示：到 **系统设置 → 隐私与安全性**，点 **仍要打开**。

以前装过旧版 Legacy Desktop 的，新版可能提示迁移：自定义节点、工作流、模型与设置可一并迁入；需要完整副本时，迁之前自己先备份。

### 2. 首次引导：云端还是本地

第一次打开是全屏引导（中途关掉，下次还会回来）：

1. **云端**：Comfy Cloud 的 GPU，本机几乎不装权重。  
2. **本地**：装到这台 Mac，可离线、可管版本和自定义节点。  

本机能力偏弱时，界面可能给云端标「推荐」；两张卡都不会默认选中，你要自己点一张，**继续** 才会亮。

然后：

- 勾选必选的 EULA / 服务条款  
- 匿名使用数据、Beta：可选  
- 选 **本地** 时，「使用推荐设置快速安装」默认未勾；勾上就少一步确认，否则会让你选版本、安装位置等  
- 界面是中文时，可能再问是否 **启用中国镜像**（Git / PyPI 走国内源）。大陆网络不稳就启用，之后可在 Desktop 设置里改  

装完后实例出现在 **Dashboard**，从这里启动 ComfyUI。Desktop 默认跟 **稳定版**；要追最新提交，可在实例更新通道里改，或改走手动安装（见官方说明）。

### 3. 更新与常用目录（Mac）

- 有更新时窗口上方可能出现 **Desktop Update Ready**，点它重启安装；也可在汉堡菜单 → **Desktop Settings → Updates** 里检查。  
- 默认相关目录（以官方文档为准，勿随便删）：

| 内容 | 常见位置 |
|------|----------|
| 各 ComfyUI 安装实例 | `~/ComfyUI-Installs` |
| 共享模型 / 输入输出 | `~/ComfyUI-Shared` |
| Desktop 设置与记录 | `~/Library/Application Support/Comfy Desktop` |
| 日志 | `~/Library/Logs/Comfy Desktop`（反馈问题时看 `app.log`） |

只把 App 丢进废纸篓，**不会**自动清掉模型和实例。界面异常时可先退出，再按官方说明跑重置脚本（会清缓存与设置，但一般不动 `ComfyUI-Installs` / `ComfyUI-Shared` 里的模型）。

### 4. 在 Mac 上找到模型文件夹

1. 打开 Desktop，点顶部 **胶囊菜单** → **存储（Storage）**  
2. 查看模型目录，点文件夹图标用**访达**打开  

浏览器里打开的 Web 界面没有这个胶囊菜单。也可以在访达里进 `~/ComfyUI-Shared` 或当前实例下的 `ComfyUI/models/`（以 Storage 显示的真实路径为准）。

## 共通：模型放哪、怎么下

这一节 Mac / Windows 都一样。ComfyUI **初始通常不带**绘图权重，要自己下。

### 目录结构

默认在：

```text
<你的安装位置>/ComfyUI/models/
```

常见子目录：

| 目录 | 常见内容 |
|------|----------|
| `checkpoints/` | 一体式检查点（如 SD1.5） |
| `diffusion_models/` | 拆开的 UNet / diffusion 权重（Qwen、部分 FLUX） |
| `text_encoders/` | CLIP / T5 / Qwen 文本编码器等 |
| `vae/` | VAE |
| `loras/` | LoRA |
| `clip_visions/` | 视觉编码器（如 USO） |
| `model_patches/` | 模型补丁（如 USO projector） |

启动时会扫这些目录，以及 `extra_model_paths.yaml` 里配置的额外路径。放好新文件后按 **`R`** 刷新，或重启 ComfyUI。

官方模板的缺模型检测，一般只认**对应一级目录下的同名文件**（例如直接放在 `models/diffusion_models/`）。若你塞进了更深层子文件夹，提示可能还在，但可在加载节点里手动选中该文件。

### Hugging Face：我最常用的下载源

很多官方模板里的「Download」链接，落点就是 **[Hugging Face](https://huggingface.co/)**（`huggingface.co`）。Comfy 相关权重也常在 [Comfy-Org](https://huggingface.co/Comfy-Org) 等组织仓库里。

典型用法：

1. 打开模型页（模板 Missing Models 里的链接，或自己搜模型名）  
2. 在 **Files** 里找到 `.safetensors`（优先安全格式；按官方模板写的文件名下，不要下错成别的精度除非你知道差别）  
3. 点下载，保存到上表对应子目录——**文件名保持与模板一致**，下拉框才选得中  
4. 大文件可配 HF 命令行 / 浏览器下载工具；中断后续传即可  

缺模型时 Comfy 里也会：节点发红 → 右侧 **错误** → Missing Models → **Download**。自动下载同样多走 Hugging Face；一直转圈就复制链接，改用浏览器或 HF 手动下。

入门练手常用：`v1-5-pruned-emaonly-fp16.safetensors` → `models/checkpoints/`。Qwen / USO / Kontext 各目录见 [官方模板实战](/posts/ai/comfyui/ComfyUI-templates/)。

### 国内备用：魔搭等

Hugging Face 慢或超时：

- 在 [ModelScope 魔搭](https://www.modelscope.cn/) 搜**同名**文件  
- 或按镜像站说明，把链接里的 `huggingface.co` 换成可用镜像（以镜像站当前文档为准）  
- 少数派实战指南里也提过类似替换思路  

下完仍放进同一套 `models/...` 子目录，逻辑不变。

## Windows（短节）

只要 Windows 时：可用 [Comfy Desktop（Windows）](https://docs.comfy.org/zh/installation/desktop/overview)，或 [便携版](https://docs.comfy.org/zh/installation/comfyui_portable_windows)。

便携版：按显卡下包 → 7-Zip 解压 → NVIDIA 双击 `run_nvidia_gpu.bat`（CPU 则 `run_cpu.bat`）。看到 `http://127.0.0.1:8188` 即启动成功，**别关命令行窗口**。模型目录一般在：

```text
ComfyUI_windows_portable/ComfyUI/models/
```

模型仍按上一节从 Hugging Face 下载。若以前装过 WebUI，可用 `extra_model_paths.yaml` 共用模型盘，避免拷两份（腾讯云「起步」文有举例）。

## 装完下一步

1. 设置 → `Comfy` → `Locale` → 中文  
2. [界面与节点](/posts/ai/comfyui/ComfyUI-ui/)  
3. [手搭最小文生图](/posts/ai/comfyui/ComfyUI-txt2img/) 或模板库 Text to Image  

## 参考

官方：

- [macOS Comfy Desktop](https://docs.comfy.org/zh/installation/desktop/macos)
- [Comfy Desktop 概览](https://docs.comfy.org/zh/installation/desktop/overview)
- [第一次生成（含模型安装）](https://docs.comfy.org/zh/get_started/first_generation)
- [Windows 便携版](https://docs.comfy.org/zh/installation/comfyui_portable_windows)
- [手动安装](https://docs.comfy.org/zh/installation/manual_install)

模型站：

- [Hugging Face](https://huggingface.co/)
- [Hugging Face · Comfy-Org](https://huggingface.co/Comfy-Org)
- [ModelScope 魔搭](https://www.modelscope.cn/)

社区：

- [少数派 · ComfyUI 实战指南](https://sspai.com/post/105918)
- [Comflowy · 下载与安装](https://www.comflowy.com/zh-CN/docs)
