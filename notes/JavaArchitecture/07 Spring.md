

[TOC]



# 前言

为了更好的深入学习Spring核心技术，在这里整理了Spring相关的常见核心知识，和面试知识点，本文将通过浅显易懂的语言和代码实现，相信可以在最短的时间内进行巩固学习。

from 2018/7/27



本文参考：

- [理解并实现一个IOC容器](https://github.com/biezhi/java-bible/blob/master/ioc/index.md)
- [Java-Guide/Spring学习与面试.md at master · Snailclimb/Java-Guide](https://github.com/Snailclimb/Java-Guide/blob/master/%E4%B8%BB%E6%B5%81%E6%A1%86%E6%9E%B6/Spring%E5%AD%A6%E4%B9%A0%E4%B8%8E%E9%9D%A2%E8%AF%95.md)
- [一起来谈谈 Spring AOP！ - 掘金](https://juejin.im/post/5aa7818af265da23844040c6)
- [黑马程序员Spring2016学习笔记](https://github.com/Only-lezi/spring-learning/tree/master/spring-learning-article)
- [Spring学习总结（二）——静态代理、JDK与CGLIB动态代理、AOP+IoC - 张果 - 博客园](http://www.cnblogs.com/best/p/5679656.html)





# 一、Spring核心技术

## 1. IOC的概念

### 1.1 什么是IOC

IoC(Inversion of Control)，意为控制反转，不是什么技术，而是一种设计思想。Ioc意味着**将你设计好的对象交给容器控制，而不是传统的在你的对象内部直接控制**。

如何理解好Ioc呢？理解好Ioc的关键是要明确“谁控制谁，控制什么，为何是反转（有反转就应该有正转了），哪些方面反转了”，那我们来深入分析一下：

- **谁控制谁，控制什么**：传统Java SE程序设计，我们直接在对象内部通过new进行创建对象，是程序主动去创建依赖对象；而IoC是有专门一个容器来创建这些对象，即由Ioc容器来控制对 象的创建；谁控制谁？当然是IoC 容器控制了对象；控制什么？那就是主要控制了外部资源获取（不只是对象包括比如文件等）。
- **为何是反转，哪些方面反转了**：有反转就有正转，传统应用程序是由我们自己在对象中主动控制去直接获取依赖对象，也就是正转；而反转则是由容器来帮忙创建及注入依赖对象；为何是反转？因为由容器帮我们查找及注入依赖对象，对象只是被动的接受依赖对象，所以是反转；哪些方面反转了？依赖对象的获取被反转了。

**简单来说**

> 正转：比如有一个类，在类里面有方法（不是静态的方法），调用类里面的方法，创建类的对象，使用对象调用方法，创建类对象的过程，需要new出来对象
>
> 反转：把对象的创建不是通过new方式实现，而是交给Spring配置创建类对象



**下面举个例子说明说明是IOC：**

假设我们要设计一个Girl和一个Boy类，其中Girl有kiss方法，即Girl想要Kiss一个Boy。那么，我们的问题是，Girl如何能够认识这个Boy？

在我们中国，常见的ＭＭ与GG的认识方式有以下几种:

1. 青梅竹马
2. 亲友介绍
3. 父母包办

那么哪一种才是最好呢？ 　　

**青梅竹马：Girl从小就知道自己的Boy。**

```java
public class Girl {　
    void kiss(){ 
　　　 Boy boy = new Boy(); 
　　} 
} 
```

然而从开始就创建的Boy缺点就是无法在更换。并且要负责Boy的整个生命周期。如果我们的Girl想要换一个怎么办？（笔者严重不支持Girl经常更换Boy）

**亲友介绍：由中间人负责提供Boy来见面**

```java
public class Girl { 
　 void kiss(){ 
　　　 Boy boy = BoyFactory.createBoy();　　　
　 } 
}
```

亲友介绍，固然是好。如果不满意，尽管另外换一个好了。但是，亲友BoyFactory经常是以Singleton的形式出现，不然就是，存在于Globals，无处不在，无处不能。实在是太繁琐了一点，不够灵活。我为什么一定要这个亲友掺和进来呢？为什么一定要付给她介绍费呢？万一最好的朋友爱上了我的男朋友呢？

**父母包办：一切交给父母，自己不用费吹灰之力，只需要等着Kiss就好了。**

```java
public class Girl { 
　  void kiss(Boy boy){ 
　　　 // kiss boy　
　　　boy.kiss(); 
　　} 
}
```

Well，这是对Girl最好的方法，只要想办法贿赂了Girl的父母，并把Boy交给他。那么我们就可以轻松的和Girl来Kiss了。看来几千年传统的父母之命还真是有用哦。至少Boy和Girl不用自己瞎忙乎了。

**这就是IOC，将对象的创建和获取提取到外部。由外部容器提供需要的组件。**

### 1.2 IoC能做什么

IoC 不是一种技术，只是一种思想，一个重要的面向对象编程的法则，它能指导我们如何设计出松耦合、更优良的程序。传统应用程序都是由我们在类内部主动创建依赖对象，从而导致类与类之间高耦合，难于测试；有了IoC容器后，把创建和查找依赖对象的控制权交给了容器，由容器进行注入组合对象，所以对象与对象之间是松散耦合，这样也方便测试，利于功能复用，更重要的是使得程序的整个体系结构变得非常灵活。

其实IoC对编程带来的最大改变不是从代码上，而是从思想上，发生了“主从换位”的变化。应用程序原本是老大，要获取什么资源都是主动出击，但是在IoC/DI思想中，应用程序就变成被动的了，被动的等待IoC容器来创建并注入它所需要的资源了。

IoC很好的体现了面向对象设计法则之一—— 好莱坞法则：“别找我们，我们找你”；即由IoC容器帮对象找相应的依赖对象并注入，而不是由对象主动去找。

### 1.3 IoC和DI

**DI—Dependency Injection，即“依赖注入”**：组件之间依赖关系由容器在运行期决定，形象的说，即由容器动态的将某个依赖关系注入到组件之中。依赖注入的目的并非为软件系统带来更多功能，而是为了提升组件重用的频率，并为系统搭建一个灵活、可扩展的平台。通过依赖注入机制，我们只需要通过简单的配置，而无需任何代码就可指定目标需要的资源，完成自身的业务逻辑，而不需要关心具体的资源来自何处，由谁实现。

理解DI的关键是：“**谁依赖谁，为什么需要依赖，谁注入谁，注入了什么**”，那我们来深入分析一下：

- **谁依赖于谁：**当然是应用程序依赖于IoC容器；
- **为什么需要依赖：**应用程序需要IoC容器来提供对象需要的外部资源；
- **谁注入谁：**很明显是IoC容器注入应用程序某个对象，应用程序依赖的对象；
- **注入了什么：**就是注入某个对象所需要的外部资源（包括对象、资源、常量数据）。

IoC和DI由什么关系呢？其实它们是同一个概念的不同角度描述，由于控制反转概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护对象关系），所以2004年大师级人物Martin Fowler又给出了一个新的名字：“依赖注入”，相对IoC 而言，**“依赖注入”**明确描述了**“被注入对象依赖IoC容器配置依赖对象”**。

对于Spring Ioc这个核心概念，我相信每一个学习Spring的人都会有自己的理解。这种概念上的理解没有绝对的标准答案，仁者见仁智者见智。 理解了IoC和DI的概念后，一切都将变得简单明了，剩下的工作只是在框架中堆积木而已，下一节来看看Spring是怎么用的



### 1.4 IOC底层原理 (降低类之间的耦合度)

- 底层原理使用技术
  - xml配置文件
  - dom4j解决xml
  - 工厂设计模式
  - 反射
- 原理

```java
//伪代码
//需要实例化的类
public class UserService{
}

public class UserServlet{
    //得到UserService的对象
    //原始的做法：new 对象();  来创建
    
    //经过spring后
    UserFactory.getService();   //(下面两步的代码调用的)
}
```

**第一步：创建xml配置文件，配置要创建的对象类**

```xml
<bean id="userService" class="cn.blinkit.UserService"/>
```

**第二步：创建工厂类，使用dom4j解析配置文件+反射**

```java
public class Factory {
    //返回UserService对象的方法
    public static UserService getService() {
        //1.使用dom4j来解析xml文件  
        //根据id值userService，得到id值对应的class属性值
        String classValue = "class属性值";
        //2.使用反射来创建类对象
        Class clazz = Class.forName(classValue)；
        //创建类的对象
        UserService service = clazz.newInstance();
        return service;
    }
}
```

 

超详细原理讲解：[java-bible/4.principle.md at master · biezhi/java-bible](https://github.com/biezhi/java-bible/blob/master/ioc/4.principle.md)


<div align="center"> <img src="D:/gitdoc/2019_campus_appy/notes/pics/spring-ioc.png" width=""/></div><br/>





### 1.5 Spring中怎么用

#### （1）配置文件方式

我们在Spring中是这样获取对象的：

```java
public static void main(String[] args) {   
	ApplicationContext context = new FileSystemXmlApplicationContext("applicationContext.xml");   
	Lol lol = (Lol) context.getBean("lol");   
	lol.gank(); 
}
```

一起看看Spring如何让它生效呢，在 `applicationContext.xml` 配置文件中是酱紫的：

```xml
<bean id="lol" class="com.biezhi.test.Lol">
	<property name="name" value="剑圣" />   
</bean>  
```

`Lol` 类是这样的：

```java
public class Lol {

	private String name;
	
	public Lol() {
	}
	
	public void gank(){
		System.out.println(this.name + "在gank!!");
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
```

上面的代码运行结果自然是 `剑圣在gank!!`。

#### （2）注解方式

Spring更高级的用法，在3.0版本之后有了基于Annotation的注入实现，为毛每次都要配置 `Xml` 看到都蛋疼。。

首先还是要在 `xml` 中配置启用注解方式

```xml
<context:annotation-config/>  
```

这样就能使用注解驱动依赖注入了，下面是一个使用场景

```java
public class Lol {

	@Autowired
	private DuangService duangService ;
	
	public void buyDuang(String name, int money) {
		duangService.buy(name, money);
	}
}
```

```java
@Service("duangService")
public class DuangService {
	
	public void buy(String name, int money){
		if(money > 0){
			System.out.println(name + "买了" + money + "毛钱的特效，装逼成功！");
		} else{
			System.out.println(name + "没钱还想装逼，真是匪夷所思");
		}
	}
}
```

这只是一个简单的例子，剑圣打野的时候想要买5毛钱的三杀特效，嗯。。虽然不符合逻辑

此时 `DuangService` 已经注入到 `Lol` 对象中，运行代码的结果（这里是例子，代码不能运行的）就是：

```java
德玛买了5毛钱的特效，装逼成功！
```



## 2. DI（依赖注入）

### 2.1 什么是依赖注入

在依赖注入的模式下，创建被调用者得工作不再由调用者来完成，创建被调用者实例的工作通常由Spring容器完成，然后注入调用者。**创建对象时，向类里的属性设置值**



### 2.2 为什么使用依赖注入

为了实现代码/模块之间松耦合。



### 2.3 为什么要实现松耦合

上层调用下层，上层依赖于下层，当下层剧烈变动时上层也要跟着变动，这就会导致模块的复用性降低而且大大提高了开发的成本。

一般情况下抽象的变化概率很小，让用户程序依赖于抽象，实现的细节也依赖于抽象。即使实现细节不断变动，只要抽象不变，客户程序就不需要变化。这大大降低了客户程序与实现细节的耦合度。



### 2.4 IOC和DI区别

1. IOC控制反转，把对象创建交给Spring配置 
2. DI依赖注入，向类里面属性注入值 
3. 关系，依赖注入不能单独存在，需要在IOC基础上完成操作



### 2.5 依赖注入方式

1. 使用set方法注入 

2. 使用有参构造注入 

3. 使用接口注入

说明：Spring框架中支持前两种方式



#### （1）使用set方法注入

```xml
<bean id="person" class="cn.wang.property.Person">
<!--set方法注入属性
    name属性值：类中定义的属性名称
    value属性值：设置具体的值
-->
        <property name="pname" value="zs"></property>
</bean>1234567
```

#### （2）使用有参构造注入

```java
public class Person {
    private String pname;

    public void setPname(String pname) {
        this.pname = pname;
    }
}
```

```xml
<bean id="user" class="cn.wang.ioc.User">
        <!--构造方法注入属性-->
        <constructor-arg name="pname" value="Tony"></constructor-arg>
</bean>
```

#### （3）注入对象类型属性 

- 创建service和dao类，在service中得到dao 

具体实现过程 

- 在service中把dao作为属性，生成dao的set方法

```java
public class UserService {
    // 1.定义UserDao类型属性
    private UserDao userDao;

    // 2.生成set方法
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

1. 配置文件注入关系

```java
<bean id="userDao" class="cn.wang.property.UserDao">
        <property name="name" value="Tom"></property>
    </bean>
    <bean id="userService" class="cn.wang.property.UserService">
        <!--name属性值：UserService类里的属性名称-->
        <!--ref属性:UserDao类配置bean标签中的id值-->
        <property name="userDao" ref="userDao"></property>
    </bean>12345678
```

#### （4）p名称空间注入 

![p名称空间注入](../pics/ioc-p1.png)

![p名称空间注入](../pics/ioc-p2.png)

#### （5）注入复杂类型属性

```java
<!-- 注入复杂类型属性值 -->
    <!-- 
    String pname;
    String[] arrs;
    List<String> list;
    Map<String, String> map;
    Properties props; 
    -->
    <bean id="person" class="cn.wang.property.Person">
        <property name="pname" value="zs"></property>
        <property name="arrs">
            <list>
                <value>aaa</value>
                <value>bbb</value>
                <value>ccc</value>
            </list>
        </property>
        <property name="list">
            <list>
                <value>qqq</value>
                <value>www</value>
                <value>eee</value>
            </list>
        </property>
        <property name="map">
            <map>
                <entry key="001" value="Tom"></entry>
                <entry key="002" value="Amy"></entry>
                <entry key="003" value="Jim"></entry>
            </map>
        </property>
        <property name="props">
            <props>
                <prop key="username">admin</prop>
                <prop key="passwprd">admin</prop>
            </props>
        </property>
    </bean>
```



## 3. AOP

![](../pics/spring-aop.png)

### 3.1 什么是AOP

AOP（Aspect Oriented Programming ）称为面向切面编程，扩展功能不是修改源代码实现，在程序开发中主要用来解决一些系统层面上的问题，比如日志，事务，权限等待，Struts2的拦截器设计就是基于AOP的思想，是个比较经典的例子。

- AOP：面向切面（方面）编程，扩展功能不修改源代码实现
- AOP采取**横向抽取机制**，取代了传统**纵向继承**体系重复性代码（性能监视、事务管理、安全检查、缓存）



**spring的底层采用两种方式进行增强**

​         第一：Spring传统AOP 纯java实现，在运行期，对目标对象进行代理，织入增强代码

​         第二：AspectJ第三方开源技术，Spring已经整合AspectJ，提供对AspectJ注解的支持，开发AOP程序 更加容易（企业主流）

### 3.2 底层原理

![](../pics/aop2.png)





#### 第一种 JDK 自带的动态代理技术

JDK动态代理必须基于接口进行代理

作用：使用代理可以对目标对象进行性能监控（计算运行时间）、安全检查（是否具有权限）、 记录日 志等。

注意：必须要有接口才能进行代理，代理后对象必须转换为接口类型



#### 第二种 CGLIB(CodeGenerationLibrary)是一个开源项目

​          Spring使用CGlib 进行AOP代理， hibernate 也是支持CGlib（默认使用 javassist ）需要下载cglib 的jar包（Spring 最新版本3.2 内部已经集成了cglib ，**无需下载cglib的jar** ）

​         **作用：可以为目标类，动态创建子类，对目标类方法进行代理（无需接口）**

​         原理：Spring AOP 底层，会判断用户是根据接口代理还是目标类代理，如果针对接口代理就使用JDK代理，如果针对目标类代理就使用Cglib代理。

![](../pics/aop1.png)



### 3.3 AOP操作术语

以下面代码为例：

```java
public class User {
    public void add() {...}
    public void delete() {...}
    public void update() {...}
    public void query() {...}
}
```

- **Joinpoint（连接点）（重要）**
  -  类里面可以被增强的方法，这些方法称为连接点
- **Pointcut（切入点）（重要）**
  - 所谓切入点是指我们要对哪些Joinpoint进行拦截的定义
- **Advice（通知/增强）（重要）**
  - 所谓通知是指拦截到Joinpoint之后所要做的事情就是通知.通知分为前置通知，后置通知，异常通知，最终通知，环绕通知（切面要完成的功能）
- **Aspect（切面）**：
  - 是切入点和通知（引介）的结合
- **Introduction（引介）**
  - 引介是一种特殊的通知在不修改类代码的前提下， Introduction可以在运行期为类动态地添加一些方法或Field.
- **Target（目标对象）**
  - 代理的目标对象（要增强的类）
- **Weaving（织入）**
  - 是把增强应用到目标的过程，把advice 应用到 target的过程
- **Proxy（代理）**
  - 一个类被AOP织入增强后，就产生一个结果代理类



### 3.4 Spring的AOP操作

- 在Spring里面进行Aop操作，使用aspectj实现

（1）aspectj不是Spring的一部分，和Spring一起使用进行Aop操作 
（2）Spring2.0以后新增了对aspectj的支持

- 使用aspectj实现aop有两种方式

（1）基于aspectj的xml配置
（2）基于aspectj的注解方式

#### （1）AOP准备操作

（1）除了导入基本的jar包之外，还需要导入aop相关的jar包：

```
aopalliance-1.0.jar
aspectjweaver-1.8.7.jar
spring-aspects-5.0.4.RELEASE.jar
spring-aop-5.0.4.RELEASE.jar
```

（2）创建Spring核心配置文件 
除了引入了约束spring-beans之外还需要引入新约束spring-aop

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-aop.xsd">

</beans>12345678
```

#### （2）使用表达式配置切入点

1. 切入点：实际增强的方法
2. 常用的表达式
   execution(<访问修饰符>? <返回类型> <方法名>(<参数>)<异常>)
   （1）对包内的add方法进行增强
   `execution(* cn.blinkit.aop.Book.add(..))`
   （2）* 是对类里面的所有方法进行增强
   `execution(* cn.blinkit.aop.Book.*(..))`
   （3）*.* 是所有的类中的方法进行增强
   `execution(* *.*(..))`
   （4）匹配所有save开头的方法
   `execution(* save*(..))`



### 3.5 使用xml实现AOP

**aop配置代码：** Book

```java
public class Book {
    public void add() {
        System.out.println("add......");
    }
}
```

MyBook

```java
public class MyBook {
    public void before1() {
        System.out.println("前置增强......");
    }

    public void after1() {
        System.out.println("后置增强......");
    }

    //环绕通知
    public void around1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        //方法之前
        System.out.println("方法之前.....");

        //执行被增强的方法
        proceedingJoinPoint.proceed();

        //方法之后
        System.out.println("方法之后......");

    }
}
```

xml配置

```xml
    <!--1. 配置对象-->
    <bean id="book" class="cn.blinkit.aop.Book"></bean>
    <bean id="myBook" class="cn.blinkit.aop.MyBook"></bean>

    <!--2. 配置aop操作-->
    <aop:config>
        <!--2.1 配置切入点-->
        <aop:pointcut id="pointcut1" expression="execution(* cn.blinkit.aop.Book.*(..))"></aop:pointcut>

        <!--2.2 配置切面
                把增强用到方法上面
        -->
        <aop:aspect ref="myBook">
            <!--
                aop:before   :前置通知
                aop:after    :后置通知
                aop:around   :环绕通知
                配置增强类型
                method : 增强类里面使用哪个方法作为前置
            -->
            <aop:before method="before1" pointcut-ref="pointcut1"></aop:before>
            <aop:after method="after1" pointcut-ref="pointcut1"></aop:after>
            <aop:around method="around1" pointcut-ref="pointcut1"></aop:around>
        </aop:aspect>
    </aop:config>
```

测试代码

```java
public class AOPTest {
    @Test
    public void testBook() {
        ApplicationContext context = new ClassPathXmlApplicationContext("cn/blinkit/aop/spring-aop.xml");
        Book book = (Book) context.getBean("book");
        book.add();

    }
}
```



### 3.6 使用注解实现AOP

1. 创建对象
   (1)创建Book和MyBook **（增强类）** 对象

2. 在spring核心配置文件中，开启aop操作
   具体操作见xml配置文件代码：

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
   
       <!-- 1.开启aop操作 -->
       <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
   
       <!-- 2.配置对象 -->
       <bean id="book" class="com.jxs.aspectj.Book"></bean>
       <bean id="nbBook" class="com.jxs.aspectj.NBBook"></bean>
   
   </beans>
   ```

   

3. 在增强类上面使用注解完成aop操作
   （1）类上面加上`@Aspect`
   （2）方法上面加上
   `@Before(value = "execution(* cn.blinkit.aop.anno.Book.*(..))")`
   `@After(value = "表达式")`
   `@Around(value = "表达式")`等...

4. 

**Book**

```java
public class Book {
    public void add() {
        System.out.println("add...注解版本...");
    }
}
```

**MyBook增强类**

```java
@Aspect
public class MyBook {
    //在方法上面使用注解完成增强配置
    @Before(value = "execution(* cn.blinkit.aop.anno.Book.*(..))")
    public void before1() {
        System.out.println("前置增强...注解版本...");
    }

    @After(value = "execution(* cn.blinkit.aop.anno.Book.*(..))")
    public void after1() {
        System.out.println("后置增强...注解版本...");
    }

    //环绕通知
    @Around(value = "execution(* cn.blinkit.aop.anno.Book.*(..))")
    public void around1(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        //方法之前
        System.out.println("方法之前...注解版本...");

        //执行被增强的方法
        proceedingJoinPoint.proceed();

        //方法之后
        System.out.println("方法之后...注解版本...");

    }
}
```

**xml配置**

```xml
<!--开启aop操作-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

    <!--创建对象-->
    <bean id="book" class="cn.blinkit.aop.anno.Book"></bean>
    <bean id="myBook" class="cn.blinkit.aop.anno.MyBook"></bean>
```

### 3.7 为什么需要代理模式？

假设需实现一个计算的类Math、完成加、减、乘、除功能，如下所示：  

```java
package com.zhangguo.Spring041.aop01;

public class Math {
    //加
    public int add(int n1,int n2){
        int result=n1+n2;
        System.out.println(n1+"+"+n2+"="+result);
        return result;
    }
    
    
    //减
    public int sub(int n1,int n2){
        int result=n1-n2;
        System.out.println(n1+"-"+n2+"="+result);
        return result;
    }
    
    //乘
    public int mut(int n1,int n2){
        int result=n1*n2;
        System.out.println(n1+"X"+n2+"="+result);
        return result;
    }
    
    //除
    public int div(int n1,int n2){
        int result=n1/n2;
        System.out.println(n1+"/"+n2+"="+result);
        return result;
    }
}
```

现在需求发生了变化，要求项目中所有的类在执行方法时输出执行耗时。最直接的办法是修改源代码，如下所示：  

```java
package com.zhangguo.Spring041.aop01;

import java.util.Random;

public class Math {
    //加
    public int add(int n1,int n2){
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=n1+n2;
        System.out.println(n1+"+"+n2+"="+result);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }
    
    //减
    public int sub(int n1,int n2){
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=n1-n2;
        System.out.println(n1+"-"+n2+"="+result);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }
    
    //乘
    public int mut(int n1,int n2){
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=n1*n2;
        System.out.println(n1+"X"+n2+"="+result);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }
    
    //除
    public int div(int n1,int n2){
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=n1/n2;
        System.out.println(n1+"/"+n2+"="+result);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }
    
    //模拟延时
    public void lazy()
    {
        try {
            int n=(int)new Random().nextInt(500);
            Thread.sleep(n);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



缺点：

1、工作量特别大，如果项目中有多个类，多个方法，则要修改多次。

2、违背了设计原则：开闭原则（OCP），对扩展开放，对修改关闭，而为了增加功能把每个方法都修改了，也不便于维护。

3、违背了设计原则：单一职责（SRP），每个方法除了要完成自己本身的功能，还要计算耗时、延时；每一个方法引起它变化的原因就有多种。

4、违背了设计原则：依赖倒转（DIP），抽象不应该依赖细节，两者都应该依赖抽象。而在Test类中，Test与Math都是细节。

使用静态代理可以解决部分问题。





### 3.8 静态代理

 1、定义抽象主题接口

```java
package com.zhangguo.Spring041.aop02;

/**
 * 接口
 * 抽象主题
 */
public interface IMath {
    //加
    int add(int n1, int n2);

    //减
    int sub(int n1, int n2);

    //乘
    int mut(int n1, int n2);

    //除
    int div(int n1, int n2);

}
```

2、主题类，算术类，实现抽象接口

```java
package com.zhangguo.Spring041.aop02;

/**
 * 被代理的目标对象
 *真实主题
 */
public class Math implements IMath {
    //加
    public int add(int n1,int n2){
        int result=n1+n2;
        System.out.println(n1+"+"+n2+"="+result);
        return result;
    }
    
    //减
    public int sub(int n1,int n2){
        int result=n1-n2;
        System.out.println(n1+"-"+n2+"="+result);
        return result;
    }
    
    //乘
    public int mut(int n1,int n2){
        int result=n1*n2;
        System.out.println(n1+"X"+n2+"="+result);
        return result;
    }
    
    //除
    public int div(int n1,int n2){
        int result=n1/n2;
        System.out.println(n1+"/"+n2+"="+result);
        return result;
    }
}
```

3、代理类 

```java
package com.zhangguo.Spring041.aop02;

import java.util.Random;

/**
 * 静态代理类
 */
public class MathProxy implements IMath {

    //被代理的对象
    IMath math=new Math();
    
    //加
    public int add(int n1, int n2) {
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=math.add(n1, n2);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }

    //减法
    public int sub(int n1, int n2) {
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=math.sub(n1, n2);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }

    //乘
    public int mut(int n1, int n2) {
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=math.mut(n1, n2);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }
    
    //除
    public int div(int n1, int n2) {
        //开始时间
        long start=System.currentTimeMillis();
        lazy();
        int result=math.div(n1, n2);
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        return result;
    }

    //模拟延时
    public void lazy()
    {
        try {
            int n=(int)new Random().nextInt(500);
            Thread.sleep(n);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

4、测试运行 

```java
package com.zhangguo.Spring041.aop02;

public class Test {
    
    IMath math=new MathProxy();
    @org.junit.Test
    public void test01()
    {
        int n1=100,n2=5;
        math.add(n1, n2);
        math.sub(n1, n2);
        math.mut(n1, n2);
        math.div(n1, n2);
    }
}
```

5、小结 

通过静态代理，是否完全解决了上述的4个问题：

已解决：

- 解决了“开闭原则（OCP）”的问题，因为并没有修改Math类，而扩展出了MathProxy类。

- 解决了“依赖倒转（DIP）”的问题，通过引入接口。

- 解决了“单一职责（SRP）”的问题，Math类不再需要去计算耗时与延时操作，但从某些方面讲MathProxy还是存在该问题。

未解决：

- 如果项目中有多个类，则需要编写多个代理类，工作量大，不好修改，不好维护，不能应对变化。

如果要解决上面的问题，可以使用动态代理。



### 3.9 动态代理，使用JDK内置的Proxy实现

只需要一个代理类，而不是针对每个类编写代理类。

在上一个示例中修改代理类MathProxy如下：

```java
package com.zhangguo.Spring041.aop03;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Random;

/**
 * 动态代理类
 */
public class DynamicProxy implements InvocationHandler {

    //被代理的对象
    Object targetObject;
    
    /**
     * 获得被代理后的对象
     * @param object 被代理的对象
     * @return 代理后的对象
     */
    public Object getProxyObject(Object object){
        this.targetObject=object;
        return Proxy.newProxyInstance(
                targetObject.getClass().getClassLoader(), //类加载器
                targetObject.getClass().getInterfaces(),  //获得被代理对象的所有接口
                this);  //InvocationHandler对象
        //loader:一个ClassLoader对象，定义了由哪个ClassLoader对象来生成代理对象进行加载
        //interfaces:一个Interface对象的数组，表示的是我将要给我需要代理的对象提供一组什么接口，如果我提供了一组接口给它，那么这个代理对象就宣称实现了该接口(多态)，这样我就能调用这组接口中的方法了
        //h:一个InvocationHandler对象，表示的是当我这个动态代理对象在调用方法的时候，会关联到哪一个InvocationHandler对象上，间接通过invoke来执行
    }
    
    
    /**
     * 当用户调用对象中的每个方法时都通过下面的方法执行，方法必须在接口
     * proxy 被代理后的对象
     * method 将要被执行的方法信息（反射）
     * args 执行方法时需要的参数
     */
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //被织入的内容，开始时间
        long start=System.currentTimeMillis();
        lazy();
        
        //使用反射在目标对象上调用方法并传入参数
        Object result=method.invoke(targetObject, args);
        
        //被织入的内容，结束时间
        Long span= System.currentTimeMillis()-start;
        System.out.println("共用时："+span);
        
        return result;
    }
    
    //模拟延时
    public void lazy()
    {
        try {
            int n=(int)new Random().nextInt(500);
            Thread.sleep(n);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```

测试运行：  

```java
package com.zhangguo.Spring041.aop03;

public class Test {
    
    //实例化一个MathProxy代理对象
    //通过getProxyObject方法获得被代理后的对象
    IMath math=(IMath)new DynamicProxy().getProxyObject(new Math());
    @org.junit.Test
    public void test01()
    {
        int n1=100,n2=5;
        math.add(n1, n2);
        math.sub(n1, n2);
        math.mut(n1, n2);
        math.div(n1, n2);
    }
    
    IMessage message=(IMessage) new DynamicProxy().getProxyObject(new Message());
    @org.junit.Test
    public void test02()
    {
        message.message();
    }
}
```

小结：

 JDK内置的Proxy动态代理可以在运行时动态生成字节码，而没必要针对每个类编写代理类。中间主要使用到了一个接口InvocationHandler与Proxy.newProxyInstance静态方法，参数说明如下：

使用内置的Proxy实现动态代理有一个问题：**被代理的类必须实现接口，未实现接口则没办法完成动态代理。**

如果项目中有些类没有实现接口，则不应该为了实现动态代理而刻意去抽出一些没有实例意义的接口，通过cglib可以解决该问题。



### 3.10 动态代理，使用cglib实现

CGLIB(Code Generation Library)是一个开源项目,是一个强大的，高性能，高质量的Code生成类库，它可以在运行期扩展Java类与实现Java接口，通俗说cglib可以在运行时动态生成字节码。

1、引用cglib，通过maven

2、使用cglib完成动态代理，大概的原理是：cglib继承被代理的类，重写方法，织入通知，动态生成字节码并运行，因为是继承所以final类是没有办法动态代理的。具体实现如下：  

```java
package com.zhangguo.Spring041.aop04;

import java.lang.reflect.Method;
import java.util.Random;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

/*
 * 动态代理类
 * 实现了一个方法拦截器接口
 */
public class DynamicProxy implements MethodInterceptor {

    // 被代理对象
    Object targetObject;

    //Generate a new class if necessary and uses the specified callbacks (if any) to create a new object instance. 
    //Uses the no-arg constructor of the superclass.
    //动态生成一个新的类，使用父类的无参构造方法创建一个指定了特定回调的代理实例
    public Object getProxyObject(Object object) {
        this.targetObject = object;
        //增强器，动态代码生成器
        Enhancer enhancer=new Enhancer();
        //回调方法
        enhancer.setCallback(this);
        //设置生成类的父类类型
        enhancer.setSuperclass(targetObject.getClass());
        //动态生成字节码并返回代理对象
        return enhancer.create();
    }

    // 拦截方法
    public Object intercept(Object object, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        // 被织入的横切内容，开始时间 before
        long start = System.currentTimeMillis();
        lazy();

        // 调用方法
        Object result = methodProxy.invoke(targetObject, args);

        // 被织入的横切内容，结束时间
        Long span = System.currentTimeMillis() - start;
        System.out.println("共用时：" + span);
        
        return result;
    }

    // 模拟延时
    public void lazy() {
        try {
            int n = (int) new Random().nextInt(500);
            Thread.sleep(n);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
```

测试运行：  

```java
package com.zhangguo.Spring041.aop04;

public class Test {
    //实例化一个DynamicProxy代理对象
    //通过getProxyObject方法获得被代理后的对象
    Math math=(Math)new DynamicProxy().getProxyObject(new Math());
    @org.junit.Test
    public void test01()
    {
        int n1=100,n2=5;
        math.add(n1, n2);
        math.sub(n1, n2);
        math.mut(n1, n2);
        math.div(n1, n2);
    }
    //另一个被代理的对象,不再需要重新编辑代理代码
    Message message=(Message) new DynamicProxy().getProxyObject(new Message());
    @org.junit.Test
    public void test02()
    {
        message.message();
    }
}
```

小结

使用cglib可以实现动态代理，即使被代理的类没有实现接口，但被代理的类必须不是final类。





# 二、面试指南

## 1. Spring IOC、AOP的理解以及实现的原理 

- Spring IOC 

  - IoC叫控制反转，是Inversion of Control的缩写，DI（Dependency Injection）叫依赖注入，是对IoC更简单的诠释。控制反转是把传统上由程序代码直接操控的对象的调用权交给容器，通过容器来实现对象组件的装配和管理。所谓的"控制反转"就是对组件对象控制权的转移，从程序代码本身转移到了外部容器，由容器来创建对象并管理对象之间的依赖关系。DI是对IoC更准确的描述，即组件之间的依赖关系由容器在运行期决定，形象的来说，即由容器动态的将某种依赖关系注入到组件之中。 

  举个例子：一个类A需要用到接口B中的方法，那么就需要为类A和接口B建立关联或依赖关系，最原始的方法是在类A中创建一个接口B的实现类C的实例，但这种方法需要开发人员自行维护二者的依赖关系，也就是说当依赖关系发生变动的时候需要修改代码并重新构建整个系统。如果通过一个容器来管理这些对象以及对象的依赖关系，则只需要在类A中定义好用于关联接口B的方法（构造器或setter方法），将类A和接口B的实现类C放入容器中，通过对容器的配置来实现二者的关联。 

   

- Spring IOC实现原理 

  -  通过反射创建实例； 
  - 获取需要注入的接口实现类并将其赋值给该接口。 

- Spring AOP 

  - AOP（Aspect-Oriented Programming）指一种程序设计范型，该范型以一种称为切面（aspect）的语言构造为基础，切面是一种新的模块化机制，用来描述分散在对象、类或方法中的横切关注点（crosscutting concern）。 
  - "横切关注"是会影响到整个应用程序的关注功能，它跟正常的业务逻辑是正交的，没有必然的联系，但是几乎所有的业务逻辑都会涉及到这些关注功能。通常，事务、日志、安全性等关注就是应用中的横切关注功能。 

- Spring AOP实现原理 

  - 动态代理（利用反射和动态编译将代理模式变成动态的） 
  - JDK的动态代理 
    - JDKProxy返回动态代理类，是目标类所实现接口的另一个实现版本，它实现了对目标类的代理（如同UserDAOProxy与UserDAOImp的关系） 
  - cglib动态代理 
    - CGLibProxy返回的动态代理类，则是目标代理类的一个子类（代理类扩展了UserDaoImpl类） 

## 2. Ioc容器的加载过程 

- 创建IOC配置文件的抽象资源  
- 创建一个BeanFactory  
- 把读取配置信息的BeanDefinitionReader,这里是XmlBeanDefinitionReader配置给BeanFactory  
- 从定义好的资源位置读入配置信息，具体的解析过程由XmlBeanDefinitionReader来完成，这样完成整个载入bean定义的过程。 

 

## 3. 动态代理与cglib实现的区别 

- JDK动态代理只能对实现了接口的类生成代理，而不能针对类. 
- CGLIB是针对类实现代理，主要是对指定的类生成一个子类，覆盖其中的方法因为是继承，所以该类或方法最好不要声明成final。 
- JDK代理是不需要以来第三方的库，只要JDK环境就可以进行代理 
- CGLib 必须依赖于CGLib的类库，但是它需要类来实现任何接口代理的是指定的类生成一个子类，覆盖其中的方法，是一种继承 

 

## 4. 代理的实现原理呗 

 

## 5. HIbernate一级缓存与二级缓存之间的区别 

- Hibernate的Session提供了一级缓存的功能，默认总是有效的，当应用程序保存持久化实体、修改持久化实体时，Session并不会立即把这种改变提交到数据库，而是缓存在当前的Session中，除非显示调用了Session的flush()方法或通过close()方法关闭Session。通过一级缓存，可以减少程序与数据库的交互，从而提高数据库访问性能。  
- SessionFactory级别的二级缓存是全局性的，所有的Session可以共享这个二级缓存。不过二级缓存默认是关闭的，需要显示开启并指定需要使用哪种二级缓存实现类（可以使用第三方提供的实现）。一旦开启了二级缓存并设置了需要使用二级缓存的实体类，SessionFactory就会缓存访问过的该实体类的每个对象，除非缓存的数据超出了指定的缓存空间。  
- 一级缓存和二级缓存都是对整个实体进行缓存，不会缓存普通属性，如果希望对普通属性进行缓存，可以使用查询缓存。查询缓存是将HQL或SQL语句以及它们的查询结果作为键值对进行缓存，对于同样的查询可以直接从缓存中获取数据。查询缓存默认也是关闭的，需要显示开启。 

 

## 6. Spring MVC的原理 

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

 

## 7. 简述Hibernate常见优化策略。 

- 制定合理的缓存策略（二级缓存、查询缓存）。  
- 采用合理的Session管理机制。  
- 尽量使用延迟加载特性。  
- 设定合理的批处理参数。  
- 如果可以，选用UUID作为主键生成器。  
- 如果可以，选用基于版本号的乐观锁替代悲观锁。  
- 在开发过程中, 开启hibernate.show_sql选项查看生成的SQL，从而了解底层的状况；开发完成后关闭此选项。  
- 考虑数据库本身的优化，合理的索引、恰当的数据分区策略等都会对持久层的性能带来可观的提升，但这些需要专业的DBA（数据库管理员）提供支持。 



什么是JavaBean







**面经在框架方面的问题：**

11）spring的AOP原理和底层实现（框架技术：扯了一下概念和反射机制）  

12）Spring的注解讲一下；（框架技术）  

16）cglib底层实现；（框架技术：懵逼）  

8）Spring中的事务原理讲一下；（框架技术：只说了个声明性事务，其他的也不了解）  

介绍spring的IOC和AOP，分别如何实现(classloader、动态代理)  

spring中bean加载机制，bean生成的具体步骤  

ioc注入的方式  

spring何时创建applicationContext(web.xml中使用listener)  

listener是监听哪个事件(ServletContext创建事件) springMVC流程具体叙述下 

springMVC流程具体叙述下  

介绍spring的IOC和AOP，容器的概念（本质就是applicationContext管理了classloader）  

Spring的aop怎么实现

Spring的aop有哪些实现方式

介绍spring中的熟悉的注解

 5.springIOC优点

   了解Spring IOC 么？说下你了解的吧？   

 

  说下Spring Aop吧？   

 

  SpringMvc 工作原理？   

 **spring里面的工厂模式和代理模式，IO中的装饰者模式**，挑几个最熟的能讲讲思路和伪代码实现。

 1、Spring具有什么特点（IOC和AOP）

3、谈一谈对spring的理解

4、spring实现原理

8 、了解AOP吗？说说AOP原理，Spring如何实现AOP的  Spring两大核心咯IoC、AOP 这个还是要会的吧  

7、Spring用的怎么样，看过源码吗？   

22. springboot框架源码看过吗？hashMap的源码看过吗？  
23. Struts拦截器和Spring AOP区别



1. Spring MVC有了解嘛，Spring 事务有了解嘛

   

 

1. Spring MVC注解的优点
2. 

 

6项目中Spring AOP用在什么地方，为什么这么用，切点，织入，通知用自己的话描述一下，AOP原理，动态代理2种实现

 7Spring里面注解用过没有？autowired 和resource区别（一开始我给听成result了。。。。去介绍strusts2了。。）

 

9Spring（AOP，IOC又来一次。。。）

 

8.spring boot的了解 spark hadoop的了解  





20、框架用过哪些？说刚入门Spring、经典三层MVC

 

3、 你的项目里用了SpringMVC+hibernate，能说什么是SpringMVC？什么是hibernate吗？

 

4.Spring IOC初始化过程

 Spring 

 

整体都有啥   IOC  AOP思想  bean如何初始化 生命周期  动态代理 等等细节的实现，能看源码最好。如果没时间都看完的话，建议IOC和AOP部分看看源码了解一下底层实现。



14.手写代码  spring AOP实现拦截器，写出代码以及XML配置  

8.spring事务  如何实现  



13.spring初始化哪个方法  

14.bean如何加载  生命周期  





（14）Hibernate的理解  







阿里Java研发工程师实习面经_笔经面经_牛客网
https://www.nowcoder.com/discuss/72899?type=2&order=3&pos=509&page=1





网易面经（Java开发岗） - Andya - 博客园
https://www.cnblogs.com/Andya/p/7456511.html