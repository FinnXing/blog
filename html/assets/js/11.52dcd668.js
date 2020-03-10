(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{333:function(t,e,s){t.exports=s.p+"assets/img/image-20200309113012905.106168bc.png"},343:function(t,e,s){"use strict";s.r(e);var a=s(3),v=Object(a.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"git服务器安装方法："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git服务器安装方法："}},[t._v("#")]),t._v(" git服务器安装方法：")]),t._v(" "),a("h3",{attrs:{id:"使用自动化运维oos安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用自动化运维oos安装"}},[t._v("#")]),t._v(" 使用自动化运维OOS安装")]),t._v(" "),a("p",[t._v("阿里云的云服务器管理控制台为用户提供了免费的“自动化运维OOS”服务，OOS是一种简单易用的自动化部署服务，用户可以通过资源模板来自动完成所有资源在在不同地域以及账户中心的部署和配置，用起来超级方便。")]),t._v(" "),a("blockquote",[a("p",[t._v("运维编排服务（简称OOS）是全面、免费的云上自动化运维平台，提供运维任务的管理和执行。典型使用场景包括：事件驱动运维，批量操作运维，定时运维任务，跨地域运维等，也可提供重要运维场景的审批、通知等功能。详细介绍参见https://help.aliyun.com/product/119529.html")])]),t._v(" "),a("p",[t._v("在OOS的管理后台界面中找到 "),a("strong",[t._v("常用运维任务-批量管理软件")]),t._v(" 菜单，选择操作中选择 "),a("strong",[t._v("常见软件包管理系统apt/yum")]),t._v("，操作内容如图所示，然后选择实例，点击立即执行，几秒钟完成安装，服务器中就有了git服务，可以远程登录服务器后使用"),a("code",[t._v("git --version")]),t._v("查看git版本。")]),t._v(" "),a("img",{staticStyle:{zoom:"25%"},attrs:{src:s(333),alt:"image-20200309113012905"}}),t._v(" "),a("h3",{attrs:{id:"自行手动安装git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#自行手动安装git"}},[t._v("#")]),t._v(" 自行手动安装git")]),t._v(" "),a("p",[t._v("这里以Centos为例，git的安装很简单，只需两条命令即可：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" curl-devel expat-devel gettext-devel openssl-devel zlib-devel perl-devel\nyum "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v("\n")])])]),a("p",[t._v("静待安装完成即可。")]),t._v(" "),a("h2",{attrs:{id:"git服务器配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git服务器配置"}},[t._v("#")]),t._v(" git服务器配置")]),t._v(" "),a("p",[t._v("git服务器安装完成以后，可以根据自己的需求配置服务器，下面以我自己的服务器为例，分享一下配置过程")]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[t._v("创建一个git用户，用来运行git服务")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("sudo adduser git\n")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("创建证书登录：")])]),t._v(" "),a("p",[t._v("收集所有需要的用户的公钥，就是用户的id_rsa.pub文件，把所有公钥导入到"),a("code",[t._v("/home/git/.ssh/authorized_keys")]),t._v("文件里，一行一个。")])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("初始化git仓库")])]),t._v(" "),a("p",[t._v("选定一个目录作为git仓库，我这里选择的是"),a("code",[t._v("/home/git/")]),t._v("，在"),a("code",[t._v("/git")]),t._v("目录下输入命令：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git init --bare test.git\n")])])]),a("p",[t._v("Git会创建一个裸仓库，具体什么是裸仓库以及"),a("code",[t._v("git init --bare")]),t._v("的作用请自行查阅。然后，把owner改为"),a("code",[t._v("git")]),t._v("：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("chown -R git:git test.git\n")])])])]),t._v(" "),a("li",[a("p",[a("strong",[t._v("可以通过"),a("code",[t._v("git clone")]),t._v("命令克隆远程仓库到本地")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git clone git@server:/home/git/test.git\n")])])])])]),t._v(" "),a("p",[t._v("至此git的基本配置就完成了。")]),t._v(" "),a("h2",{attrs:{id:"git-hooks-自动部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-hooks-自动部署"}},[t._v("#")]),t._v(" git hooks 自动部署")]),t._v(" "),a("p",[t._v("最初购买服务器的原因是双十一超级便宜就入手了一个基本的1核2g的ECS，打算用来放个人博客的，想在搭建git以后，本地写完博客提交git以后能直接自动更新博客，一步到位，这里就需要用到hooks自动部署了，以下是具体配置操作。")]),t._v(" "),a("p",[t._v("之前在配置git的时候我创建了一个"),a("code",[t._v("test.git")]),t._v("的裸仓库，裸仓库没有工作区，因为服务器上的git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，我需要把博客构建后的代码放在线上环境目录"),a("code",[t._v("/home/www")]),t._v("下。")]),t._v(" "),a("p",[t._v("需要早"),a("code",[t._v("hooks")]),t._v("下添加配置：")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("在线上环境目录"),a("code",[t._v("/home/www")]),t._v("拉取test.git")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git clone /home/git/test.git\n")])])])]),t._v(" "),a("li",[a("p",[t._v("给"),a("code",[t._v("www")]),t._v("目录权限：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("chmod -R 777 www \nchown -R git:git www\n")])])])]),t._v(" "),a("li",[a("p",[t._v("在git仓库添加钩子文件")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("cd /home/git/test.git/hooks/\ntouch post-receive \ntouch post-update\n")])])])]),t._v(" "),a("li",[a("p",[t._v("编辑post-receive钩子shell脚本")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vim post-receive\n")])])]),a("p",[t._v("添加以下代码后保存退出")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("cd /home/www/  \nenv -i git pull \n")])])])]),t._v(" "),a("li",[a("p",[t._v("编辑post-update钩子shell脚本")]),t._v(" "),a("p",[t._v("添加以下代码后保存退出")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("cd /home/www/  \nenv -i git pull \n")])])])])]),t._v(" "),a("p",[t._v("至此配置完成，可以愉快的在本地写博客了。")]),t._v(" "),a("p",[t._v("生命在于折腾，虽然配置完了，但是以后还是可能会碰到更多的问题，遇到问题，解决问题，记录问题和解决办法，在这个过程中不断学习成长。")])])}),[],!1,null,null,null);e.default=v.exports}}]);