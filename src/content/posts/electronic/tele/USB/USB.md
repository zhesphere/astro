---
title: "USB"
published: 2026-03-23
image: ""
tags: [通信]
category: 电子
description: ""
---
[10 USB Pinout Explained- USB A, B, C(Male and Female)](https://www.etechnophiles.com/usb-pinout-ports-connectors/)

![各种数据线.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%90%84%E7%A7%8D%E6%95%B0%E6%8D%AE%E7%BA%BF.webp)

# USB传输标准
自1996年USB-IF（USB Implementers Forum）组织发布USB 1.0标准以来，USB标准经历了**USB 1.1、USB 2.0、USB 3.0、USB 3.1、USB 3.2**多个版本的发展。2019年，USB-IF组织发布了最新的USB4标准，为USB接口带来了全新的标准规范。
![USB标准版本.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%E6%A0%87%E5%87%86%E7%89%88%E6%9C%AC.webp)
**第一次改名：2003年**
USB-IF组织对USB的规格和标准进行了重命名，将USB 1.0改名为USB 2.0低速（Low-Speed）版，USB 1.1改名为USB 2.0全速（Full-Speed）版，USB 2.0改名为USB 2.0高速（High-Speed）版。
**第二次改名：2013年**
在USB 3.1发布后不久，USB-IF组织将USB 3.0改名为USB 3.1 Gen1，USB 3.1改名为USB 3.1 Gen2。但是这次改名却给消费者带来了麻烦，很多奸商在产品包装上只标注了产品支持USB 3.1，但是没有标注是Gen1还是Gen2，两者传输性能差别巨大，导致消费者一不小心就会入坑。
**第三次改名：2019年**
USB-IF组织将USB 3.1 Gen 1（即原来的USB3.0）改名为USB 3.2 Gen1，USB 3.1 Gen2（即原来的USB 3.1）改名为USB 3.2 Gen2 x1，USB 3.2则被改名为USB 3.2 Gen2 x2。（为方便叙述，后续我们统一称为支持USB 3.0标准）
![USB标准名称变更.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%E6%A0%87%E5%87%86%E5%90%8D%E7%A7%B0%E5%8F%98%E6%9B%B4.webp)
“USB4”的标准写法中，“USB”与“4”之间没有空格！等新产品上市时要注意甄别~
# USB 接口类型
USB接口分为标准USB接口、Mini USB接口和Micro USB接口三种类型。
## 标准USB接口
又分为Type-A和Type-B两种
![标准USB接口.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E6%A0%87%E5%87%86USB%E6%8E%A5%E5%8F%A3.webp)
其中Type-A和Type-B根据支持的USB标准不同，又可以分为USB 2.0和USB 3.0标准USB接口。根据接口的颜色，我们很容易区分该接口是支持USB 2.0还是支持USB 3.0的。Type-A型接口也是我们日常生活中最常见的USB接口，广泛应用于鼠标、键盘、U盘等设备上，Type-B型则常用于打印机、特殊显示器等设备上。
**pin脚定义**：
	![USB Type A and B.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20Type%20A%20and%20B.webp)
## Mini USB接口
Mini USB接口，是一种小型的USB接口，其指标与标准USB相同，但是加入了ID针脚（用于区分设备是主机还是外设），以支持OTG（On The Go，该功能允许在没有主机的情况下，实现设备间的数据传送）功能。Mini USB接口主要分为Mini-A和Mini-B两种，样貌如下：
![Mini USB接口.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Mini%20USB%E6%8E%A5%E5%8F%A3.webp)
Mini USB接口由于相对较小的体型，常见于一些小型设备上，比如MP3、MP4、收音机等，某些型号的手机也采用了该接口。
**pin脚定义**：
	![USB Mini B.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20Mini%20B.webp)
## Micro USB接口
Micro USB接口，属于Mini USB的下一代规格接口，Micro USB接口的插头采用了不锈钢材料，插拔寿命提高为10000次，相比Mini USB接口，在宽度几乎不变的情况下，高度减半，更为小巧。Micro USB接口也可分为Micro-A和Micro-B两种，样貌如下：
![Micro USB接口.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Micro%20USB%E6%8E%A5%E5%8F%A3.webp)
Micro-B类型的USB接口，相信大家都认识，只是不知道它的专业名称，在智能手机发展的前期，绝大多数的智能手机（苹果手机除外）都采用了Micro-B型接口作为充电和数据接口。**在USB 3.0标准发布后，Micro-B接口也有了新的造型**，相信大家也不陌生，我们购买的支持USB 3.0的移动硬盘盒大部分就采用了该接口。
**pin脚定义**：
	![USB Micro A and B.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20Micro%20A%20and%20B.webp)
	![USB Micro B superspeed pin diagram.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20Micro%20B%20superspeed%20pin%20diagram.webp)
## Type-C接口
Type-C接口，是近几年出现的新型USB接口，该接口对于使用者来说，相信最大的好处就是可以正反插拔了吧。
据统计，平均每人每年在插USB上浪费的时间是30分钟！第一次插总是插不进去的，多次插拔到怀疑人生时，最后发现还是第一次的才是对的，后面的N次尝试不过是人生中的小小曲折，有了type-C接口后终于可以一次搞定了。Type-C接口的样貌如下：
![Type-C接口.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Type-C%E6%8E%A5%E5%8F%A3.webp)
最新的USB4标准目前仅支持Type-C接口，同时USB4采用了Thunderbolt协议（俗称雷电接口协议，是由Intel主导开发的接口协议，具有速度快，供电强，可同时兼容雷电、USB、Display Port、PCIe等多种接口/协议的特点），因此，支持USB4标准的Type-C接口也是可以兼容雷电接口的。如此看来，Type-C接口已是大势所趋了。
**pin脚定义**：
	[(32 封私信 / 80 条消息) USB连接器Pin脚全解析：硬件设计者的终极指南 - 知乎](https://zhuanlan.zhihu.com/p/737648248)
	![USB superspeed type A and B pinout.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20superspeed%20type%20A%20and%20B%20pinout.webp)
# USB 传输标准与接口
![USB传输标准与接口.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%E4%BC%A0%E8%BE%93%E6%A0%87%E5%87%86%E4%B8%8E%E6%8E%A5%E5%8F%A3.webp)

# USB 电池充电规范(Battery Charging Specification)
## USB Battery Charging (BC) 1.2
[(33 封私信 / 80 条消息) USB BC1.2 协议详细解读及应用指南 - 知乎](https://zhuanlan.zhihu.com/p/1948011475676402365)
[USB电池充电技术BC1.2 - USB中文网](https://www.usbzh.com/article/detail-863.html)
[PD Typec 学习之旅（二）认识BC1.2快充协议一、BC1.2快充协议的由来 BC1.2（Battery Char - 掘金](https://juejin.cn/post/7544287909474828307)
### 什么是 USB BC1.2 ？
USB Battery Charging (BC) 1.2 是由 USB 实施者论坛 (USB-IF) 发布的一项技术规范，旨在为通过 USB 接口为设备充电建立一套标准化的机制。在 BC1.2 出现之前，USB 充电充满了混乱：标准的 USB 2.0 端口只能提供 500mA 的电流，充电速度非常慢，而且市面上涌现出大量非标准的充电器和充电线，兼容性很差。
BC1.2 的核心目标是解决以下问题：
- 提升充电电流：允许设备在安全识别充电端口类型后，获取远超标准 500mA (USB 2.0) 或 900mA (USB 3.0) 的电流，最高可达 1.5A（甚至更高）。
- 规范端口类型：定义了不同类型的 USB 充电端口，并提供了一套标准的检测机制，让便携设备（Portable Device, PD），如手机、平板等，能够识别自己连接的是哪种端口。
- 保持向后兼容：确保遵循 BC1.2 规范的设备和充电器能够与传统的 USB 端口兼容。
### BC1.2 的核心：三大端口类型
BC1.2 规范定义了三种主要的下行端口（面向设备的接口），它们在供电能力和数据传输能力上有所不同。

###  标准下行端口 (Standard Downstream Port - SDP)
这是最常见的标准 USB 端口，通常位于台式机、笔记本电脑或旧款集线器上。
特点：
- 数据传输：支持全功能的数据传输 (USB 2.0 or 3.0)。
- 供电能力：非常有限。
- 当设备未连接（Unconfigured）时，最大电流 100mA。
- 当设备成功枚举（Configured/Enumerated）后，最大电流 500mA (USB 2.0) 或 900mA (USB 3.0)。
- 设备可以处于挂起 (Suspend) 状态，此时电流仅为 2.5mA。
- 识别方式：D+ 和 D- 数据线上各自有 15kΩ 的下拉电阻接地。

- 标准下行端口 (Standard Downstream Port，SDP)：标准数据端口。以实施的 USB 规范的电压和电流电平提供 VBUS。设备在初始连接时最大消耗 100 mA，并且如果主机认为系统电源可用且主机认为 USB2.0 和 USB3.x 分别只能消耗标准的 500 mA 或 900 mA允许它。例如，如果 PD 插入一个中间 USB [集线器](https://www.usbzh.com/article/detail-25.html)，该[集线器](https://www.usbzh.com/article/detail-25.html)仅由其上游端口的 VBUS 连接供电（在 USB 术语中，“总线供电”），USB 主机将能够检测到这一点，并将 PD 限制在初始 100 mA 限制。

# USB HOST/DEVICE/OTG概念
[USB HOST与 USB OTG的区别及工作原理-CSDN博客](https://blog.csdn.net/cui130/article/details/81329634)


![USB HOST.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20HOST.webp)
OTG控制器可以做host，也能做device，控制器的角色一般由USB ID电平来决定。完整的USB2.0 OTG 控制器硬件信号如下：
![OTG 控制器硬件信号.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/OTG%20%E6%8E%A7%E5%88%B6%E5%99%A8%E7%A1%AC%E4%BB%B6%E4%BF%A1%E5%8F%B7.webp)
**USB_ID**:输入信号,由 USB OTG 协议定义,用于识别 USB 口所接设备的默认角色(host or device)。USB_ID 默认上拉,处于 device 状况,如果要控制器进入 host 状态,需外接 mini-A 口或 micro-A 口将 USB_ID 短接到地。