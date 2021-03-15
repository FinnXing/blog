(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{492:function(t,e,s){"use strict";s.r(e);var v=s(4),_=Object(v.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"实现目标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现目标"}},[t._v("#")]),t._v(" 实现目标")]),t._v(" "),s("p",[t._v("自从有了服务器以后就一直在折腾我的小小的服务器，用"),s("code",[t._v("vuepress")]),t._v("搭建了梦寐已久的个人博客，之前是在服务器里搭建了"),s("code",[t._v("git")]),t._v("和"),s("code",[t._v("Nginx")]),t._v("，利用"),s("code",[t._v("githooks")]),t._v("实现自动部署，自从接触了"),s("code",[t._v("jenkins")]),t._v("以后就想要利用"),s("code",[t._v("jenkins")]),t._v("来实现以下自动构建和自动部署。这次的目标是，把博客代码迁移到"),s("code",[t._v("gitlab")]),t._v("私有仓库中，在本地写完文章"),s("code",[t._v("push")]),t._v("到"),s("code",[t._v("gitlab")]),t._v("后，"),s("code",[t._v("Jenkins")]),t._v("自动完成博客构建，然后部署到"),s("code",[t._v("Nginx")]),t._v("里，省去了本地"),s("code",[t._v("build")]),t._v("的过程。")]),t._v(" "),s("h2",{attrs:{id:"前期准备"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前期准备"}},[t._v("#")]),t._v(" 前期准备")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("gitlab")]),t._v("账号和私有项目（因为我的服务器配置太低，不能本地部署"),s("code",[t._v("gitlab")]),t._v("，只能使用线上"),s("a",{attrs:{href:"https://gitlab.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("gitlab.com"),s("OutboundLink")],1),t._v("）")]),t._v(" "),s("li",[t._v("服务器（我的服务器是阿里云ECS，1核2G）")]),t._v(" "),s("li",[t._v("服务器安装"),s("code",[t._v("Nginx")]),t._v("并配置完成和启动（具体安装方法请参照我博客中的"),s("a",{attrs:{href:"https://www.xing666.net/pages/20200317/",target:"_blank",rel:"noopener noreferrer"}},[t._v("教程"),s("OutboundLink")],1),t._v("）")]),t._v(" "),s("li",[t._v("服务器安装"),s("code",[t._v("Jenkins")]),t._v("并启动（我是使用"),s("code",[t._v("docker")]),t._v("部署的"),s("code",[t._v("Jenkins")]),t._v("服务，具体过程在此不详述）")])]),t._v(" "),s("h2",{attrs:{id:"配置工作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置工作"}},[t._v("#")]),t._v(" 配置工作")]),t._v(" "),s("h3",{attrs:{id:"插件安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#插件安装"}},[t._v("#")]),t._v(" 插件安装")]),t._v(" "),s("p",[t._v("Jenkins是需要安装以下插件：NodeJS插件、Gitlab插件、Git插件、Publish Over SSH插件")]),t._v(" "),s("p",[t._v("安装插件加速方法：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("你的Jenkins工作目录"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/updates "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#进入更新配置位置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sed")]),t._v(" -i "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'s/http:\\/\\/updates.jenkins-ci.org\\/download/https:\\/\\/mirrors.tuna.tsinghua.edu.cn\\/jenkins/g'")]),t._v(" default.json "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sed")]),t._v(" -i "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'s/http:\\/\\/www.google.com/https:\\/\\/www.baidu.com/g'")]),t._v(" default.json\n")])])]),s("h3",{attrs:{id:"创建任务-自动构建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#创建任务-自动构建"}},[t._v("#")]),t._v(" 创建任务-自动构建")]),t._v(" "),s("ol",[s("li",[t._v("创建一个新任务，选择构建自由风格的软件项目")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-072851.png",alt:"Snipaste_2020-04-27_11-02-20"}})]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("关联"),s("code",[t._v("gitlab")]),t._v("项目")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-073158.png",alt:"image-20200427153158137"}})]),t._v(" "),s("p",[t._v("凭据添加方法：")]),t._v(" "),s("p",[s("code",[t._v("Jenkins")]),t._v("主页点凭据-系统，然后点全局凭据，进入凭据列表，左侧添加凭据")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-074005.png",alt:"image-20200427154005349"}})]),t._v(" "),s("p",[t._v("在服务器中使用"),s("code",[t._v('ssh-keygen -t rsa -C "your_email@example.com"')]),t._v("生成"),s("code",[t._v("SSH key")]),t._v("，将生成的"),s("code",[t._v("id_rsa.pub")]),t._v("中的内容填入下面的"),s("code",[t._v("key")]),t._v("中，同时"),s("code",[t._v("gitlab")]),t._v("中也许新增此SSH密钥")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-074350.png",alt:"image-20200427154350370"}})]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("选择构建触发器")])]),t._v(" "),s("p",[t._v("构建触发器选择下面这项，记住"),s("code",[t._v("webhooks url")]),t._v("，稍后需要去"),s("code",[t._v("gitlab")]),t._v("中设置，然后点击图片右下角高级按钮，点击Generate按钮生成"),s("code",[t._v("token")]),t._v("，记下"),s("code",[t._v("token")]),t._v("，稍后需要去"),s("code",[t._v("gitlab")]),t._v("中设置。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-075056.png",alt:"image-20200427155055903"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-075135.png",alt:"image-20200427155134878"}})]),t._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[t._v("选择构建环境并编写shell脚本")])]),t._v(" "),s("p",[t._v("脚本里是在代码"),s("code",[t._v("push")]),t._v("以后拉取代码，然后执行"),s("code",[t._v("npm run docs:build")]),t._v("构建博客，然后进入构建后的目录并压缩。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-075432.png",alt:"image-20200427155432276"}})]),t._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[s("p",[s("code",[t._v("gitlab")]),t._v("中设置"),s("code",[t._v("webhooks")])]),t._v(" "),s("p",[t._v("在项目中选用户设置-Webhooks，填入刚刚记下的URL和token，下面的Enable SSL 选项要去掉勾选，点击Add Webhooks")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-080008.png",alt:"image-20200427160008407"}})]),t._v(" "),s("p",[t._v("到此配置完后可实现"),s("code",[t._v("gitlab")]),t._v("提交代码后，Jenkins自动拉取代码并构建。接下来我们来实现自动部署")]),t._v(" "),s("h3",{attrs:{id:"自动部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动部署"}},[t._v("#")]),t._v(" 自动部署")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("配置Publish over SSH")]),t._v(" "),s("p",[t._v("在Jenkins主页选择系统管理-系统配置，找到"),s("code",[t._v("Publish over SSH")]),t._v("配置项，添加"),s("code",[t._v("SSH Server")]),t._v("设置如下")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-080945.png",alt:"image-20200427160945127"}})]),t._v(" "),s("p",[t._v("​\t\t然后点击右下角高级，输入登录密码和端口，右下角 Test Configuration可以测试连接，显示Success表示成功")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-081134.png",alt:"image-20200427161133487"}})]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-081229.png",alt:"image-20200427161228236"}})]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("在刚才新建的任务中配置构建后操作，配置完成后保存")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://img.xing666.net/2020-04-27-081716.png",alt:"image-20200427161715895"}})]),t._v(" "),s("p",[t._v("至此就全部配置完成，可以去"),s("code",[t._v("gitlab")]),t._v("提交代码测试一下，看Jenkins能否自动构建并打包部署。")]),t._v(" "),s("p",[t._v("折腾过一次，记录配置过程，以后再去配置就轻松很多，如果有哪些不清楚的地方可以留言")])])}),[],!1,null,null,null);e.default=_.exports}}]);