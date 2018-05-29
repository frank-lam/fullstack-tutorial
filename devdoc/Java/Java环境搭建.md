by Frank, 2018/5/24

## Java Web 环境搭建

### 1.下载JDK（Java8为例）

- 下载地址：

		[Java SE Development Kit 8 - Downloads](http://www.oracle.com/technetwork/java/javase/downloads/j	dk8-downloads-2133151.html)

		[jdk-8u171-windows-x64.exe 一键下载地址](http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-windows-x64.exe?AuthParam=1527129569_16da17421367f457979a306ac9a85b08)

- 安装步骤参考如下：

		如何安装Java8？如何安装JDK8与配置环境变量_百度经验
	https://jingyan.baidu.com/article/7c6fb4282f1f6580642c90e1.html

- 配置环境变量

  `JAVA_HOME`：`C:\Program Files\Java\jdk1.8.0_171`

  `Path`：`%JAVA_HOME%\bin; `

- 验证

  ```shell
  C:\Users\Frank>where java
  C:\Program Files\Java\jdk1.8.0_171\bin\java.exe
  ```

### 2.Maven安装

- 官网下载：[Maven – Download Apache Maven](https://maven.apache.org/download.cgi)

- 配置环境变量

  `M2_HOME `：`D:\Program Files\apache-maven-3.5.3`

  `Path `：`%M2_HOME%\bin; `

- 验证（win+R 打开运行面板，然后输入CMD，打开命令提示符对话框，然后输入`mvn -version`）

  ```shell
  C:\Users\Frank>mvn -version
  Apache Maven 3.5.3 (3383c37e1f9e9b3bc3df5050c29c8aff9f295297; 2018-02-25T03:49:05+08:00)
  Maven home: D:\Program Files\apache-maven-3.5.3\bin\..
  Java version: 1.8.0_171, vendor: Oracle Corporation
  Java home: C:\Program Files\Java\jdk1.8.0_171\jre
  Default locale: zh_CN, platform encoding: GBK
  OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
  ```

  出现如上版本号，则说明maven配置成功

- **参考资料**

  - [windows10如何安装Maven_百度经验](https://jingyan.baidu.com/article/046a7b3e80bc06f9c27fa9bb.html)
  - [如何使用IntelliJ IDEA 配置Maven - CSDN博客](https://blog.csdn.net/westos_linux/article/details/78968012)

  

### 3.IntelliJ IDEA 中配置Tomcat







### 部署线上环境

（1）使用cmd命令行，就进入项目根目录。mvn执行：`mvn clean install package -Dmaven.test.skip=true`，生成`mango.jar`文件

（2）上传`mango.jar`文件至目录`/home/www/api.chengchijinfu.com`

（3）已定义service，直接执行`service mango start`（启动），`service mango stop`（停止）

注意：默认端口号为8080，通过nginx反向代理，api.chengchijinfu.com域名指向8080端口







Jenkins 

https://blog.csdn.net/l1028386804/article/details/78668879



在PowerShell窗口下执行maven命令行报错：Unknown lifecycle phase ".test.skip=true". - CSDN博客
https://blog.csdn.net/wushengjun753/article/details/78973618



不要使用PowerShell命令行模式，使用 cmd 进入命令行执行：

`mvn clean install package -Dmaven.test.skip=true`



`java -jar -Dserver.port=8090 mango.jar`



`nohup java -jar mango.jar > /dev/null 2>&1 &`



```
!/bin/sh
nohup java -jar mango.jar > /dev/null 2>&1 &
```


ps -ef | grep mango.jar



kill -9 2576







CentOS7利用systemctl添加自定义系统服务 - CSDN博客
https://blog.csdn.net/gbenson/article/details/51083817

**service**

`/etc/systemd/system`

```
[Unit]
Description=mango
After=syslog.target network.target

[Service]
Type=simple

ExecStart=/usr/bin/java -jar /home/www/api.chengchijinfu.com/mango.jar
ExecStop=/bin/kill -15 $MAINPID

User=root
Group=root

[Install]
WantedBy=multi-user.target

```



` systemctl start mango`

` systemctl stop mango`

` systemctl enable mango`

` systemctl disable mango`





`service mango start`

`service mango stop`



centos7通过yum安装JDK1.8 - CSDN博客
https://blog.csdn.net/a360616218/article/details/76736988



centos7通过yum安装JDK1.8 - CSDN博客
https://blog.csdn.net/a360616218/article/details/76736988









#### 5.Linux上利用nginx域名转发 - CSDN博客

https://blog.csdn.net/hzw2312/article/details/51789920



Nginx配置同一个域名http与https两种方式都可访问 - 陌上归人的博客 - 博客园
https://www.cnblogs.com/fjping0606/p/6006552.html





```
user  www www;

worker_processes auto;

error_log  /home/wwwlogs/nginx_error.log  crit;

pid        /usr/local/nginx/logs/nginx.pid;

#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 51200;

events
    {
        use epoll;
        worker_connections 51200;
        multi_accept on;
    }

http
    {
        include       mime.types;
        default_type  application/octet-stream;

        server_names_hash_bucket_size 128;
        client_header_buffer_size 32k;
        large_client_header_buffers 4 32k;
        client_max_body_size 50m;

        sendfile   on;
        tcp_nopush on;

        keepalive_timeout 60;

        tcp_nodelay on;

        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 64k;
        fastcgi_buffers 4 64k;
        fastcgi_busy_buffers_size 128k;
        fastcgi_temp_file_write_size 256k;

        gzip on;
        gzip_min_length  1k;
        gzip_buffers     4 16k;
        gzip_http_version 1.1;
        gzip_comp_level 2;
        gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml application/xml+rss;
        gzip_vary on;
        gzip_proxied   expired no-cache no-store private auth;
        gzip_disable   "MSIE [1-6]\.";

        #limit_conn_zone $binary_remote_addr zone=perip:10m;
        ##If enable limit_conn_zone,add "limit_conn perip 10;" to server section.

        server_tokens off;
        access_log off;

server {
    listen 80;
    listen 443 ssl;
    server_name api.chengchijinfu.com;
    ssl_certificate /home/key_dir/1_api.chengchijinfu.com_bundle.crt;
    ssl_certificate_key /home/key_dir/2_api.chengchijinfu.com.key;
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    location / {
    	proxy_pass http://127.0.0.1:8080/;
    }
 }
include vhost/*.conf;
}


```









