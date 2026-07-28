---
title: EMC&RF
published: 2025-11-01
tags: [电子测试]
category: 电子
---
# EMC Test Procedure
辐射测试
切点到参考点距离3米，天线后移
3米和10米有差异以10米为准
国内3米留余量，国外10米测
10米偏差基本在1-1.5db
10米标准要求±4db

传导(AAN)

![Pasted image 20251106103453](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020251106103453.webp)

锂电池产品
风险：充满变成绿灯，再加干扰变成红灯，过充风险；已经充满但是灯被干扰

屏幕
风险：加干扰触摸失效，卡住(用手试试)

# RED
Radio Equipment(无线产品)
- 无线电传输
- 无线电侦测
- 无线接收机

频率范围0-3000HZ
红外遥控器超过3000HZ，波长比较短

Essential Requirements of RED
![Pasted image 20251106104503](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020251106104503.webp)
整机不能说符合RED同时符合EMC？

RED Cyber Security
wifi/4G要有，欧盟海关

Conformity assessment procedures of RED
![Pasted image 20251106105049](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020251106105049.webp)

说明书
- 使用的无线技术的频率范围
- 使用的无线技术的额定最大发射功率

# EMC三要素
Source--Reduce EMC source
Path--Cut off the transmission path
Object--Strengthen the immunity ability
思路：干扰尽量从地线走掉
电机正转反转干扰程度不一样
锂电池包电压降到百分之二三十，功能打开？干扰会非常大

## 影响辐射发射的因素
- 天线极化方向：一般垂直会更差，但也有例外
- 输入电压、电流不同：一般大电流辐射更差
- 不同的工作模式，辐射结果不同
- 不同厂家的EMC关键元器件，辐射结果不同，比如电机、电源等等
- 产品的测试布置

## 影响传导发射的因素
- 电源质量：AC/DC,DC/DC
- 工作模式
- 测试布置

# RF测试
- 发射功率和功率谱密度是通过传导法测试，EUT需要把天线割断并焊出带sma接口的线缆；通过定频发射测试，设定值需要确定并提前摸底
- 自适应测试需要EUT与辅助设备(CMW或者路由器)链接并跑量，一般通过Iperf软件跑量；EUT需要刷固件以满足以上测试条件
- 杂散测试是辐射法，天线需保留，模块需要通过整机供电，其余功能可关闭

# 研发前期
- 研发初期，layout布板要有EMC的考量，对于可能得干扰源要预留后期整改的位置：比如晶振输出线上预留0欧姆电阻，AC/DC或者DC/DC输入输出线上预留滤波电路的位置等等
- 高风险项目在正式认证开始前摸底：比如辐射发射、传导发射、辐射杂散等
- 电动工具这类产品，电机的影响较大，带不带地线对传导也有很大影响
- RF测试需要提供定频软件及定频软件的操作说明；软件的设定值有明确数值；自适应测试值最好可以通过Iperf跑流，如果无法实现，占空比数值会比较低，需要申明
- 辐射测试的布置问题

