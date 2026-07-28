---
title: Cadence
published: 2025-11-01
tags: [EDA]
category: 电子
---
参考：[Cadence 17.2 软件(OrCAD&Allegro)画元件封装操作前期设置参数（仅供参考）_cadence17.2-CSDN博客](https://blog.csdn.net/Oshir/article/details/130992930?spm=1001.2014.3001.5506)

# 项目管理
- Assembly：存放PCB工程师制作的最终的PCB元件图，标注各个元件放置的位置
- BRD：Board，即PCB工程师用PCB Editor画的PCB图
- Doc：一般存放设计的注意事项或者公司的设计规则
- DS：Data Sheet，存放各个元件的规格书或者图纸
- Dxf：用于存放结构工程师画的结构图，以便PCB工程师在此结构边界内布线和放置元件
- Gerber：用于存放最终出给PCB厂商的图纸资料
- LIB：
	- BRDLIB：
		- Guidance：存放PCB Editor画封装时的一个空文件模板，这个空文件模板没有画任何封装图案，但是里面有对画封装前的所有配置参数。每次新建一个文件画封装前导入此空文件模板
		- Package：存放所有元件的封装文件，格式是.psm
		- Pad：存放封装里的所有焊盘文件，格式是.pad
		- Shape：格式.ssm
	- SCHLIB：存放原理图元件图案的库
- SCH：存放原理图文件
	- allergo：存放第一方网表
- SMT：存放物料表格，即BOM表
# 操作
## 创建焊盘
导热垫(Thermal Pad)和导热过孔(Via for thermal pad)
## 创建PCB封装
Layout-Pins-
计算引脚坐标时，提前考虑使原点处于元器件的几何中心，便于后续PCB设计及生产坐标文件的输出
丝印框
装配框
Edit--Z-Copy Shape--Place_Bound_top
# 封装
,,,SOP封装和SOIC封装区别
SOIC是由SOP派生出来的：两种封装的具体尺寸，包括芯片的长、宽、引脚宽度、引脚间距等基本一样，所以在PCB设计时**封装SOP与SOIC可以混用**
SOP和SOIC有细微差别：SOIC 封装在外形上和 SOP 几乎一样。差异在管脚上， SOIC 更加细，据说是为了减少占地面积。SOIC-8 的焊盘宽度是 0.6mm，SOP-8 的焊盘宽度是 0.65mm，综合对比完全可以互相替换。
,,,
# 原理图
## Place Part(P)
- Search
	eg. Cap*
快捷键
	- R逆时针旋转90°
	- PgUp：放大视图。
	- PgDn：缩小视图。
	- End：刷新画面。
	- Tab：在元件浮动状态时，编辑元件属性
	- Spacebar：旋转元件或变更走线方式。
	- X：元件水平镜像。
	- Y：元件垂直镜像。
	- Esc：结束当前操作。
Name 引脚名
Number 引脚编号
Shape 引脚形状，下拉菜单选择：
	- Clock（表示该引脚输入为时钟信号）
	- Dot（表示“非”，输入信号取反）
	- Dot-Clock（表示对输入时钟求非，即反向时钟输入）
	- Line（一般引脚引线，其长度为 3 个格点间距）
	- Short（短引脚引线，其长度为 1 个格点间距）
	- Short Clock（表示短引脚引线的时钟输入端）
	- Short Dot（短引脚引线，表示“非”，输入信号取反）
	- Short Dot Clock（短引脚引线，对输入时钟求非，即反向时钟输入）
	- Zero Length（表示零长度的引脚引线，一般用于表示“电源”和“地”）
Type 引脚类型，下拉菜单选择：
	- 3-State（三态引脚，可能为高电平、低电平和高阻 3 种状态）
	- Bidirectional（双向信号引脚，既可作输入又可作输出）
	- Input（输入引脚）、Open Collector（开集电极输山引脚）
	- Open Emitter（开发射极输山引脚）、Output（输出引脚）
	- Passive（无源器件引脚，如电阻引脚）
	- Power（电源和地引脚）
New Part From Spreadsheet：
	- Part Name 元器件的名字
	- No. Of Sections 表示分割元器件的部分数
	- Part Ref Prefix 元器件名字的前缀
	- Part Numbering 表示 Section 部分以数字（Numeric）还是字母（Alphabetic）区分
	- Number 元器件引脚编号
	- Name 元器件引脚名
	- Type 引脚类型，下拉菜单选择40
	- Pin Visibility 引脚是否显示
	- Shape 引脚形状，下拉菜单选择
	- Position 引脚在元器件外框的位置，有 Top、Bottom、Left、Right 4种类型,下拉菜单选择

输入时注意：① 画反相引脚时，如![wps4](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/wps4.webp)，在第 1 引脚对应的 Name 中输入 R\S\T\即可；
② 对应于上表最右边的 1~24 编号，画出电路符号是先从左边从上向下，然后再从右边从上向下显示，所以上表第 2 列与第 1 列编号有区别。
选择 Option→Preference 命令，弹出 Preference 对话框，选择 Grid Display 选项卡
清除 Part and Symbol Grid 选项组中的 Pointer snap to grid 复选框，单击“确定”按钮
退出其对话框。
单击工具栏中的![cc710e7b-0d51-44b2-be07-db2d60b147f9](https://zsstoposs.oss-cn-hangzhou.aliyuncs.com/images/cc710e7b-0d51-44b2-be07-db2d60b147f9.webp)按钮，又可恢复吸附栅格点。

Act：当前层
Alt/ML：切换到的模式
Via：导通孔选择
Net：空网络，当布线开始后显示当前布线的网络
Line lock：线的形状和引脚
Line：布线为直线
Arc：布线为弧线
Off：无拐角
45：拐角 45。
90：拐角 90。
Miter：拐角的设置，若选择“lx width”和“Min”表示斜边长度至少为一倍线宽
Line width：线宽
Bubble：自动避线
Off：不自动避线
Hug only：新的布线“拥抱”存在的布线，存存的布线不变
Hug preferred：新的布线“拥抱”存在的布线，存在的布线改变
Shove preferred：存在的布线被推挤
Shove vias：推挤导通孔的模式
Off：不推挤导通孔
Minial：最小幅度推挤导通孔
Full：完整地推挤导通孔
Smooth：自动调整布线116
Off：不自动调整布线
Minimal：最小幅度地自动调整布线
Full：完整地自动调整布线
Gridless：无格点布线
Snap to connect point：表示从 Pin、Via 的中心原点引出线段
Replace etch：允许改变存在的布线，不用删除命令，在布线过程中，若在一个存在的布线上添加布线，旧的布线会被自动删除
# PCB Layout
Film: 01_TOP
Film: 02_L2_GND1
Film: 03_L3_S1
Film: 04_L4_GND2
Film: 05_L5_GND3
Film: 06_L6_S2
Film: 07_L7_GND4
Film: 08_BOTTOM
Film: ADB：底层视图
Film: ADT：顶层视图
Film: ALL
Film: DRILL
Film: PASTEMASK_BOTTOM
Film: PASTEMASK TOP
Film: SILKSCREEN_BOTTOM
Film: SILKSCREEN_TOP
Film: SOLDERMASK_BOTTOM
Film: SOLDERMASK_TOP