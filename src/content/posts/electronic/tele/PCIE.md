---
title: "PCIE"
published: 2026-04-27
description: ""
image: ""
tags: [通信]
category: 电子
---
[(33 封私信 / 80 条消息) PCIe（一） —— PCIe基础概念与设备树 - 知乎](https://zhuanlan.zhihu.com/p/684900130)

PCIe的全称是Peripheral Component Interconnect Express，是一种用于连接外设的总线。

它于2003年提出来，作为替代PCI和PCI-X的方案，现在已经成了现代CPU和其他几乎所有外设交互的标准或者基石，比如，我们马上能想到的**GPU，网卡，USB控制器，声卡，网卡等等**，这些都是通过PCIe总线进行连接的，然后现在非常常见的基于**m.2接口的SSD，也是使用NVMe协议，通过PCIe总线进行连接的**，除此以外，[Thunderbolt 3](https://zhida.zhihu.com/search?content_id=240330257&content_type=Article&match_order=1&q=Thunderbolt+3&zhida_source=entity) [2]，USB4 [3]，甚至最新的CXL互联协议 [4]，都是基于PCIe的！

## **1. PCIe总体框图**

首先，我们先从PCIe的基本概念开始。PCIe的架构主要由五个部分组成：

- Root Complex，
- PCIe Bus，
- [Endpoint](https://zhida.zhihu.com/search?content_id=240330257&content_type=Article&match_order=1&q=Endpoint&zhida_source=entity)，
- [Port](https://zhida.zhihu.com/search?content_id=240330257&content_type=Article&match_order=1&q=Port&zhida_source=entity) and [Bridge](https://zhida.zhihu.com/search?content_id=240330257&content_type=Article&match_order=1&q=Bridge&zhida_source=entity)，
- Switch。

其整体架构呈现一个树状结构，如下图所示：