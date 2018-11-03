# 一、Docker 快速入门

## CentOS 7 安装 Docker

1. 先更新 yum 软件管理器，然后再安装 Docker

```shell
[root@localhost /] yum -y update
[root@localhost /] yum install -y docker
```

　　说明：上述 `-y` 代表选择程序安装中的 yes 选项

　　或是，直接安装 

```shell
yum install docker
```

2. 验证安装，查看 Docker 版本信息

```shell
[root@localhost /] docker -v
Docker version 1.13.1, build 8633870/1.13.1
You have new mail in /var/spool/mail/root
```

3. 启动 / 重启 / 关闭 Docker 

```shell
[root@localhost /] docker start
[root@localhost /] docker restart
[root@localhost /] docker stop
```



## Docker 镜像加速器

1. 加速器服务

   [DaoCloud 加速器，一行命令，镜像万千](https://www.daocloud.io/mirror)

2. 配置 Docker 加速器

　　以 Linux 为例

```shell
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

　　该脚本可以将 --registry-mirror 加入到你的 Docker 配置文件 /etc/docker/daemon.json 中。适用于 Ubuntu14.04、Debian、CentOS6 、CentOS7、Fedora、Arch Linux、openSUSE Leap 42.1，其他版本可能有细微不同。更多详情请访问文档。

　　删除 /etc/docker/daemon.json 中最后一个逗号，重启 Docker 服务即可



## Docker 常用命令

![docker-cmd](assets/docker-cmd.png)

### 1. 启动、停止、重启服务

```shell
[root@localhost ~]# service docker restart
Redirecting to /bin/systemctl restart docker.service
[root@localhost ~]# service docker stop
Redirecting to /bin/systemctl stop docker.service
[root@localhost ~]# service docker start
Redirecting to /bin/systemctl start docker.service
```

### 2. 拉取一个镜像，启动容器

```shell
[root@localhost ~]# docker pull centos
[root@localhost ~]# docker run -it -v /centos_dir:/docker_dir --name biodwhu-1 centos
```

- -i：允许我们对容器内的 (STDIN) 进行交互
- -t：在新容器内指定一个伪终端或终端
- -v：是挂在宿机目录， /centos_dir 是宿机目录，/docker_dir 是当前 Docker 容器的目录，宿机目录必须是绝对的。
- -p：端口映射
- --name：是给容器起一个名字，可省略，省略的话 docker 会随机产生一个名字

### 3. 启动的容器列表

```shell
[root@localhost ~]# docker ps
```

### 4. 查看所有的容器

```shell
[root@localhost ~]# docker ps -a
```

### 5. 启动、停止、重启某个容器

```shell
[root@localhost ~]# docker start biodwhu-1
biodwhu-1
[root@localhost ~]# docker stop biodwhu-2
biodwhu-2
[root@localhost ~]# docker restart biodwhu-3
biodwhu-3
```

### 6. 查看指定容器的日志记录

```shell
[root@localhost ~]# docker logs -f biodwhu-1
```

### 7. 删除某个容器，若正在运行，需要先停止

```shell
[root@localhost ~]# docker rm biodwhu-1
Error response from daemon: You cannot remove a running container 2d48fc5b7c17b01e6247cbc012013306faf1e54f24651d5e16d6db4e15f92d33. Stop the container before attempting removal or use -f
[root@localhost ~]# docker stop biodwhu-1
biodwhu-1
[root@localhost ~]# docker rm biodwhu-1
biodwhu-1
```

### 8. 删除容器

```shell
# 删除某个容器
[root@localhost ~]# docker rm f3b346204a39

# 删除所有容器
[root@localhost ~]# docker stop $(docker ps -a -q)
[root@localhost ~]# docker rm $(docker ps -a -q)
```

### 9. 删除镜像

```shell
# 删除某个镜像
[root@localhost ~]# docker rmi docker.io/mysql:5.6

# 删除所有镜像
[root@localhost ~]# docker rmi $(docker images -q)

# 强制删除所有镜像
[root@localhost ~]# docker rmi -f $(docker images -q)
```

### 10. 删除虚悬镜像

我们在 build 镜像的过程中，可能会产生一些临时的不具有名称也没有作用的镜像他们的名称一般都是 `<none>` ,我们可以执行下面的命令将其清除掉：

```shell
[root@localhost ~]# docker rmi $(docker images -f "dangling=true" -q)
# 或者
[root@localhost ~]# docker image prune -a -f
```

### 11. 镜像导入与导出

保存镜像

```shell
[root@localhost ~]# docker save a46c2a2722b9 > /var/docker/images_save/mysql.tar.gz
```

加载镜像

```shell
[root@localhost ~]# docker load -i /var/docker/images_save/mysql.tar.gz
```





# 二、Docker File 镜像构建

# 三、Docker Compose

## docker-compose 命令安装

Docker-Compose 是一个部署多个容器的简单但是非常必要的工具.

安装 Docker-Compose 之前，请先安装 python-pip

### 1. 安装 python-pip

1. 首先检查 Linux 有没有安装 python-pip 包，终端执行 pip -v

```shell
[root@localhost ~]# pip -V
-bash: pip: command not found
```

2. 没有 python-pip 包就执行命令

```shell
[root@localhost ~]# yum -y install epel-release
```

3. 执行成功之后，再次执行

```shell
[root@localhost ~]# yum -y install python-pip
```

4. 对安装好的 pip 进行升级

```shell
[root@localhost ~]# pip install --upgrade pip
```

### 2. 安装 Docker-Compose

1. 终端执行

```shell
[root@localhost ~]# pip install docker-compose
```

2. 检查 docker-compose 安装

```shell
[root@localhost ~]# docker-compose -version
```

参考资料：

- [CentOS7下安装Docker-Compose - YatHo - 博客园](https://www.cnblogs.com/YatHo/p/7815400.html)

## docker-compose.yml 规范





# 四、Docker 实战

## 实战1：快速搭建 MySQL

- 官方镜像仓库

  [https://hub.docker.com/_/mysql/](https://hub.docker.com/_/mysql/)

- docker-compose.yml

```yml
version: '3.1'
services:
  mysql:
    restart: always
    image: mysql:5.6
    container_name: mysql
    ports:
      - 3306:3306
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123456
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
      --max_allowed_packet=128M
      --sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO"
    volumes:
      - /usr/local/docker/mysql/mysql-data:/var/lib/mysql
```



## 实战2：快速搭建 phpmyadmin

- 官方镜像仓库

  [phpmyadmin/phpmyadmin](phpmyadmin/phpmyadmin)

- docker-compose.yml

```yml
version: '3.1'
services:
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin
    environment:
     - PMA_ARBITRARY=1
     - PMA_HOST=120.92.17.12
    # - PMA_PORT=3306
    # - PMA_USER=xxx
    # - PMA_PASSWORD=xxx
    restart: always
    ports:
     - 6060:80
    volumes:
     - /sessions
```



## Gitlab

```
version: '3'
services:
    web:
      image: 'twang2218/gitlab-ce-zh:10.5'
      restart: always
      hostname: '120.92.17.12'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://120.92.17.12:3000'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 3000
      ports:
        - '3000:3000'
        - '8443:443'
        - '2222:22'
      volumes:
        - /usr/local/docker/gitlab/config:/etc/gitlab
        - /usr/local/docker/gitlab/data:/var/opt/gitlab
        - /usr/local/docker/gitlab/logs:/var/log/gitlab
```



# 参考资料

- [docker前后分离笔记 - 小翼的前端天地](https://my-fe.pub/post/docker-front-and-backend-separation.html#toc-619)
