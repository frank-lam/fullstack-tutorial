- [RESTful 架构详解](#restful-架构详解)
    - [1. 什么是REST](#1-什么是rest)
    - [2. RESTful的基本概念](#2-restful的基本概念)
    - [3. 理解RESTful](#3-理解restful)
        - [3.1 资源和URI](#31-资源和uri)
        - [3.2 统一资源接口](#32-统一资源接口)
        - [3.3 资源表述](#33-资源表述)
        - [3.4 资源的链接](#34-资源的链接)
        - [3.5 状态转移](#35-状态转移)
    - [4. RESTful的最佳设计](#4-restful的最佳设计)
- [参考资料](#参考资料)

# RESTful 架构详解

## 1. 什么是REST

REST (Representational State Transfer)，中文意思是：表述性状态转移。

一组架构约束条件和原则

如果一个架构符合 REST 的约束条件和原则，我们就称它为 RESTful 架构



## 2. RESTful的基本概念

1. 在 REST 中，一切的内容都被认为是一种资源
2. 每个资源都由 URI 唯一标识
3. 使用统一的接口处理资源请求（POST/GET/PUT/DELETE/HEAD）
4. 无状态（每次请求之前是无关联，没有 session ）

 

## 3. 理解RESTful

要理解RESTful架构，需要理解Representational State Transfer这个词组到底是什么意思，它的每一个词都有些什么涵义。

下面我们结合REST原则，围绕资源展开讨论，从资源的定义、获取、表述、关联、状态变迁等角度，列举一些关键概念并加以解释。

- 资源与URI
- 统一资源接口
- 资源的表述
- 资源的链接
- 状态的转移



### 3.1 资源和URI

1. 使用 `/` 来表示资源的层级关系
2. 使用 `?` 用来过滤资源
3. 使用 `_` 或者 `-` 让URI的可读性更好
4. `,` 或 `;` 可以用来表示同级资源的关系



### 3.2 统一资源接口

| 请求方法 | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| GET      | 获取某个资源。 幂等（取多少次结果都没有变化）                |
| POST     | 创建一个新的资源                                             |
| PUT      | 替换某个已有的资源（更新操作） ， 幂等（更新多次只保存一个结果） |
| DELETE   | 删除某个资源                                                 |
| HEAD     | 主要用于确认 URL 的有效性以及资源更新的日期时间等            |
| PATCH    | 新引入的，对PUT方法的补充，用来对已知资源进行局部更新        |



### 3.3 资源表述

上面提到，客户端通过 HTTP 方法可以获取资源，是吧? 不，确切的说，客户端获取的只是资源的表述而已。资源在外界的具体呈现，可以有多种表述(或成为表现、表示)形式，在客户端和服务端之间传送的也是资源的表述，而不是资源本身。 例如文本资源可以采用 html、xml、json 等格式，图片可以使用 PNG 或 JPG 展现出来。

资源的表述包括数据和描述数据的元数据，例如，HTTP 头 "Content-Type" 就是这样一个元数据属性。

那么客户端如何知道服务端提供哪种表述形式呢？

答案是可以通过 HTTP 内容协商，客户端可以通过 Accept 头请求一种特定格式的表述，服务端则通过 Content-Type 告诉客户端资源的表述形式。



MIME 类型

accept: text/xml   html文件

Content-Type告诉客户端资源的表述形式

 

### 3.4 资源的链接

 超媒体即应用状态引擎（可以做多层链接）

 https://api.github.com/repos/github

```
{
  "message": "Not Found",
  "documentation_url": "https://developer.github.com/v3"
}
```



### 3.5 状态转移

服务器端不应该保存客户端状态。

应用状态 -> 服务器端不保存应用状态

 

访问订单   根据接口去查询

访问商品   查询



## 4. RESTful的最佳设计

以豆瓣网为例

1. 应该尽量将 API 部署在专用域名之下 
   `http://api.douban.com`/v2/user/1000001?apikey=XXX

2. 应该将 API 的版本号放入 URL 
   `http://api.douban.com/v2`/user/1000001?apikey=XXX

3. 在 RESTful 架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的 ”集合”（collection），所以 API 中的名词也应该使用复数。


   http://api.douban.com/v2/`book`/:id (获取图书信息) 

   http://api.douban.com/v2/`movie`/subject/:id (电影条目信息) 

   http://api.douban.com/v2/`music`/:id (获取音乐信息) 

   http://api.douban.com/v2/`event`/:id (获取同城活动)

4. 对于资源的具体操作类型，由 HTTP 动词表示。常用的 HTTP 动词有下面四个(对应 **增/删/改/查** )。 

   **GET**（select）：从服务器取出资源（一项或多项）。 
   eg. 获取图书信息  【GET】 <http://api.douban.com/v2/book/:id>

   **POST**（create）：在服务器新建一个资源。 
   eg. 用户收藏某本图书  【POST】 <http://api.douban.com/v2/book/:id/collection>

   **PUT**（update）：在服务器更新资源（客户端提供改变后的完整资源）。 
   eg. 用户修改对某本图书的收藏  【PUT】 <http://api.douban.com/v2/book/:id/collection>

   **DELETE**（delete）：从服务器删除资源。 
   eg. 用户删除某篇笔记  【DELETE】 <http://api.douban.com/v2/book/annotation/:id>

5. 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果

   `?limit=10`：指定返回记录的数量
   eg. 获取图书信息  【GET】 <http://api.douban.com/v2/book/:id>`?limit=10`

6. 服务器向用户返回的状态码和提示信息 
   每个状态码代表不同意思, 就像代号一样

   HTTP状态码

   - 1系 信息

   - 2系 正常返回

   - 3系 重定向

   - 4系 数据异常

   - 5系 服务器异常

   业务状态码

 



# 参考资料

- [RESTful 架构详解 | 菜鸟教程](https://www.runoob.com/w3cnote/restful-architecture.html)
- [RESTful API 设计指南 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
