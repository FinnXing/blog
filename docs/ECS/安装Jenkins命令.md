安装Jenkins命令 

docker run --name jenkins -itd -p 18080:8080 -p 50000:50000 jenkins/jenkins:lts

--name 指定名字

-itd 增加交互式终端，并且后台运行这条命令

![image-20200423154258946](https://img.xing666.net/2020-04-23-081421.jpg)

Ps:如果没有Jenkins的image，docker会自动下载Jenkins的image

安装完成后，使用docker ps | grep jenkins 命令看一下是否运行了起来

运行起来后我们就可以使用ip加端口号访问我们的Jenkins了

![image-20200423154609294](https://img.xing666.net/2020-04-23-081430.jpg)



首次打开会要求输入密码，在服务器中使用docker logs -f jenkins 命令打印日志，找到密码

![image-20200423154726931](https://img.xing666.net/2020-04-23-081436.jpg)

新手建议直接选择推荐插件

![image-20200423154910155](https://img.xing666.net/2020-04-23-081441.jpg)



插件加速
cd {你的Jenkins工作目录}/updates #进入更新配置位置
sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json

推荐插件

git client    gitlab 
Build With Parameters
ThinBackup
WMI Windows Agents
Build Timeout
AnsiColor
Folders
Dashboard View