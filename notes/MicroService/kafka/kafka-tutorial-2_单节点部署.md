<!-- TOC -->

- [深入浅出 Kafka（二）单节点部署](#深入浅出-kafka二单节点部署)
    - [系统环境](#系统环境)
    - [一、宿主机部署](#一宿主机部署)
        - [安装 Zookeeper（可选择，自带或是独立的 zk 服务）](#安装-zookeeper可选择自带或是独立的-zk-服务)
        - [下载 Kafka](#下载-kafka)
        - [启动 Zookeeper 服务（可选择，自带或是独立的 zk 服务）](#启动-zookeeper-服务可选择自带或是独立的-zk-服务)
        - [启动 Kafka 服务](#启动-kafka-服务)
        - [创建 Topic](#创建-topic)
        - [查看 Topic](#查看-topic)
        - [产生消息](#产生消息)
        - [消费消息](#消费消息)
        - [删除 Topic](#删除-topic)
        - [查看描述 Topic 信息](#查看描述-topic-信息)
    - [二、容器化部署](#二容器化部署)
        - [1 Zookeeper + 1 Kafka](#1-zookeeper--1-kafka)
        - [与容器内的开发环境交互](#与容器内的开发环境交互)
    - [三、Kafka 配置说明](#三kafka-配置说明)
    - [参考资料](#参考资料)

<!-- /TOC -->


# 深入浅出 Kafka（二）单节点部署

> 单节点部署环境，主要用于学习与调试。集群化部署方案，请访问「深入浅出 Kafka（三）集群化部署」；若部署完单节点想进一步学习，请转向「深入浅出 Kafka（四）架构深入」。



## 系统环境

- CentOS 7.4
- Kafka 2.11



## 一、宿主机部署

### 安装 Zookeeper（可选择，自带或是独立的 zk 服务）

下载

```shell
wget https://mirrors.huaweicloud.com/apache/zookeeper/zookeeper-3.4.10/zookeeper-3.4.10.tar.gz
```

启动 

```SHELL
sh zkServer.sh start
```



### 下载 Kafka

从[官网下载](https://kafka.apache.org/downloads)Kafka 安装包，解压安装，或直接使用命令下载。

```shell
wget https://mirrors.huaweicloud.com/apache/kafka/1.1.0/kafka_2.12-1.1.0.tgz
```

解压安装

```shell
tar -zvxf kafka_2.11-1.0.0.tgz -C /usr/local/
cd /usr/local/kafka_2.11-1.0.0/
```

修改配置文件

```
vim config/server.properties
```

修改其中

```
log.dirs=data/kafka-logs
listeners=PLAINTEXT://192.168.72.133:9092
```

> 另外 advertised.listeners，是暴露给外部的 listeners，如果没有设置，会用 listeners



### 启动 Zookeeper 服务（可选择，自带或是独立的 zk 服务）

使用安装包中的脚本启动单节点 Zookeeper 实例：

```
bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
```



### 启动 Kafka 服务

使用 kafka-server-start.sh 启动 kafka 服务

前台启动

```
bin/kafka-server-start.sh config/server.properties
```

后台启动

```
bin/kafka-server-start.sh -daemon config/server.properties
```



### 创建 Topic

使用 kafka-topics.sh 创建但分区单副本的 topic test

```
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
```



### 查看 Topic

```
bin/kafka-topics.sh --list --zookeeper localhost:2181
```



### 产生消息

使用 kafka-console-producer.sh 发送消息

```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```



### 消费消息

使用 kafka-console-consumer.sh 接收消息并在终端打印

```
bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning
```



### 删除 Topic

```
bin/kafka-topics.sh --delete --zookeeper localhost:2181 --topic test
```



### 查看描述 Topic 信息

```shell
[root@localhost kafka_2.11-1.0.0]# bin/kafka-topics.sh --describe --zookeeper 
Topic:test      PartitionCount:1        ReplicationFactor:1     Configs:
        Topic: test     Partition: 0    Leader: 1       Replicas: 1     Isr: 1
```

第一行给出了所有分区的摘要，每个附加行给出了关于一个分区的信息。 由于我们只有一个分区，所以只有一行。

- Leader
  - 是负责给定分区的所有读取和写入的节点。 每个节点将成为分区随机选择部分的领导者。

- Replicas
  - 是复制此分区日志的节点列表，无论它们是否是领导者，或者即使他们当前处于活动状态。

- Isr
  - 是一组 “同步” 副本。这是复制品列表的子集，当前活着并被引导到领导者。



## 二、容器化部署

　　在上述的篇幅中，实现了宿主机上部署单节点环境（1 Zookeeper + 1 Kafka）。但是在不同环境配置上具有差异性，初学者入门需要进行复杂的配置，可能会造成配置失败。

　　使用 Docker 容器化部署可以实现开箱即用，免去了很多安装配置的时间。

### 1 Zookeeper + 1 Kafka

　　以 [wurstmeister/kafka - Docker Hub](https://hub.docker.com/r/wurstmeister/kafka/) 为例，使用 docker-compose 运行一个只有一个 ZooKeeper node 和一个 Kafka broker 的开发环境：

```yaml
version: '2'
services:
  zoo1:
    image: wurstmeister/zookeeper
    restart: unless-stopped
    hostname: zoo1
    ports:
      - "2181:2181"
    container_name: zookeeper

  # kafka version: 1.1.0
  # scala version: 2.12
  kafka1:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.72.133:9092
      KAFKA_ZOOKEEPER_CONNECT: "zoo1:2181"
      KAFKA_BROKER_ID: 1
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_CREATE_TOPICS: "stream-in:1:1,stream-out:1:1"
    depends_on:
      - zoo1
    container_name: kafka
```

　　这里利用了 wurstmeister/kafka 提供的环境参数 `KAFKA_CREATE_TOPICS` 使Kafka运行后自动创建 topics。



### 与容器内的开发环境交互

　　可以使用 `docker exec` 命令直接调用 kafka 容器内的脚本来进行创建/删除 topic，启动 console producer 等等操作。

　　如果本地存有与容器内相同的 Kafka 版本文件，也可以直接使用本地脚本文件。如上述 docker-compose.yml 文件所示，kafka1 的 hostname 即是 kafka1，端口为 9092，通过 kafka1:9092 就可以连接到容器内的 Kafka 服务。



**列出所有 topics** (在本地 kafka 路径下)

```shell
$ bin/kafka-topics.sh --zookeeper localhost:2181 --list
```

**列出所有 Kafka brokers**

```shell
$ docker exec zookeeper bin/zkCli.sh ls /brokers/ids
```



## 三、Kafka 配置说明

详细：[server.properties - Kafka 中文文档 - ApacheCN](http://kafka.apachecn.org/documentation.html#configuration)

```properties
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# see kafka.server.KafkaConfig for additional details and defaults

############################# Server Basics #############################

# The id of the broker. This must be set to a unique integer for each broker.
broker.id=0

############################# Socket Server Settings #############################

# The address the socket server listens on. It will get the value returned from 
# java.net.InetAddress.getCanonicalHostName() if not configured.
#   FORMAT:
#     listeners = listener_name://host_name:port
#   EXAMPLE:
#     listeners = PLAINTEXT://your.host.name:9092
listeners=PLAINTEXT://192.168.72.133:9092

# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092

# Maps listener names to security protocols, the default is for them to be the same. See the config documentation for more details
#listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SSL:SSL,SASL_PLAINTEXT:SASL_PLAINTEXT,SASL_SSL:SASL_SSL

# The number of threads that the server uses for receiving requests from the network and sending responses to the network
num.network.threads=3

# The number of threads that the server uses for processing requests, which may include disk I/O
num.io.threads=8

# The send buffer (SO_SNDBUF) used by the socket server
socket.send.buffer.bytes=102400

# The receive buffer (SO_RCVBUF) used by the socket server
socket.receive.buffer.bytes=102400

# The maximum size of a request that the socket server will accept (protection against OOM)
socket.request.max.bytes=104857600


############################# Log Basics #############################

# A comma separated list of directories under which to store log files
log.dirs=/tmp/kafka-logs

# The default number of log partitions per topic. More partitions allow greater
# parallelism for consumption, but this will also result in more files across
# the brokers.
num.partitions=1

# The number of threads per data directory to be used for log recovery at startup and flushing at shutdown.
# This value is recommended to be increased for installations with data dirs located in RAID array.
num.recovery.threads.per.data.dir=1

############################# Internal Topic Settings  #############################
# The replication factor for the group metadata internal topics "__consumer_offsets" and "__transaction_state"
# For anything other than development testing, a value greater than 1 is recommended for to ensure availability such as 3.
offsets.topic.replication.factor=1
transaction.state.log.replication.factor=1
transaction.state.log.min.isr=1

############################# Log Flush Policy #############################

# Messages are immediately written to the filesystem but by default we only fsync() to sync
# the OS cache lazily. The following configurations control the flush of data to disk.
# There are a few important trade-offs here:
#    1. Durability: Unflushed data may be lost if you are not using replication.
#    2. Latency: Very large flush intervals may lead to latency spikes when the flush does occur as there will be a lot of data to flush.
#    3. Throughput: The flush is generally the most expensive operation, and a small flush interval may lead to excessive seeks.
# The settings below allow one to configure the flush policy to flush data after a period of time or
# every N messages (or both). This can be done globally and overridden on a per-topic basis.

# The number of messages to accept before forcing a flush of data to disk
#log.flush.interval.messages=10000

# The maximum amount of time a message can sit in a log before we force a flush
#log.flush.interval.ms=1000

############################# Log Retention Policy #############################

# The following configurations control the disposal of log segments. The policy can
# be set to delete segments after a period of time, or after a given size has accumulated.
# A segment will be deleted whenever *either* of these criteria are met. Deletion always happens
# from the end of the log.

# The minimum age of a log file to be eligible for deletion due to age
log.retention.hours=168

# A size-based retention policy for logs. Segments are pruned from the log unless the remaining
# segments drop below log.retention.bytes. Functions independently of log.retention.hours.
#log.retention.bytes=1073741824

# The maximum size of a log segment file. When this size is reached a new log segment will be created.
log.segment.bytes=1073741824

# The interval at which log segments are checked to see if they can be deleted according
# to the retention policies
log.retention.check.interval.ms=300000

############################# Zookeeper #############################

# Zookeeper connection string (see zookeeper docs for details).
# This is a comma separated host:port pairs, each corresponding to a zk
# server. e.g. "127.0.0.1:3000,127.0.0.1:3001,127.0.0.1:3002".
# You can also append an optional chroot string to the urls to specify the
# root directory for all kafka znodes.
zookeeper.connect=localhost:2181

# Timeout in ms for connecting to zookeeper
zookeeper.connection.timeout.ms=6000


############################# Group Coordinator Settings #############################

# The following configuration specifies the time, in milliseconds, that the GroupCoordinator will delay the initial consumer rebalance.
# The rebalance will be further delayed by the value of group.initial.rebalance.delay.ms as new members join the group, up to a maximum of max.poll.interval.ms.
# The default value for this is 3 seconds.
# We override this to 0 here as it makes for a better out-of-the-box experience for development and testing.
# However, in production environments the default value of 3 seconds is more suitable as this will help to avoid unnecessary, and potentially expensive, rebalances during application startup.
group.initial.rebalance.delay.ms=0
```

- advertised.listeners and listeners 两个配置文件的区别：[kafka - advertised.listeners and listeners - fxjwind - 博客园](https://www.cnblogs.com/fxjwind/p/6225909.html?utm_source=tuicool&utm_medium=referral)



## 参考资料

- [CentOS7 下 Kafka 的安装介绍 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000012990954)

- 非常重要：[kafka 踩坑之消费者收不到消息 - kris - CSDN 博客](https://blog.csdn.net/qq_25868207/article/details/81516024)

- [kafka 安装搭建(整合 springBoot 使用) - u010391342 的博客 - CSDN 博客](https://blog.csdn.net/u010391342/article/details/81430402)

- [Zookeeper+Kafka 的单节点配置 - 紫轩弦月 - 博客园](https://www.cnblogs.com/ALittleMoreLove/archive/2018/07/31/9396745.html)

- [@KafkaListener 注解解密 - laomei - CSDN 博客](https://blog.csdn.net/sweatOtt/article/details/86714272)

- [使用Docker快速搭建Kafka开发环境 - 简书](https://www.jianshu.com/p/ac03f126980e)

  
