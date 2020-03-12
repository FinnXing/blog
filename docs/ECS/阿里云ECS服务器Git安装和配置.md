---
title: 阿里云ECS服务器Git安装和配置
date: 2020-03-08
categories:
 - 服务器
tags:
 - 服务器
---
## git服务器安装方法：

### 使用自动化运维OOS安装

阿里云的云服务器管理控制台为用户提供了免费的“自动化运维OOS”服务，OOS是一种简单易用的自动化部署服务，用户可以通过资源模板来自动完成所有资源在在不同地域以及账户中心的部署和配置，用起来超级方便。

> 运维编排服务（简称OOS）是全面、免费的云上自动化运维平台，提供运维任务的管理和执行。典型使用场景包括：事件驱动运维，批量操作运维，定时运维任务，跨地域运维等，也可提供重要运维场景的审批、通知等功能。详细介绍参见https://help.aliyun.com/product/119529.html

在OOS的管理后台界面中找到 **常用运维任务-批量管理软件** 菜单，选择操作中选择 **常见软件包管理系统apt/yum**，操作内容如图所示，然后选择实例，点击立即执行，几秒钟完成安装，服务器中就有了git服务，可以远程登录服务器后使用`git --version`查看git版本。

<img src="https://img.xing666.net/blog/img/image-20200309113012905.png" alt="image-20200309113012905" style="zoom: 25%;" />



### 自行手动安装git

这里以Centos为例，git的安装很简单，只需两条命令即可：

```shell
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-devel
yum install git
```

静待安装完成即可。



## git服务器配置

git服务器安装完成以后，可以根据自己的需求配置服务器，下面以我自己的服务器为例，分享一下配置过程

1. **创建一个git用户，用来运行git服务**

   ```
   sudo adduser git
   ```

2. **创建证书登录：**

   收集所有需要的用户的公钥，就是用户的id_rsa.pub文件，把所有公钥导入到`/home/git/.ssh/authorized_keys`文件里，一行一个。

3. **初始化git仓库**

   选定一个目录作为git仓库，我这里选择的是`/home/git/`，在`/git`目录下输入命令：

   ```
   git init --bare test.git
   ```

   Git会创建一个裸仓库，具体什么是裸仓库以及`git init --bare`的作用请自行查阅。然后，把owner改为`git`：

   ```
   chown -R git:git test.git
   ```

4. **可以通过`git clone`命令克隆远程仓库到本地**

   ```
   git clone git@server:/home/git/test.git
   ```



至此git的基本配置就完成了。



## git hooks 自动部署

最初购买服务器的原因是双十一超级便宜就入手了一个基本的1核2g的ECS，打算用来放个人博客的，想在搭建git以后，本地写完博客提交git以后能直接自动更新博客，一步到位，这里就需要用到hooks自动部署了，以下是具体配置操作。

之前在配置git的时候我创建了一个`test.git`的裸仓库，裸仓库没有工作区，因为服务器上的git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，我需要把博客构建后的代码放在线上环境目录`/home/www`下。

需要早`hooks`下添加配置：

1. 在线上环境目录`/home/www`拉取test.git

   ```
   git clone /home/git/test.git
   ```

2. 给`www`目录权限：

   ```
   chmod -R 777 www 
   chown -R git:git www
   ```

3. 在git仓库添加钩子文件

   ```
   cd /home/git/test.git/hooks/
   touch post-receive 
   touch post-update
   ```

4. 编辑post-receive钩子shell脚本

   ```
   vim post-receive
   ```

   添加以下代码后保存退出

   ```
   cd /home/www/  
   env -i git pull 
   ```

5. 编辑post-update钩子shell脚本

   添加以下代码后保存退出

   ```
   cd /home/www/  
   env -i git pull 
   ```



至此配置完成，可以愉快的在本地写博客了。

生命在于折腾，虽然配置完了，但是以后还是可能会碰到更多的问题，遇到问题，解决问题，记录问题和解决办法，在这个过程中不断学习成长。