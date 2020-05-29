<!-- TOC -->

- [一、概述](#一概述)
    ​    - [设计模式怎么分类，每一类都有哪些？【蚂蚁金服内推】](#设计模式怎么分类每一类都有哪些蚂蚁金服内推)
    ​    - [设计模式怎么用到项目中？【阿里面经】](#设计模式怎么用到项目中阿里面经)
- [二、设计模式](#二设计模式)
    - [单例模式](#单例模式)
    - [工厂模式](#工厂模式)
    - [观察者模式](#观察者模式)
    - [适配器模式（Adapter）](#适配器模式adapter)
        - [意图](#意图)
        - [类型](#类型)
        - [类图](#类图)
        - [实现](#实现)
        - [JDK](#jdk)
    - [模仿方法模式](#模仿方法模式)
    - [策略模式（Strategy）](#策略模式strategy)
        - [意图](#意图-1)
        - [类图](#类图-1)
        - [与状态模式的比较](#与状态模式的比较)
        - [实现](#实现-1)
        - [JDK](#jdk-1)
            - [](#)
    - [责任链模式](#责任链模式)
    - [装饰者模式](#装饰者模式)
    - [迭代器模式（Iterator）](#迭代器模式iterator)
        ​    ​    - [所了解的设计模式，单例模式的注意事项，jdk源码哪些用到了你说的设计模式](#所了解的设计模式单例模式的注意事项jdk源码哪些用到了你说的设计模式)
- [三、设计模式常见问题](#三设计模式常见问题)
- [附录：参考资料](#附录参考资料)

<!-- /TOC -->
[Interview-Notebook/设计模式](https://github.com/CyC2018/Interview-Notebook/blob/master/notes/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.md)


# 一、概述

1、设计模式是人们在面对同类型软件工程设计问题所总结出的一些有用经验。模式不是代码，而是某类问题的通用设计解决方案

2、4人组Erich Gamma、Richard Helm、Ralph Johnson、John Vlissides总结写了《设计模式》

3、设计模式的优点和用途

4、学习设计模式最好的方式：在你的设计和以往的工程里寻找何处可以使用它们

5、设计模式的本质目的是使软件工程在维护性、扩展性、变化性、复杂度方面成O(N)

6、OO（Object Oriented）是原则，设计模式是具体方法、工具



万物皆对象
面向对象三大特性：封装、集成、多态
面向对象设计原则：开口合里最单依
重构原则：事不过三、三则重构
写且只写一次



### 设计模式怎么分类，每一类都有哪些？【蚂蚁金服内推】







### 设计模式怎么用到项目中？【阿里面经】








# 二、设计模式

## 单例模式







## 工厂模式







## 观察者模式 







## 适配器模式（Adapter）

2018/7/15

### 意图

把一个类接口转换成另一个用户需要的接口。适配器模式让那些接口不兼容的类可以一起工作 



[![img](https://github.com/CyC2018/Interview-Notebook/raw/master/pics/3d5b828e-5c4d-48d8-a440-281e4a8e1c92.png)](https://github.com/CyC2018/Interview-Notebook/blob/master/pics/3d5b828e-5c4d-48d8-a440-281e4a8e1c92.png)



### 类型

适配器模式的别名为包装器(Wrapper)模式，它既可以作为**类结构型模式**，也可以作为**对象结构型模式**。在适配器模式定义中所提及的接口是指广义的接口，它可以表示一个方法或者方法的集合。 

- 对象适配器：（传入对象）组合方式，但是更灵活推荐使用这种方式
- 类适配器：（多重继承）继承方式，效率更高



### 类图

[![img](https://github.com/CyC2018/Interview-Notebook/raw/master/pics/0f754c1d-b5cb-48cd-90e0-4a86034290a1.png)](https://github.com/CyC2018/Interview-Notebook/blob/master/pics/0f754c1d-b5cb-48cd-90e0-4a86034290a1.png)

 

### 实现

鸭子（Duck）和火鸡（Turkey）拥有不同的叫声，Duck 的叫声调用 quack() 方法，而 Turkey 调用 gobble() 方法。

要求将 Turkey 的 gobble() 方法适配成 Duck 的 quack() 方法，从而让火鸡冒充鸭子！

```java
public interface Duck {
    void quack();
}
```

```java
public interface Turkey {
    void gobble();
}
```

```java
public class WildTurkey implements Turkey {
    @Override
    public void gobble() {
        System.out.println("gobble!");
    }
}
```

```java
public class TurkeyAdapter implements Duck {
    Turkey turkey;

    public TurkeyAdapter(Turkey turkey) {
        this.turkey = turkey;
    }

    @Override
    public void quack() {
        turkey.gobble();
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Turkey turkey = new WildTurkey();
        Duck duck = new TurkeyAdapter(turkey);
        duck.quack();
    }
}
```

### JDK

- [java.util.Arrays#asList()](http://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html#asList%28T...%29)
- [java.util.Collections#list()](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#list-java.util.Enumeration-)
- [java.util.Collections#enumeration()](https://docs.oracle.com/javase/8/docs/api/java/util/Collections.html#enumeration-java.util.Collection-)
- [javax.xml.bind.annotation.adapters.XMLAdapter](http://docs.oracle.com/javase/8/docs/api/javax/xml/bind/annotation/adapters/XmlAdapter.html#marshal-BoundType-)





## 模仿方法模式







## 策略模式（Strategy）

2018/7/11

### 意图

- 定义一系列算法，封装每个算法，并使它们可以互换。
- 策略模式可以让算法独立于使用它的客户端。

### 类图

- Strategy 接口定义了一个算法族，它们都具有 behavior() 方法。
- Context 是使用到该算法族的类，其中的 doSomething() 方法会调用 behavior()，setStrategy(in Strategy) 方法可以动态地改变 strategy 对象，也就是说能动态地改变 Context 所使用的算法。

[![img](https://github.com/CyC2018/Interview-Notebook/raw/master/pics/1fc969e4-0e7c-441b-b53c-01950d2f2be5.png)](https://github.com/CyC2018/Interview-Notebook/blob/master/pics/1fc969e4-0e7c-441b-b53c-01950d2f2be5.png)

### 与状态模式的比较

状态模式的类图和策略模式类似，并且都是能够动态改变对象的行为。

但是状态模式是通过状态转移来改变 Context 所组合的 State 对象，而策略模式是通过 Context 本身的决策来改变组合的 Strategy 对象。

所谓的状态转移，是指 Context 在运行过程中由于一些条件发生改变而使得 State 对象发生改变，注意必须要是在运行过程中。

状态模式主要是用来解决状态转移的问题，当状态发生转移了，那么 Context 对象就会改变它的行为；而策略模式主要是用来封装一组可以互相替代的算法族，并且可以根据需要动态地去替换 Context 使用的算法。

### 实现

设计一个鸭子，它可以动态地改变叫声。这里的算法族是鸭子的叫声行为。

```java
public interface QuackBehavior {
    void quack();
}
```

```java
public class Quack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("quack!");
    }
}
```

```java
public class Squeak implements QuackBehavior{
    @Override
    public void quack() {
        System.out.println("squeak!");
    }
}
```

```java
public class Duck {
    private QuackBehavior quackBehavior;

    public void performQuack() {
        if (quackBehavior != null) {
            quackBehavior.quack();
        }
    }

    public void setQuackBehavior(QuackBehavior quackBehavior) {
        this.quackBehavior = quackBehavior;
    }
}
```

```java
public class Client {
    public static void main(String[] args) {
        Duck duck = new Duck();
        duck.setQuackBehavior(new Squeak());
        duck.performQuack();
        duck.setQuackBehavior(new Quack());
        duck.performQuack();
    }
}
```

```
squeak!
quack!
```

### JDK

- java.util.Comparator#compare()
- javax.servlet.http.HttpServlet
- javax.servlet.Filter#doFilter()



#### 



## 责任链模式







## 装饰者模式





## 迭代器模式（Iterator）

2018/7/16







- 反应器模式

 

1. 常用的八种掌握就行，原理，使用
2. 单例、工厂、观察者重点





##### 所了解的设计模式，单例模式的注意事项，jdk源码哪些用到了你说的设计模式 

- 所了解的设计模式 
  - 工厂模式：定义一个用于创建对象的接口，让子类决定实例化哪一个类， Factory Method 使一个类的实例化延迟到了子类。 
  - 单例模式：保证一个类只有一个实例，并提供一个访问它的全局访问点； 
  - 适配器模式：将一类的接口转换成客户希望的另外一个接口，Adapter 模式使得原本由于接口不兼容而不能一起工作那些类可以一起工作。 
  - 装饰者模式：动态地给一个对象增加一些额外的职责，就增加的功能来说， Decorator 模式相比生成子类更加灵活。 
  - 代理：为其他对象提供一种代理以控制对这个对象的访问 
  - 迭代器模式：提供一个方法顺序访问一个聚合对象的各个元素，而又不需要暴露该对象的内部表示。 
- 单例模式的注意事项 
  - 尽量使用懒加载 
  - 双重检索实现线程安全 
  - 构造方法为private 
  - 定义静态的Singleton instance对象和getInstance()方法 
- jdk源码中用到的设计模式 
  - 装饰器模式：IO流中 
  - 迭代器模式：Iterator 
  - 单利模式： java.lang.Runtime 
  - 代理模式：RMI 



# 三、设计模式常见问题





1.什么是高内聚，低耦合？





一个类只做一件事

一个方法只做一件事

写仅只写一次





# 附录：参考资料



卡奴达摩的专栏 - CSDN博客
https://blog.csdn.net/zhengzhb/article/category/926691/1



单例模式 - 23种设计模式 - 极客学院Wiki
http://wiki.jikexueyuan.com/project/java-design-pattern/singleton-pattern.html





https://www.bilibili.com/video/av18569541/



hexter 录制的课程 - 极客学院【23种设计模式】
http://my.jikexueyuan.com/hexter/record/



设计模式之禅

