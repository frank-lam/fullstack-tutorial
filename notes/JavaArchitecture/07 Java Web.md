[TOC]



# 前言

在本文中将总结Java Web开发技术和相关框架的核心知识和面试指南。因框架知识体系比较庞大，具体每个框架的使用我将放在`../JavaWeb`这个目录下，包含Spring、Strust2、Hibernate、Spring Boot等框架。



- Spring
- Strust2
- Hibernate
- Spring MVC
- Spring Boot
- Dubbo



> 在面试指南中将罗列面试中常见的考点，包含Servlet、JSP、Spring、中间件等常考Java Web框架知识
>



# 一、Servlet & JSP

## 1. Servlet执行流程

JavaWeb（一）Servlet中的ServletConfig与ServletContext - 苦水润喉 - 博客园
http://www.cnblogs.com/zhangyinhua/p/7629099.html



JavaWeb（一）之细说Servlet - 苦水润喉 - 博客园
https://www.cnblogs.com/zhangyinhua/p/7625851.html





## 2. Servlet生命周期【阿里面经OneNote】

- **void init(ServletConfig servletConfig)** ：Servlet对象创建之后马上执行的初始化方法，只执行一次；
- **void service(ServletRequest servletRequest, ServletResponse servletResponse)** ：每次处理请求都是在调用这个方法，它会被调用多次；
- **void destroy() **：在Servlet被销毁之前调用，负责释放Servlet对象占用的资源的方法；

特性：

​	单例，一个类只有一个对象，当然可能存在多个Servlet类

​	线程不安全的，所以它的效率高。

Servlet类由自己编写，但对象由服务器来创建，并由服务器来调用相应的方法　



服务器启动时(web.xml中配置load-on-startup=1，默认为0)或者第一次请求该 servlet 时，就会初始化一个 Servlet 对象，也就是会执行初始化方法 init(ServletConfig conf)

该servlet对象去处理所有客户端请求，在service(ServletRequest req，ServletResponse res)方法中执行

最后服务器关闭时，才会销毁这个servlet对象，执行destroy()方法。



<div align="center"> <img src="D:/gitdoc/2019_campus_appy/notes/pics/servlet-life-cycle.png" width=""/></div><br/>

<div align="center"> <img src="D:/gitdoc/2019_campus_appy/notes/pics/servlet-life-cycle-detail.png" width=""/></div><br/>



**总结（面试会问）：**　　　

1）Servlet何时创建

​	默认第一次访问servlet时创建该对象（调用init()方法）

2）Servlet何时销毁

​	服务器关闭servlet就销毁了(调用destroy()方法)

3）每次访问必须执行的方法

​	public void service(ServletRequest arg0, ServletResponse arg1)





## 3. Tomcat装载Servlet的三种情况





## 4. 什么是JavaBean







## 5. Servlet中forward和redirect有什么区别【B172】

forward内部跳转 和redirect重定向跳转（外部跳转）的区别 - 简书
https://www.jianshu.com/p/5ad843665997





## 6. Jsp和Servlet的区别

- Servlet是一个特殊的Java程序，它运行于服务器的JVM中，能够依靠服务器的支持向浏览器提供显示内容。JSP本质上是Servlet的一种简易形式，JSP会被服务器处理成一个类似于Servlet的Java程序，可以简化页面内容的生成。Servlet和JSP最主要的不同点在于，Servlet的应用逻辑是在Java文件中，并且完全从表示层中的HTML分离开来。而JSP的情况是Java和HTML可以组合成一个扩展名为.jsp的文件。有人说，Servlet就是在Java中写HTML，而JSP就是在HTML中写Java代码，当然这个说法是很片面且不够准确的。JSP侧重于视图，Servlet更侧重于控制逻辑，在MVC架构模式中，JSP适合充当视图（view）而Servlet适合充当控制器 

1. 保存会话状态，有哪些方式、区别如何 

   - 由于HTTP协议本身是无状态的，服务器为了区分不同的用户，就需要对用户会话进行跟踪，简单的说就是为用户进行登记，为用户分配唯一的ID，下一次用户在请求中包含此ID，服务器据此判断到底是哪一个用户。  
     - ①URL 重写：在URL中添加用户会话的信息作为请求的参数，或者将唯一的会话ID添加到URL结尾以标识一个会话。  
     - ②设置表单隐藏域：将和会话跟踪相关的字段添加到隐式表单域中，这些信息不会在浏览器中显示但是提交表单时会提交给服务器。  

   这两种方式很难处理跨越多个页面的信息传递，因为如果每次都要修改URL或在页面中添加隐式表单域来存储用户会话相关信息，事情将变得非常麻烦。  

   - ③**补充：**[HTML5](http://lib.csdn.net/base/html5)中可以使用Web Storage技术通过JavaScript来保存数据，例如可以使用localStorage和sessionStorage来保存用户会话的信息，也能够实现会话跟踪。 

 

图解JSP与Servlet的关系 - 孟祥通 - 博客园
https://www.cnblogs.com/iOS-mt/p/5619440.html





## 7. tomcat和Servlet的联系

​	Tomcat 是Web应用服务器,是一个Servlet/JSP容器. Tomcat 作为Servlet容器,负责处理客户请求,把请求传送给Servlet,并将Servlet的响应传送回给客户.而Servlet是一种运行在支持Java语言的服务器上的组件.。

　　Servlet最常见的用途是扩展Java Web服务器功能,提供非常安全的,可移植的,易于使用的CGI替代品。

　　从http协议中的请求和响应可以得知，浏览器发出的请求是一个请求文本，而浏览器接收到的也应该是一个响应文本。

　　但是在上面这个图中，并不知道是如何转变的，只知道浏览器发送过来的请求也就是request，我们响应回去的就用response。忽略了其中的细节，现在就来探究一下。



<div align="center"> <img src="D:/gitdoc/2019_campus_appy/notes/pics/servlet-tomcat.png" width=""/></div><br/>

​	1）Tomcat将http请求文本接收并解析，然后封装成HttpServletRequest类型的request对象，所有的HTTP头数据读可以通过request对象调用对应的方法查询到。

　　2）Tomcat同时会要响应的信息封装为HttpServletResponse类型的response对象，通过设置response属性就可以控制要输出到浏览器的内容，然后将response交给tomcat，tomcat就会将其变成响应文本的格式发送给浏览器。

　　Java Servlet API 是Servlet容器(tomcat)和servlet之间的接口，它定义了serlvet的各种方法，还定义了Servlet容器传送给Servlet的对象类，其中最重要的就是ServletRequest和ServletResponse。

　　所以说我们在编写servlet时，需要实现Servlet接口，按照其规范进行操作。



参考资料：

- [JavaWeb（一）之细说Servlet - 苦水润喉 - 博客园](http://www.cnblogs.com/zhangyinhua/p/7625851.html#_lab2_0_1)





## 8. cookie和session的区别

- session 在服务器端，cookie 在客户端（浏览器） 
- session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id） 
- session 可以放在 文件、数据库、或内存中都可以。 
- 用户验证这种场合一般会用 session 
- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗  考虑到安全应当使用session。 
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。 
- 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。 



## 9. JavaEE中的三层结构和MVC

http://www.blogjava.net/crazycy/archive/2006/07/03/56387.html





# 二、Spring

## 1. Spring IOC、AOP的理解、实现的原理，以及优点 【蚂蚁金服面经】

### IOC

- **我的理解**
  - 正常的情况下，比如有一个类，在类里面有方法（不是静态的方法），调用类里面的方法，创建类的对象，使用对象调用方法，创建类对象的过程，需要new出来对象
  - 通过控制反转，把对象的创建不是通过new方式实现，而是交给Spring配置创建类对象



- **Spring IOC实现原理** 

  - 通过反射创建实例； 
  - 获取需要注入的接口实现类并将其赋值给该接口。 

  

- **优点**



### AOP

- **我的理解**

  - AOP（Aspect-Oriented Programming）指一种程序设计范型，该范型以一种称为切面（aspect）的语言构造为基础，切面是一种新的模块化机制，用来描述分散在对象、类或方法中的横切关注点（crosscutting concern）。 
  - "横切关注"是会影响到整个应用程序的关注功能，它跟正常的业务逻辑是正交的，没有必然的联系，但是几乎所有的业务逻辑都会涉及到这些关注功能。通常，事务、日志、安全性等关注就是应用中的横切关注功能。 

  

- **Spring AOP实现原理** 

  - 动态代理（利用反射和动态编译将代理模式变成动态的） 
  - JDK的动态代理 
    - JDKProxy返回动态代理类，是目标类所实现接口的另一个实现版本，它实现了对目标类的代理（如同UserDAOProxy与UserDAOImp的关系） 
  - cglib动态代理 
    - CGLibProxy返回的动态代理类，则是目标代理类的一个子类（代理类扩展了UserDaoImpl类） 



- **优点**





## 2. 介绍spring的IOC和AOP，分别如何实现(反射、动态代理) 





## 3. 什么是依赖注入，注入的方式有哪些

- **DI**
  - 所谓依赖注入，就是把底层类作为参数传入上层类，实现上层类对下层类的控制。DI依赖注入，向类里面属性注入值 ，依赖注入不能单独存在，需要在IOC基础上完成操作。
- - 使用set方法注入 
  - 使用有参构造注入 
  - 使用接口注入

  





## 5. Spring IOC初始化过程



## 6. Spring初始化哪个方法



## 7. AOP动态代理2种实现原理，他们的区别是什么？

这里补充两种实现！！！



- 动态代理与cglib实现的区别
  - JDK动态代理只能对实现了接口的类生成代理，而不能针对类. 
  - CGLIB是针对类实现代理，主要是对指定的类生成一个子类，覆盖其中的方法因为是继承，所以该类或方法最好不要声明成final。 
  - JDK代理是不需要以来第三方的库，只要JDK环境就可以进行代理 
  - CGLib 必须依赖于CGLib的类库，但是它需要类来实现任何接口代理的是指定的类生成一个子类，覆盖其中的方法，是一种继承 

 



## 8. Spring事务原理，如何实现





## 9. Spring中bean加载机制，生命周期（bean生成的具体步骤）





## 10. Spring的理解，如何进行bean的配置





## 11. Spring中autowire和resourse关键字的区别



## 12. Spring的注解讲一下，介绍Spring中的熟悉的注解





## 13. 项目中Spring AOP用在什么地方，为什么这么用，切点，织入，通知用自己的话描述一下







## 14. 介绍spring的IOC和AOP，容器的概念（本质就是applicationContext管理了classloader）





## 15. Spring何时创建applicationContext(web.xml中使用listener)





## 16. listener是监听哪个事件(ServletContext创建事件) springMVC流程具体叙述下 



## 17. Spring里面的工厂模式和代理模式，IO中的装饰者模式，挑几个最熟的能讲讲思路和伪代码实现





## 18. Struts拦截器和Spring AOP区别





# 二、SpringMVC

## 1. Spring MVC的工作原理

Spring MVC的工作原理如下图所示：  

![这里写图片描述](https://blog.csdn.net/sinat_22797429/article/details/76293284)

  

- ① 客户端的所有请求都交给前端控制器DispatcherServlet来处理，它会负责调用系统的其他模块来真正处理用户的请求。  
- ② DispatcherServlet收到请求后，将根据请求的信息（包括URL、HTTP协议方法、请求头、请求参数、Cookie等）以及HandlerMapping的配置找到处理该请求的Handler（任何一个对象都可以作为请求的Handler）。  
- ③在这个地方Spring会通过HandlerAdapter对该处理进行封装。  
- ④ HandlerAdapter是一个适配器，它用统一的接口对各种Handler中的方法进行调用。  
- ⑤ Handler完成对用户请求的处理后，会返回一个ModelAndView对象给DispatcherServlet，ModelAndView顾名思义，包含了数据模型以及相应的视图的信息。  
- ⑥ ModelAndView的视图是逻辑视图，DispatcherServlet还要借助ViewResolver完成从逻辑视图到真实视图对象的解析工作。  
- ⑦ 当得到真正的视图对象后，DispatcherServlet会利用视图对象对模型数据进行渲染。  
- ⑧ 客户端得到响应，可能是一个普通的HTML页面，也可以是XML或JSON字符串，还可以是一张图片或者一个PDF文件。 



## 2. SpringMVC流程具体叙述下  

## 3. Spring MVC注解的优点





# 三、Hibernate

## 1. 简述Hibernate常见优化策略。

- 制定合理的缓存策略（二级缓存、查询缓存）。  
- 采用合理的Session管理机制。  
- 尽量使用延迟加载特性。  
- 设定合理的批处理参数。  
- 如果可以，选用UUID作为主键生成器。  
- 如果可以，选用基于版本号的乐观锁替代悲观锁。  
- 在开发过程中, 开启hibernate.show_sql选项查看生成的SQL，从而了解底层的状况；开发完成后关闭此选项。  
- 考虑数据库本身的优化，合理的索引、恰当的数据分区策略等都会对持久层的性能带来可观的提升，但这些需要专业的DBA（数据库管理员）提供支持。 



## 2. Hibernate一级缓存与二级缓存之间的区别

- Hibernate的Session提供了一级缓存的功能，默认总是有效的，当应用程序保存持久化实体、修改持久化实体时，Session并不会立即把这种改变提交到数据库，而是缓存在当前的Session中，除非显示调用了Session的flush()方法或通过close()方法关闭Session。通过一级缓存，可以减少程序与数据库的交互，从而提高数据库访问性能。  
- SessionFactory级别的二级缓存是全局性的，所有的Session可以共享这个二级缓存。不过二级缓存默认是关闭的，需要显示开启并指定需要使用哪种二级缓存实现类（可以使用第三方提供的实现）。一旦开启了二级缓存并设置了需要使用二级缓存的实体类，SessionFactory就会缓存访问过的该实体类的每个对象，除非缓存的数据超出了指定的缓存空间。  
- 一级缓存和二级缓存都是对整个实体进行缓存，不会缓存普通属性，如果希望对普通属性进行缓存，可以使用查询缓存。查询缓存是将HQL或SQL语句以及它们的查询结果作为键值对进行缓存，对于同样的查询可以直接从缓存中获取数据。查询缓存默认也是关闭的，需要显示开启。 



## 3. Hibernate的理解















# 附录：参考资料



参考资料：

- [Java-Guide/Spring学习与面试.md at master · Snailclimb/Java-Guide](https://github.com/Snailclimb/Java-Guide/blob/master/%E4%B8%BB%E6%B5%81%E6%A1%86%E6%9E%B6/Spring%E5%AD%A6%E4%B9%A0%E4%B8%8E%E9%9D%A2%E8%AF%95.md)
- [biezhi/java-bible: 我的技术摘要](https://github.com/biezhi/java-bible)

参考面经：

- [阿里Java研发工程师实习面经_笔经面经_牛客网](https://www.nowcoder.com/discuss/72899?type=2&order=3&pos=509&page=1)

- [网易面经（Java开发岗） - Andya - 博客园](https://www.cnblogs.com/Andya/p/7456511.html )



