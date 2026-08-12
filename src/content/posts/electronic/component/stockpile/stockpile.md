---
title: 存储
published: 2026-02-28
description: 
image: ""
tags: [器件]
category: 电子
---

[SSD和DDR的工作原理有何不同？数据在两者之间如何交互传输？_编程语言-CSDN问答](https://ask.csdn.net/questions/8383676)
[(32 封私信 / 80 条消息) eMMC和SSD有什么区别？ - 知乎](https://zhuanlan.zhihu.com/p/680572467)
[存储基础知识详解：从硬盘到DAS、NAS、SAN-CSDN博客](https://blog.csdn.net/weixin_45565886/article/details/131174276)
[ 一篇文章搞懂存储（硬件设备）所有基础知识1 - 知乎](https://zhuanlan.zhihu.com/p/2506298145)

大类里小类
各类别厂家优劣势
缩写
用处
北京君正于2020年完成对ISSI的收购，成为全球汽车存储芯片领域的领军企业，推动了公司的业务扩展和技术整合。

![产业链分布](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E4%BA%A7%E4%B8%9A%E9%93%BE%E5%88%86%E5%B8%83.webp)


存储设备是指计算机系统中用于存储和读取数据的硬件组件，按存储技术不同可分为磁性存储、光学存储和半导体存储。
- 磁性存储，是指利用磁能方式存储信息的磁介质设备，其存储与读取过程需要磁性盘片的机械运动，一般指HDD硬盘、软盘和磁带
- 光学存储，是指用光学方法从光存储媒体上读取和存储数据的一种设备，一般指DVD光盘、蓝光光盘等
- 存储芯片，又称为半导体存储器，是指利用电能方式存储信息的半导体介质设备，其存储与读取过程体现为电子的存储或释放，广泛应用于内存、U盘、 消费电子、智能终端、固态硬盘等领域。
![存储技术](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%AD%98%E5%82%A8%E6%8A%80%E6%9C%AF.webp)
# 硬盘
## 存储介质
- SSD
	与机械硬盘不同，没有可动的机械部件，可靠性和随机读写性能最出色
	主要用途：高性能/高可靠性用途、DB、业务系统
- SAS HDD
	可靠性/性能出色的硬盘，高性能/不间断运行要求的主要业务使用
	主要用途：服务器内置/外置存储、DB、业务系统
- NL-SAS HDD(Nearline SAS)、SATA HDD
	大容量的硬盘，适合备份/归档，因为容量大、低速，所以发生故障时恢复时间长
	主要用途：备份/归档、较低负荷的业务
### 机械磁盘HDD
**硬盘容量 (Volume)**：容量的单位为兆字节（MB）或千兆字节（GB）。影响硬盘容量的因素有单碟容量和碟片数量
**转速 (Rotational speed)**：硬盘的转速指硬盘盘片每分钟转过的圈数，单位为RPM（Rotation Per Minute）。一般硬盘的转速都达到5400RPM/7200RPM。SCSI接口硬盘转速可达10000－15000RPM
**平均访问时间（Average Access Time）** ＝平均寻道时间＋平均等待时间
**数据传输率 (Date Transfer Rate)**：硬盘的数据传输率是指硬盘读写数据的速度，单位为兆字节每秒（MB/s）。硬盘数据传输率包括内部传输率和外部传输率两个指标
**IOPS (Input/Output Per Second)**： 即每秒的输入输出量(或读写次数)，是衡量磁盘性能的主要指标之一
### 固态硬盘SSD(Solid State Drives)
固态硬盘简称固盘，是用固态电子存储芯片阵列而制成的硬盘，由控制单元和存储单元（FLASH芯片、DRAM芯片）组成，目前支持SATA、SAS、PCI-E 3.0接口。
**SSD优点如下**：
	数据存取速度快：在密集的IO读写和低延迟方面与传统硬盘对比性能优异
	故障率低：内部不存在任何机械部件，内部全部采用闪存芯片
	绿色环保：工作时静音，发热量小，散热快
	重量更轻：有利于移动设备的携带
SLC Single-Level Cell 单层单元 1bit/Cell
MLC Multi-Level Cell多层单元2bit/Cell
TLC Triple-Level Cell三层单元3bit/Cell

| 类型    | SLC     | MLC    | TLC    |
| ----- | ------- | ------ | ------ |
| 可擦写次数 | 约100000 | 约5000  | 约1000  |
| 读取时间  | 25μs    | 50μs   | 75μs   |
| 编程时间  | 300μs   | 600μs  | 900μs  |
| 擦写时间  | 1500μs  | 3000μs | 4500μs |



# 存储芯片
存储芯片(Memory)，主要分为非易失性存储器(Non-volatile Memory)、易失性存储器(Volatile Memory)和新型存储器(非易失性)。
- 非易失性存储器，主要包括PROM(可编程只读存储器：EPROM(可擦除可编程只读存储器)、EEPROM(带电可擦可编程只读存储器))、MROM/Mask ROM(掩模式只读存储器)和Flash Memory(闪存：NAND Flash 、NOR Flash)，即使在断电后也能保留存储的数据信息
- 易失性存储器，主要包括DRAM(动态随机存储器)和SRAM(静态随机存储器)， 断电后不会保存数据
- 新型存储器，主要包括FeRAM(铁电存储器)、PCRAM(相变存储器)、ReRAM(电阻式随机存取存储器)和MRAM(磁性随机存储器)等。
![半导体存储器](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/%E5%8D%8A%E5%AF%BC%E4%BD%93%E5%AD%98%E5%82%A8%E5%99%A8.webp)
## 非易失性存储器
### eMMC(Embedded MultiMedia Card)

## 易失性存储器(RAM)
RAM(Random Access Memory，随机存储器)。
“随机存取”，指的是当存储器中的消息被读取或写入时，所需要的时间与这段信息所在的位置无关。 现在RAM已经专门用于指代作为计算机内存的易失性半导体存储器。根据RAM 的存储机制，又分为动态随机存储器DRAM(Dynamic RAM)以及静态随机存储器SRAM(Static RAM)两种。

### DDR SDRAM(Double Data Rate Synchronous Dynamic Random Access Memory，双数据率同步动态随机存储器)






# 单位
