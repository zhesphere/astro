---
title: "使能"
published: 2026-02-04
image: ""
tags: [器件]
category: 电子
description: ""
slug: electronic/component/dc-dc/en-shi-neng
---
# 电源芯片(DC-DC和LDO芯片)
EN即enable，意为使能，指的是激活该管脚，电源芯片才会有输出。
在EN脚上设计不同的外围电路，可以实现电源芯片多种上电功能，别看一个小小的EN管脚，设计不好，同样影响电源芯片的正常工作。
## EN脚悬空
某些DC_DC的EN pin支持悬空使能，也就是说EN不用接任何器件，只要有输入，就会有输出。
![EN脚悬空](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/EN%E8%84%9A%E6%82%AC%E7%A9%BA.webp)
某些DC-DC的pin description里面有float to enable字样
**为什么悬空也能使能？**
带**float to enable**的DC-DC EN管脚内部会有一个内置上拉源接到输入VIN上，在EN脚悬空时，利用0.9uA的上拉源来开启电源。
![float to enable](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/float%20to%20enable.webp)
## 用CPU的GPIO控制EN管脚
通过单片机GPIO输出高低电平来开启/关闭DC-DC，一般EN pin会有一个阈值，超过这个值，开启DC-DC，低于这个值关闭DC-DC。
![DC-DC EN脚开启阈值电压](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/DC-DC%20EN%E8%84%9A%E5%BC%80%E5%90%AF%E9%98%88%E5%80%BC%E7%94%B5%E5%8E%8B.webp)
在电气参数栏可以查看DC-DC EN脚开启阈值电压
设计时建议预留两个分压电阻，提高兼容性，更换不同IO电压的CPU时可做到有的放矢。
![单片机的GPIO控制DC-DC EN pin](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%8D%95%E7%89%87%E6%9C%BA%E7%9A%84GPIO%E6%8E%A7%E5%88%B6DC-DC%20EN%20pin.webp)
但同时也要注意不能超过EN管脚耐压最大值。
![DC-DC EN管脚耐压最大值](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/DC-DC%20EN%E7%AE%A1%E8%84%9A%E8%80%90%E5%8E%8B%E6%9C%80%E5%A4%A7%E5%80%BC.webp)
DC-DC EN管脚耐压最大值
## EN脚通过两个分压电阻接到VIN上
不用CPU的GPIO控制，想上电DC-DC就有输出，可以通过VIN接两个电阻分压到EN管脚，**这种多见于DC-DC芯片**，一般VIN和EN电压不在一个水平上，VIN电压较高需要进行分压，见下左图。
VIN和EN处于同一电压水平的，**这种多见于LDO芯片**，可通过电阻R1上拉到VIN，见下中图。
或者VIN和EN直接短接相连，将R1换作一根导线，这个时候电源的开启和关系取决于VIN输入的UVLO阈值，见下右图。
![VIN通过分压电阻接到DC-DC EN pin](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/VIN%E9%80%9A%E8%BF%87%E5%88%86%E5%8E%8B%E7%94%B5%E9%98%BB%E6%8E%A5%E5%88%B0DC-DC%20EN%20pin.webp)
VIN通过分压电阻接到DC-DC EN pin
## EN脚通过两个分压电阻调整UVLO阈值
通过分压电阻接到EN管脚的好处是可以设置DC-DC的启动电压和关闭电压，Vstart和Vstop电压值至少高于DC-DC的UVLO值，不然设置分压电阻没有意义。
UVLO的全称是**under voltage lock out**，顾名思义就是低电压锁定，即欠压保护。
UVLO是针对DC-DC的输入VIN来说的，当电压低于某一定值，DC-DC直接锁定保护，UVLO限制了电源芯片的最低输入电压，一定程度上可以保证芯片不会产生不稳定的震荡，提高电源芯片工作时的稳定性和可靠性。
UVLO的阈值通常都是小于VIN最小输入电压值的，且是由芯片内部寄存器控制，在某些应用场合，如果不希望UVLO这么低，通过调整分压电阻阻值，可以设置电源启动电压和停止电压。
![UVLO](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/UVLO.webp)
r1的计算公式为：
$$
r1=\frac{Vstart-Vstop}{Ihys}
$$
r2的计算公式为：
$$
r2=\frac{Vena}{\frac{Vstart-Vena}{r1}+I1}
$$
- Vstart为启动电压，Vstop为关闭电压；
- Vena为EN阈值电压；
- Ihys为迟滞电流，I1为EN上拉源电流；
- r1和r2为外部分压电阻；
要求不高，可以直接采用公式：
$$
Vstart=Vstop=\frac{Vena\ast(r1+r2)}{r2}
$$
高于Vstart电源开启，低于Vstart电源关闭。
为使DC-DC稳定使能，**可以将Vena设置为比其阈值大一些**（介于阈值和其最大值之间即可），根据阈值和想要的开启电压，选择合适的r1和r2取值。
## EN脚外部加RC延时电路
某些电路有多个LDO，且LDO上电有时序要求，此时可以在EN Pin上加RC，通过设置RC的大小，来满足要求，如下的VOUT1如果要求比VOUT2先上电，即可将R1C1参数设置比R2C2小即可。
![EN脚外部加RC延时电路](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/EN%E8%84%9A%E5%A4%96%E9%83%A8%E5%8A%A0RC%E5%BB%B6%E6%97%B6%E7%94%B5%E8%B7%AF.webp)
上电时序有要求的可在EN Pin上加RC延时电路EN管脚也可以换作用两个GPIO控制，利用两个GPIO的控制延时来满足时序要求。
![用两个GPIO控制EN来满足上电时序](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E7%94%A8%E4%B8%A4%E4%B8%AAGPIO%E6%8E%A7%E5%88%B6EN%E6%9D%A5%E6%BB%A1%E8%B6%B3%E4%B8%8A%E7%94%B5%E6%97%B6%E5%BA%8F.webp)
为避免一些场合输出电压受到刚上电时输入电压波动的影响（T1~T2），利用分压电阻或者RC延时电路，使输入电压上升到70~80%VIN时，再开启使能EN（T2后），以得到更稳定的输出电压。
![Vout受到Vin电压波动的影响](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Vout%E5%8F%97%E5%88%B0Vin%E7%94%B5%E5%8E%8B%E6%B3%A2%E5%8A%A8%E7%9A%84%E5%BD%B1%E5%93%8D.webp)
## 多电源协同作战
有一些电路使用多种电源时，可以用上一级电源的PWRGD管脚来drive下一级电源的EN Pin，达到**有福同享有难同当**的目的，即上一级电源开，下一级电源才开，上一级电源异常，下一级电源也无法开启（同时开，同时关），此电路也可以满足时序的要求，即VOUT2比VOUT1上电慢。
![用上一级PWRGD管脚来驱动下一级电源的EN Pin](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E7%94%A8%E4%B8%8A%E4%B8%80%E7%BA%A7PWRGD%E7%AE%A1%E8%84%9A%E6%9D%A5%E9%A9%B1%E5%8A%A8%E4%B8%8B%E4%B8%80%E7%BA%A7%E7%94%B5%E6%BA%90%E7%9A%84EN%20Pin.webp)
用上一级PWRGD管脚来驱动下一级电源的EN Pin
上图中的PWRGD是开漏输出，电源异常时，此脚会被拉低，指示电源是否good的管脚。
![PWRGD管脚描述](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/PWRGD%E7%AE%A1%E8%84%9A%E6%8F%8F%E8%BF%B0.webp)
PWRGD管脚描述
如下是EN1、PWRGD1、VOUT1、VOUT2的上电波形，可以看出，在前级电源完全上电之后，即PWRGD1管脚变为稳定的高电平时VOUT2才开始缓慢上升。
![双电源EN1、PWRGD1、VOUT1、VOUT2上电波形](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%8F%8C%E7%94%B5%E6%BA%90EN1%E3%80%81PWRGD1%E3%80%81VOUT1%E3%80%81VOUT2%E4%B8%8A%E7%94%B5%E6%B3%A2%E5%BD%A2.webp)
双电源EN1、PWRGD1、VOUT1、VOUT2上电波形
