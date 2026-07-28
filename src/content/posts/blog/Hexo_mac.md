---
title: "Hexo"
published: 2026-04-09
tags: []
category: ""
---
# 环境配置
## 安装 Homebrew
1. 打开终端（Terminal）
	点击右上角放大镜（Spotlight），也可以command+空格调出聚焦搜索，搜索终端并打开。
2. 在终端输入安装命令：
	```
	/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
	```
3. 执行后提示 
	请安装Git后再运行此脚本，在系统弹窗中点击“安装”按钮
	```
	查询git发现有版本不确定后面是否还需要安装
	git -v
	git version 2.50.1 (Apple Git-155)
	```
4. 安装后按提示操作：
	1. 选择下载源，输入 1（清华大学镜像）
	2. 输入电脑开机密码
	3. 如果询问是否删除旧版本 Homebrew，输入 Y
	4. 按回车开始安装
	5. 选择镜像源时输入 5（阿里镜像）
5. 安装完成后，关闭终端，再重新打开终端。
Homebrew 安装完成。

## 安装 Git
在终端输入命令：
```
brew install git
```
回车执行，等待安装完成即可。
Git 安装完成。

## 安装 Node.js
1. 进入官网下载 macOS 安装程序：
https://nodejs.org/zh-cn/download
2. 安装步骤：
	1. 打开下载好的安装包
	2. 点击“继续”
	3. 同意用户协议
	4. 点击“安装”
	5. 输入电脑密码
	6. 点击“安装软件”
3. 安装完成后，点击“关闭”。
Node.js 安装完成。

# 安装Hexo
```
npm install -g hexo-cli
-g或–global表示全局安装模块，如果没有这个参数，会安装在当前目录的node_modules子目录下。

```

```
**npm** error code EACCES
**npm** error syscall mkdir
**npm** error path /usr/local/lib/node_modules/hexo-cli
因为权限问题报错
```
官方文档强烈建议**不要**使用 root、sudo 等方法覆盖权限

## 使用node版本 管理工具nvm，安装Node.js和npm
注：不推荐使用Node installer，因为它会把npm 安装到具有本地权限的目录中，在全局运行npm时可能会导致EACCES权限错误。我们直接使用nvm安装即可。
1. 下载和安装nvm 
	1. 在终端执行：
	```
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
	```
	也可以在github 获取最新版本地址：[https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)
	2. 验证是否安装成功：  
	在终端输入`command -v nvm`，如果输出 `nvm` 则说明安装成功。
2. 使用nvm安装Node.js和npm
	如果之前已经用其他方法安装过node.js，无需担心，nvm 会直接覆盖安装。
	1. 在终端输入`nvm ls-remote`，列出都有哪些可用版本
	2. 从中选择一个安装，例如 `nvm install v24.14.1`
	3. 使用安装好的版本，例如 `nvm use v24.14.1`
	接下来就可以使用npm安装Hexo。在终端输入 `npm install -g hexo-cli`即可。
	参考的原文档：  
	[https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally/](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally/)
# 初始化Hexo
在Finder/home目录下，新建一个名为`lyz`的文件夹，并在内初始化你的博客。之后所有的操作都在这个文件夹下进行，请确保在执行后文的操作前已经切换到了这个文件夹（cd lyz）
1. 进入这个文件夹内，然后右键空白处，点击「显示简介」
2. 在弹出的菜单中，找到文件夹的地址，然后复制这段地址，如下图中的划线位置
3. 在这段地址的最后加上 `lyz` 这几个字，获得完整的文件夹地址，例如 `/Users/crease/lyz`
4. 回到终端界面，输入下面这段代码，然后回车。
	```
	cd /Users/crease/lyz
	```
5. 输入下面代码，下载 Hexo
	```
	hexo init
	```
6. 生成和预览博客。
```
hexo g
hexo s
```
执行`hexo s`命令后，通过浏览器访问`http://127.0.0.1:4000`可以预览你的博客

# 更新Hexo
官方发布了[新版本](https://github.com/hexojs/hexo/releases)后，可以在Hexo建立的博客目录内运行：
```
npm update
```
用如下命令可以检查package.json文件中配置的dependencies的版本号：
```
npm ls --depth=0
```

# 安装主题
使用[solitude](https://solitude.js.org/cn)主题
这里推荐一个大佬，是我非常想达到的高度[张洪Heo](https://zhheo.com/)
## 进入项目目录
```
cd [project-name]
```
## 安装主题
主题安装方式有许多种，选择一种你喜欢的方式即可，如果你看不懂这些，默认使用第一种即可
1. 使用 Git 安装
```
git clone -b dev https://github.com/everfu/hexo-theme-solitude.git themes/solitude
```
受限于防火墙和网速下载比较慢，容易安装失败
2. 自行下载主题文件安装
下载最新的 [release](https://github.com/everfu/hexo-theme-solitude/releases) 版本 解压到 `themes` 目录，并将解压出的文件夹重命名为 `solitude`
**文件结构参考**
```
- 博客目录/
    - themes/
        - solitude/
```
3. 使用包管理器安装
npm
pnpm
bun
yarn
```
npm i hexo-theme-solitude
```

## 配置主题
编辑 Hexo 项目的 `_config.yml` 文件，将 Hexo 主题修改为 `solitude`：
```
theme: solitude
```
## 安装依赖
npm
pnpm
bun
yarn
```
npm i hexo-renderer-pug
```
## 本地启动 Hexo
分别执行
```
hexo clean
hexo generate
hexo server
#可以合并执行
hexo cl; hexo g; hexo s 
```

访问 [http://localhost:4000](http://localhost:4000/) 查看你的博客。
## 将主题配置复制到博客根目录（可选）
为了减少升级主题后带来的不便，可将主题目录的 `_config.yml` 内容复制到博客根录并重命名为 `_config.solitude.yml`。
 **NPM 安装**
Mac/Linux
```
cp -rf ./node_modules/hexo-theme-solitude/_config.yml ./_config.solitude.yml
```

**Git 安装**
Mac/Linux
```
cp -rf ./themes/solitude/_config.yml ./_config.solitude.yml
```

博客根目录下的 `_config.solitude.yml` 中的配置优先级大于主题目录 `_config.yml` 中的配置内容。如果使用了 `_config.solitude.yml`， 主题的 `_config.yml` 对应配置将不会有效果。

更新主题时记得关注配置文件是否改动，通过对比配置文件改动，同步修改原配置文件即可。

注意: 复制的是主题的 `_config.yml` ，而不是 hexo 的 `_config.yml`。 不要把主题目录的 `_config.yml` 删掉

**文件结构参考**
```
- 博客目录/
    - themes/
        - solitude/
            - _config.yml
- _config.solitude.yml
```

# 迁移安装插件
## 字数统计
```
# --------------------------- start ---------------------------
# Word count
# 字数统计
# warning: Please install the hexo-wordcount plugin first.
# 警告: 请先安装 hexo-wordcount 插件。
wordcount: false
# --------------------------- end ---------------------------
```
安装 `hexo-wordcount` 插件
npm
```
npm i hexo-wordcount
```
## 数学公式
```
# --------------------------- start ---------------------------
# Katex
# Latex formula support
# Latex 公式支持
katex:
  enable: false
  # Whether to load on each page
  # 是否在每个页面加载
  per_page: false
  # Whether to enable copy formula
  # 是否启用复制公式
  copytex: false
# --------------------------- end ---------------------------
```
卸载 `hexo-render-marked`
```
npm un hexo-renderer-marked
```
安装 `hexo-renderer-markdown-it` `katex` `@renbaoshuo/markdown-it-katex`
npm
```
npm i hexo-renderer-markdown-it katex @renbaoshuo/markdown-it-katex
```
添加以下内容到 `_config.yml`
_config.yml
```
markdown:
  preset: 'default'
  render:
    html: true
    xhtmlOut: false
    langPrefix: 'language-'
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  enable_rules:
  disable_rules:
  plugins:
    - '@renbaoshuo/markdown-it-katex'
  anchors:
    level: 2
    collisionSuffix: ''
    permalink: false
    permalinkClass: 'header-anchor'
    permalinkSide: 'left'
    permalinkSymbol: '¶'
    case: 0
    separator: '-'
  images:
    lazyload: false
    prepend_root: false
    post_asset: false
  inline: false  # https://markdown-it.github.io/markdown-it/#MarkdownIt.renderInline
```
开启配置项
```
# --------------------------- start ---------------------------
# Katex
# Latex formula support
# Latex 公式支持
katex:
  enable: true
  # Whether to load on each page
  # 是否在每个页面加载
  per_page: true
  # Whether to enable copy formula
  # 是否启用复制公式
  copytex: false
# --------------------------- end ---------------------------
```