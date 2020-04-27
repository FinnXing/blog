---
title: Jenkins+Nginx实现前端项目自动构建和部署
date: 2020-04-27
categories:
 - 服务器
tags:
 - 服务器
---
## 实现目标

自从有了服务器以后就一直在折腾我的小小的服务器，用`vuepress`搭建了梦寐已久的个人博客，之前是在服务器里搭建了`git`和`Nginx`，利用`githooks`实现自动部署，自从接触了`jenkins`以后就想要利用`jenkins`来实现以下自动构建和自动部署。这次的目标是，把博客代码迁移到`gitlab`私有仓库中，在本地写完文章`push`到`gitlab`后，`Jenkins`自动完成博客构建，然后部署到`Nginx`里，省去了本地`build`的过程。

## 前期准备

* `gitlab`账号和私有项目（因为我的服务器配置太低，不能本地部署`gitlab`，只能使用线上[gitlab.com](https://gitlab.com)）
* 服务器（我的服务器是阿里云ECS，1核2G）
* 服务器安装`Nginx`并配置完成和启动（具体安装方法请参照我博客中的[教程](https://www.xing666.net/pages/20200317/)）
* 服务器安装`Jenkins`并启动（我是使用`docker`部署的`Jenkins`服务，具体过程在此不详述）

## 配置工作

### 插件安装

Jenkins是需要安装以下插件：NodeJS插件、Gitlab插件、Git插件、Publish Over SSH插件

安装插件加速方法：

```shell
cd {你的Jenkins工作目录}/updates #进入更新配置位置
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

### 创建任务-自动构建

1. 创建一个新任务，选择构建自由风格的软件项目

![Snipaste_2020-04-27_11-02-20](https://img.xing666.net/2020-04-27-072851.png)



2. 关联`gitlab`项目

![image-20200427153158137](https://img.xing666.net/2020-04-27-073158.png)

凭据添加方法：

`Jenkins`主页点凭据-系统，然后点全局凭据，进入凭据列表，左侧添加凭据

![image-20200427154005349](https://img.xing666.net/2020-04-27-074005.png)

在服务器中使用`ssh-keygen -t rsa -C "your_email@example.com"`生成`SSH key`，将生成的`id_rsa.pub`中的内容填入下面的`key`中，同时`gitlab`中也许新增此SSH密钥

![image-20200427154350370](https://img.xing666.net/2020-04-27-074350.png)

3. 选择构建触发器

构建触发器选择下面这项，记住`webhooks url`，稍后需要去`gitlab`中设置，然后点击图片右下角高级按钮，点击Generate按钮生成`token`，记下`token`，稍后需要去`gitlab`中设置。

![image-20200427155055903](https://img.xing666.net/2020-04-27-075056.png)

![image-20200427155134878](https://img.xing666.net/2020-04-27-075135.png)

4. 选择构建环境并编写shell脚本

脚本里是在代码`push`以后拉取代码，然后执行`npm run docs:build`构建博客，然后进入构建后的目录并压缩。

![image-20200427155432276](https://img.xing666.net/2020-04-27-075432.png)

5. `gitlab`中设置`webhooks`

   在项目中选用户设置-Webhooks，填入刚刚记下的URL和token，下面的Enable SSL 选项要去掉勾选，点击Add Webhooks

![image-20200427160008407](https://img.xing666.net/2020-04-27-080008.png)



到此配置完后可实现`gitlab`提交代码后，Jenkins自动拉取代码并构建。接下来我们来实现自动部署

### 自动部署

1. 配置Publish over SSH

   在Jenkins主页选择系统管理-系统配置，找到`Publish over SSH`配置项，添加`SSH Server`设置如下

![image-20200427160945127](https://img.xing666.net/2020-04-27-080945.png)

​		然后点击右下角高级，输入登录密码和端口，右下角 Test Configuration可以测试连接，显示Success表示成功

![image-20200427161133487](https://img.xing666.net/2020-04-27-081134.png)

![image-20200427161228236](https://img.xing666.net/2020-04-27-081229.png)

2. 在刚才新建的任务中配置构建后操作，配置完成后保存

![image-20200427161715895](https://img.xing666.net/2020-04-27-081716.png)



至此就全部配置完成，可以去`gitlab`提交代码测试一下，看Jenkins能否自动构建并打包部署。



折腾过一次，记录配置过程，以后再去配置就轻松很多，如果有哪些不清楚的地方可以留言

