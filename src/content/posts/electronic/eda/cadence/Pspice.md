---
title: "Pspice"
published: 2026-01-15
image: ""
tags: [EDA]
category: 电子
description: ""
---

# 前言
[Cadence学习篇(12) Cadence中使用Pspice进行电路仿真_pspice仿真软件-CSDN博客](https://blog.csdn.net/qq_45138815/article/details/126086994)

# Capture创建仿真工程
打开Capture CIS
点击左上角File—New—Project，选择Pspice analog or Mixed A/D
![Pasted image 20260115145103](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020260115145103.webp)
选择创建一个空工程(第一项功能未知)
![Pasted image 20260115145157](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020260115145157.webp)
右键重命名
![Pasted image 20260115145541](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020260115145541.webp)
# 绘制原理图
## 基本元器件
我们点击Place ，可以看到常用模块，电容，二极管，电感，电阻，电源等
![Pasted image 20260115145856](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/Pasted%20image%2020260115145856.webp)
## 常用元器件库
==Cadence安装目录下\tools\capture\library\pspice中所有的元件库都含有Pspice仿真模型==
- Analog：包含无源元件（R、L、C），互感器，传输线，以及电压和电流非独立的源（电压控制的调用源E、电流控制的电流源F、电压控制的电流源G 和电流控制的电压源H）
- Source：给出不同类型的独立电压和电流源，例如：Vdc（直流电压），Idc（直流电流），Vac（交流电压），Iac（交流电流），Vsin（正弦电压），Vexp（指数电压），脉冲，分段线性，等
- Eval：提供二极管（D…），双极型晶体管（Q…），MOS 晶体管，结型场效应晶体管（J…），真实运算放大器；如u741，开关（SW_tClose, SW_tOpen），各种数字门和元件
- Abm：包含一个可以应用于信号的数学运算符选择，例如：乘法（MULT），求和（SUM），平方根（SWRT），拉普拉斯（LAPLACE），反正切（ARCTAN），等
- Special：包含多种其他元件，像参数、节点组，等

我们点击右边这个小加号，点击添加按键就可以添加元件库了，其实就是绘制原理图，只不过这个是仿真。
## 绘制RC滤波电路原理图

# 设置参数并进行仿真

# 仿真分析结果

# 可能会遇到的问题