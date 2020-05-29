<!-- TOC -->

- [PostgreSQL](#postgresql)
    - [1. 什么是PostgreSql？](#1-什么是postgresql)
        - [知识点](#知识点)
        - [数据库排名](#数据库排名)
        - [官方网站](#官方网站)
        - [技术准备](#技术准备)
        - [使用环境](#使用环境)
        - [安装](#安装)
    - [2. 初来乍到数据库](#2-初来乍到数据库)
        - [知识点](#知识点-1)
        - [实战演习](#实战演习)
    - [3. 操作数据表](#3-操作数据表)
        - [知识点](#知识点-2)
        - [实战演习](#实战演习-1)
    - [4. 字段类型](#4-字段类型)
        - [PostgreSql的基础数据类型](#postgresql的基础数据类型)
    - [5. 添加表约束](#5-添加表约束)
        - [知识点](#知识点-3)
        - [实战演习](#实战演习-2)
            - [db.sql](#dbsql)
    - [6. INSERT语句](#6-insert语句)
        - [知识点](#知识点-4)
        - [实战演习](#实战演习-3)
            - [SQL部分](#sql部分)
    - [7. SELECT语句](#7-select语句)
        - [知识点](#知识点-5)
        - [实战演习](#实战演习-4)
            - [init.sql](#initsql)
            - [SQL实战](#sql实战)
    - [8. WHERE语句](#8-where语句)
        - [知识点](#知识点-6)
        - [实战演习](#实战演习-5)
    - [9. 数据抽出选项](#9-数据抽出选项)
        - [知识点](#知识点-7)
        - [实战演习](#实战演习-6)
    - [10. 统计抽出数据](#10-统计抽出数据)
        - [知识点](#知识点-8)
        - [实战演习](#实战演习-7)
    - [11. 方便的函数](#11-方便的函数)
        - [知识点](#知识点-9)
        - [实战演习](#实战演习-8)
    - [12. 更新和删除](#12-更新和删除)
        - [知识点](#知识点-10)
        - [实战演习](#实战演习-9)
    - [13. 变更表结构](#13-变更表结构)
        - [知识点](#知识点-11)
        - [实战演习](#实战演习-10)
    - [14. 操作多个表](#14-操作多个表)
        - [知识点](#知识点-12)
        - [实战演习](#实战演习-11)
            - [renew.sql](#renewsql)
            - [SQL实行](#sql实行)
    - [15. 使用视图](#15-使用视图)
        - [视图概念](#视图概念)
        - [简单解释](#简单解释)
        - [知识点](#知识点-13)
        - [实战演习](#实战演习-12)
        - [实战建议](#实战建议)
    - [16. 使用事务](#16-使用事务)
        - [知识点](#知识点-14)
        - [实战演习](#实战演习-13)
    - [参考资料](#参考资料)

<!-- /TOC -->

# PostgreSQL

> 本节参考：[PostgreSql入门](http://komavideo.com/postgresql/index.html)，特别感谢小马视频的学习课程，深入浅出了 PostgreSQL。在此基础上针对自己的学习过程，修改了部分内容。



本文为 PostgreSQL 入门指南，通过极简的语言，带你走进 PostgreSQL 世界的大门。

## 1. 什么是PostgreSql？

PostgreSQL 是一个自由的对象-关系数据库服务器(数据库管理系统)，是从伯克利写的 POSTGRES 软件包发展而来的。经过十几年的发展， PostgreSQL 是世界上可以获得的最先进的开放源码的数据库系统， 它提供了多版本并发控制，支持几乎所有SQL语句（包括子查询，事务和用户定义类型和函数），并且可以获得非常广阔范围的（开发）语言绑定 （包括C,C++,Java,perl,python,php,nodejs,ruby）。

### 知识点

* 面向关系的数据库
  + Oracle
  + MySql
  + SQLServer
  + PostgreSql
* NoSql
  + MongoDB
  + Redis

### 数据库排名

https://db-engines.com/en/ranking

### 官方网站

https://www.postgresql.org/

### 技术准备

* SQL语言基础

### 使用环境

* Ubuntu Server 16 LTS
* PostgreSql 9.5.x

### 安装

~~~bash
$ sudo apt-get install postgresql
$ psql --version
~~~



## 2. 初来乍到数据库

### 知识点

* psql的基础
* 数据库简单操作
* 写个SQL

### 实战演习

~~~bash
$ sudo su postgres
$ psql --version
$ psql -l
$ createdb komablog
$ psql -l
$ psql komablog
> help
> \h
> \?
> \l
> \q
$ psql komablog
> select now();
> select version();
> \q
$ dropdb komablog
$ psql -l
~~~



## 3. 操作数据表

### 知识点

* create table
* drop table
* psql使用

### 实战演习

~~~bash
$ sudo su postgres
$ createdb komablog
$ psql -l
$ psql komablog
> create table posts (title varchar(255), content text);
> \dt
> \d posts
> alter table posts rename to komaposts;
> \dt
> drop table komaposts;
> \dt
> \q
$ nano db.sql
...
create table posts (title varchar(255), content text);
...
$ psql komablog
> \i db.sql
> \dt
~~~



## 4. 字段类型

 ### 知识点

* PostgreSql的基础数据类型

### PostgreSql的基础数据类型

* 数值型：
  + integer(int)
  + real
  + serial
* 文字型：
  + char
  + varchar
  + text
* 布尔型：
  + boolean
* 日期型：
  + date
  + time
  + timestamp
* 特色类型：
  + Array
  + 网络地址型(inet)
  + JSON型
  + XML型

参考网站：

https://www.postgresql.org/docs/9.5/static/datatype.html



## 5. 添加表约束

### 知识点

- 表子段的约束条件

### 实战演习

#### db.sql

```sql
create table posts (
    id serial primary key,
    title varchar(255) not null,
    content text check(length(content) > 8),
    is_draft boolean default TRUE,
    is_del boolean default FALSE,
    created_date timestamp default 'now'
);

-- 说明
/*
约束条件：

not null:不能为空
unique:在所有数据中值必须唯一
check:字段设置条件
default:字段默认值
primary key(not null, unique):主键，不能为空，且不能重复
*/
```



## 6. INSERT语句

### 知识点

- insert into [tablename] (field, ...) values (value, ...)

### 实战演习

```sql
$ psql komablog
> \dt
> \d posts
```

#### SQL部分

```sql
> insert into posts (title, content) values ('', '');
> insert into posts (title, content) values (NULL, '');
> insert into posts (title, content) values ('title1', 'content11');
> select * from posts;
> insert into posts (title, content) values ('title2', 'content22');
> insert into posts (title, content) values ('title3', 'content33');
> select * from posts;
```



## 7. SELECT语句

### 知识点

- select 基本使用

### 实战演习

#### init.sql

```sql
create table users (
    id serial primary key,
    player varchar(255) not null,
    score real,
    team varchar(255)
);

insert into users (player, score, team) values
('库里', 28.3, '勇士'),
('哈登', 30.2, '火箭'),
('阿杜', 25.6, '勇士'),
('阿詹', 27.8, '骑士'),
('神龟', 31.3, '雷霆'),
('白边', 19.8, '热火');
```

#### SQL实战

```bash
$ psql komablog
> \i init.sql
> \dt
> \d users
> select * from users;
> \x
> select * from users;
> \x
> select * from users;
> select player, score from users;
```



## 8. WHERE语句

### 知识点

- where语句的使用

使用where语句来设定select,update,delete语句数据抽出的条件。

### 实战演习

```sql
> select * from users;
> select * from users where score > 20;
> select * from users where score < 30;
> select * from users where score > 20 and score < 30;
> select * from users where team = '勇士';
> select * from users where team != '勇士';
> select * from users where player like '阿%';
> select * from users where player like '阿_';
```



## 9. 数据抽出选项

### 知识点

select语句在抽出数据时，可以对语句设置更多的选项，已得到想要的数据。

- order by
- limit
- offset

### 实战演习

```sql
> select * from users order by score asc;
> select * from users order by score desc;
> select * from users order by team;
> select * from users order by team, score;
> select * from users order by team, score desc;
> select * from users order by team desc, score desc;
> select * from users order by score desc limit 3;
> select * from users order by score desc limit 3 offset 1;
> select * from users order by score desc limit 3 offset 2;
> select * from users order by score desc limit 3 offset 3;
```



## 10. 统计抽出数据

### 知识点

- distinct
- sum
- max/min
- group by/having

### 实战演习

```sql
> select distinct team from users;
> select sum(score) from users;
> select max(score) from users;
> select min(score) from users;
> select * from users where score = (select max(score) from users);
> select * from users where score = (select min(score) from users);
> select team, max(score) from users group by team;
> select team, max(score) from users group by team having max(score) >= 25;
> select team, max(score) from users group by team having max(score) >= 25 order by max(score);
```



## 11. 方便的函数

### 知识点

- length
- concat
- alias
- substring
- random

参考网站：

https://www.postgresql.org/docs/9.5/static/functions.html

### 实战演习

```sql
> select player, length(player) from users;
> select player, concat(player, '/', team) from users;
> select player, concat(player, '/', team) as "球员信息" from users;
> select substring(team, 1, 1) as "球队首文字" from users;
> select concat('我', substring(team, 1, 1)) as "球队首文字" from users;
> select random();
> select * from users order by random();
> select * from users order by random() limit 1;
```



## 12. 更新和删除

### 知识点

- update [table] set [field=newvalue,...] where ...
- delete from [table] where ...

### 实战演习

```sql
> update users set score = 29.1 where player = '阿詹';
> update users set score = score + 1 where team = '勇士';
> update users set score = score + 100 where team IN ('勇士', '骑士');
> delete from users where score > 30;
```



## 13. 变更表结构

### 知识点

- alter table [tablename] ...
- create index ...
- drop index ...

### 实战演习

```sql
> \d users;
> alter table users add fullname varchar(255);
> \d users;
> alter table users drop fullname;
> \d users;
> alter table users rename player to nba_player;
> \d users;
> alter table users alter nba_player type varchar(100);
> \d users;
> create index nba_player_index on users(nba_player);
> \d users;
> drop index nba_player_index;
> \d users;
```



## 14. 操作多个表

### 知识点

- 表结合查询的基础知识

### 实战演习

#### renew.sql

```sql
create table users (
    id serial primary key,
    player varchar(255) not null,
    score real,
    team varchar(255)
);
insert into users (player, score, team) values
('库里', 28.3, '勇士'),
('哈登', 30.2, '火箭'),
('阿杜', 25.6, '勇士'),
('阿詹', 27.8, '骑士'),
('神龟', 31.3, '雷霆'),
('白边', 19.8, '热火');

create table twitters (
    id serial primary key,
    user_id integer,
    content varchar(255) not null
);
insert into twitters (user_id, content) values
(1, '今天又是大胜,克莱打的真好!'),
(2, '今晚我得了60分,哈哈!'),
(3, '获胜咱不怕,缺谁谁尴尬.'),
(4, '明年我也可能转会西部'),
(5, '我都双20+了，怎么球队就是不胜呢?'),
(1, '明年听说有条大鱼要来,谁呀?');
```

#### SQL实行

```sql
$ dropdb komablog;
$ createdb komablog;
$ psql komablog;
> \i renew.sql
> select * from users;
> select * from twitters;
> select users.player, twitters.content from users, twitters where users.id = twitters.user_id;
> select u.player, t.content from users as u, twitters as t where u.id = t.user_id;
> select u.player, t.content from users as u, twitters as t where u.id = t.user_id and u.id = 1;
```



## 15. 使用视图

### 视图概念

视图（View）是从一个或多个表导出的对象。视图与表不同，视图是一个虚表，即视图所对应的数据不进行实际存储，数据库中只存储视图的定义，在对视图的数据进行操作时，系统根据视图的定义去操作与视图相关联的基本表。

### 简单解释

视图就是一个SELECT语句，把业务系统中常用的SELECT语句简化成一个类似于表的对象，便于简单读取和开发。

### 知识点

- 使用数据库视图(view)
  - create view ...
  - drop view ...

### 实战演习

```sql
> select u.player, t.content from users as u, twitters as t where u.id = t.user_id and u.id = 1;
> create view curry_twitters as select u.player, t.content from users as u, twitters as t where u.id = t.user_id and u.id = 1;
> \dv
> \d curry_twitters
> select * from curry_twitters;
> drop view curry_twitters;
> \dv
```

### 实战建议

在自己项目中，为了提高数据查询速度，可在表中加入索引index。同时对于经常需要查询的语句，可以提前建立视图view，方便于编码和管理。



## 16. 使用事务

数据库事务(Database Transaction) ，是指作为单个逻辑工作单元执行的一系列操作，要么完全地执行，要么完全地不执行。 事务处理可以确保除非事务性单元内的所有操作都成功完成，否则不会永久更新面向数据的资源。通过将一组相关操作组合为一个要么全部成功要么全部失败的单元，可以简化错误恢复并使应用程序更加可靠。一个逻辑工作单元要成为事务，必须满足所谓的ACID（原子性、一致性、隔离性和持久性）属性。事务是数据库运行中的逻辑工作单位，由DBMS中的事务管理子系统负责事务的处理。

### 知识点

- PostgreSql数据库事务使用
  - begin
  - commit
  - rollback

### 实战演习

```sql
> select * from users;
> begin;
> update users set score = 50 where player = '库里';
> update users set score = 60 where player = '哈登';
> commit;
> select * from users;
> begin;
> update users set score = 0 where player = '库里';
> update users set score = 0 where player = '哈登';
> rollback;
> select * from users;
```





## 参考资料

- [【小马技术】PostgreSql 关系型数据库入门_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/av24590479?from=search&seid=9519508000355338670)



