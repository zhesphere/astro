---
title: "USB（TYPE-C）转串口（TTL）"
published: 2026-02-03
image: ""
tags: []
category: 电子
description: ""
slug: electronic/project/usbtype-c-zhuan-chuan-kou-ttl
---
# 引言
 USB TYPE-C（简称：TYPE-C）是目前主流的连接端口，而在单片机的开发中，TTL信号更是必不可少的通讯方式，目前市场上也有着不少USB转串口的商品设计，低端的价格相对亲民，而稍微高端的也会价格不菲。
# 方案设计
  USB TYPE-C端口  +  四路串口输出
# USB TYPE-C介绍
## TYPE-C接口定义
 按以下视角引出端子定义
 ![公母头观看视角](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%85%AC%E6%AF%8D%E5%A4%B4%E8%A7%82%E7%9C%8B%E8%A7%86%E8%A7%92.webp)
![USB TYPE-C母口](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20TYPE-C%E6%AF%8D%E5%8F%A3.webp)
![USB TYPE-C母口](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20TYPE-C%E6%AF%8D%E5%8F%A3.webp)
**母头/母座**
![USB TYPE-C公口](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20TYPE-C%E5%85%AC%E5%8F%A3.webp)
![USB TYPE-C公口](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/USB%20TYPE-C%E5%85%AC%E5%8F%A3.webp)
**公头/插头**
从上图的 Type C 公头和母口的引脚排列可以知道 Type C 的引脚功能是**中心对称**的，所以公头无论以什么方向接入母口两者的功能引脚都可以完美对接。
1. 24P全引脚描述

| Pin | 名称     | 功能描述                                 | Pin | 名称     | 功能描述                                 |
| :--: | ---- | ---- | :--: | ---- | ---- |
| A1  | GND    | 地                                    | B12 | GND    | 地                                    |
| A2  | SSTXp1 | SuperSpeed 差分信号 #1 的发送正端             | B11 | SSRXp1 | SuperSpeed 差分信号 #1 的接收正端             |
| A3  | SSTXn1 | SuperSpeed 差分信号 #1 的发送负端             | B10 | SSRXn1 | SuperSpeed 差分信号 #1 的接收负端             |
| A4  | VBUS   | 总线电源                                 | B9  | VBUS   | 总线电源                                 |
| A5  | CC1    | Configuration Channel 1，即 “配置通道 1”   | B8  | SBU2   | Side Band Use 1，即辅助使用2               |
| A6  | Dp1    | Data Positive 1，即 USB 2.0 差分信号 1 的正端 | B7  | Dn1    | Data Negative 1，即 USB 2.0 差分信号 1 的负端 |
| A7  | Dn1    | Data Negative 1，即 USB 2.0 差分信号 1 的负端 | B6  | Dp1    | Data Positive 1，即 USB 2.0 差分信号 1 的正端 |
| A8  | SBU1   | Side Band Use 1，即辅助使用1               | B5  | CC2    | Configuration Channel 2，即 “配置通道 2”   |
| A9  | VBUS   | 总线电源                                     | B4  | VBUS   | 总线电源                                 |
| A10 | SSRXn2 | SuperSpeed 差分信号 #2 的发送正端             | B3  | SSTXn2 | SuperSpeed 差分信号 #2 的接收正端             |
| A11 | SSRXp2 | SuperSpeed 差分信号 #2 的发送负端             | B2  | SSTXp2 | SuperSpeed 差分信号 #2 的接收负端             |
| A12 | GND    | 地                                          | B1  | GND    | 地                                    |
2. Type C 接口 VBUS/GND 作用

| Pin | 名称   | 功能描述 | Pin | 名称   | 功能描述 |
| :--: | ---- | ---- | :--: | ---- | ---- |
| A1  | GND  | 地    | B12 | GND  | 地    |
| A4  | VBUS | 总线电源 | B9  | VBUS | 总线电源 |
| A9  | VBUS | 总线电源 | B4  | VBUS | 总线电源 |
| A12 | GND  | 地    | B1  | GND  | 地    |
GND大家都可以理解，而VBUS大家可能不常见，直接理解为电源VCC即可
3. Type C 接口 D+/D- 作用

| Pin | 名称   | 功能描述 | Pin | 名称   | 功能描述 |
| :--: | ---- | ---- | :--: | ---- | ---- |
| A6 | Dp1 | Data Positive 1,即 USB 2.0 差分信号 1 的正端 | B7 | Dn1 | Data Negative 1,即 USB 2.0 差分信号 1 的负端 |
| A7 | Dn1 | Data Negative 1,即 USB 2.0 差分信号 1 的负端 | B6 | Dp1 | Data Positive 1,即 USB 2.0 差分信号 1 的正端 |
在电子简称中，n是Negative缩写，意为负，p是 Positive的缩写，意为正。
在 Type - C 接口里，D + 和 D - 属于 USB 2.0 的差分数据传输引脚，它们在数据传输和设备识别方面发挥着重要作用。
差分信号传输是 D + 和 D - 的工作基础。指通过两根信号线（即 D + 和 D - ）来传输幅度相同但相位相反的信号。接收端会对这两个信号的差值进行检测，以此来还原原始数据。这种传输方式具备很强的抗干扰能力，能够有效降低外部电磁干扰对信号传输的影响，进而保证数据传输的稳定性和准确性。
**主要功能**
- 数据传输
	D + 和 D - 主要用于 USB 2.0 协议的数据传输，其最高传输速率可达 480Mbps。在设备进行数据交换时，如电脑与 U 盘、手机与电脑之间传输文件，数据就会通过 D + 和 D - 这一对差分线进行传输。
- 设备识别
	在设备连接的初始阶段，主机通过检测 D + 和 D - 上的电平状态来识别设备的类型和模式。例如，在 USB 通信中，当设备插入主机时，主机通过检测 D + 和 D - 引脚的上拉电阻情况来判断设备是高速设备、全速设备还是低速设备。对于全速设备，D + 上有一个 1.5kΩ 的上拉电阻；而对于低速设备，D - 上有一个 1.5kΩ 的上拉电阻。主机根据检测到的上拉电阻位置来确定设备的速度类型，并相应地调整通信参数。
- 充电协议协商
	某些充电协议也会利用 D + 和 D - 进行通信，以协商充电电压和电流。例如，在一些手机充电过程中，充电器和手机会通过 D + 和 D - 交换信息，以确定合适的充电参数，实现快速充电功能。
![典型应用](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%85%B8%E5%9E%8B%E5%BA%94%E7%94%A8.webp)
4. Type C 接口 CC1/CC2 作用

| Pin | 名称  | 功能描述                               | Pin | 名称  | 功能描述                               |
| :-: | --- | ---------------------------------- | :-: | --- | ---------------------------------- |
| A5  | CC1 | Configuration Channel 1，即 “配置通道 1” |     |     |                                    |
|     |     |                                         | B5  | CC2 | Configuration Channel 2，即 “配置通道 2” |
CC1 是 “Configuration Channel 1” 的缩写，即 “配置通道 1”。在 Type - C 接口中，CC1 引脚与 CC2 引脚共同承担着配置通道的功能，用于主从设备区分（确定数据传输方向）、检测设备连接、设备角色识别以及 USB PD 通信等。
 - 主从设备区分
    做主机时，CC1、CC2接上拉电阻VBUS。
    做从机时，CC1、CC2接5.1K电阻接地。
    主设备的 CC 引脚通过上拉电阻 Rp 连接到 VBUS，标识其供电能力。例如，常见的电阻值 56kΩ/22kΩ 可表示不同的电流能力。
    从设备的 CC 引脚则通过下拉电阻 Rd 连接到 GND，标识其受电需求，通常下拉电阻 Rd 为 5.1kΩ。
    需要说明的一点时，并非所有设备主机、从机设备都是固定的，有一种双角色端口，其 CC 引脚能够动态切换上拉电阻 Rp 和下拉电阻 Rd 的状态。在初始连接时，设备会随机确定一个初始角色（主或从），并通过 CC 引脚的电平状态来告知对方。之后，设备之间可以通过 USB PD 协议进行协商，根据实际需求动态切换主从角色。例如，手机在连接充电器时作为 从设备，接收充电，当手机通过 OTG 线连接 U 盘时，手机可通过 CC 引脚切换为 主设备，为 U 盘供电并读取数据。
- 设备连接检测
    以手机及充电器为例：未连接时，充电器的 VBUS 无输出，CC 引脚由于上拉电阻处于高电平。当手机通过 CC 引脚与充电器 连接后，充电器 的 CC 引脚会检测到手机的下拉电阻 Rd，使得 CC 引脚电平被拉低。充电器检测到 CC 引脚电平变化，就知道有设备连接上了，从而打开 Vbus 电源开关，输出电源给手机。
- 正反插确认
     在母口的端子中，可以看到引脚是中心对称的，但是对于TYPE-C的公口来说，却不是完全中心对称，少了B6、B7引脚功能，所以实际来说，TYPE-C的公头正插与反插是有区别的。
    依旧以手机充电为例，当手机处于充电状态扮演从机角色时，若手机内部 CC 引脚下拉导致充电器的 CC1 引脚被拉低，意味着手机的 Type - C 接口是向上插入；反之，若充电器检测到CC2 引脚被拉低，则表明手机的 Type - C 接口是向下插入。这样可以确定接口插入的方向。  
- USB PD 通信
    CC1/CC2 引脚是 USB PD（Power Delivery）协议通信的线路之一，通过该引脚，设备之间可以进行电源相关的信息交互，如协商供电电压、电流等参数，以实现快速充电或其他功率传输功能，实现负载的功能配置。
5. Type C 接口 SBU1/SBU2 作用

| Pin | 名称   | 功能描述                   | Pin | 名称   | 功能描述                   |
| :-: | ---- | ---------------------- | :-: | ---- | ---------------------- |
|     |      |                        | B8  | SBU2 | Side Band Use 1，即辅助使用2 |
| A8  | SBU1 | Side Band Use 1，即辅助使用1 |     |      |                        |
SBU1/SBU2 主要用于支持附加功能。
音频信号传输：在模拟音频耳机附件模式下，SBU1 可作为麦克风信号传输通道，将音频信号从设备传输到外部音频设备。在 DP Alt Mode 模式下进行 DP 信号传输时，SBU 引脚可作为音频传输通道，传输音频信号。
视频信号相关：在 DisplayPort 替代模式中，SBU1 和 SBU2 可用于传输 DisplayPort 协议中的辅助信号，如音频信号、热插拔检测信号等，以实现高清视频输出及相关功能的协同工作。
设备连接与配置：SBU1 和 SBU2 在连接 Type - C 设备时参与建立连接，并在设备之间传输信息。例如，SBU1 可发出电压波形，以确定设备的电源和数据协议，SBU2 则用于接收电源和数据协议的信息，使设备能够进行正确的配置。
6. Type C 接口 SSTX/SSRX 作用

| Pin | 名称   | 功能描述 | Pin | 名称   | 功能描述 |
| :--: | ---- | ---- | :--: | ---- | ---- |
| A2 | SSTXp1 | SuperSpeed 差分信号 #1 的发送正端 | B11 | SSRXp1	SuperSpeed 差分信号 #1 的接收正端 |
| A3 | SSTXn1 | SuperSpeed 差分信号 #1 的发送负端 | B10 | SSRXn1	SuperSpeed 差分信号 #1 的接收负端 |
| A10 | SSRXn2 | SuperSpeed 差分信号 #2 的发送正端 | B3 | SSTXn2	SuperSpeed 差分信号 #2 的接收正端 |
| A11 | SSRXp2 | SuperSpeed 差分信号 #2 的发送负端 | B2 | SSTXp2	SuperSpeed 差分信号 #2 的接收负端 |
SSTXp1 是 “SuperSpeed Transmitter Pair 1, Positive” 的缩写，即 “超高速发送器差分信号对 1，正端”。
在数据传输过程中，SSRXp1 和对应的负信号引脚（如 SSRXn1）共同组成差分信号对，它主要用于高速数据传输，在 USB 3.1 及更高版本的协议中发挥着重要作用，负责将设备内部的高速数据以差分信号的形式发送出去，以实现快速的数据传输，比如在连接外部存储设备、显示器或进行大文件传输时，能确保数据的高效、稳定传输。
## TYPE-C接口特点
 Type C 接口实际上为了适应不同的用途，按功能需求进行划分从而拥有多个版本。
- 24P Type C
![24P](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/24P.webp)
全功能 USB3.0/3.1、USB2.0、音视频传输，上述我们说的引脚定义 指的就是 24P 全功能 Type C。
- 16P/12P Type C
![16P_12P](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/16P_12P.webp)
支持 USB2.0，也能支持 PD 快充、音频设备、HDMI 传输、调试模式等功能，但相比 24P 接口，功能的完整性和性能会受到一定限制。
TYPE - C 的 16P 和 12P 在本质上没有太大区别，通常可认为是同一种接口的不同称呼。
 16P 一般是接口厂家、封装的正式名称。在单排 16P 的 TYPE - C 母座中，头尾开始的 4 引脚 Pin 针分别是两两相连的，从外观上看好像是 12Pin 针，所以日常生活中习惯称呼为 12P。
16P 和 12P 的 TYPE - C 接口都是在 24P 全功能版本的基础上进行了简化。它们移除USB3.0 的 TX1/2、RX1/2 引脚，保留了 SBU1/2、CC1/2、USB2.0 的 D + 和 D - 引脚。这意味着它们支持基本的充电和 USB2.0 数据传输功能，但不支持 USB3.0/3.1 高速数据传输。
- 6P Type C
![6P](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/6P.webp)
仅支持充电。
6P 接口仅保留了 Vbus（电源总线）、GND（接地）、CC1（配置通道 1）、CC2（配置通道 2）引脚，主要支持大电流充电，不具备数据传输功能。
支持 PD 快充协议：CC1 和 CC2 引脚用于 PD 设备识别，承载 USB - PD 的通信，以向供电端请求电源供给，可输出电压可调，最大传输 5A - 20V 共 100W 的功率。借助 USB - PD 协议，用电端能方便地从供电端取电。
## TYPE-C引脚总结
**电源引脚**：VBUS与GND
VBUS：电源总线引脚，共有两对。用于为设备传输电源，能提供不同的电压等级（如 5V、9V、12V、15V、20V 等），具体取决于所支持的 USB Power Delivery（PD）协议。
GND：接地引脚，同样有两对。
**数据传输引脚**：USB 2.0 数据引脚与USB 3.1 数据引脚
**USB 2.0 数据引脚**
D+、D -：这是一对差分信号引脚，用于实现 USB 2.0 协议的数据传输，最高传输速率可达 480Mbps。在一些对数据传输速率要求不高的设备连接中广泛应用，如鼠标、键盘等。
**USB 3.1 数据引脚**
TX1+、TX1 - 、TX2+、TX2 -：分别为两对发送差分信号引脚，用于高速数据的发送。
RX1+、RX1 - 、RX2+、RX2 -：是两对接收差分信号引脚，用于高速数据的接收。这些引脚共同支持 USB 3.1 Gen 2 协议，最高传输速率可达 10Gbps，满足如移动硬盘、高速闪存等设备的高速数据传输需求。
**配置与检测引脚**：CC1、CC2与SBU1、SBU2
CC1、CC2：配置通道引脚，主要用于设备的连接检测、正反插识别、功率传输协商以及 USB PD 协议的通信。例如，当设备连接时，通过检测 CC 引脚的电平状态和电阻值，来确定设备的角色（如主机、从机）、支持的功率等级等信息。
SBU1、SBU2：辅助信号引脚，在不同的应用场景下有不同的功能。可用于支持音频、视频等其他功能。
**在 Type - C 接口中，D + 和 D - 通常与其他引脚协同工作。**
# USB转UART芯片介绍

# 电路板分析
