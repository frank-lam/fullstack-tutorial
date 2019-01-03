Linux命令之ll命令显示内容日期格式 - 师成 - 关注云计算,关注大数据 - CSDN博客
https://blog.csdn.net/ShrCheng/article/details/80833124



永久修改时间格式使用以下命令:

```bash
sudo echo "export TIME_STYLE='+%Y-%m-%d %H:%M:%S'" >> /etc/profile && source /etc/profile
```



CentOS设置DNS

通过编辑/etc/resolv.conf文件，往里边添加内容：

> nameserver 8.8.8.8
>
> nameserver 8.8.4.4

然后保存退出。这两个IP地址是谷歌公开的DNS。







CentOS修改时区、日期、时间 - kaynet - 博客园
https://www.cnblogs.com/kaynet/p/6409274.html



解决配置vim中文乱码的问题 - weixin_36250487的博客 - CSDN博客
https://blog.csdn.net/weixin_36250487/article/details/79888103