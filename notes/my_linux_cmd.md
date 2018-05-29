##  一、学习前准备

#### 帮助文档

- [Linux命令大全](http://man.linuxde.net/)（★★★），可以在上面找到你要查找的linux命令
- [Linux 命令大全](http://www.runoob.com/linux/linux-command-manual.html) | 菜鸟教程
- [Linux 教程](http://www.runoob.com/linux/linux-tutorial.html) | 菜鸟教程

#### Tab 补全
- `Tab` 补全是非常有用的一个功能，可以用来自动补全命令或文件名，省时准确。
- 未输入状态下连按两次 `Tab` 列出所有可用命令
- 已输入部分命令名或文件名，按 `Tab` 进行自动补全，多用你就肯定会喜欢的了。


#### 光标
- `up` 方向键上（可以调出输入历史执行记录，快速执行命令）
- `down` 方向键下（配合 up 选择历史执行记录）
- `Home` 移动光标到本行开头
- `End` 移动光标到本行结尾
- `PgUp` 向上翻页
- `PaDN` 向下翻页
- `Ctrl + C` 终止当前程序
- `Ctrl + L` 清屏 = `clear`命令（记住这个快捷键，比`clear`高效很多）

#### *man, info, help

1. `man`命令：Linux下的帮助指令，通过man指令可以查看Linux中的指令帮助、配置文件帮助和编程帮助等信息。 
2. `info`命令：Linux下info格式的帮助指令。就内容来说，info页面比man page编写得要更好、更容易理解，也更友好，但man page使用起来确实要更容易得多。
3. `help`命令：用于显示shell内部命令的帮助信息。help命令只能显示shell内部的命令帮助信息。而对于外部命令的帮助信息只能使用man或者info命令查看。

#### 远程连接工具
- [Xshell 5](http://rj.baidu.com/soft/detail/15201.html)
- [SecureCRT 6.6](http://download.csdn.net/download/u012104219/10209465)
- MobaXterm（强烈推荐！）

##  二、玩转Linux命令行之基础篇
在这里我将介绍10组最常用的基础命令行，也是Linux入门必备的命令行，必须牢记于心，学习的过程中可以在Linux上熟练。这也是作为一个计算机专业人士必须熟练操作的最低要求。

#### 1. cd , pwd
#### > cd
`cd`：cd命令用来切换工作目录至dirname。 其中dirName表示法可为绝对路径或相对路径。(cd = Change Directory) 

```linux
cd命令示例：

# 进入用户主目录
[root@localhost ~]# cd ~ 
# 返回进入此目录之前所在的目录
[root@localhost ~]# cd -
# 返回上级目录（若当前目录为“/“，则执行完后还在“/"；".."为上级目录的意思）；  
[root@localhost ~]# cd ..
# 返回上两级目录
[root@localhost ~]# cd ../..
# 把上个命令的参数作为cd参数使用。  
[root@localhost ~]# cd !$
```

#### > pwd

`pwd`：pwd命令以绝对路径的方式显示用户当前工作目录。(pwd = print working Directory)  
```
pwd命令示例：

[root@localhost ~]# pwd
/root
```

**总结**：cd用来切换目录，pwd用来打印工作目录。这两个是初学Linux的第一个命令行，也是任何操作的基础。  


#### 2. mkdir , cp , mv , rm , touch
#### > mkdir 
`mkdir`：mkdir命令用来创建目录。该命令创建由dirname命名的目录。如果在目录名的前面没有加任何路径名，则在当前目录下创建由dirname指定的目录；如果给出了一个已经存在的路径，将会在该目录下创建一个指定的目录。在创建目录时，应保证新建的目录与它所在目录下的文件没有重名。 (mkdir = make directory)
```
mkdir命令示例：

# 在/home/frank目录下创建文件夹"hellolinux"
[root@localhost ~]# mkdir /home/frank/hellolinux
[root@localhost /home/frank]# mkdir hellolinux

# 在目录/usr/meng下建立子目录test，并且只有文件主有读、写和执行权限，其他人无权访问
[root@localhost ~]# mkdir -m 700 /usr/meng/test
```
#### > cp
`cp`：cp命令用来将一个或多个源文件或者目录复制到指定的目的文件或目录。所有目标文件指定的目录必须是己经存在的，cp命令不能创建目录。如果没有文件复制的权限，则系统会显示出错信息。(cp = CoPy)
```
cp命令示例：

# 将文件file复制到目录/usr/men/tmp下，并改名为file1
[root@localhost ~]# cp file /usr/men/tmp/file1
# 复制目录aaa下所有到/bbb目录下，这时如果/bbb目录下有和aaa同名的文件，需要按Y来确认并且会略过aaa目录下的子目录。
[root@localhost ~]# cp aaa/* /bbb
```
#### > mv
`mv`：mv命令用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录中,将一组文件移至一个目标目录中。(mv = MoVe)
```
mv命令示例：

# 重命名，将~目录下的文件名frank.html修改为abby.html
[root@localhost ~]# mv frank.html abby.html
# 将目录/usr/men中的所有文件移到当前目录（用.表示）中
[root@localhost ~]# mv /usr/men/* .
```
#### > touch
`touch`：touch命令有两个功能：一是用于把已存在文件的时间标签更新为系统当前的时间（默认方式），它们的数据将原封不动地保留下来；二是用来创建新的空文件。(touch = touch 已经是全称了)
```
touch命令示例：

# 在当前目录下建立一个空文件ex2，然后，利用ls -l命令可以发现文件ex2的大小为0，表示它是空文件。
[root@localhost ~]# touch ex2
```

#### > rm

`rm`：rm命令可以删除一个目录中的一个或多个文件或目录，也可以将某个目录及其下属的所有文件及其子目录均删除掉。对于链接文件，只是删除整个链接文件，而原有文件保持不变。(rm = ReMove)  

**注意**：使用rm命令要格外小心。因为一旦删除了一个文件，就无法再恢复它。所以，在删除文件之前，最好再看一下文件的内容，确定是否真要删除。rm命令可以用-i选项，这个选项在使用文件扩展名字符删除多个文件时特别有用。使用这个选项，系统会要求你逐一确定是否要删除。这时，必须输入y并按Enter键，才能删除文件。如果仅按Enter键或其他字符，文件不会被删除。  

千万不要随便尝试`rm -rf /`这个命令行，否则系统会GG了。[知乎：不小心敲了 rm -rf / 后反应是怎样的？](https://www.zhihu.com/question/29438735)
```
touch命令示例：

# 删除当前目录下除隐含文件外的所有文件和子目录
[root@localhost ~]# rm -r *
# 删除当前目录下，后缀为.cmd的所有文件
[root@localhost ~]# rm *.cmd
```

#### 3. ls , ll
#### > ls
`ls`：ls命令用来显示目标列表，在Linux中是使用率较高的命令。ls命令的输出信息可以进行彩色加亮显示，以分区不同类型的文件。(ls = list)

```
ls命令示例：

# 显示当前目录下非影藏文件与目录
[root@localhost ~]# ls
anaconda-ks.cfg  install.log  install.log.syslog  satools

# 显示当前目录下包括影藏文件在内的所有文件列表（这里要注意：.开头的文件就是隐藏文件）
[root@localhost ~]# ls -a
.   anaconda-ks.cfg  .bash_logout   .bashrc  install.log         .mysql_history  satools  .tcshrc   .vimrc
..  .bash_history    .bash_profile  .cshrc   install.log.syslog  .rnd            .ssh     .viminfo

# 输出长格式列表
[root@localhost ~]# ls -1
anaconda-ks.cfg
install.log
install.log.syslog
satools

# 查看文件大小更适合阅读的方式，可以加上-h(h = human)人类更适合阅读的方式。
[root@localhost ~]# ls -lh
-rw-------.  1 root root 1.1K 9月   7 2015 anaconda-ks.cfg
-rw-r--r--   1 root root 408K 9月   9 2015 banner.zip
-rw-r--r--   1 root root   15 1月  15 15:54 C
-rw-r--r--   1 root root 1.7G 10月 26 2015 db_.sql
-rw-r--r--   1 root root  33M 10月 26 2015 db_.tar.gz

```
#### > ll
`ll`：ll并不是linux下一个基本的命令，它实际上是ls -l的一个别名。  我们可以通过修改`~/.bashrc`添加任何其他的命令别名。  
打开 `~/.bashrc`找到 #alias ll=’ls -l’，去掉前面的#就可以了。（关闭原来的终端才能使命令生效）  
`ll`安装点击[这里](https://www.cnblogs.com/kongzhongqijing/p/3488884.html)查看详情。用法和`ls`一样，这里就不重复了。


#### 4. vim , vi , nano
这一组的命令，我们介绍了文件编辑工具。这里介绍三种编辑工具，各有所长，根据自己的喜好来选择。我比较倾向于组合使用，发挥在Linux系统上文件编辑的最高效率。
#### > vim / vi
它们都是多模式编辑器，不同的是vim 是vi的升级版本，它不仅兼容vi的所有指令，而且还有一些新的特性在里面。所以在这里只要学习vim的基本操作就ok了，本节命令更适合实践演练和操作，故只推荐一个慕课（[点击这里](https://www.imooc.com/learn/111)），和学习的参考文档（[点击这里](http://man.linuxde.net/vi)）。


#### > nano
`nano`：nano是一个字符终端的文本编辑器，有点像DOS下的editor程序。它比vi/vim要简单得多，比较适合Linux初学者使用。某些Linux发行版的默认编辑器就是nano。

如果你没有安装nano编辑器的话，可以使用yum进行安装：`yum -y install nano`。

篇幅有限，对于nano编辑器感兴趣的请[点击这里](http://man.linuxde.net/nano)查看操作说明。

**总结**：想要像Geek一样在Linux上开发的话，必须对编辑工具做到行云流水，一定要花点时间记住所有的快捷键，看起来专业点（可以装逼）。

#### 5. find , locate/slocate
#### > find
`find`：find命令用来在指定目录下查找文件。
```
find命令示例：

# 在/home目录下查找以.txt结尾的文件名
[root@localhost ~]# find /home -name "*.txt"

# 基于正则表达式匹配文件路径
[root@localhost ~]# find . -regex ".*\(\.txt\|\.pdf\)$"
```

#### > locate/slocate
`locate/slocate`：locate命令和slocate命令都用来查找文件或目录。
```
locate/slocate命令示例：

# 搜索etc目录下所有以sh开头的文件
[root@localhost ~]# locate /etc/sh

# 搜索用户主目录下，所有以m开头的文件
[root@localhost ~]# locate ~/m

# 搜索用户主目录下，所有以m开头的文件，并且忽略大小写
[root@localhost ~]# locate -i ~/m

```
#### 6. wget
`wget`：wget命令用来从指定的URL下载文件。wget非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性，如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。这对从那些限定了链接时间的服务器上下载大文件非常有用。

```
wget命令示例：

# 使用wget下载单个文件
[root@localhost ~]# wget http://www.linuxde.net/testfile.zip

# 使用wget后台下载
[root@localhost ~]# wget -b http://www.linuxde.net/testfile.zip

# 当你打算进行定时下载，你应该在预定时间测试下载链接是否有效。我们可以增加--spider参数进行检查。
[root@localhost ~]# wget --spider URL

# 下载多个文件(filelist.txt保存了url信息，每行一个URL链接)
[root@localhost ~]# wget -i filelist.txt


```
#### 7. chmod 修改权限
`chmod`：chmod命令用来变更文件或目录的权限。在UNIX系统家族里，文件或目录权限的控制分别以**读取、写入、执行**3种一般权限来区分，另有3种特殊权限可供运用。用户可以使用chmod指令去变更文件与目录的权限，设置方式采用文字或数字代号皆可。符号连接的权限无法变更，如果用户对符号连接修改权限，其改变会作用在被连接的原始文件。  

- 权限范围的表示法如下：
- `u`：User，即文件或目录的拥有者；
- `g`：Group，即文件或目录的所属群组；
- `o`：Other，除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围；
- `a`：All，即全部的用户，包含拥有者，所属群组以及其他用户；
- `r`：读取权限，数字代号为“4”;
- `w`：写入权限，数字代号为“2”；
- `x`：执行或切换权限，数字代号为“1”；
- `-`：不具任何权限，数字代号为“0”；
- `s`：特殊功能说明：变更文件或目录的权限。


##### linux文件的用户权限的分析图
![image](https://morvanzhou.github.io/static/results/linux-basic/03-01-02.png)
- `Type`: 很多种 (最常见的是 - 为文件, d 为文件夹, 其他的还有l, n … 这种东西, 真正自己遇到了, 网上再搜就好, 一次性说太多记不住的).  
- `User`: 后面跟着的三个空是使用 User 的身份能对这个做什么处理 (r 能读; w 能写; x 能执行; - 不能完成某个操作).  
- `Group`: 一个 Group 里可能有一个或多个 user, 这些权限的样式和 User 一样.  
- `Others`: 除了 User 和 Group 以外人的权限  

```
chmod命令示例：

# 通常的修改形式是
[root@localhost ~]# chmod [谁][怎么修改] [哪个文件]

# 举个最简单的例子, 现在的 t1.py 是 ----rw-r--, 如果我们想让你(user)有读的能力. 下面这样改就行了.
[root@localhost ~]# chmod u+r t1.py
[root@localhost ~]# ls -l
-r--rw-r-- 1 frank frank 34 Oct 12 09:51 t1.py
```

这里的 u+r 很形象, User + read, 给 t1.py 这个修改.  
所以我们的修改形式就能总结出下面这样.

[谁]
- u: 对于 User 修改
- g: 对于 Group 修改
- o: 对于 Others 修改
- a: (all) 对于所有人修改

[怎么修改]
- +, -, =: 作用的形式, 加上, 减掉, 等于某些权限
- r, w, x 或者多个权限一起, 比如 rx

[哪个文件]
- 施加操作的文件, 可以为多个


##### 用数字表示rwx的权限
其中a,b,c各为一个数字，a表示User，b表示Group，c表示Other的权限。

r=4，w=2，x=1
- 若要rwx（可读、可写、可执行）属性，则4+2+1=7
- 若要rw-（可读、可写、不可执行）属性，则4+2=6
- 若要r-w（可读、不可写、可执行）属性，则4+1=5

```
示例：

chmod a=rwx file 和 chmod 777 file 效果相同
chmod ug=rwx,o=x file 和 chmod 771 file 效果相同
若用chmod 4755 filename可使此程式具有root的权限
```

#### 8. sudo
`sudo`：sudo命令用来以其他身份来执行命令，预设的身份为root。在/etc/sudoers中设置了可执行sudo指令的用户。若其未经授权的用户企图使用sudo，则会发出警告的邮件给管理员。用户使用sudo时，必须先输入密码，之后有5分钟的有效期限，超过期限则必须重新输入密码。


#### 9. ping , telnet , nc/netcat
这一组的命令主要用于测试网络连接状态，在很多配置的过程中有很重要的用途。
#### > ping
`ping`：ping命令用来测试主机之间网络的连通性。执行ping指令会使用ICMP传输协议，发出要求回应的信息，若远端主机的网络功能没有问题，就会回应该信息，因而得知该主机运作正常。
```
ping命令示例：

[root@localhost ~]# ping www.linuxde.net
PING host.1.linuxde.net (100.42.212.8) 56(84) bytes of data.
64 bytes from 100-42-212-8.static.webnx.com (100.42.212.8): icmp_seq=1 ttl=50 time=177 ms
64 bytes from 100-42-212-8.static.webnx.com (100.42.212.8): icmp_seq=2 ttl=50 time=178 ms
64 bytes from 100-42-212-8.static.webnx.com (100.42.212.8): icmp_seq=3 ttl=50 time=174 ms
64 bytes from 100-42-212-8.static.webnx.com (100.42.212.8): icmp_seq=4 ttl=50 time=177 ms
...按Ctrl+C结束

```

#### > telnet
`telnet`：telnet命令用于登录远程主机，对远程主机进行管理。telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务，而改用更安全的ssh方式了。但仍然有很多别的系统可能采用了telnet方式来提供远程登录，因此弄清楚telnet客户端的使用方式仍是很有必要的。

相比`ping`命令来说，telnet还可以测试某个IP的端口是否能够正常连通
```
telnet命令示例：

# 测试IP:60.191.124.150:8081 是否能够连接的通
[root@localhost ~]# telnet 60.191.124.150 8081

# 另外我们也可以用wget进行模拟下载来测试是否能够连通
[root@localhost ~]# wget 60.191.124.150:8081
```

#### > nc/netcat
`nc`：nc命令是netcat命令的简称，都是用来设置路由器。安装：`yum install nc`
```

# nc测试端口连接
[root@localhost ~]# nc -u -z -w 1 60.191.124.150 8081
```
#### 10. ifconfig , netstat
`ifconfig`：查看网络情况，`netstat`：显示网络状态信息  
#### >ifconfig
`ifconfig`：ifconfig命令被用于配置和显示Linux内核中网络接口的网络参数。用ifconfig命令配置的网卡信息，在网卡重启后机器重启后，配置就不存在。要想将上述的配置信息永远的存的电脑里，那就要修改网卡的配置文件了。
```
ifconfig示例：

[root@localhost ~]# ifconfig
eth0      Link encap:Ethernet  HWaddr 00:16:3E:00:1E:51  
          inet addr:10.160.7.81  Bcast:10.160.15.255  Mask:255.255.240.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:61430830 errors:0 dropped:0 overruns:0 frame:0
          TX packets:88534 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:3607197869 (3.3 GiB)  TX bytes:6115042 (5.8 MiB)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:16436  Metric:1
          RX packets:56103 errors:0 dropped:0 overruns:0 frame:0
          TX packets:56103 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:5079451 (4.8 MiB)  TX bytes:5079451 (4.8 MiB)
```
#### > netstat
`netstat`：netstat命令用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。[更多使用方法](http://man.linuxde.net/netstat)
```
netstat命令示例：

# 在netstat输出中显示 PID 和进程名称
[root@localhost ~]# netstat -pt

# 列出所有端口 (包括监听和未监听的)
netstat -a     #列出所有端口
netstat -at    #列出所有tcp端口
netstat -au    #列出所有udp端口        

...
```

---



##  三玩转Linux命令行之入门篇



#### 配置DNS
```
vi /etc/resolv.conf
nameserver 8.8.8.8

#立即生效
source /etc/profile
```






#### SSH连接

ssh -p 22 root@192.168.2.28

免密登录
sshpass -p [passwd] ssh -p [port] root@192.168.X.X

sshpass安装：sudo apt-get install sshpass
【随笔】ssh登录时如何直接在参数中加入登录密码 - linxiong - 博客园
https://www.cnblogs.com/linxiong945/p/4226211.html
SSH 登录一次 Linux, 都需要输入密码, 如果你登录次数很频繁, 而却你的密码又设置得很长, 这就非常麻烦. 还好, 我们可以通过提前设置一个”保密协议”, 来让你的 Linux 识别出哪些电脑能不用密码登录. 这就是 public/private rsa key.
ssh-keygen -t rsa

接着, 我们就要将这个生成好的 “公锁” 给复制去你的 被控制的 Linux. 指令结构还是和上面一样.

$ ssh-copy-id [被控制的用户名]@[它的ip] 




#### yum & apt-get 软件包工具  还有命令`rpm`

yum命令是在Fedora和RedHat以及SUSE中基于rpm的软件包管理器，它可以使系统管理人员交互和自动化地更细与管理RPM软件包，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。 
语法 
yum(选项)(参数) 

选项
-h：显示帮助信息；
-y：对所有的提问都回答“yes”；
-c：指定配置文件；
-q：安静模式；
-v：详细模式；
-d：设置调试等级（0-10）；
-e：设置错误等级（0-10）；
-R：设置yum处理一个命令的最大等待时间；
-C：完全从缓存中运行，而不去下载或者更新任何头文件。

参数
install：安装rpm软件包；
update：更新rpm软件包；
check-update：检查是否有可用的更新rpm软件包；
remove：删除指定的rpm软件包；
list：显示软件包的信息；
search：检查软件包的信息；
info：显示指定的rpm软件包的描述信息和概要信息；
clean：清理yum过期的缓存；
shell：进入yum的shell提示符；
resolvedep：显示rpm软件包的依赖关系；
localinstall：安装本地的rpm软件包；
localupdate：显示本地rpm软件包进行更新；
deplist：显示rpm软件包的所有依赖关系。





#### 后台程序运行 nohup

nohup命令可以将程序以忽略挂起信号的方式运行起来，被运行的程序的输出信息将不会显示到终端。

顺便补充一下Windows上命令后台运行的快捷键，start /b jupyter notebook

#### 文件授权

chmod chgrp chown

#### 重启和关机


重启命令：
1、reboot
2、shutdown -r now 立即重启
3、shutdown -r 5  5分钟后自动重启（时间可以自己设置）
4、shutdown -r 10:30 在时间为10:30时候重启（时间可以自己设置）

关机命令：
1、init 0
2、halt   
3、poweroff  
4、shutdown -h now 立刻关机
5、shutdown -h 5  5分钟后自动关机（时间可以自己设置）


#### 解压 tar / 压缩

unzip



#### 查看系统信息
- `uname -a`
- `lsb_release -a`
- `cat /etc/redhat-release`
- 查看操作系统位数 执行命令`getconf WORD_BIT`


#### linux系统dig和nslookup的安装
`# yum install bind-utils`




#### grep 和 ps 和 kill / killall

#### gcc

#### time date






#### 磁盘挂载类
mount

#### whereis whoami



#### 查看文件大小的命令 du/df

#### 查看服务
netstat -nlpt|grep 80 查看该端口号是否被占用



ps可以查看具体的进程信息，一般与管道符连接其他命令使用，如：grep

ps常用参数-ef/-aux，一般最常用还是-ef，例：ps -ef|grep mysql 查询mysql进程

top也可查看进程信息，而且是动态显示

whoami 查看当前登陆用户
who 查看多少用户在使用系统
date查看系统时间，可跟时间格式使用
cal查看日历，可跟年份，查看指定的年份
chkconfig --list     #查看系统服务启动
chkconfig iptables on  #开机启动该服务
chkconfig iptables off  #开机不启动该服务
service iptables start #启动该服务
service iptables restart #重启启该服务
ps -ef|grep mysql|grep -v grep|awk '{print $2}' ps -ef|grep mysql 是查询mysql服务的进程
|后的grep -v grep 是匹配不包含grep的行
awk是取查询结果的第几列，awk '{print $2}'则是取第二列的值
grep     无参数则显示匹配的行
-c         显示匹配的行数
-v         显示不匹配的行


#### 防火墙

service iptables stop
永久关闭：
chkconfig iptables off 


#### ln



#### Linux Screen 简单用法 图文教程

[Screen 基本使用](https://www.jiloc.com/42235.html)




#### 命令行清空快捷键
清屏 


#### Linux同步Internet时间
yum install -y ntpdate 
ntpdate time.nuri.net
.同步时间成功后调整硬件时间
#hwclock -w


#### 重启网卡
service network restart

#### 文件传输命令：rz、sz、scp
- 安装：`sudo yum install lrzsz -y`
- 使用：`rz`和`sz`很好的可以将本地和远程服务器进行数据传输
- 

#### nc 命令
nc -l -p 80




#### 系统32位还是64位
系统版本号和系统位数，使用命令 `cat /etc/issue && arch` 查看，如果是i386或者i686就是32位的，如果是x86_64就是64位的



初窥Linux 之 我最常用的20条命令 - CSDN博客
初窥Linux 之 我最常用的20条命令

基础教程：Linux 新手应该知道的 26 个命令_Linux教程_Linux公社-Linux系统门户网站
基础教程：Linux 新手应该知道的 26 个命令


RedHat Enterprise Linux 6.4使用yum安装出现This system is not registered to Red Hat Subscription Management - CSDN博客
http://blog.csdn.net/ytx2014214081/article/details/78468947



安装 - LAMP一键安装包
http://yumlamp.com/install.html



yum -y install subversion



Starting httpd: 
httpd: Syntax error on

line 221 of /etc/httpd/conf/httpd.conf: Syntax error on 
line 6 of /etc/httpd/conf.d/auth_mysql.conf: Cannot load /etc/httpd/modules/mod_auth_mysql.so into server: libmysqlclient.so.16: cannot open shared object file: No such file or directory
[FAILED]




#### linux查看当前目录空间
一、首先使用df -h 命令查看磁盘剩余空间，通过以下图看出/目录下的磁盘空间已经被占满。

- 查看某个文件夹的文件大小：du --max-depth 1 -lh  /var
- 查看某个文件的大小：du 文件名 -h
- 查看某个文件夹所在的挂载点：df  /home


如何更改linux文件目录拥有者及用户组_百度经验
https://jingyan.baidu.com/article/a501d80c19faa1ec620f5e6b.html