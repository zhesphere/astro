---
title: "AT命令集"
published: 2026-07-15
image: ""
tags: [通信]
category: 电子
description: ""
slug: electronic/tele/at-ming-ling-ji
---
[AT 指令详解----彻底讲明白_at指令-CSDN博客](https://blog.csdn.net/sweetfather/article/details/148191357)
[(33 封私信 / 80 条消息) 看这篇，快速入门AT指令集 - 知乎](https://zhuanlan.zhihu.com/p/99336472)

在 MCU（单片机 ）项目中，我们经常需要与各种通信模组（GSM、Wi-Fi、蓝牙等）交互。而这类模组通常都通过串口（UART）与 MCU 通信，控制它们的“语言”就是——AT 指令。
# 什么是 AT 指令？
AT 指令，全称 Attention Command，是一种标准的控制通信模组的命令集。
是用来控制TE(Terminal Equipment)和MT(Mobile Terminal)之间交互的规则，如下图所示。在GSM网络中，用户可以通过AT命令进行呼叫、短信、电话本、数据业务、传真等方面的控制。
![AT Commands.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/AT%20Commands.webp)
在 MCU 场景中，常见支持 AT 指令的模组有：
- GSM 模组：如 SIM800、SIM7600，用于打电话、发短信、联网。
- Wi-Fi 模组：如 ESP8266、ESP32，用于连接 Wi-Fi、HTTP/MQTT 通信。
- 蓝牙模组：如 HC-05、JDY 系列。
- GPS 模组：如 NEO-6M，用于定位。
# AT 指令格式与分类
AT 指令通过串口发送，格式统一，通常以 `AT` 开头，后跟操作内容，结尾必须加回车换行（`\r\n`）
常见分类如下：

| 类型       | 示例                | 含义               |
| -------- | ----------------- | ---------------- |
| 测试模组是否在线 | `AT\r\n`          | 正常返回 OK 表示模块响应正常 |
| 执行命令     | `AT+RST\r\n`      | 复位模组             |
| 查询命令     | `AT+CSQ?\r\n`     | 查询信号强度等状态        |
| 设置命令     | `AT+CWMODE=1\r\n` | 设置 Wi-Fi 工作模式    |
| 测试支持参数   | `AT+CWMODE=?\r\n` | 返回模组支持哪些模式       |

AT命令是以AT作首，字符结束的字符串，AT命令的响应数据包在中。每个命令执行成功与否都有相应的返回。AT指令集可分为三个类型：
![AT指令集.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/AT%E6%8C%87%E4%BB%A4%E9%9B%86.webp)
大部分模组支持3GPP TS27.007AT命令集，并在此基础上扩展出自定义指令集。以Ｃ开头的命令如AT+CFUN是是通用的命令，以N开头的命令是模组厂商自定义的命令，不同的模组厂商可能使用不同的命令实现相同的功能。
在物联网中，AT指令集可用于通信模块调测、控制&调测设备等。本节将以移远通信的BC35-G模组为例，为大家剖析常用的NB-IoT 3GPP相关命令及其常见用法，完整的文档可找模组厂家获取。

# 重要术语
TE (Terminal Equipment)
终端设备，比如一台计算机，一部手机，与DTE等价.它是和信息网络的一端相接的可提供必要功能的设备，这些功能使得用户可以通过接入协议接入网络。发送信息，接收信息。

TA(Terminal Adapter)
终端适配器，提供终端适配功能的物理实体，是一种接口设备，与DCE等价。比如SIM300模块

DCE(Data Communications Equipment)
数据通信设备,它在DTE和传输线路之间提供信号变换和编码功能，并负责建立、保持和释放链路的连接，如Modem。DCE设备通常是与DTE对接，因此针脚的分配相反。其实对于标准的串行端口，通常从外观就能判断是DTE还是DCE，DTE是针头（俗称公头），DCE是孔头（俗称母头），这样两种接口才能接在一起。

DTE(Data Terminal Equipment)
数据终端设备，具有一定的数据处理能力和数据收发能力的设备。DTE提供或接收数据，例连接到调制解调器上的计算机就是一种DTE。DTE提供或接收数据，连接到网络中的用户端机器，主要是计算机和终端设备。与此相对的，在网络端的连接设备称为 DCE ( Date Circuit - terminating Equipment ）。DTE与进行信令处理的DCE相连。 它是用户—网络接口的用户端设备，可作为数据源、目的地或两者兼而有之。 DTE通过DCE设备(例如，调制解调器)连接到数据网络，且一般使用DCE产生的时钟信号。DTE包括像计算机、协议转换器和多路复用器这样的设备。

ME(Mobile Equipment): 移动设备，比如手机，就属于ME

MS(Mobile Station): 移动台，在移动中使用的通信站或者手持台。


# 常用AT命令
**AT+CGSN（查询模块序列号）**

AT+CGSN=<snt>，如果没有写入<snt>，则只返回"OK”。

- <snt>=0，返回<sn>。
- <snt>=1，返回[IMEI](https://zhida.zhihu.com/search?content_id=110205692&content_type=Article&match_order=1&q=IMEI&zhida_source=entity)（国际移动设备识别码），这个序列号每个模块都是唯一的。物联网平台基本都是以IMEI号或者Mac地址来区分不同的设备，包括华为OceanConnect物联网平台。
- <snt>=2，返回[IMEISV](https://zhida.zhihu.com/search?content_id=110205692&content_type=Article&match_order=1&q=IMEISV&zhida_source=entity)（国际移动电台设备身份和软件版本）。
- <snt>=3，返回软件版本号SVN。

例：查询IMEI发送命令：

AT+CGSN=1

模块返回：

+CGSN:868744036640526

OK

  

**AT+CGMR（查询[固件版本](https://zhida.zhihu.com/search?content_id=110205692&content_type=Article&match_order=1&q=%E5%9B%BA%E4%BB%B6%E7%89%88%E6%9C%AC&zhida_source=entity)）**

执行该命令返回固件版本 。例：发送命令：

AT+CGMM

模块返回：

<Revision>

OK

  

**AT+CMEE（查询终端报错）**

用于设置终端错误报告，使能后当发送AT执行错误时终端会返回错误编码，这样便于定位问题。例：开启错误码上报

发送命令：AT+CMEE=1

模块返回：

OK

  

**AT+NRB（重启模块）**

例：

发送命令

AT+NRB

模块返回：REBOOTING

****

Boot: Unsigned

Security B.. Verified

Protocol A.. Verified

Apps A...... Verified

REBOOT_CAUSE_APPLICATION_AT

Neul

OK

  

**AT+CSQ（查询[信号强度](https://zhida.zhihu.com/search?content_id=110205692&content_type=Article&match_order=1&q=%E4%BF%A1%E5%8F%B7%E5%BC%BA%E5%BA%A6&zhida_source=entity)）**

返回值为+CSQ：<rssi>,<ber>。rssi越大，表示信号越强。信号强度和rssi换算公式为：信号强度=113dBm+(rssi*2)。

没有信号或信号强度过低，需要联系运营商处理。例：

发送命令：

AT+CSQ

模块返回

+CSQ:31,99

OK

- rssi=0，表示信号非常差。
- rssi=31，表示信号质量非常强。
- rssi=99，表示没有信号。
- ber字段未使用，恒等于99。

  

**AT+CGATT（查询网络是否激活）**

返回：+CGATT:1，表示网络已激活；若返回：+CGATT:0，则表示网络未激活，请尝试重启模组激活网络。

例：

发送命令：

AT+CGATT?

模块返回：

+CGATT:1

OK

  

**AT+CEREG（查询[网络注册状态](https://zhida.zhihu.com/search?content_id=110205692&content_type=Article&match_order=1&q=%E7%BD%91%E7%BB%9C%E6%B3%A8%E5%86%8C%E7%8A%B6%E6%80%81&zhida_source=entity)）**

该命令用于查询终端EPS网络注册状态。

当使能提示时，终端的网络注册状态信息有变化，会主动上报给用户终端。通过不同的设置可以上报EPS注册状态、位置区码、小区ID、服务小区的接入技术等信息，通常情况下只需要设置为自动上报EPS注册状态。

例：设置网络注册状态上报信息

发送命令：

AT+CEREG=1

模块返回：

OK

设置成功后，当网络注册状态信息有变化，会主动上报给用户终端，如：

+CEREG:1,1

OK

  

**AT+CSCON（查询网络当前连接状态）**

返回格式为：+CSCON:<n>,<mode>?<n>是通知设置。

取值和说明：0为取消异步通知，当网络连接后，串口不会主动上报+CSCON命令；1为使能异步通知，串口主动上报+CSCON。<mode>是当前模块连接状态，取值和说明：0处于IDLE状态，1处于已连接状态。当处于IDLE状态时，只要发送数据或者重启设备，就会变成已连接状态。例：

发送命令：

AT+CSCON?

模块返回：

+CSCON:0,1

OK

  

**AT+CFUN（设置模块射频功能）**

该命令用于设置和查询模块的射频功能是否开启。例：

AT+CFUN=0 //关闭射频功能

OK

AT+CFUN=1 //开启模块射频功能

OK

AT+CFUN? //查询模块的射频开启状态

+CFUN:1 //射频功能已打开成功，若回复0通常是因为SIM卡的电路与模块没有连接成功
