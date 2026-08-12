---
title: DC-DC
published: 2025-09-01
description: 
tags: [器件]
category: 电子
---
# DC-DC(开关电源)
## 厂商
* [[矽力杰]]==主要==
* 3PEAK==需要成本低次要部分==
* 进口==备选==
## 概念
直流转直流电源(Direct Current)，直流电路中将一个电压值的电能变为另一个电压值的电能的装置
### 构成
控制芯片、电感线圈、二极管、三极管、电容器（一般）
## 特点
* 与LDO(低压差线性稳压器)相比==效率高==，通常效率在70%以上，效率高的可达到95%以上
* 适应电压范围宽
## 分类
1. Buck DC-DC converter
2. Boost DC-DC converter
3. Buck-Boost DC-DC converter
## 工作方式
1. 同步整流
采用通态电阻极低的MOS管代替二极管
续流MOSFET的导通和关断是主动的，与开关管的动作严格同步
* 大大降低损耗
* 价格昂贵
* 轻载时工作状态更好
* 低压(30V、40V)同步较多
2. 异步整流
续流二极管的导通和关断是被动的，与开关管的动作不同步
* 二极管轻载时的损耗较大
* 轻载时由于工作在不连续模式产生很大的噪声
* 高压一般做异步
## 调制方式
1. PFM(脉冲==频率==调制方式)
开关脉冲宽度一定，通过改变脉冲输出频率，使输出电压达到稳定
**优点**
长时间使用耗电小（尤其小负载）
**缺点**
重负载情况下，效率明显低于PWM方式
由于其纹波频谱比较分散规律少，使得滤波电路的设计十分复杂与困难
2. PWM(脉冲==宽度==调制方式)
开关脉冲的频率一定，通过改变脉冲输出宽度，使输出电压达到稳定
**优点**
控制电路简单，易于设计与实现
具有良好的电压纹波和噪声
频率特性好，线性度高
在重负载情况下有极高的效率
**缺点**
随着负载变轻，效率下降，轻负载情况下效率很低
3. PSM(==待补充==)
## DC-DC和LDO差别
**LDO**
线性功耗高，跑不了大电流，低压差小电流用，最高40V
**DC-DC**
大电流用
## 电路
![DCDC嘉立创](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/DCDC%E5%98%89%E7%AB%8B%E5%88%9B.webp)
[基于SY8303AIC的(2)1A~3A(中电流)的DCDC降压方案设计方案参考-立创商城](https://www.szlcsc.com/selection/C0EF59F6AD46DBA4371B68FECB429B2A.html?spm=sc.it.pd.dr&lcsc_vid=QwdcVQdVElULBQBVR1NbXgAFQVhXA11RElEKAlADTlYxVlNQTldbUFFeTlNaUjsOAxUeFF5JWAIASQYPGQZABAsLWA%3D%3D)
## 16lidar_mb__power
![Lidar_MB_POWER_12](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Lidar_MB_POWER_12.webp)
# 控制模式
？？？

# 同步DC-DC降压和异步降压电路
[(33 封私信 / 80 条消息) 详解DCDC降压电路：同步降压与异步降压 - 知乎](https://zhuanlan.zhihu.com/p/1898027810083299572)
![异步降压电路.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%BC%82%E6%AD%A5%E9%99%8D%E5%8E%8B%E7%94%B5%E8%B7%AF.webp)
![同步降压电路.png](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%90%8C%E6%AD%A5%E9%99%8D%E5%8E%8B%E7%94%B5%E8%B7%AF.webp)
