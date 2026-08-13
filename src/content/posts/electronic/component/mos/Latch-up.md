---
title: "Latch-up"
published: 2026-07-02
description: ""
image: ""
tags: []
category: 电子
---
[(33 封私信 / 80 条消息) 闩锁效应（Latch-up）详解 - 知乎](https://zhuanlan.zhihu.com/p/125519142)

闩锁效应，简称latch-up，是CMOS技术中的一个关键问题，它就像是在NMOS和PMOS之间形成的一个特殊的电路回路。
这个现象之所以重要，是因为它有可能导致整个芯片彻底报废。所以，在质量检测（QUAL测试）中，latch-up是一个必须检查的项目，而且它和静电放电（ESD）防护也是密切相关的。
# 原理
Latch up 最易产生在易受外部干扰的I/O电路处, 也偶尔发生在内部电路。
Latch up 是指cmos晶片中, 在电源power VDD和地线GND(VSS)之间由于寄生的PNP和NPN双极性BJT相互影响而产生的一低阻抗通路, 它的存在会使VDD和GND之间产生大电流。
**Latch-up发生的条件：**
1. 当两个BJT都导通，在VDD和GND之间产生低阻抗通路;
2. 两个晶体管反馈回路（feedback loop）增益的乘积大于1（ $\beta_1 \times \beta_2 \geq 1$ ）。
![latch-up的器件截面图和等效电路图.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/latch-up%E7%9A%84%E5%99%A8%E4%BB%B6%E6%88%AA%E9%9D%A2%E5%9B%BE%E5%92%8C%E7%AD%89%E6%95%88%E7%94%B5%E8%B7%AF%E5%9B%BE.webp)
如图所示，在实际的CMOS器件中，P（PMOS的Source/Drain）-N(PMOS的N well)---P(P sub); N(PMOS的N well)---P(P sub)---N(NMOS的Source/Drain )形成两个BJT。

QPNP为一垂直式PNP BJT, 基极(base)是nwell, 基极到集电极(collector)的电流增益$\beta_1$可达数百倍；

QNPN是一侧面式的NPN BJT，基极为P substrate，基极到集电极(collector)的电流增益$\beta_2$可达数十倍；

Rwell是nwell的寄生电阻，其值可以到20kΩ；Rsub是substrate电阻，其值从数百到几欧姆。

QPNP和QNPN形成npnp结构，构成可控硅（Silicon-controlled rectifier: SCR）电路。

当无外界干扰未引起触发时，两个BJT处于截止状态，集电极电流是C-B的反向漏电流构成，电流增益非常小，此时Latch up不会产生。

当其中一个BJT的集电极电流受外部干扰突然增加到一定值时，此时BJT的发射结正偏，电流反馈到另一个BJT，最终的反馈回路引起的电流需要乘以增益$\beta_1 \times \beta_2$，此时为SCR的触发。从而使两个BJT因触发而导通，VDD至GND（VSS）间形成低抗通路，Latch up由此而产生。

如果（$\beta_1 \times \beta_2 \geq 1$ ）满足，两个BJT将会持续产生高饱和电流，甚至在没有触发条件的时候。