---
title: 阿里云ECS服务器SSH配置
date: 2019-12-28
categories:
 - 服务器
tags:
 - 服务器
---
很早以前就想买个服务器自己玩一下（虽然我啥也不会），但是阿里云昂贵的价格让我望而却步，这次双十一发现了一个大好机会，以超低价格买了一台1核2G的ECS（三年，超开心）。买完以后进控制台一看，一脸懵，这是啥？我在哪儿？我该干什么？赶紧去通读一遍云服务器ECS的文档。于是先学习了一番SSH远程连接服务器，记录一下折腾过程。


## 首次远程连接服务器

阿里云的控制台自带了远程连接服务器的功能，具体操作如下：


- 打开阿里云控制台，进入云服务器ECS界面如下：

![](https://cdn.nlark.com/yuque/0/2020/png/1064826/1583499797008-0d68a4da-9dfb-4b01-b9fc-c2b2247d42af.png#align=left&display=inline&height=359&originHeight=1424&originWidth=2854&size=0&status=done&style=none&width=720)

- 点击左边菜单中的实例，进入实例界面，界面中展示了实例的具体情况，包括配置、IP、状态、到期时间等。

![](https://cdn.nlark.com/yuque/0/2020/png/1064826/1583499797046-a10541e8-1d7d-4f8a-b572-5dc2d4b400ef.png#align=left&display=inline&height=574&originHeight=574&originWidth=2406&size=0&status=done&style=none&width=2406)

- 点击右侧的**远程连接** ，首次连接会弹出远程连接密码，**记住此密码**，输入密码后连接成功。

- 点击实例列表左侧的**更多-密码和密钥**，可以修改**实例密码**和**远程连接密码**

## 使用终端工具连接服务器

修改实例密码和远程连接密码以后就可以使用终端工具连接服务器了，不需要再去控制台找连接功能，

- 服务器默认开启了SSH服务，默认端口为22，使用如下命令连接：`ssh root@服务器公网IP`

- 输入密码，连接成功

## 修改SSH默认端口

服务器提供的默认SSH监听端口22相对来说是不安全的，为了服务器的安全我们需要修改默认端口，为了防止配置后无法连接服务器，先保留22端口，添加10000~65535之间的端口号（10000以下可能会被系统或特殊软件占用），这里以22222为例，具体步骤如下：

- 连接服务器以后，使用命令`vim /etc/ssh/sshd_config`编辑配置文件，进去vim界面后按下键，找到`#Port 22`，按`i`键进入编辑状态，删除`#`注释，再在下面新增一行`Port 22222`，按`esc`退出，`:wq`保存。
- 查看SSH开放使用的端口：`semanage port -l|grep ssh`，我这里打印如下结果：`ssh_port_t tcp 22`。
- 打印结果告知我们没有给SSH开放22222端口，那么我们来添加此端口：`semanage port -a -t ssh_port_t -p tcp 22222`
- 完成后再次查看开放端口`semanage port -l|grep ssh`，打印结果：`ssh_port_t tcp 22 22222`。说明添加成功。

注意：以上操作使用semanage，如果系统提示没有请用一下命令安装：`yum install -y policycoreutils-python`

- 然后我们查看一下防火墙状态，默认应该是关闭状态，建议开启: `systemctl status firewalld`，如果打印结果显示`dead`说明是关闭状态，可以通过一下命令开启`systemctl start firewalld`
- 在防火墙开放22222端口：`firewall-cmd --permanent --query-port=22222/tcp`，打印`success`说明成功。
- 重新加载防火墙策略：`firewall-cmd --reload`
- 成功后查看22222端口是否开放：`firewall-cmd --permanent --query-port=10086/tcp`，打印`yes`表示已开启。
- 然后重启SSH服务、防火墙和服务器：`systemctl restart sshd`、`systemctl restart firewalld.service`、`shutdown -r now`。
- 最后在阿里云控制台修改安全策略，添加22222端口，进入安全组规则后点击右上角快速创建规则：

![](https://cdn.nlark.com/yuque/0/2020/png/1064826/1583499796841-197cfc77-d7df-4033-bd4a-e196ca998f98.png#align=left&display=inline&height=1246&originHeight=1246&originWidth=2858&size=0&status=done&style=none&width=2858)
![](https://cdn.nlark.com/yuque/0/2020/png/1064826/1583499796933-b3d49c98-1cf7-43c3-ac10-79b22dd97e5b.png#align=left&display=inline&height=1346&originHeight=1346&originWidth=1182&size=0&status=done&style=none&width=1182)
## 配置完成

- 使用`ssh root@服务器公网IP -p 22222`连接服务器，输入密码连接成功
- 连接成功以后建议关闭22端口，按上面步骤注释掉`Port 22`即可。

SSH配置至此已经配置好了，期间查了好多资料才搞定，以后得多学习一下这方面的知识。
