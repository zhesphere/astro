---
title: Piclist
published: 2026-03-17
description: 
image: ""
tags: []
category: obsidian
---
官网：[PicList](https://piclist.cn/)
下载链接：[github](https://github.com/Kuingsmile/PicList/releases/latest)(建议使用IDM下载)
# 如何在Obsidian中使用
1. 在社区插件中搜索安装`Image auto upload`插件
2. 进入插件设置页面，将默认上传器修改为`PicGo(app)`
3. 设置`PicGo server`为`http://127.0.0.1:36677/upload`
4. 如需启用云端删除功能，请在删除接口中填入`http://127.0.0.1:36677/delete`
# 图床设置
## 阿里云OSS
官方网站：[https://www.aliyun.com/product/oss](https://www.aliyun.com/product/oss)
官方文档：[https://help.aliyun.com/product/31815.html](https://help.aliyun.com/product/31815.html)
### 配置项
```
{
  "_configName": "", // 图床配置名
  "accessKeyId": "",
  "accessKeySecret": "",
  "bucket": "", // 存储空间名
  "area": "", // 存储区域代号
  "path": "", // 自定义存储路径
  "customUrl": "" // 自定义域名，注意要加http://或者https://
}
```
### 说明
#### accessKeyId & accessKeySecret
你需要在阿里云AccessKey管理页面中创建或者查看你的accessKeyId和accessKeySecret，可以通过以下两种方式进入：
1. 直接访问[管理页面网址](https://ram.console.aliyun.com/manage/ak)
2. 登录阿里云后，点击右上角头像，选择 `AccessKey管理`。
#### bucket & area
从 `阿里云工作台->对象存储OSS->bucket列表`进入存储桶管理页面，或者直接访问[https://oss.console.aliyun.com/bucket](https://oss.console.aliyun.com/bucket)，即可查看到你的bucket列表和对应的存储区域。
请把存储桶权限设置为公共读，否则上传的图片在相册中无法显示。
>提示
>APP内填写的存储区域是区域代码，不是实际中文名称。
请访问[阿里云官方文档](https://help.aliyun.com/document_detail/31837.html)或者参考下表查询代码。

|存储区域|区域代码|
|---|---|
|华东 1（杭州）|oss-cn-hangzhou|
|华东 2（上海）|oss-cn-shanghai|
|华东5（南京本地地域）|oss-cn-nanjing|
|华东6（福州本地地域）|oss-cn-fuzhou|
|华中1（武汉-本地地域）|oss-cn-wuhan|
|华北 1（青岛）|oss-cn-qingdao|
|华北 2（北京）|oss-cn-beijing|
|华北 3（张家口）|oss-cn-zhangjiakou|
|华北 5（呼和浩特）|oss-cn-huhehaote|
|华北 6（乌兰察布）|oss-cn-wulanchabu|
|华南 1（深圳）|oss-cn-shenzhen|
|华南 2（河源）|oss-cn-heyuan|
|华南 3（广州）|oss-cn-guangzhou|
|西南 1（成都）|oss-cn-chengdu|
|中国（香港）|oss-cn-hongkong|
|美国（硅谷）|oss-us-west-1|
|美国（弗吉尼亚）|oss-us-east-1|
|日本（东京）|oss-ap-northeast-1|
|韩国（首尔）|oss-ap-northeast-2|
|新加坡|oss-ap-southeast-1|
|澳大利亚（悉尼）|oss-ap-southeast-2|
|马来西亚（吉隆坡）|oss-ap-southeast-3|
|印度尼西亚（雅加达）|oss-ap-southeast-5|
|菲律宾（马尼拉）|oss-ap-southeast-6|
|泰国（曼谷）|oss-ap-southeast-7|
|印度（孟买）|oss-ap-south-1|
|德国（法兰克福）|oss-eu-central-1|
|英国（伦敦）|oss-eu-west-1|
|阿联酋（迪拜）|oss-me-east-1|
|无地域属性（中国内地）|oss-rg-china-mainland|
#### path/存储路径
存储路径为可选项，如果不填写，则默认存储在bucket的根目录下。
例如填写 `images/test/`，则文件将存储于对应的test目录下。
#### customUrl/自定义域名
自定义域名为可选项，如果不填写，则在复制链接、预览图片等操作时，将使用阿里云的默认外网域名。
例如文件 `test.jpg`存储于目录 `images/test/`下，bucket名称为 `test-bucket`，存储区域为 `华东 1（杭州）`，则文件的外网访问地址为 `https://test-bucket.oss-cn-hangzhou.aliyuncs.com/images/test/test.jpg`。
而如果填写了自定义域名，则文件的外网访问地址为 `http://自定义域名/images/test/test.jpg`。
请注意包含 `http://`或 `https://`。
#### options/网站后缀
阿里云OSS提供了图片处理功能，一般用于图片的裁剪、缩放、旋转、水印等操作。
使用方法：在文件的外网访问地址后面加上网站后缀，例如 `https://test-bucket.oss-cn-hangzhou.aliyuncs.com/images/test/test.jpg?x-oss-process=image/resize,m_fill,h_100,w_100`。
详细的网站后缀使用请参考[OSS新版图片处理指南](https://help.aliyun.com/document_detail/101260.html)。
该功能的使用如果超出免费额度，会产生额外处理费用，具体费用请参考[OSS图片处理费用](https://help.aliyun.com/document_detail/173537.htm)。
网站后缀为可选项，如果不填写的话，会拷贝原始地址。