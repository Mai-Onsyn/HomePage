# 失效原因

软件test-v0.6用的是github上的大佬部属的api 现在失效了很正常 因为这只是一个临时的解决办法

# Test-v0.6.1更新

支持自定义Sec-MS-GEC api服务器 只要该api返回的是JSON数据且包含"Sec-MS-GEC"和"Sec-MS-GEC-Version"这两个key即可

![图片](//i0.hdslb.com/bfs/article/e4e579d581ca1a75fbcb7d441c44e3a8544189344.png@!web-article-pic.avif)

VeloVoice中的配置项

![图片](//i0.hdslb.com/bfs/article/1f3568dcd9621579b7029c162a9bee1f544189344.png@!web-article-pic.avif)

浏览器访问配置的地址的结果

# 正题——本地api服务器部属

无法连接 解决办法显而易见 就是提供一个可用的api服务器

监控浏览器的网络活动需要python的mitmproxy 但我只会java 所以配置会有些繁琐 不过我已经尽量地简化了(吧

**事前声明**

**不要用主机运行 这个服务会频繁开关edge浏览器 启用该服务会使得edge浏览器无法使用**

**1.安装Python**

浏览器直接搜python下载之后安装就可以了 没什么难度 安装完之后按win+r输入cmd回车 打开cmd之后输入pip 出现类似下面这堆乱七八糟的就算是安装成功了

![图片](//i0.hdslb.com/bfs/article/1d89d3621efb0bada2ec5409977f8557544189344.png@1256w_942h_!web-article-pic.avif)

**2.安装mitmproxy**

在cmd中输入

```shell
pip install mitmproxy
```

等待安装完成后 输入以下命令运行一次

```shell
mitmdump
```

等个几秒钟之后按Ctrl+C或者直接关掉cmd退出

然后在C:\Users\YOUR_NAME\.mitmproxy中找到mitmproxy-ca.p12 像这样安装证书：

![图片](//i0.hdslb.com/bfs/article/4c1c1e44022396205eaef2cc9aa3fc3d544189344.gif@1256w_668h_!web-article-pic.avif)

**3.配置代理**

在设置-网络和Internet-代理中手动设置代理

![图片](//i0.hdslb.com/bfs/article/ed1a253b6a4b5598033b4ec1c0d7b16b544189344.png@1256w_744h_!web-article-pic.avif)

端口是api服务器的config.json中的"MITMProxyPort"的值

**4.启动服务器**

在我以往提供的网盘链接或是github上的Test-v0.6.1的Release下找到Sec-MS-GEC-ProxyServer-0.1.zip 下载并解压 进入目录 双击start.bat运行

如果无法运行 说明你的电脑里没有java或是java版本低于22 可以从[https://www.oracle.com/java/technologies/downloads/上下载jdk22或以上版本的java](https://www.oracle.com/java/technologies/downloads/) 解压之后和服务器的.jar文件放在一个文件夹下 就像这样：

![图片](//i0.hdslb.com/bfs/article/c028eb3ebf7c343bbdb2248e41501a78544189344.png@1256w_474h_!web-article-pic.avif)

然后用记事本打开start.bat 把里面的内容换成

```shell
#"./YOUR_JDK_FOLDER/bin/java.exe" -jar Sec-MS-GEC-ProxyServer-0.1.jar
#比如：
"./jdk-22.0.1/bin/java.exe" -jar Sec-MS-GEC-ProxyServer-0.1.jar
```

这样就能启动了

**5.使用api服务器**

如果你的服务器部属在虚拟机或局域网内的其他电脑 先在任务管理器里查看虚拟机的局域网ip地址(比如192.168.0.114) 然后访问http://<ip地址>:<config.json中配置的ServerPort>/api即可获取到Sec-MS-GEC 将这个网址添加到VeloVoice中的api地址输入框 TTS就复活辣！

**注意事项**

启动服务后 如果要关闭服务器 建议在服务器控制台中输入exit以退出 而非直接关闭cmd 因为如果直接关闭 mitmproxy不会自己关闭 需要手动在任务管理器里结束进程 不然再次启动没法用

# 结尾

如果有什么技术问题 可以评论或者私信 我大概会在3个星期之内回复的