# Java必知必会

你必须知道的Java语言基础知识



参考资料

```
阿里面试题总结 - CSDN博客
https://blog.csdn.net/sinat_22797429/article/details/76293284

阿里面试题总结笔经面经牛客网
https://www.nowcoder.com/discuss/5949?type=0&order=0&pos=20&page=5


http://devdocs.io/openjdk~8/java/util/collection
http://tool.oschina.net/apidocs/apidoc?api=jdk-zh
```



1.自我介绍

2.做过的项目 

进程是操作系统分配资源的最小单位 ，线程是cpu调度的最小单位  

[TOC]



### Java基础知识

##### 1.Java的基本数据类型/引用类型有哪些？知道自动装箱和拆箱吗？

- 4类8种基本数据类型。4整数型，2浮点型，1字符型，1布尔型

| 数据类型 | 存储需求 | 取值范围                                                     | 对应包装类 |
| -------- | -------- | ------------------------------------------------------------ | ---------- |
| byte     | 8位      | 最大存储数据量是255，存放的数据范围是-128~127之间            | Byte       |
| short    | 16位     | 最大数据存储量是65536，数据范围是-32768~32767之间            | Short      |
| int      | 32位     | 最大数据存储容量是2的32次方减1，数据范围是负的2的31次方到正的2的31次方减1 | Integer    |
| long     | 64位     | 最大数据存储容量是2的64次方减1，数据范围为负的2的63次方到正的2的63次方减1 | Long       |
| float    | 32位     | 数据范围在3.4e-45~1.4e38，直接赋值时必须在数字后加上f或F     | Float      |
| double   | 64位     | 数据范围在4.9e-324~1.8e308，赋值时可以加d或D也可以不加       | Double     |
| boolean  |          | 只有true和false两个取值                                      | Boolean    |
| char     | 16位     | 存储Unicode码，用单引号赋值                                  | Character  |

- 引用数据类型
  - 类（class）、接口（interface）、数组
- 自动装箱和拆箱
  - 基本数据类型和它对应的封装类型之间可以相互转换。自动拆装箱是jdk5.0提供的新特特性，它可以自动实现类型的转换
  - 装箱：从基本数据类型到封装类型叫做装箱
  - 拆箱：从封装类型到基本数据类型叫拆箱

```
jdk 1.5
public class TestDemo {
    public static void main(String[] args) {
        Integer m =10;
        int i=m;
    }
}
```

​	上面的代码在jdk1.4以后的版本都不会报错，它实现了自动拆装箱的功能，如果是jdk1.4，就得这样写了

```
jdk 1.4
public class TestDemo {
    public static void main(String[] args) {
        Integer b = new Integer(210);
        int c = b.intValue();
    }
}
```



##### 2.final与static的区别

**final**

- **1. 数据**
  - 声明数据为常量，可以是编译时常量，也可以是在运行时被初始化后不能被改变的常量。
  - 对于基本类型，final 使数值不变；
  - 对于引用类型，final 使引用不变，也就不能引用其它对象，但是被引用的对象本身是可以修改的。

```java
final int x = 1;
// x = 2;  // cannot assign value to final variable 'x'
final A y = new A();
y.a = 1;
```

- **2. 方法**

  ​       声明方法不能被子类覆盖。

  - private 方法隐式地被指定为 final，如果在子类中定义的方法和基类中的一个 private 方法签名相同，此时子类的方法不是覆盖基类方法，而是在子类中定义了一个新的方法。

- **3. 类**

  - 声明类不允许被继承。



**static**

- **1. 静态变量**

  ​       静态变量在内存中只存在一份，只在类初始化时赋值一次。

  - 静态变量：类所有的实例都共享静态变量，可以直接通过类名来访问它；
  - 实例变量：每创建一个实例就会产生一个实例变量，它与该实例同生共死。

```java
public class A {
    private int x;        // 实例变量
    public static int y;  // 静态变量
}
```

- **2. 静态方法**

  静态方法在类加载的时候就存在了，它不依赖于任何实例，所以静态方法必须有实现，也就是说它不能是抽象方法（abstract）。

- **3. 静态语句块**

  静态语句块在类初始化时运行一次。

- **4. 静态内部类**

  内部类的一种，静态内部类不依赖外部类，且不能访问外部类的非静态的变量和方法。

- **5. 静态导包** 

```java
import static com.xxx.ClassName.*
```

在使用静态变量和方法时不用再指明 ClassName，从而简化代码，但可读性大大降低。

- **6. 变量赋值顺序** 

  静态变量的赋值和静态语句块的运行优先于实例变量的赋值和普通语句块的运行，静态变量的赋值和静态语句块的运行哪个先执行取决于它们在代码中的顺序。

```java
public static String staticField = "静态变量";
```

```java
static {
    System.out.println("静态语句块");
}
```

```java
public String field = "实例变量";
```

```java
{
    System.out.println("普通语句块");
}
```

​	最后才运行构造函数

```java
public InitialOrderTest() {
    System.out.println("构造函数");
}
```

存在继承的情况下，初始化顺序为：

- 父类（静态变量、静态语句块）
- 子类（静态变量、静态语句块）
- 父类（实例变量、普通语句块）
- 父类（构造函数）
- 子类（实例变量、普通语句块）
- 子类（构造函数）





##### 3. Java的四个基本特性（<u>抽象、封装、继承，多态</u>），对多态的理解(多态的实现方式)以及在项目中那些地方用到多态 ，重载和重写

- Java的四个基本特性 

  - **抽象**：抽象是将一类对象的共同特征总结出来构造类的过程，包括数据抽象和行为抽象两方面。抽象只关注对象有哪些属性和行为，并不关注这些行为的细节是什么。  
  - **继承**：继承是从已有类得到继承信息创建新类的过程。提供继承信息的类被称为父类（超类、基类）；得到继承信息的类被称为子类（派生类）。继承让变化中的软件系统有了一定的延续性，同时继承也是封装程序中可变因素的重要手段。 
  -  **封装**：通常认为封装是把数据和操作数据的方法绑定起来，对数据的访问只能通过已定义的接口。面向对象的本质就是将现实世界描绘成一系列完全自治、封闭的对象。我们在类中编写的方法就是对实现细节的一种封装；我们编写一个类就是对数据和数据操作的封装。可以说，封装就是隐藏一切可隐藏的东西，只向外界提供最简单的编程接口。 
  - **多态**：多态性是指允许不同子类型的对象对同一消息作出不同的响应。 

- 多态的理解(多态的实现方式) 

  - **方法重载（overload）**实现的是<u>编译时的多态性</u>（也称为前绑定）。 
  - **方法重写（override）**实现的是<u>运行时的多态性</u>（也称为后绑定）。运行时的多态是面向对象最精髓的东西。 
  - 要实现多态需要做两件事：
    - 1). **方法重写**（子类继承父类并重写父类中已有的或抽象的方法）；
    - 2). **对象造型**（用父类型引用引用子类型对象，这样同样的引用调用同样的方法就会根据子类对象的不同而表现出不同的行为）。 

- 重载和重写，如何确定调用哪个函数 
  - **重载：**<u>重载发生在同一个类中</u>，同名的方法如果有不同的参数列表（*参数类型不同、参数个数不同或者二者都不同*）则视为重载。 
  - **重写：**<u>重写发生在子类与父类之间</u>，重写要求子类被重写方法与父类被重写方法有相同的返回类型，比父类被重写方法更好访问，不能比父类被重写方法声明更多的异常（里氏代换原则）。根据不同的子类对象确定调用的那个方法。 

- 项目中对多态的应用 

  - 举一个简单的例子，在物流信息管理系统中，有两种用户：订购客户和卖房客户，两个客户都可以登录系统，他们有相同的方法Login，但登陆之后他们会进入到不同的页面，也就是在登录的时候会有不同的操作，两种客户都继承父类的Login方法，但对于不同的对象，拥有不同的操作。 

![](pics\overloading-vs-overriding.png)

![](pics\overloading-vs-overriding_cartoon.jpg)



##### 4.面向对象和面向过程的区别？用面向过程可以实现面向对象吗？那是不是不能面向对象？ 

- 面向对象和面向过程的区别 

  - **面向过程**就像是一个细心的管家，事无具细的都要考虑到。而**面向对象**就像是个家用电器，你只需要知道他的功能，不需要知道它的工作原理。 
  - **面向过程**是一种是“事件”为中心的编程思想。就是分析出解决问题所需的步骤，然后用函数把这些步骤实现，并按顺序调用。**面向对象**是以“对象”为中心的编程思想。 
  - 简单的举个例子：汽车发动、汽车到站 
    - 这对于**“面向过程”**来说，是两个事件，汽车启动是一个事件，汽车到站是另一个事件，面向过程编程的过程中我们关心的是事件，而不是汽车本身。针对上述两个事件，形成两个函数，之 后依次调用。 
    - 然而这对于**“面向对象”**来说，我们关心的是汽车这类对象，两个事件只是这类对象所具有的行为。而且对于这两个行为的顺序没有强制要求。 

- 用面向过程可以实现面向对象吗 ？

- 那是不是不能面向对象 ？



##### 5. 面向对象开发的六个基本原则(单一职责、开放封闭、里氏替换、依赖倒置、合成聚合复用、接口隔离)，迪米特法则。在项目中用过哪些原则 

- **六个基本原则**（参考《设计模式之禅》）
  - **单一职责**（Single Responsibility Principle 简称 SRP）：**一个类应该仅有一个引起它变化的原因。**在面向对象中，如果只让一个类完成它该做的事，而不涉及与它无关的领域就是践行了高内聚的原则，这个类就只有单一职责。 

  - **里氏替换**（Liskov Substitution Principle 简称 LSP）：**任何时候子类型能够替换掉它们的父类型。**子类一定是增加父类的能力而不是减少父类的能力，因为子类比父类的能力更多，把能力多的对象当成能力少的对象来用当然没有任何问题。 

  - **依赖倒置**（Dependence Inversion Principle 简称 DIP）：**要依赖于抽象，不要依赖于具体类。**要做到依赖倒置，应该做到：①高层模块不应该依赖底层模块，二者都应该依赖于抽象；②抽象不应该依赖于具体实现，具体实现应该依赖于抽象。

  - **接口隔离**（Interface Segregation Principle 简称 ISP）：**不应该强迫客户依赖于他们不用的方法 。**接口要小而专，绝不能大而全。臃肿的接口是对接口的污染，既然接口表示能力，那么一个接口只应该描述一种能力，接口也应该是高度内聚的。 

  - **最少知识原则**（Least Knowledge Principle 简称 LKP）：**只和你的朋友谈话。**迪米特法则又叫最少知识原则，一个对象应当对其他对象有尽可能少的了解。 

  - **开放封闭**（Open Closed Principle 简称 OCP）：**软件实体应当对扩展开放，对修改关闭。**要做到开闭有两个要点：①抽象是关键，一个系统中如果没有抽象类或接口系统就没有扩展点；②封装可变性，将系统中的各种可变因素封装到一个继承结构中，如果多个可变因素混杂在一起，系统将变得复杂而换乱。 

    

- 其他原则

  - 合成聚和复用：优先使用聚合或合成关系复用代码
  - 面向接口编程
  - 优先使用组合，而非继承
  - 一个类需要的数据应该隐藏在类的内部
  - 类之间应该零耦合，或者只有传导耦合，换句话说，类之间要么没关系，要么只使用另一个类的接口提供的操作
  - 在水平方向上尽可能统一地分布系统功能



- 项目中用到的原则 
  - 单一职责、开放封闭、合成聚合复用(最简单的例子就是String类)、接口隔离



##### 6. 集合框架（Java Collections Framework Internals）

​	Java集合框架提供了数据持有对象的方式，提供了对数据集合的操作。Java集合框架位于`java.util`包下，主要有三个大类：`Collection`、`Map`接口以及对集合进行操作的工具类。



Java集合类的整体框架如下： 

![](pics\java_set_framework.jpg)







Collection

![](collection.png)

* `ArrayList`：线程不同步。默认初始容量为10，当数组大小不足时增长率为当前长度的`50%`。
* `Vector`：**线程同步**。默认初始容量为10，当数组大小不足时增长率为当前长度的`100%`。它的同步是通过`Iterator`方法加`synchronized`实现的。
* `LinkedList`：线程不同步。**双端队列形式**。
* `Stack`：**线程同步**。继承自`Vector`，添加了几个方法来完成栈的功能。
* `Set`：Set是一种不包含重复元素的Collection，Set最多只有一个null元素。
* `HashSet`：线程不同步，内部使用`HashMap`进行数据存储，提供的方法基本都是调用`HashMap`的方法，所以两者本质是一样的。**集合元素可以为**`NULL`。
* `NavigableSet`：添加了搜索功能，可以对给定元素进行搜索：小于、小于等于、大于、大于等于，放回一个符合条件的最接近给定元素的 key。
* `TreeSet`：线程不同步，内部使用`NavigableMap`操作。默认元素“自然顺序”排列，可以通过`Comparator`改变排序。
* `EnumSet`：线程不同步。内部使用Enum数组实现，速度比`HashSet`快。**只能存储在构造函数传入的枚举类的枚举值**。



## Map

![](map.png)

* `HashMap`：线程不同步。根据`key`的`hashcode`进行存储，内部使用静态内部类`Node`的数组进行存储，默认初始大小为16，每次扩大一倍。当发生Hash冲突时，采用拉链法（链表）。**可以接受为null的键值\(key\)和值\(value\)**。JDK 1.8中：当单个桶中元素个数大于等于8时，链表实现改为红黑树实现；当元素个数小于6时，变回链表实现。由此来防止hashCode攻击。
* `LinkedHashMap`：**保存了记录的插入顺序**，在用Iterator遍历LinkedHashMap时，先得到的记录肯定是先插入的. 也可以在构造时用带参数，按照应用次数排序。在遍历的时候会比HashMap慢，不过有种情况例外，当HashMap容量很大，实际数据较少时，遍历起来可能会比LinkedHashMap慢，因为LinkedHashMap的遍历速度只和实际数据有关，和容量无关，而HashMap的遍历速度和他的容量有关。
* `TreeMap`：线程不同步，基于 **红黑树** （Red-Black tree）的NavigableMap 实现，**能够把它保存的记录根据键排序,默认是按键值的升序排序，也可以指定排序的比较器，当用Iterator 遍历TreeMap时，得到的记录是排过序的。**
* `HashTable`：线程安全，HashMap的迭代器\(Iterator\)是`fail-fast`迭代器。**HashTable不能存储NULL的key和value。**



## 工具类

* `Collections`、`Arrays`：集合类的一个工具类\/帮助类，其中提供了一系列静态方法，用于对集合中元素进行排序、搜索以及线程安全等各种操作。
* `Comparable`、`Comparator`：一般是用于对象的比较来实现排序，两者略有区别。
  > * 类设计者没有考虑到比较问题而没有实现Comparable接口。这是我们就可以通过使用Comparator，这种情况下，我们是不需要改变对象的。
  > * 一个集合中，我们可能需要有多重的排序标准，这时候如果使用Comparable就有些捉襟见肘了，可以自己继承Comparator提供多种标准的比较器进行排序。





​	深入理解JCF： [CarpenterLee/JCFInternals:深入理解Java集合框架](https://github.com/CarpenterLee/JCFInternals)

 - 具体内容安排如下：

    - [Overview](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/1-Overview.md) 对Java Collections Framework，以及Java语言特性做出基本介绍。
    - [ArrayList](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/2-ArrayList.md) 结合源码对*ArrayList*进行讲解。
    - [LinkedList](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/3-LinkedList.md) 结合源码对*LinkedList*进行讲解。
    - [Stack and Queue](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/4-Stack%20and%20Queue.md) 以*AarryDeque*为例讲解*Stack*和*Queue*。
    - [TreeSet and TreeMap](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/5-TreeSet%20and%20TreeMap.md) 结合源码对*TreeSet*和*TreeMap*进行讲解。
    - [HashSet and HashMap](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/6-HashSet%20and%20HashMap.md) 结合源码对*HashSet*和*HashMap*进行讲解。
    - [LinkedHashSet and LinkedHashMap](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/7-LinkedHashSet%20and%20LinkedHashMap.md) 结合源码对*LinkedHashSet*和*LinkedHashMap*进行讲解。
    - [PriorityQueue](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/8-PriorityQueue.md) 结合源码对*PriorityQueue*进行讲解。
    - [WeakHashMap](https://github.com/CarpenterLee/JCFInternals/blob/master/markdown/9-WeakHashMap.md) 对*WeakHashMap*做出基本介绍。

   

##### 7.ArrayList和LinkedList是常用的两种存储结构，有哪些区别呢？

- 1、ArrayList和LinkedList可想从名字分析，它们一个是Array(动态数组)的数据结构，一个是Link(链表)的数据结构，此外，它们两个都是对List接口的实现。前者是数组队列，相当于动态数组；后者为双向链表结构，也可当作堆栈、队列、双端队列
- 2、当随机访问List时（get和set操作），ArrayList比LinkedList的效率更高，因为LinkedList是线性的数据存储方式，所以需要移动指针从前往后依次查找。
- 3、当对数据进行增加和删除的操作时(add和remove操作)，LinkedList比ArrayList的效率更高，因为ArrayList是数组，所以在其中进行增删操作时，会对操作点之后所有数据的下标索引造成影响，需要进行数据的移动。
- 4、从利用效率来看，ArrayList自由性较低，因为它需要手动的设置固定大小的容量，但是它的使用比较方便，只需要创建，然后添加数据，通过调用下标进行使用；而LinkedList自由性较高，能够动态的随数据量的变化而变化，但是它不便于使用。
- 5、ArrayList主要控件开销在于需要在lList列表预留一定空间；而LinkList主要控件开销在于需要存储结点信息以及结点指针信息。









##### --------------------------------------------------------以下的内容还需要整理---------------------------------------------------------------





##### 5.Hash Map和Hash Table的区别，Hash Map中的key可以是任何对象或数据类型吗？HashTable是线程安全的么？ 

- Hash Map和Hash Table的区别 

  - Hashtable的方法是同步的，HashMap未经同步，所以在多线程场合要手动同步HashMap这个区别就像Vector和ArrayList一样。 
  - Hashtable不允许 null 值(key 和 value 都不可以)，HashMap允许 null 值(key和value都可以)。 
  - 两者的遍历方式大同小异，Hashtable仅仅比HashMap多一个elements方法。 

  Hashtable 和 HashMap 都能通过values()方法返回一个 Collection ，然后进行遍历处理。 

  两者也都可以通过 entrySet() 方法返回一个 Set ， 然后进行遍历处理。 

  - HashTable使用Enumeration，HashMap使用Iterator。 
  - 哈希值的使用不同，Hashtable直接使用对象的hashCode。而HashMap重新计算hash值，而且用于代替求模。 
  - Hashtable中hash数组默认大小是11，增加的方式是 old*2+1。HashMap中hash数组的默认大小是16，而且一定是2的指数。 
  - HashTable基于Dictionary类，而HashMap基于AbstractMap类 

- Hash Map中的key可以是任何对象或数据类型吗 

  - 可以为null，但不能是可变对象，如果是可变对象的话，对象中的属性改变，则对象HashCode也进行相应的改变，导致下次无法查找到已存在Map中的数据。 
  - 如果可变对象在HashMap中被用作键，那就要小心在改变对象状态的时候，不要改变它的哈希值了。我们只需要保证成员变量的改变能保证该对象的哈希值不变即可。 

- HashTable是线程安全的么 

  - HashTable是线程安全的，其实现是在对应的方法上添加了synchronized关键字进行修饰，由于在执行此方法的时候需要获得对象锁，则执行起来比较慢。所以现在如果为了保证线程安全的话，使用CurrentHashMap。 



##### 6. HashMap和Concurrent HashMap区别， Concurrent HashMap 线程安全吗， Concurrent HashMap如何保证 线程安全？ 

- HashMap和Concurrent HashMap区别？ 

  - HashMap是非线程安全的，CurrentHashMap是线程安全的。 
  - ConcurrentHashMap将整个Hash桶进行了分段segment，也就是将这个大的数组分成了几个小的片段segment，而且每个小的片段segment上面都有锁存在，那么在插入元素的时候就需要先找到应该插入到哪一个片段segment，然后再在这个片段上面进行插入，而且这里还需要获取segment锁。 
  - ConcurrentHashMap让锁的粒度更精细一些，并发性能更好。 

- Concurrent HashMap 线程安全吗， Concurrent HashMap如何保证 线程安全？ 

  - HashTable容器在竞争激烈的并发环境下表现出效率低下的原因是所有访问HashTable的线程都必须竞争同一把锁，那假如容器里有多把锁，每一把锁用于锁容器其中一部分数据，那么当多线程访问容器里不同数据段的数据时，线程间就不会存在锁竞争，从而可以有效的提高并发访问效率，这就是ConcurrentHashMap所使用的锁分段技术，首先将数据分成一段一段的存储，然后给每一段数据配一把锁，当一个线程占用锁访问其中一个段数据的时候，其他段的数据也能被其他线程访问。 
  - get操作的高效之处在于整个get过程不需要加锁，除非读到的值是空的才会加锁重读。get方法里将要使用的共享变量都定义成volatile，如用于统计当前Segement大小的count字段和用于存储值的HashEntry的value。定义成volatile的变量，能够在线程之间保持可见性，能够被多线程同时读，并且保证不会读到过期的值，但是只能被单线程写（有一种情况可以被多线程写，就是写入的值不依赖于原值），在get操作里只需要读不需要写共享变量count和value，所以可以不用加锁。 
  - Put方法首先定位到Segment，然后在Segment里进行插入操作。插入操作需要经历两个步骤，第一步判断是否需要对Segment里的HashEntry数组进行扩容，第二步定位添加元素的位置然后放在HashEntry数组里。 

   

##### 7. 因为别人知道源码怎么实现的，故意构造相同的hash的字符串进行攻击，怎么处理？那jdk7怎么办？ 

- 怎么处理构造相同hash的字符串进行攻击? 

  - 当客户端提交一个请求并附带参数的时候，web应用服务器会把我们的参数转化成一个HashMap存储，这个HashMap的逻辑结构如下：key1-->value1; 
  - 但是物理存储结构是不同的，key值会被转化成Hashcode，这个hashcode有会被转成数组的下标：0-->value1； 
  - 不同的string就会产生相同hashcode而导致碰撞，碰撞后的物理存储结构可能如下：0-->value1-->value2; 
  - 1、限制post和get的参数个数，越少越好 

  2、限制post数据包的大小 

  3、WAF 

- Jdk7 如何处理hashcode字符串攻击 

  - HashMap会动态的使用一个专门的treemap实现来替换掉它。 



##### 8.String、StringBuffer、StringBuilder以及对String不变性的理解 

- String、StringBuffer、StringBuilder 
  - 都是 final 类, 都不允许被继承; 
  - String 长度是不可变的, StringBuffer、StringBuilder 长度是可变的; 
  - StringBuffer 是线程安全的, StringBuilder 不是线程安全的，但它们两个中的所有方法都是相同的，StringBuffer在StringBuilder的方法之上添加了synchronized修饰，保证线程安全。 
  - StringBuilder比StringBuffer拥有更好的性能。 
  - 如果一个String类型的字符串，在编译时就可以确定是一个字符串常量，则编译完成之后，字符串会自动拼接成一个常量。此时String的速度比StringBuffer和StringBuilder的性能好的多。 
- String不变性的理解 
  - String 类是被final进行修饰的，不能被继承。 
  - 在用+号链接字符串的时候会创建新的字符串。 
  - String s = new String("Hello world"); 可能创建两个对象也可能创建一个对象。如果静态区中有“Hello world”字符串常量对象的话，则仅仅在堆中创建一个对象。如果静态区中没有“Hello world”对象，则堆上和静态区中都需要创建对象。 
  -  在 java 中, 通过使用 "+" 符号来串联字符串的时候, 实际上底层会转成通过 StringBuilder 实例的 append() 方法来实现。 

 

1. String有重写Object的hashcode和toString吗？如果重写equals不重写hashcode会出现什么问题？ 
   - String有重写Object的hashcode和toString吗？ 
     - String重写了Object类的hashcode和toString方法。 
   - 当equals方法被重写时，通常有必要重写hashCode方法，以维护hashCode方法的常规协定，该协定声明相对等的两个对象必须有相同的hashCode 
     - object1.euqal(object2)时为true， object1.hashCode() ==  object2.hashCode() 为true 
     - object1.hashCode() ==  object2.hashCode() 为false时，object1.euqal(object2)必定为false 
     - object1.hashCode() ==  object2.hashCode() 为true时，但object1.euqal(object2)不一定定为true 
   - 重写equals不重写hashcode会出现什么问题 
     - 在存储散列集合时(如Set类)，如果原对象.equals(新对象)，但没有对hashCode重写，即两个对象拥有不同的hashCode，则在集合中将会存储两个值相同的对象，从而导致混淆。因此在重写equals方法时，必须重写hashCode方法。 

 

1. Java序列化，如何实现序列化和反序列化，常见的序列化协议有哪些 

   - Java序列化定义 

     - 将那些实现了Serializable接口的对象转换成一个字节序列，并能够在以后将这个字节序列完全恢复为原来的对象，序列化可以弥补不同[操作系统](http://lib.csdn.net/base/operatingsystem)之间的差异。 

   - Java序列化的作用 

     - Java远程方法调用（RMI） 
     - 对JavaBeans进行序列化 

   - 如何实现序列化和反序列化 

     - 实现序列化方法 
       - 实现Serializable接口 
         - 该接口只是一个可序列化的标志，并没有包含实际的属性和方法。 
         - 如果不在改方法中添加readObject()和writeObject()方法，则采取默认的序列化机制。如果添加了这两个方法之后还想利用Java默认的序列化机制，则在这两个方法中分别调用defaultReadObject()和defaultWriteObject()两个方法。 
         - 为了保证安全性，可以使用transient关键字进行修饰不必序列化的属性。因为在反序列化时，private修饰的属性也能发查看到。 
       - 实现ExternalSerializable方法 
         - 自己对要序列化的内容进行控制，控制那些属性能被序列化，那些不能被序列化。 
     - 反序列化 
       - 实现Serializable接口的对象在反序列化时不需要调用对象所在类的构造方法，完全基于字节。 
       - 实现externalSerializable接口的方法在反序列化时会调用构造方法。 
     - 注意事项 
       - 被static修饰的属性不会被序列化 
       - 对象的类名、属性都会被序列化，方法不会被序列化 
       - 要保证序列化对象所在类的属性也是可以被序列化的 
       - 当通过网络、文件进行序列化时，必须按照写入的顺序读取对象。 
       - 反序列化时必须有序列化对象时的class文件 
       - 最好显示的声明serializableID，因为在不同的JVM之间，默认生成serializableID 可能不同，会造成反序列化失败。 

   - 常见的序列化协议有哪些 

     - COM主要用于Windows平台，并没有真正实现跨平台，另外COM的序列化的原理利用了编译器中虚表，使得其学习成本巨大。 

     - CORBA是早期比较好的实现了跨平台，跨语言的序列化协议。COBRA的主要问题是参与方过多带来的版本过多，版本之间兼容性较差，以及使用复杂晦涩。 

     - XML&SOAP 

       - XML是一种常用的序列化和反序列化协议，具有跨机器，跨语言等优点。 
       - SOAP（Simple Object Access protocol） 是一种被广泛应用的，基于XML为序列化和反序列化协议的结构化消息传递协议。SOAP具有安全、可扩展、跨语言、跨平台并支持多种传输层协议。 

     - JSON（[JavaScript](http://lib.csdn.net/base/javascript) Object Notation） 

       - 这种Associative array格式非常符合工程师对对象的理解。 
       - 它保持了XML的人眼可读（Human-readable）的优点。 
       - 相对于XML而言，序列化后的数据更加简洁。  
       - 它具备[javascript](http://lib.csdn.net/base/javascript)的先天性支持，所以被广泛应用于Web browser的应用常景中，是Ajax的事实标准协议。 
       - 与XML相比，其协议比较简单，解析速度比较快。 
       - 松散的Associative array使得其具有良好的可扩展性和兼容性。 

     - Thrift是Facebook开源提供的一个高性能，轻量级RPC服务框架，其产生正是为了满足当前[大数据](http://lib.csdn.net/base/hadoop)量、分布式、跨语言、跨平台数据通讯的需求。Thrift在空间开销和解析性能上有了比较大的提升，对于对性能要求比较高的分布式系统，它是一个优秀的RPC解决方案；但是由于Thrift的序列化被嵌入到Thrift框架里面，Thrift框架本身并没有透出序列化和反序列化接口，这导致其很难和其他传输层协议共同使用 

     - Protobuf具备了优秀的序列化协议的所需的众多典型特征 

       - 标准的IDL和IDL编译器，这使得其对工程师非常友好。 
       - 序列化数据非常简洁，紧凑，与XML相比，其序列化之后的数据量约为1/3到1/10。 
       - 解析速度非常快，比对应的XML快约20-100倍。 
       - 提供了非常友好的动态库，使用非常简介，反序列化只需要一行代码。由于其解析性能高，序列化后数据量相对少，非常适合应用层对象的持久化场景 

        

     - Avro的产生解决了JSON的冗长和没有IDL的问题，Avro属于Apache [Hadoop](http://lib.csdn.net/base/hadoop)的一个子项目。 Avro提供两种序列化格式：JSON格式或者Binary格式。Binary格式在空间开销和解析性能方面可以和Protobuf媲美，JSON格式方便[测试](http://lib.csdn.net/base/softwaretest)阶段的调试。适合于高性能的序列化服务。 

   - 几种协议的对比 

     - XML序列化（Xstream）无论在性能和简洁性上比较差； 
     - Thrift与Protobuf相比在时空开销方面都有一定的劣势； 
     - Protobuf和Avro在两方面表现都非常优越。 

      

2. Java实现多线程的方式及三种方式的区别 

   - 实现多线程的方式 

     - 继承Thread类，重写run函数。 
     - 实现Runnable接口 
     - 实现Callable接口 

   - 三种方式的区别 

     - 实现Runnable接口可以避免Java单继承特性而带来的局限；增强程序的健壮性，代码能够被多个线程共享，代码与数据是独立的；适合多个相同程序代码的线程区处理同一资源的情况。 
     - 继承Thread类和实现Runnable方法启动线程都是使用start方法，然后JVM虚拟机将此线程放到就绪队列中，如果有处理机可用，则执行run方法。 
     - 实现Callable接口要实现call方法，并且线程执行完毕后会有返回值。其他的两种都是重写run方法，没有返回值。 

      

3. 线程安全 

   - 定义 
     - 某个类的行为与其规范一致。 
     - 不管多个线程是怎样的执行顺序和优先级,或是wait,sleep,join等控制方式,，如果一个类在多线程访问下运转一切正常，并且访问类不需要进行额外的同步处理或者协调，那么我们就认为它是线程安全的。  
   - 如何保证线程安全？6 
     - 对变量使用volitate 
     - 对程序段进行加锁(synchronized,lock) 
   - 注意 
     - 非线程安全的集合在多线程环境下可以使用，但并不能作为多个线程共享的属性，可以作为某个线程独享的属性。 
     - 例如Vector是线程安全的，ArrayList不是线程安全的。如果每一个线程中new一个ArrayList，而这个ArrayList只是在这一个线程中使用，肯定没问题。 

4. 多线程如何进行信息交互 

   - Object中的方法，wait()， notify()，notifyAll(); 

5. 多线程共用一个数据变量需要注意什么？ 

   - 当我们在线程对象（Runnable）中定义了全局变量，run方法会修改该变量时，如果有多个线程同时使用该线程对象，那么就会造成全局变量的值被同时修改，造成错误. 
   - ThreadLocal是JDK引入的一种机制，它用于解决线程间共享变量，使用ThreadLocal声明的变量，即使在线程中属于全局变量，针对每个线程来讲，这个变量也是独立的。 
   - volatile变量每次被线程访问时，都强迫线程从主内存中重读该变量的最新值，而当该变量发生修改变化时，也会强迫线程将最新的值刷新回主内存中。这样一来，不同的线程都能及时的看到该变量的最新值。 

6. 什么是线程池？如果让你设计一个动态大小的线程池，如何设计，应该有哪些方法？ 

   - 什么是线程池 

     - 线程池顾名思义就是事先创建若干个可执行的线程放入一个池（容器）中，需要的时候从池中获取线程不用自行创建，使用完毕不需要销毁线程而是放回池中，从而减少创建和销毁线程对象的开销。 

   - 设计一个动态大小的线程池，如何设计，应该有哪些方法 

     - 一个线程池包括以下四个基本组成部分： 

       - 线程管理器(ThreadPool)：用于创建并管理线程池，包括创建线程，销毁线程池，添加新任务； 
       - 工作线程(PoolWorker)：线程池中线程，在没有任务时处于等待状态，可以循环的执行任务； 
       - 任务接口(Task)：每个任务必须实现的接口，以供工作线程调度任务的执行，它主要规定了任务的入口，任务执行完后的收尾工作，任务的执行状态等； 
       - 任务队列(TaskQueue)：用于存放没有处理的任务。提供一种缓冲机制； 

     - 所包含的方法 

       - private ThreadPool()  创建线程池 
       - public static ThreadPool getThreadPool()  获得一个默认线程个数的线程池  
       -  public void execute(Runnable task)  执行任务,其实只是把任务加入任务队列，什么时候执行有线程池管理器决定 
       - public void execute(Runnable[] task)  批量执行任务,其实只是把任务加入任务队列，什么时候执行有线程池管理器决定 
       - public void destroy()  销毁线程池,该方法保证在所有任务都完成的情况下才销毁所有线程，否则等待任务完成才销毁 
       - public int getWorkThreadNumber() 返回工作线程的个数  
       - public int getFinishedTasknumber() 返回已完成任务的个数,这里的已完成是只出了任务队列的任务个数，可能该任务并没有实际执行完成 
       - public void addThread() 在保证线程池中所有线程正在执行，并且要执行线程的个数大于某一值时。增加线程池中线程的个数 
       - public void reduceThread() 在保证线程池中有很大一部分线程处于空闲状态，并且空闲状态的线程在小于某一值时，减少线程池中线程的个数  

        

7. Java是否有内存泄露和内存溢出 

   - 静态集合类，使用Set、Vector、HashMap等集合类的时候需要特别注意。当这些类被定义成静态的时候，由于他们的生命周期跟应用程序一样长，这时候就有可能发生内存泄漏。 

   例子 

   class StaticTest 
   { 
       private static Vector v = new Vector(10); 

   public void init() 
       { 
           for (int i = 1; i < 100; i++) 
           { 
               Object object = new Object(); 
               v.add(object); 
               object = null; 
           } 
       } 
   } 

   在上面的代码中，循环申请了Object对象，并添加到Vector中，然后设置为null，可是这些对象呗vector引用着，因此必能被GC回收，因此造成内存泄漏。因此要释放这些对象，还需要将它们从vector删除，最简单的方法就是将vector设置为null 

    

   - 监听器： 在Java编程中，我们都需要和监听器打交道，通常一个应用中会用到很多监听器，我们会调用一个控件，诸如addXXXListener()等方法来增加监听器，但往往在释放的时候却没有去删除这些监听器，从而增加了内存泄漏的机会。 

    

   - 物理连接：一些物理连接，比如[数据库](http://lib.csdn.net/base/mysql)连接和网络连接，除非其显式的关闭了连接，否则是不会自动被GC 回收的。Java 数据库连接一般用DataSource.getConnection()来创建，当不再使用时必须用Close()方法来释放，因为这些连接是独立于JVM的。对于Resultset 和Statement 对象可以不进行显式回收，但Connection 一定要显式回收，因为Connection 在任何时候都无法自动回收，而Connection一旦回收，Resultset 和Statement 对象就会立即为NULL。但是如果使用连接池，情况就不一样了，除了要显式地关闭连接，还必须显式地关闭Resultset Statement 对象（关闭其中一个，另外一个也会关闭），否则就会造成大量的Statement 对象无法释放，从而引起内存泄漏。。一般情况下，在try代码块里创建连接，在finally里释放连接，就能够避免此类内存泄漏。 

    

   - 内部类和外部模块等的引用：内部类的引用是比较容易遗忘的一种，而且一旦没释放可能导致一系列的后继类对象没有释放。在调用外部模块的时候，也应该注意防止内存泄漏，如果模块A调用了外部模块B的一个方法，如： 

   public void register(Object o) 

   这个方法有可能就使得A模块持有传入对象的引用，这时候需要查看B模块是否提供了出去引用的方法，这种情况容易忽略，而且发生内存泄漏的话，还比较难察觉。 

    

   - 单例模式：因为单利对象初始化后将在JVM的整个生命周期内存在，如果它持有一个外部对象的（生命周期比较短）引用，那么这个外部对象就不能被回收，从而导致内存泄漏。如果这个外部对象还持有其他对象的引用，那么内存泄漏更严重。 

 

1. concurrent包下面，都用过什么？  

   - concurrent下面的包 

     - Executor  用来创建线程池，在实现Callable接口时，添加线程。 
     - FeatureTask 此 FutureTask 的 get 方法所返回的结果类型。 
     - TimeUnit 
     - Semaphore  
     - LinkedBlockingQueue  

   - 所用过的类 

     - Executor   

      

2. volatile 关键字的如何保证内存可见性 

   - volatile 关键字的作用 

     - 保证内存的可见性 
     - 防止指令重排 
     - 注意：volatile 并不保证原子性 

   - 内存可见性 

     - volatile保证可见性的原理是在每次访问变量时都会进行一次刷新，因此每次访问都是主内存中最新的版本。所以volatile关键字的作用之一就是保证变量修改的实时可见性。 

   - 当且仅当满足以下所有条件时，才应该使用volatile变量 

     - 对变量的写入操作不依赖变量的当前值，或者你能确保只有单个线程更新变量的值。 
     - 该变量没有包含在具有其他变量的不变式中。 

   - volatile使用建议 

     - 在两个或者更多的线程需要访问的成员变量上使用volatile。当要访问的变量已在synchronized代码块中，或者为常量时，没必要使用volatile。 
     - 由于使用volatile屏蔽掉了JVM中必要的代码优化，所以在效率上比较低，因此一定在必要时才使用此关键字。 

   - volatile和synchronized区别 

     - volatile不会进行加锁操作： 

     volatile变量是一种稍弱的同步机制在访问volatile变量时不会执行加锁操作，因此也就不会使执行线程阻塞，因此volatile变量是一种比synchronized关键字更轻量级的同步机制。 

     -  volatile 变量作用类似于同步变量读写操作： 

     从内存可见性的角度看，写入volatile变量相当于退出同步代码块，而读取volatile变量相当于进入同步代码块。 

     - volatile 不如 synchronized安全： 

     在代码中如果过度依赖volatile变量来控制状态的可见性，通常会比使用锁的代码更脆弱，也更难以理解。仅当volatile变量能简化代码的实现以及对同步策略的验证时，才应该使用它。一般来说，用同步机制会更安全些。 

     - volatile 无法同时保证内存可见性和原则性： 

     加锁机制（即同步机制）既可以确保可见性又可以确保原子性，而volatile变量只能确保可见性，原因是声明为volatile的简单变量如果当前值与该变量以前的值相关，那么volatile关键字不起作用，也就是说如下的表达式都不是原子操作：“count++”、“count = count+1”。 

      

3. sleep和wait分别是那个类的方法，有什么区别 

   - sleep和wait 
     - sleep是Thread类的方法 
     - wait是Object类的方法 
   - 有什么区别 
     - sleep()方法（休眠）是线程类（Thread）的静态方法，调用此方法会让当前线程暂停执行指定的时间，将执行机会（CPU）让给其他线程，但是对象的锁依然保持，因此休眠时间结束后会自动恢复（线程回到就绪状态）。 
     - wait()是Object类的方法，调用对象的wait()方法导致当前线程放弃对象的锁（线程暂停执行），进入对象的等待池（wait pool），只有调用对象的notify()方法（或notifyAll()方法）时才能唤醒等待池中的线程进入等锁池（lock pool），如果线程重新获得对象的锁就可以进入就绪状态。 

4. synchronized与lock的区别，使用场景。看过synchronized的源码没？ 

   - synchronized与lock的区别 

     - （用法）synchronized(隐式锁)：在需要同步的对象中加入此控制，synchronized可以加在方法上，也可以加在特定代码块中，括号中表示需要锁的对象。 
     - （用法）lock（显示锁）：需要显示指定起始位置和终止位置。一般使用ReentrantLock类做为锁，多个线程中必须要使用一个ReentrantLock类做为对 象才能保证锁的生效。且在加锁和解锁处需要通过lock()和unlock()显示指出。所以一般会在finally块中写unlock()以防死锁。 
     - （性能）synchronized是托管给JVM执行的，而lock是java写的控制锁的代码。在Java1.5中，synchronize是性能低效的。因为 这是一个重量级操作，需要调用操作接口，导致有可能加锁消耗的系统时间比加锁以外的操作还多。相比之下使用Java提供的Lock对象，性能更高一些。但 是到了Java1.6，发生了变化。synchronize在语义上很清晰，可以进行很多优化，有适应自旋，锁消除，锁粗化，轻量级锁，偏向锁等等。导致 在Java1.6上synchronize的性能并不比Lock差。 
     - （机制）synchronized原始采用的是CPU悲观锁机制，即线程获得的是独占锁。独占锁意味着其 他线程只能依靠阻塞来等待线程释放锁。Lock用的是乐观锁方式。所谓乐观锁就是，每次不加锁而是假设没有冲突而去完成某项操作，如果因为冲突失败就重试，直到成功为止。乐观锁实现的机制就 是CAS操作（Compare and Swap）。 

      

5. synchronized底层如何实现的？用在代码块和方法上有什么区别？ 

   - synchronized底层如何实现的 

    

   - 用在代码块和方法上有什么区别？ 
     - synchronized用在代码块锁的是调用该方法的对象（this），也可以选择锁住任何一个对象。 
     - synchronized用在方法上锁的是调用该方法的对象， 
     - synchronized用在代码块可以减小锁的粒度，从而提高并发性能。 
     - 无论用在代码块上还是用在方法上，都是获取对象的锁；每一个对象只有一个锁与之相关联；实现同步需要很大的系统开销作为代价，甚至可能造成死锁，所以尽量避免无谓的同步控制。 
   -  synchronized与static synchronized的区别 
     - synchronized是对类的当前实例进行加锁，防止其他线程同时访问该类的该实例的所有synchronized块，同一个类的两个不同实例就没有这种约束了。 
     - 那么static synchronized恰好就是要控制类的所有实例的访问了，static synchronized是限制线程同时访问jvm中该类的所有实例同时访问对应的代码快。 

 

1. 常见异常分为那两种(Exception，Error)，常见异常的基类以及常见的异常 

   - Throwable是java语言中所有错误和异常的超类（万物即可抛）。它有两个子类：Error、Exception。 

   - 异常种类 

     - Error：Error为错误，是程序无法处理的，如OutOfMemoryError、ThreadDeath等，出现这种情况你唯一能做的就是听之任之，交由JVM来处理，不过JVM在大多数情况下会选择终止线程。 
     - Exception：Exception是程序可以处理的异常。它又分为两种CheckedException（受捡异常），一种是UncheckedException（不受检异常）。 
       - CheckException发生在编译阶段，必须要使用try…catch（或者throws）否则编译不通过。 
       - UncheckedException发生在运行期，具有不确定性，主要是由于程序的逻辑问题所引起的，难以排查，我们一般都需要纵观全局才能够发现这类的异常错误，所以在程序设计中我们需要认真考虑，好好写代码，尽量处理异常，即使产生了异常，也能尽量保证程序朝着有利方向发展。 

   - 常见异常的基类 

     - IOException 
     - RuntimeException 

   - 常见的异常 

     ![图像](https://blog.csdn.net/sinat_22797429/article/details/76293284)

2. ##### Java中的NIO，BIO，AIO分别是什么？  

- 先来个例子理解一下概念，以银行取款为例：
  - 同步 ： 自己亲自出马持银行卡到银行取钱（使用同步IO时，Java自己处理IO读写）。
  - 异步 ： 委托一小弟拿银行卡到银行取钱，然后给你（使用异步IO时，Java将IO读写委托给OS处理，需要将数据缓冲区地址和大小传给OS(银行卡和密码)，OS需要支持异步IO操作API）。
  - 阻塞 ： ATM排队取款，你只能等待（使用阻塞IO时，Java调用会一直阻塞到读写完成才返回）。
  - 非阻塞 ： 柜台取款，取个号，然后坐在椅子上做其它事，等号广播会通知你办理，没到号你就不能去，你可以不断问大堂经理排到了没有，大堂经理如果说还没到你就不能去（使用非阻塞IO时，如果不能读写Java调用会马上返回，当IO事件分发器会通知可读写时再继续进行读写，不断循环直到读写完成）。



- BIO 
  - 同步并阻塞，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，当然可以通过线程池机制改善。 
  - BIO方式适用于连接数目比较小且固定的[架构](http://lib.csdn.net/base/architecture)，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，但程序直观简单易理解。 

- NIO  
  - 同步非阻塞，服务器实现模式为一个请求一个线程，即客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接有I/O请求时才启动一个线程进行处理。 
  - NIO方式适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂，JDK1.4开始支持。 

- AIO 
  -  异步非阻塞，服务器实现模式为一个有效请求一个线程，客户端的I/O请求都是由OS先完成了再通知服务器应用去启动线程进行处理. 
  -  AIO方式使用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用OS参与并发操作，编程比较复杂，JDK7开始支持。 

  

- 另外，I/O属于底层操作，需要操作系统支持，并发也需要操作系统的支持，所以性能方面不同操作系统差异会比较明显。 



BIO、NIO和AIO的区别（简明版） - Nutty - 博客园
https://www.cnblogs.com/ygj0930/p/6543960.html

Java BIO、NIO、AIO 学习-力量来源于赤诚的爱！-51CTO博客
http://blog.51cto.com/stevex/1284437





1. 所了解的设计模式，单例模式的注意事项，jdk源码哪些用到了你说的设计模式 

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

2. 匿名内部类是什么？如何访问在其外面定义的变量？ 

   - 匿名内部类是什么？ 
     - 匿名内部类是没有访问修饰符的。 
     - 所以当所在方法的形参需要被匿名内部类使用，那么这个形参就必须为final 
     - 匿名内部类是没有构造方法的。因为它连名字都没有何来构造方法。 
   - 如何访问在其外面定义的变量？ 
     - 所以当所在方法的形参需要被匿名内部类使用，那么这个形参就必须为final 

3. 如果你定义一个类，包括学号，姓名，分数，如何把这个对象作为key？要重写equals和hashcode吗 

   - 需要重写equals方法和hashcode，必须保证对象的属性改变时，其hashcode不能改变。 

4. 为什么要实现内存模型？ 

   - 内存模型的就是为了在现代计算机平台中保证程序可以正确性的执行，但是不同的平台实现是不同的。 
   - 编译器中生成的指令顺序， 可以与源代码中的顺序不同； 
   - 编译器可能把变量保存在寄存器而不是内存中； 
   - 处理器可以采用乱序或并行等方式来执行指令； 
   - 缓存可能会改变将写入变量提交到主内存的次序； 
   - 保存在处理器本地缓存中的值，对其他处理器是不可见的； 





##### 1.集合框架的体系结构



##### 2.Java的四个基本特性（抽象、封装、继承，多态），对多态的理解(多态的实现方式)以及在项目中那些地方用到多态

- Java的四个基本特性
  - **抽象：**抽象是将一类对象的共同特征总结出来构造类的过程，包括数据抽象和行为抽象两方面。抽象只关注对象有哪些属性和行为，并不关注这些行为的细节是什么。
  - **继承：**继承是从已有类得到继承信息创建新类的过程。提供继承信息的类被称为父类（超类、基类）；得到继承信息的类被称为子类（派生类）。继承让变化中的软件系统有了一定的延续性，同时继承也是封装程序中可变因素的重要手段。    
  - 封装：通常认为封装是把数据和操作数据的方法绑定起来，对数据的访问只能通过已定义的接口。面向对象的本质 就是将现实世界描绘成一系列完全自治、封闭的对象。我们在类中编写的方法就是对实现细节的一种封装；我们编 写一个类就是对数据和数据操作的封装。可以说，封装就是隐藏一切可隐藏的东西，只向外界提供最简单的编程接 口。    
  - 多态













