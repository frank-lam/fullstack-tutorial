# Zookeeper
- [CAP定理](#CAP定理)
- [Zookeeper概述](#zookeeper概述)
	- [Zookeeper特点](#zookeeper特点)
	- [Zookeeper使用场景](#zookeeper使用场景)
	- [Zookeeper节点状态](#zookeeper节点状态)
	- [Zookeeper数据类型](#zookeeper数据类型)
	- [Zookeeper数据版本](#zookeeper数据版本)
	- [Zookeeper Watcher](#Watcher)
	- [Zookeeper Session](#Session)
	- [Zookeeper ACL](#ACL)
	- [Zookeeper ZAB](#ZAB)
		- [ZAB 选主流程](#选主流程)
		- [ZAB 数据同步](#数据同步)
		- [ZAB 过半同意](#过半同意)
- [Zookeeper运维](#Zookeeper运维)
	- [Zookeeper集群搭建](#Zookeeper集群搭建)
	- [Zookeeper集群监控](#Zookeeper集群监控)
	- [常用Shell操作](#常用shell操作)
	- [开源工具推荐](#开源工具推荐)

## CAP定理

在了解Zookeeper之前，首先需要了解在分布式系统（distributed system）中的基本定理：CAP定理
定义：**CAP定理指的是在一个分布式系统中，Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），三者不可兼得**。CAP定理的命名就是这三个指标的首字母。

- **Partition tolerance** 指的是在分布式系统中，由于不同的服务器之间可能无法通讯，所以需要一定的容错机制，默认情况下认为 Partition tolerance总是成立。

- **Consistency** 指的是在分布式系统中，不同的服务器上所存储的数据需要一致，可以理解成当服务器A执行操作数据的指令后，服务器B上也要应用同样的操作以保证其所提供的数据同A中的一致。
- **Availability** 指的是分布式系统中，每当服务端收到客户端的请求，服务端都必须给出回应。

为什么说这三者不能同时满足呢，其主要原因在于Consistency 和 Availability不可能同时成立。
假如要保证分布式系统的高数据一致性，则服务端之间一定要在同步后才能开放给客户端进行新的读写操作。即通过加锁同步操作使其可以被看成是一个原子的操作，而在锁定期间，服务端是无法提供服务的，这样服务端是无法做到高可用的，也就违背了Availability。
假如要保证分布式系统的高可用性，则服务端必须无时无刻给客户端提供服务。而服务端间数据同步的操作由于受到网络等因素的影响，无法实时的进行同步数据，假如服务器A上的数据进行了修改而尚未同步到服务器B上，所以此时服务器B所提供的数据就不是最新的，因而违反了Consistency 。

<div align="center"><img src="assets/CAP.jpg" width=""/></div>

## Zookeeper概述

ZooKeeper是一个分布式的、开放源码的分布式协调服务，是Google的Chubby一个开源的实现，是Hadoop和Hbase的重要组件。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。由于Hadoop生态系统中很多项目都依赖于zookeeper，如Pig，Hive等， 似乎很像一个动物园管理员，于是取名为Zookeeper。
Zookeeper官网地址为[http://zookeeper.apache.org/](http://zookeeper.apache.org/)。


## Zookeeper特点

- <b>顺序一致性</b> 从同一个客户端发起的事务请求，将会严格按照其发起顺序被应用到zookeeper中
- <b>原子性</b> 所有事物请求的处理结果在整个集群中所有机器上的应用情况是一致的，要么整个集群中所有机器都成功应用了某一事务，要么都没有应用某一事务，不会出现集群中部分机器应用了事务，另一部分没有应用的情况。
- <b>单一视图</b> 无论客户端连接的是哪个zookeeper服务端，其获取的服务端数据模型都是一致的。
- <b>可靠性</b> 一旦服务端成功的应用了一个事务，并完成对客户端的响应，那么该事务所引起的服务端状态变更将会一直保留下来，直到有另一个事务又对其进行了改变。
- <b>实时性</b> 一旦服务端成功的应用了一个事物，那客户端立刻能看到变更后的状态


## Zookeeper使用场景

- 名字服务
- 配置管理
- 集群管理
- 集群选举
- 分布式锁
- 队列管理
- 消息订阅

## Zookeeper节点状态

- LOOKING：寻找Leader状态，处于该状态需要进入选举流程
- LEADING：领导者状态，处于该状态的节点说明是角色已经是Leader
- FOLLOWING：跟随者状态，表示Leader已经选举出来，当前节点角色是Follower
- OBSERVER：观察者状态，表明当前节点角色是Observer，Observer节点不参与投票，只负责同步Leader状态

## Zookeeper数据类型

- Zookeeper的数据结构非常类似于文件系统。是由节点组成的树形结构。不同的是文件系统是由文件夹和文件来组成的树，而Zookeeper中是由Znode来组成的树。每一个Znode里都可以存放一段数据，Znode下还可以挂载零个或多个子Znode节点，从而组成一个树形结构。
- 节点类型
  - 持久化节点(PERSISTENT)：znode节点的数据不会丢失，除非是客户端主动delete
  - 持久化顺序节点(PERSISTENT_SEQUENTIAL)：znode节点会根据当前已经存在的znode节点编号自动加 1
  - 临时节点：临时节点(EPHEMERAL)：当session中断后会被删除
  - 临时顺序节点(EPHEMERAL_SEQUENTIAL)：znode节点编号会自动加 1，当session中断后会被删除

## Zookeeper数据版本

Zookeeper的每个ZNode上都会存储数据，对应到每个ZNode，Zookeeper都会为其维护一个叫做Stat的数据结构，Stat中记录的内容如下：

- cZxid: 节点创建时的zxid
- ctime: 节点创建时间
- mZxid: 最后一次更新的zxid
- mtime: 最后一次更新的时间
- pZxid: 子节点的最后版本
- cversion: 子节点数据更新次数
- dataVersion: 节点数据更新次数
- aclVersion: acl的变更次数
- ephemeralOwner: 如果znode是临时节点，则值为所有者的sessionId；如果不是临时节点，则为零
- dataLength: 节点的数据长度
- numChildren: 子节点个数


## Watcher

Watcher(事件监听器)是 Zookeeper提供的一种 发布/订阅的机制。Zookeeper允许用户在指定节点上注册一些 Watcher，并且在一些特定事件触发的时候，Zookeeper服务端会将事件通知给订阅的客户端。该机制是 Zookeeper实现分布式协调的重要特性。

- watcher特点
	- 轻量级：一个callback函数。
	- 异步性：不会block正常的读写请求。
	- 主动推送：Watch被触发时，由 Zookeeper 服务端主动将更新推送给客户端。
	- 一次性：数据变化时，Watch 只会被触发一次。如果客户端想得到后续更新的通知，必须要在 Watch 被触发后重新注册一个 Watch。
	- 仅通知：仅通知变更类型，不附带变更后的结果。
	- 顺序性：如果多个更新触发了多个 Watch ，那 Watch 被触发的顺序与更新顺序一致
- watcher使用注意事项。
	- 由于watcher是一次性的，所以需要自己去实现永久watch
	- 如果被watch的节点频繁更新，会出现“丢数据”的情况
	- watcher数量过多会导致性能下降


## Session

zookeeper会为每个客户端分配一个session，类似于web服务器一样，用来标识客户端的身份。

- Session作用
	-  客户端标识
	-  超时检查
	-  请求的顺序执行
	-  维护临时节点的生命周期
	-  watcher通知
- Session状态
	- CONNECTING
	- CONNECTED
	- RECONNECTING
	- RECONNECTED
	- CLOSED
- Session属性
	-  sessionID：会话ID，全局唯一
	-  TimeOut：会话超时时间
	-  TickTime：下次会话超时时间点
	-  isClosing：会话是否已经被关闭
- SessionID构造
	- 高8位代表创建Session时所在的zk节点的id
	- 中间40位代表zk节点当前角色在创建的时候的时间戳
	- 低16位是一个计数器，初始值为0


## ACL

在Zookeeper中，node的ACL是没有继承关系的。ACL表现形式:scheme:id:permissions。

- Scheme
	- World：它下面只有一个id, 叫anyone。world:anyone代表任何人都有权
	- Auth：通过user:password的形式认证，支持Kerberos
	- Digest：使用user:password的形式认证
	- Ip：通过IP的粒度来控制权限，支持网段
	- Super：对应的id拥有超级权限，可以做任何事情
- Permission
	- CREATE(c):  创建权限，可以在在当前node下创建child node
	- DELETE(d):  删除权限，可以删除当前的node
	- READ(r):  读权限，可以获取当前node的数据，可以list当前node所有的child nodes
	- WRITE(w):  写权限，可以向当前node写数据
	- ADMIN(a):  管理权限，可以设置当前node的permission


## ZAB

ZAB 是 ZooKeeper Atomic Broadcast （ZooKeeper 原子广播协议）的缩写，它是特别为 ZooKeeper 设计的崩溃可恢复的原子消息广播算法。ZooKeeper 使用 Leader来接收并处理所有事务请求，并采用 ZAB 协议，将服务器数据的状态变更以事务 Proposal 的形式广播到所有的 Follower 服务器上去。这种主备模型架构保证了同一时刻集群中只有一个服务器广播服务器的状态变更，因此能够很好的保证事物的完整性和顺序性。
Zab协议有两种模式，它们分别是恢复模式(recovery)和广播模式(broadcast)。当服务启动或者在leader崩溃后，Zab就进入了恢复模式，当leader被选举出来，且大多数follower完成了和leader的状态同步以后， 恢复模式就结束了，ZAB开始进入广播模式。


### 选主流程

当Leader崩溃或者Leader失去大多数的Follower时，Zookeeper处于恢复模式，在恢复模式下需要重新选举出一个新的Leader，让所有的 Server都恢复到一个正确的状态。Zookeeper的选举算法有两种：一种是基于basic paxos实现的，另外一种是基于fast paxos算法实现的。系统默认的选举算法为fast paxos。

- Basic paxos：当前Server发起选举的线程,向所有Server发起询问,选举线程收到所有回复,计算zxid最大Server,并推荐此为Leader，若此提议获得n/2+1票通过（过半同意）,此为Leader，否则重复上述流程，直到Leader选出。

- Fast paxos:某Server首先向所有Server提议自己要成为Leader，当其它Server收到提议以后，解决epoch和 zxid的冲突，并接受对方的提议，然后向对方发送接受提议完成的消息，重复这个流程，最后一定能选举出Leader。(即提议方解决其他所有epoch和 zxid的冲突,即为Leader)。


### 数据同步
当集群重新选举出Leader后，所有的Follower需要和Leader同步数据，确保集群数据的一致性。

- 数据同步方式
	- SNAP-全量同步
		- 条件：peerLastZxid<minCommittedLog
		- 说明：证明二者数据差异太大，follower数据过于陈旧，leader发送快照SNAP指令给follower全量同步数据，即leader将所有数据全量同步到follower
	- DIFF-增量同步
		- 条件：minCommittedLog<=peerLastZxid<=maxCommittedLog
		- 说明：证明二者数据差异不大，follower上有一些leader上已经提交的提议proposal未同步，此时需要增量提交这些提议即可
	- TRUNC-仅回滚同步
		- 条件：peerLastZxid>minCommittedLog
		- 说明：证明follower上有些提议proposal并未在leader上提交，follower需要回滚到zxid为minCommittedLog对应的事务操作
	- TRUNC+DIFF-回滚+增量同步
		- 条件：minCommittedLog<=peerLastZxid<=maxCommittedLog
		- 说明：leader a已经将事务truncA提交到本地事务日志中，但没有成功发起proposal协议进行投票就宕机了；然后集群中剔除原leader a重新选举出新leader b，又提交了若干新的提议proposal，然后原leader a重新服务又加入到集群中说明：此时a,b都有一些对方未提交的事务，若b是leader, a需要先回滚truncA然后增量同步新leader b上的数据。


### 过半同意
当数据同步完成后，集群开始从恢复模式进入广播模式，开始接受客户端的事物请求。
当只有Leader或少数机器批准执行某个任务时，则极端情况下Leader和这些少量机器挂掉，则无法保证新Leader知道之前已经批准该任务，这样就违反了数据可靠性。所以Leader在批准一个任务之前应该保证集群里大部分的机器知道这个提案，这样即使Leader挂掉，选举出来的新Leader也会从其他Follower处获取这个提案。而如果Leader要求所有Follower都同意才执行提案也不行，此时若有一个机器挂掉，Leader就无法继续工作，这样的话整个集群相当于单节点，无法保证可靠性。

## Zookeeper集群搭建

- 1.安装jdk，并且配置jdk的环境变量

- 2.去官网下载zookeeper的安装包，上传到linux集群环境下 <http://zookeeper.apache.org/>

- 3.解压安装包 `tar -zxvf zookeeper-X.X.X.tar.gz`

- 4.进入conf目录，复制zoo-sample.cfg为zoo.cfg,zoo.cfg及为Zookeeper的默认配置文件，我们通过修改zoo.cfg即可配置zookeeper

  -  修改dataDir路径
    指定zookeeper将数据保存在哪个目录下，如果不修改，默认在/tmp下，由于该目录下数据可能会被linux自动清理，所以一定要修改该路径

  - 修改服务器列表
    单机模式：在zoo.cfg中只配置一个server.id就是单机模式了
    伪分布式：在zoo.cfg中配置多个server.id，其中ip都是当前机器，而端口各不相同，这就是伪集群模式
    完全分布式：多台机器上各自配置server.id

    ```shell
    server.1=xxx.xxx.xxx.xxx:2888:3888
    server.2=xxx.xxx.xxx.xxx:2888:3888
    server.3=xxx.xxx.xxx.xxx:2888:3888
    ```

  - 在dataDir路径下生成myid文件
    在dataDir目录下cat一个叫myid的文件，写入你所分配给当前机器的server.id

- 5.Zookeeper操作指令

  和Redis，Mysql等服务类似,访问Zookeeper安装路径下的`bin/zkServer.sh` 即可完成对服务端的启动，停止等操作，具体参数可通过`bin/zkServer.sh --help`查询,以下是常用指令
  
  ```shell
  bin/zkServer.sh start #启动zookeeper服务
  bin/zkServer.sh stop #停止zookeeper服务
  bin/zkServer.sh restart #重启zookeeper服务
  bin/zkServer.sh status #查看服务器状态
  ```
  

注意！搭建在多台服务器上的Zookeeper都需要启动，如果不想一台一台的启动，可以通过编写批量启动的shell脚本通过ssh的方式实现对Zookeeper集群的管理。或者安装CDH等Hadoop 发行版实现对Zookeeper集群的管理

## Zookeeper集群监控
- 基础监控
	- CPU
	- 内存
	- 网络
	- IO
- 进程监控
	- CPU
	- 内存
	- IO
	- 连接数
	- FD数
- 端口监控
- 日志监控
- JVM监控
- JMX监控
- ZXID监控
- 四字监控
	- conf 获取当前zookeeper服务器的配置
	- envi 获取当前zookeeper服务器的环境变量
	- cons 获取当前zookeeper服务器的活跃连接
	- crst 重置当前zookeeper服务器所有连接的统计信息
	- srst 重置当前服务器的统计信息
	- srvr 输出服务器的详细信息。zk版本、接收/发送包数量、连接数、模式（leader/follower）、节点总数
	- stat 输出服务器的详细信息。zk版本、接收/发送包数量、连接数、模式（leader/follower）、节点总数、客户端列表
	- mntr 列出集群的健康状态。包括“接受/发送”的包数量、操作延迟、连接数、缓冲队列数、当前服务模式（leader/follower）、节点总数、watch总数、临时节点总数
	- ruok 返回“imok”表示正常，否则表示服务异常。
	- wchs 列出服务器watches的简洁信息：连接总数、watching节点总数和watches总数
	- wchc 通过session分组，列出watch的所有节点，它的输出是一个与 watch 相关的会话的节点列表。如果watches数量很大的话，将会产生很大的开销，会影响性能，小心使用。
	- wchp 通过路径分组，列出所有的 watch 的session id信息。它输出一个与 session 相关的路径。如果watches数量很大的话，将会产生很大的开销，会影响性能，小心使用。
	- dump 列出未经处理的会话和临时节点（只在leader上有效）


## 常用Shell操作

- 连接zookeeper客户端
  `bin/zkCli.sh [-server ip:port]` 
- 列出节点：
  `ls path [watch]`
- 创建节点：
  `create [-s] [-e] path data acl` 
- 获取节点：
  `get path [watch]`
- 更新操作：
  `set path data [version]`
- 删除操作：
  `delete path [version]`
- 批量执行：
  
  ```
  zkCli.sh -server localhost:2181 <<EOF  
  ls /
  get /
  quit
  EOF
  ```
- 分析snapshot文件：

```
#!/bin/sh

function help(){
        echo "-----------------"
        echo "HELP: $0 SnapshotFile"
        echo "-----------------"
        exit 1
}

if [ $# -ne 1 ]
then
        help
fi

file=$1
if [ ! -f $file ]
then
        echo "ERROR: $file not found"
        exit 1
fi
zkDir=/usr/local/zookeeper
JAVA_OPTS="$JAVA_OPTS -Djava.ext.dirs=$zkDir:$zkDir/lib"
java $JAVA_OPTS org.apache.zookeeper.server.SnapshotFormatter "$file"
```
- 分析log文件：

```
#!/bin/sh

function help(){
        echo "-----------------"
        echo "HELP: $0 LogFile"
        echo "-----------------"
        exit 1
}

if [ $# -ne 1 ]
then
        help
fi

LogFile=$1
if [ ! -f $LogFile ]
then
        echo "ERROR: $LogFile not found"
        exit 1
fi
zkDir=/usr/local/zookeeper
JAVA_OPTS="$JAVA_OPTS -Djava.ext.dirs=$zkDir:$zkDir/lib"
java $JAVA_OPTS org.apache.zookeeper.server.LogFormatter "$LogFile"
```

## 开源工具推荐
- zk抓包工具：[https://github.com/pyinx/zk-sniffer](https://github.com/pyinx/zk-sniffer)
- zk压测工具：[https://github.com/phunt/zk-smoketest](https://github.com/phunt/zk-smoketest)
- zk监控工具：[https://github.com/phunt/zktop](https://github.com/phunt/zktop)
- zkCli工具：[https://github.com/let-us-go/zkcli](https://github.com/let-us-go/zkcli)

