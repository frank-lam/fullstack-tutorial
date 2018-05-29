LNMP安装了哪些软件？安装目录在哪？ - LNMP一键安装包
https://lnmp.org/faq/lnmp-software-list.html

**phpmyadmin安装**

下载：`wget https://files.phpmyadmin.net/phpMyAdmin/4.8.0.1/phpMyAdmin-4.8.0.1-all-languages.zip`

解压：`unzip phpMyAdmin-4.8.0.1-all-languages.zip ` 



##### MySQL错误2003：Can’t connect to MySQL server (10060) 无法连接到远程服务器 解决方案

mysql server 端的端口被防火墙挡出，没有开放  





**一、修改/etc/mysql/my.conf**

找到bind-address = 127.0.0.1这一行 

改为bind-address = 0.0.0.0即可 





1、新建用户远程连接mysql数据库

grant all on *.* to ''@'%' identified by '123456' with grant option; 

flush privileges;

允许任何ip地址(%表示允许任何ip地址)的电脑用admin帐户和密码(123456)来访问这个mysql server。 注意admin账户不一定要存在。 





2、支持root用户允许远程连接mysql数据库

grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option; 



GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION; 



flush privileges; 



netstat -anp|grep 3306



**防火墙**

CentOS7使用firewalld打开关闭防火墙与端口 - 莫小安 - 博客园
https://www.cnblogs.com/moxiaoan/p/5683743.html



**注意：**你是不是设置了阿里云的安全组规则? 规则里没开3306,即使防火墙开了3306端口,外部还是不能访问的.

参考：[mysql3306远程无法telnet|云服务器 ECS - 开发者论坛](https://bbs.aliyun.com/read/166762.html?ordertype=asc&displayMode=1)

