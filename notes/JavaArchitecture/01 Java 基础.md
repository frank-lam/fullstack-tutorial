[TOC]





# 前言

为了更好的总结Java面试中的系统知识结构，当前仓库根据以下资料整理学习笔记。

- [Interview-Notebook/Java 基础.md at master · CyC2018/Interview-Notebook](https://github.com/CyC2018/Interview-Notebook/blob/master/notes/Java%20%E5%9F%BA%E7%A1%80.md#%E5%85%AD%E5%85%B3%E9%94%AE%E5%AD%97)
- 《Java程序员面试笔试宝典》以下索引中`B`代表该书。
- [《阿里面经OneNote》](https://blog.csdn.net/sinat_22797429/article/details/76293284)

from 2018/7/11



 



# 一、基本概念

## 1. Java程序初始化的顺序是怎么样的（B50）

在Java语言中，当实例化对象时，对象所在类的所有成员变量首先要进行初始化，只有当所有类成员完成初始化后，才会调用对象所在类的构造函数创建象。

**初始化一般遵循3个原则：**

- 静态对象（变量）优先于静态对象（变量）初始化，静态对象（变量）只初始化一次，而非静态对象（变量）可能会初始化多次
- 父类优先于子类进行初始化
- 按照成员变量的定义顺序进行初始化。 即使变量定义散布于方法定义之中，它们依然在任何方法（包括构造函数）被调用之前先初始化

**加载顺序**

- 父类（静态变量、静态语句块）
- 子类（静态变量、静态语句块）
- 父类（实例变量、普通语句块）
- 父类（构造函数）
- 子类（实例变量、普通语句块）
- 子类（构造函数）



**实例** 

```java
class Base {
    // 1.父类静态代码块
    static {
        System.out.println("Base static block!");
    }
    // 3.父类非静态代码块
    {
        System.out.println("Base block");
    }
    // 4.父类构造器
    public Base() {
        System.out.println("Base constructor!");
    }
}

public class Derived extends Base {
    // 2.子类静态代码块
    static{
        System.out.println("Derived static block!");
    }
    // 5.子类非静态代码块
    {
        System.out.println("Derived block!");
    }
    // 6.子类构造器
    public Derived() {
        System.out.println("Derived constructor!");
    }
    public static void main(String[] args) {
        new Derived();
    }
}
```

结果是：

```
Base static block!
Derived static block!
Base block
Base constructor!
Derived block!
Derived constructor!
```



## 2. Java和C++的区别？

- Java 是**纯粹的面向对象语言**，所有的对象都继承自 java.lang.Object**，C++ 为了兼容 C 即支持面向对象也支持面向过程**。
- Java 通过虚拟机从而实现**跨平台特性**，但是 C++ 依赖于**特定的平台**。
- Java 没有指针，它的引用可以理解为安全指针，而 C++ 具有和 C 一样的指针。
- Java 支持**自动垃圾回收**，而 C++ 需要**手动回收**。
- **Java 不支持多重继承**，只能通过实现多个接口来达到相同目的，而 **C++ 支持多重继承**。
- Java 不支持操作符重载，虽然可以对两个 String 对象支持加法运算，但是这是语言内置支持的操作，不属于操作符重载，而 C++ 可以。
- Java 内置了线程的支持，而 C++ 需要依靠第三方库。
- Java 的 **goto 是保留字**，但是不可用，C++ 可以使用 goto。
- Java **不支持条件编译**，C++ 通过 #ifdef #ifndef 等预处理命令从而实现条件编译。



## 2. 什么是反射

​	通过Class获取class信息称之为反射（Reflection）。反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为Java语言的反射机制。 



**反射应用中获取Class实例的四种方式**

```java
//1.调用运行时类本身的.class属性
Class clazz1 = Person.class;
System.out.println(clazz1.getName());

Class clazz2 = String.class;
System.out.println(clazz2.getName());

//2.通过运行时类的对象获取 getClass();
Person p = new Person();
Class clazz3 = p.getClass();
System.out.println(clazz3.getName());

//3.通过Class的静态方法获取.通过此方式，体会一下，反射的动态性。
String className = "com.atguigu.java.Person";
Class clazz4 = Class.forName(className);
// clazz4.newInstance();
System.out.println(clazz4.getName());

//4.（了解）通过类的加载器 ClassLoader
ClassLoader classLoader = this.getClass().getClassLoader();
Class clazz5 = classLoader.loadClass(className);
System.out.println(clazz5.getName());
```



## 3. 什么是注解

　　Annontation是Java5开始引入的新特征，中文名称叫注解。它提供了一种安全的类似注释的机制，用来**将任何的信息或元数据（metadata）与程序元素（类、方法、成员变量等）进行关联**。为程序的元素（类、方法、成员变量）加上更直观更明了的说明，这些说明信息是与程序的业务逻辑无关，并且供指定的工具或框架使用。Annontation像一种修饰符一样，应用于包、类型、构造方法、方法、成员变量、参数及本地变量的声明语句中。

　　Java 注解是附加在代码中的一些元信息，用于一些工具在编译、运行时进行解析和使用，起到说明、配置的功能。注解不会也不能影响代码的实际逻辑，仅仅起到辅助性的作用。包含在 java.lang.annotation 包中。



**常见标准的Annotation：**

  1）Override

​	java.lang.Override是一个标记类型注解，它被用作标注方法。它说明了被标注的方法重载了父类的方法，起到了断言的作用。让编译器检查该方法是否正确地实现了复写。



  2）Deprecated
     Deprecated也是一种标记类型注解。当一个类型或者类型成员使用@Deprecated修饰的话，编译器将不鼓励使用这个被标注的程序元素。告诉编译器该方法已经被标记为“作废”，在其他地方引用将会出现编译警告。



 3）SuppressWarnings
     SuppressWarning不是一个标记类型注解。它有一个类型为String[]的成员，这个成员的值为被禁止的警告名。对于javac编译器来讲，被-Xlint选项有效的警告名也同样对@SuppressWarings有效，同时编译器忽略掉无法识别的警告名。



 示例1——抑制单类型的警告：

```java
@SuppressWarnings("unchecked")
public void addItems(String item){
  @SuppressWarnings("rawtypes")
   List items = new ArrayList();
   items.add(item);
}
```

  示例2——抑制多类型的警告：

```java
@SuppressWarnings(value={"unchecked", "rawtypes"})
public void addItems(String item){
   List items = new ArrayList();
   items.add(item);
}
```

  示例3——抑制所有类型的警告：

```java
@SuppressWarnings("all")
public void addItems(String item){
   List items = new ArrayList();
   items.add(item);
}
```



 参考资料：[注解Annotation实现原理与自定义注解例子](https://www.cnblogs.com/acm-bingzi/p/javaAnnotation.html)



## 4. 什么是泛型

**通俗解释**

通俗的讲，泛型就是操作类型的 占位符，即：假设占位符为T，那么此次声明的数据结构操作的数据类型为T类型。



假定我们有这样一个需求：写一个排序方法，能够对整型数组、字符串数组甚至其他任何类型的数组进行排序，该如何实现？

答案是可以使用 **Java 泛型**。

使用 Java 泛型的概念，我们可以写一个泛型方法来对一个对象数组排序。然后，调用该泛型方法来对整型数组、浮点数数组、字符串数组等进行排序。

### 泛型方法

**你可以写一个泛型方法，该方法在调用时可以接收不同类型的参数。根据传递给泛型方法的参数类型，编译器适当地处理每一个方法调用。**

下面是定义泛型方法的规则：

- 所有泛型方法声明都有一个类型参数声明部分（由尖括号分隔），该类型参数声明部分在方法返回类型之前（在下面例子中的<E>）。
- 每一个类型参数声明部分包含一个或多个类型参数，参数间用逗号隔开。一个泛型参数，也被称为一个类型变量，是用于指定一个泛型类型名称的标识符。
- 类型参数能被用来声明返回值类型，并且能作为泛型方法得到的实际参数类型的占位符。
- 泛型方法体的声明和其他方法一样。注意类型参数**只能代表引用型类型，不能是原始类型（**像int,double,char的等）。

```java
public class GenericMethodTest
{
   // 泛型方法 printArray                         
   public static < E > void printArray( E[] inputArray )
   {
      // 输出数组元素            
         for ( E element : inputArray ){        
            System.out.printf( "%s ", element );
         }
         System.out.println();
    }
 
    public static void main( String args[] )
    {
        // 创建不同类型数组： Integer, Double 和 Character
        Integer[] intArray = { 1, 2, 3, 4, 5 };
        Double[] doubleArray = { 1.1, 2.2, 3.3, 4.4 };
        Character[] charArray = { 'H', 'E', 'L', 'L', 'O' };
 
        System.out.println( "整型数组元素为:" );
        printArray( intArray  ); // 传递一个整型数组
 
        System.out.println( "\n双精度型数组元素为:" );
        printArray( doubleArray ); // 传递一个双精度型数组
 
        System.out.println( "\n字符型数组元素为:" );
        printArray( charArray ); // 传递一个字符型数组
    } 
}
```



### 泛型类

泛型类的声明和非泛型类的声明类似，除了在类名后面添加了类型参数声明部分。

和泛型方法一样，泛型类的类型参数声明部分也包含一个或多个类型参数，参数间用逗号隔开。一个泛型参数，也被称为一个类型变量，是用于指定一个泛型类型名称的标识符。因为他们接受一个或多个参数，这些类被称为参数化的类或参数化的类型。

```java
public class Box<T> {
  private T t;
  public void add(T t) {
    this.t = t;
  }
 
  public T get() {
    return t;
  }
 
  public static void main(String[] args) {
    Box<Integer> integerBox = new Box<Integer>();
    Box<String> stringBox = new Box<String>();
 
    integerBox.add(new Integer(10));
    stringBox.add(new String("菜鸟教程"));
 
    System.out.printf("整型值为 :%d\n\n", integerBox.get());
    System.out.printf("字符串为 :%s\n", stringBox.get());
  }
}
```

### 类型通配符

1、类型通配符一般是使用?代替具体的类型参数。例如 **List<?>** 在逻辑上是**List<String>,List<Integer>** 等所有List<具体类型实参>的父类。  

2、类型通配符上限通过形如List来定义，如此定义就是通配符泛型值接受Number及其下层子类类型。  

3、类型通配符下限通过形如 **List<? super Number>**来定义，表示类型只能接受Number及其三层父类类型，如Objec类型的实例。  





参考资料：

- [Java 泛型，了解这些就够用了。 - 逃离沙漠 - 博客园](https://www.cnblogs.com/demingblog/p/5495610.html)
- [Java 泛型 | 菜鸟教程](http://www.runoob.com/java/java-generics.html)
- [【Java心得总结四】Java泛型下——万恶的擦除 - xlturing - 博客园](https://www.cnblogs.com/xltcjylove/p/3671943.html)
  



## 5. 为什么要实现内存模型？

- 内存模型的就是为了在现代计算机平台中保证程序可以正确性的执行，但是不同的平台实现是不同的。 
- 编译器中生成的指令顺序， 可以与源代码中的顺序不同； 
- 编译器可能把变量保存在寄存器而不是内存中； 
- 处理器可以采用乱序或并行等方式来执行指令； 
- 缓存可能会改变将写入变量提交到主内存的次序； 
- 保存在处理器本地缓存中的值，对其他处理器是不可见的； 



## 6. 字节与字符的区别 ？【蚂蚁金服内推】

理解编码的关键，是要把字符的概念和字节的概念理解准确。这两个概念容易混淆，我们在此做一下区分：

|                | **概念描述**                                                 | **举例**                      |
| -------------- | ------------------------------------------------------------ | ----------------------------- |
| 字符           | 人们使用的记号，抽象意义上的一个符号。                       | '1', '中', 'a', '$', '￥', …… |
| 字节           | 计算机中存储数据的单元，一个8位的二进制数，是一个很具体的存储空间。 | 0x01, 0x45, 0xFA, ……          |
| ANSI 字符串    | 在内存中，如果“字符”是以 **ANSI 编码**形式存在的，一个字符可能使用一个字节或多个字节来表示，那么我们称这种字符串为 **ANSI 字符串**或者**多字节字符串**。 | "中文123" （占7字节）         |
| UNICODE 字符串 | 在内存中，如果“字符”是以在 UNICODE 中的序号存在的，那么我们称这种字符串为 **UNICODE 字符串**或者**宽字节字符串**。 | L"中文123" （占10字节）       |



**字节与字符区别**

它们完全不是一个位面的概念，所以两者之间没有“区别”这个说法。不同编码里，字符和字节的对应关系不同：

|         |                                                              |
| ------- | ------------------------------------------------------------ |
| ASCII   | 一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字节的空间。一个二进制数字序列，在计算机中作为一个数字单元，一般为8位二进制数，换算为十进制。最小值0，最大值255。 |
| UTF-8   | 一个英文字符等于一个字节，一个中文（含繁体）等于三个字节     |
| Unicode | 一个英文等于两个字节，一个中文（含繁体）等于两个字节。符号：英文标点占一个字节，中文标点占两个字节。举例：英文句号“.”占1个字节的大小，中文句号“。”占2个字节的大小。 |
| UTF-16  | 一个英文字母字符或一个汉字字符存储都需要2个字节（Unicode扩展区的一些汉字存储需要4个字节） |
| UTF-32  | 世界上任何字符的存储都需要4个字节                            |



参考资料：

- [字符，字节和编码 - Characters, Bytes And Encoding](http://www.regexlab.com/zh/encoding.htm)



## 7. 有哪些访问修饰符

Java面向对象的基本思想之一是封装细节并且公开接口。Java语言采用访问控制修饰符来控制类及类的方法和变量的访问权限，从而向使用者暴露接口，但隐藏实现细节。访问控制分为四种级别：

| 修饰符    | 当前类 | 同 包 | 子 类 | 其他包 |
| --------- | ------ | ----- | ----- | ------ |
| public    | √      | √     | √     | √      |
| protected | √      | √     | √     | ×      |
| default   | √      | √     | ×     | ×      |
| private   | √      | ×     | ×     | ×      |

- 类的成员不写访问修饰时默认为default。默认对于同一个包中的其他类相当于公开（public），对于不是同一个包中的其他类相当于私有（private）。
- 受保护（protected）对子类相当于公开，对不是同一包中的没有父子关系的类相当于私有。
- Java中，外部类的修饰符只能是public或默认，类的成员（包括内部类）的修饰符可以是以上四种。 





# 二、面向对象

## 1. Java的四个基本特性（<u>抽象、封装、继承，多态</u>），对多态的理解(多态的实现方式)以及在项目中那些地方用到多态

- **Java的四个基本特性** 
  - **抽象**：抽象是将一类对象的共同特征总结出来构造类的过程，包括<u>数据抽象</u>和<u>行为抽象</u>两方面。抽象只关注对象有哪些属性和行为，并不关注这些行为的细节是什么。  
  - ## **继承**：继承是从已有类得到继承信息创建新类的过程。提供继承信息的类被称为父类（超类、基类）；得到继承信息的类被称为子类（派生类）。继承让变化中的软件系统有了一定的延续性，同时继承也是封装程序中可变因素的重要手段。 
  - **封装**：通常认为封装是把数据和操作数据的方法绑定起来，对数据的访问只能通过已定义的接口。面向对象的本质就是将现实世界描绘成一系列完全自治、封闭的对象。我们在类中编写的方法就是对实现细节的一种封装；我们编写一个类就是对数据和数据操作的封装。可以说，封装就是隐藏一切可隐藏的东西，只向外界提供最简单的编程接口。 
  - **多态**：多态性是指允许不同子类型的对象对同一消息作出不同的响应。 
- **多态的理解(多态的实现方式)** 
  - **方法重载（overload）**实现的是**<u>编译时的多态性</u>**（也称为前绑定）。 
  - **方法重写（override）**实现的是<u>**运行时的多态性**</u>（也称为后绑定）。运行时的多态是面向对象最精髓的东西。 
  - 要实现多态需要做两件事：
    - 1). **方法重写**（子类继承父类并重写父类中已有的或抽象的方法）；
    - 2). **对象造型**（用父类型引用引用子类型对象，这样同样的引用调用同样的方法就会根据子类对象的不同而表现出不同的行为）。 
- **项目中对多态的应用** 
  - 举一个简单的例子，在物流信息管理系统中，有两种用户：订购客户和卖房客户，两个客户都可以登录系统，他们有相同的方法Login，但登陆之后他们会进入到不同的页面，也就是在登录的时候会有不同的操作，两种客户都继承父类的Login方法，但对于不同的对象，拥有不同的操作。 
- **面相对象开发方式优点（B65）**
  - 较高的开发效率：可以把事物进行抽象，映射为开发的对象。
  - 保证软件的鲁棒性：高重用性，可以重用已有的而且在相关领域经过长期测试的代码。
  - 保证软件的高可维护性：代码的可读性非常好，设计模式也使得代码结构清晰，拓展性好。



## 2. 什么是重载和重写？

- **重载：**<u>重载发生在同一个类中</u>，同名的方法如果有不同的参数列表（*参数类型不同、参数个数不同或者二者都不同*）则视为重载。 
- **重写：**<u>重写发生在子类与父类之间</u>，重写要求子类被重写方法与父类被重写方法有相同的返回类型，比父类被重写方法更好访问，不能比父类被重写方法声明更多的异常（里氏代换原则）。根据不同的子类对象确定调用的那个方法。 

 <div align="center"> <img src="../pics/overloading-vs-overriding.png" width="800"/></div><br/>






## 3. 面向对象和面向过程的区别？用面向过程可以实现面向对象吗？那是不是不能面向对象？

- 面向对象和面向过程的区别 
  - **面向过程**就像是一个细心的管家，事无具细的都要考虑到。而**面向对象**就像是个家用电器，你只需要知道他的功能，不需要知道它的工作原理。 
  - **面向过程**是一种是“事件”为中心的编程思想。就是分析出解决问题所需的步骤，然后用函数把这些步骤实现，并按顺序调用。**面向对象**是以“对象”为中心的编程思想。 
  - 简单的举个例子：汽车发动、汽车到站 
    - 这对于**“面向过程”**来说，是两个事件，汽车启动是一个事件，汽车到站是另一个事件，面向过程编程的过程中我们关心的是事件，而不是汽车本身。针对上述两个事件，形成两个函数，之 后依次调用。（事件驱动，动词为主）
    - 然而这对于**“面向对象”**来说，我们关心的是汽车这类对象，两个事件只是这类对象所具有的行为。而且对于这两个行为的顺序没有强制要求。 （对象驱动，名词为主，将问题抽象出具体的对象，而这个对象有自己的属性和方法，在解决问题的时候是将不同的对象组合在一起使用）
- 用面向过程可以实现面向对象吗 ？
- 那是不是不能面向对象 ？



## 4. 面向对象开发的六个基本原则(单一职责、开放封闭、里氏替换、依赖倒置、合成聚合复用、接口隔离)，迪米特法则。在项目中用过哪些原则

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



## 5. 内部类有哪些

可以将一个类的定义放在另一个类的定义内部，这就是内部类。

在Java中内部类主要分为成员内部类、局部内部类、匿名内部类、静态内部类 

### （一）成员内部类

成员内部类也是最普通的内部类，它是外围类的一个成员，所以他是可以**无限制的访问外围类的所有成员属性和方法，尽管是private的**，但是外围类要访问内部类的成员属性和方法则需要通过内部类实例来访问。

```java
public class OuterClass {
    private String str;
   
    public void outerDisplay(){
        System.out.println("outerClass...");
    }
    
    public class InnerClass{
        public void innerDisplay(){
            str = "chenssy..."; //使用外围内的属性
            System.out.println(str);
            outerDisplay();  //使用外围内的方法
        }
    }
    
    // 推荐使用getxxx()来获取成员内部类，尤其是该内部类的构造函数无参数时
    public InnerClass getInnerClass(){
        return new InnerClass();
    }
    
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        OuterClass.InnerClass inner = outer.getInnerClass();
        inner.innerDisplay();
    }
}
--------------------
chenssy...
outerClass...
```

在成员内部类中要注意两点：

- 成员内部类中不能存在任何static的变量和方法；

- 成员内部类是依附于外围类的，所以只有先创建了外围类才能够创建内部类。   



### （二）局部内部类

有这样一种内部类，它是嵌套在方法和作用于内的，对于这个类的使用主要是应用与解决比较复杂的问题，想创建一个类来辅助我们的解决方案，到那时又不希望这个类是公共可用的，所以就产生了局部内部类，局部内部类和成员内部类一样被编译，只是它的作用域发生了改变，它只能在该方法和属性中被使用，出了该方法和属性就会失效。 

```java
//定义在方法里：
public class Parcel5 {
    public Destionation destionation(String str){
        class PDestionation implements Destionation{
            private String label;
            private PDestionation(String whereTo){
                label = whereTo;
            }
            public String readLabel(){
                return label;
            }
        }
        return new PDestionation(str);
    }
    
    public static void main(String[] args) {
        Parcel5 parcel5 = new Parcel5();
        Destionation d = parcel5.destionation("chenssy");
    }
}

//定义在作用域内:
public class Parcel6 {
    private void internalTracking(boolean b){
        if(b){
            class TrackingSlip{
                private String id;
                TrackingSlip(String s) {
                    id = s;
                }
                String getSlip(){
                    return id;
                }
            }
            TrackingSlip ts = new TrackingSlip("chenssy");
            String string = ts.getSlip();
        }
    }
    
    public void track(){
        internalTracking(true);
    }
    
    public static void main(String[] args) {
        Parcel6 parcel6 = new Parcel6();
        parcel6.track();
    }
}
```



### （三）匿名内部类

在做Swing编程中，我们经常使用这种方式来绑定事件 

```java
button2.addActionListener(  
                new ActionListener(){  
                    public void actionPerformed(ActionEvent e) {  
                        System.out.println("你按了按钮二");  
                    }  
                });
```

 我们咋一看可能觉得非常奇怪，因为这个内部类是没有名字的，在看如下这个例子： 

```java
public class OuterClass {
    // ★当所在方法的形参需要被匿名内部类使用，那么这个形参就必须为final！！！这里要注意
    public InnerClass getInnerClass(final int num,String str2){ 
        return new InnerClass(){
            int number = num + 3;
            public int getNumber(){
                return number;
            }
        };        /* 注意：分号不能省 */
    }
    
    public static void main(String[] args) {
        OuterClass out = new OuterClass();
        InnerClass inner = out.getInnerClass(2, "chenssy");
        System.out.println(inner.getNumber());
    }
}

interface InnerClass {
    int getNumber();
}

----------------
Output:
```

**这里我们就需要看清几个地方**

- 匿名内部类是没有访问修饰符的。

- new 匿名内部类，这个类首先是要存在的。如果我们将那个InnerClass接口注释掉，就会出现编译出错。

- 注意getInnerClass()方法的形参，第一个形参是用final修饰的，而第二个却没有。同时我们也发现第二个形参在匿名内部类中没有使用过，所以当所在方法的形参需要被匿名内部类使用，那么这个形参就必须为**final**。
- 匿名内部类是没有构造方法的。因为它连名字都没有何来构造方法。



### （四）静态内部类

关键字static中提到Static可以修饰成员变量、方法、代码块，其他它还可以修饰内部类，使用static修饰的内部类我们称之为静态内部类，不过我们更喜欢称之为嵌套内部类。静态内部类与非静态内部类之间存在一个最大的区别，我们知道非静态内部类在编译完成之后会隐含地保存着一个引用，该引用是指向创建它的外围内，但是静态内部类却没有。

1. 它的创建是不需要依赖于外围类的。

2. 它不能使用任何外围类的非static成员变量和方法。

```java
public class OuterClass {
    private String sex;
    public static String name = "chenssy";
    
    // 静态内部类 
    static class InnerClass1{
        // 在静态内部类中可以存在静态成员
        public static String _name1 = "chenssy_static";
        
        public void display(){ 
            // 静态内部类只能访问外围类的静态成员变量和方法
		   // 不能访问外围类的非静态成员变量和方法
            System.out.println("OutClass name :" + name);
        }
    }
    

    // 非静态内部类
    class InnerClass2{
        // 非静态内部类中不能存在静态成员
        public String _name2 = "chenssy_inner";
        // 非静态内部类中可以调用外围类的任何成员,不管是静态的还是非静态的
        public void display(){
            System.out.println("OuterClass name：" + name);
        }
    }
    
    // 外围类方法
    public void display(){
        // 外围类访问静态内部类：内部类
        System.out.println(InnerClass1._name1);
        // 静态内部类 可以直接创建实例不需要依赖于外围类
        new InnerClass1().display();
        
        // 非静态内部的创建需要依赖于外围类
        OuterClass.InnerClass2 inner2 = new OuterClass().new InnerClass2();
        // 方位非静态内部类的成员需要使用非静态内部类的实例
        System.out.println(inner2._name2);
        inner2.display();
    }
    
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();
        outer.display();
    }
}
----------------
Output:
chenssy_static
OutClass name :chenssy
chenssy_inner
OuterClass name：chenssy
```



## 6. 组合、继承和代理的区别

### 定义

- 组合：在新类中new 另外一个类的对象，以添加该对象的特性。
- 继承：从基类继承得到子类，获得基类的特性。
- 代理：在代理类中创建某功能的类，调用类的一些方法以获得该类的部分特性。

### 使用场合

- 组合：各部件之间没什么关系，只需要组合即可。like组装电脑，需要new CPU(),new RAM(),new Disk()……

  ```java
  public class Computer {
      public Computer() {
          CPU cpu=new CPU();
          RAM ram=new RAM();
          Disk disk=new Disk();
      }
  }
  class CPU{    }
  class RAM{    }
  class Disk{    }
  ```

- 继承：子类需要具有父类的功能，各子类之间有所差异。like Shape类作为基类，子类有Rectangle，CirCle，Triangle……代码不写了，大家都经常用。

- 代理：飞机控制类，我不想暴露太多飞机控制的功能，只需部分前进左右转的控制（而不需要暴露发射导弹功能）。通过在代理类中new一个飞机控制对象，然后在方法中添加飞机控制类的各个需要暴露的功能。

  ```java
  public class PlaneDelegation{    
      private PlaneControl planeControl;    //private外部不可访问
  	
      // 飞行员权限代理类，普通飞行员不可以开火
      PlaneDelegation(){
          planeControl=new PlaneControl();
      }
      public void speed(){
          planeControl.speed();
      }
      public void left(){
          planeControl.left();
      }
      public void right(){
          planeControl.right();
      }
  }
  
  final class PlaneControl {// final表示不可继承，控制器都能继承那还得了
      protected void speed() {}
      protected void fire() {}
      protected void left() {}
      protected void right() {}
  }
  ```

**说明：**

继承：<u>代码复用，引用不灵活</u>； 组合：<u>代码复用</u>， 接口：<u>引用灵活</u>； 推荐组合+接口使用，看IO中包装流FilterInputStream中的策略模式



## 7. 什么是构造函数

构造函数是函数的一种特殊形式，特殊在哪里？构造函数中不需要定义返回类型（void是无需返回值的意思，请注意区分两者），且构造函数的名称与所在的类名完全一致，其余的与函数的特性相同，可以带有参数列表，可以存在函数的重载现象。 

一般用来初始化一些成员变量，当要生成一个类的对象（实例）的时候就会调用类的构造函数。如果不显示声明类的构造方法，会自动生成一个默认的不带参数的空的构造函数。

```java
public class Demo{
　  private int num=0;

　  //无参构造函数
　  Demo()
　 {
　　　　System.out.println("constractor_run");
　 }

　  //有参构造函数
　  Demo(int num)
　 {
　　　　System.out.println("constractor_args_run");
　 }

　  //普通成员函数
　 public void demoFunction()
　 {
　　　　System.out.println("function_run");
　 }
}
```

在这里要说明一点，如果在类中我们不声明构造函数，JVM会帮我们默认生成一个空参数的构造函数；如果在类中我们声明了带参数列表的构造函数，JVM就不会帮我们默认生成一个空参数的构造函数，我们想要使用空参数的构造函数就必须自己去显式的声明一个空参的构造函数。 



**构造函数的作用**

　　通过开头的介绍，构造函数的轮廓已经渐渐清晰，那么为什么会有构造函数呢？构造函数有什么作用？构造函数是面向对象编程思想所需求的，它的主要作用有以下两个：

- **创建对象**。任何一个对象创建时，都需要初始化才能使用，所以任何类想要创建实例对象就必须具有构造函数。
- **对象初始化**。构造函数可以对对象进行初始化，并且是给与之格式（参数列表）相符合的对象初始化，是具有一定针对性的初始化函数。





## 8. 向上造型和向下造型

父类引用能指向子类对象，子类引用不能指向父类对象；

**向上造型**

​	父类引用指向子类对象，例如：Father f1 = new Son();

**向下造型**

​	把指向子类对象的父类引用赋给子类引用，需要强制转换，例如：

```java
Father f1 = new Son();
Son s1 = (Son)f1;
```

但有运行出错的情况：

```java
Father f2 = new Father();
Son s2 = (Son)f2;//编译无错但运行会出现错误
```

在不确定父类引用是否指向子类对象时，可以用instanceof来判断：

```java
if(f3 instanceof Son){
     Son s3 = (Son)f3;
}
```



# 三、关键字

## 1. final与static的区别

### final

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



### static

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

​	注意：不能再城院函数内部定义static变量。

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



## 2. break、continue、return

### break

跳出当前循环；但是如果是嵌套循环，则只能跳出当前的这一层循环，只有逐层break才能跳出所有循环。

```java
for (int i = 0; i < 10; i++) {
    // 在执行i==6时强制终止循环，i==6不会被执行
    if (i == 6)
        break;
    System.out.println(i);  
}  

输出结果为0 1 2 3 4 5 ；6以后的都不会输出
```

### continue

终止当前循环，但是不跳出循环（在循环中continue后面的语句是不会执行了），继续往下根据循环条件执行循环。 

```java
for (int i = 0; i < 10; i++) {  
    // i==6不会被执行，而是被中断了    
    if (i == 6)
        continue;
    System.out.println(i);  
}

输出结果为0 1 2 3 4 5 7 8 9；只有6没有输出
```

### return

- return 从当前的方法中退出,返回到该调用的方法的语句处,继续执行。 
- return 返回一个值给调用该方法的语句，返回值的数据类型必须与方法的声明中的返回值的类型一致。 
- return后面也可以不带参数，不带参数就是返回空，其实主要目的就是用于想中断函数执行，返回调用函数处。

特别注意：返回值为void的方法，从某个判断中跳出，必须用return；





## 3. final、finally和finalize有什么区别

### final

如果一个类被final修饰，意味着该类不能派生出新的子类，不能作为父类被继承。因此一个类不能被声明为abstract，又被声明为final。将变量或方法声明为final。可以保证他们在使用的时候不被改变。其初始化可以在两个地方：一是其定义的地方，也就是在final变量在定义的时候就对其赋值；二是在构造函数中。这两个地方只能选其中的一个，要么在定义的时候给值，要么在构造函数中给值。被声明为final的方法也只能使用，不能重写。



### finally

在异常处理的时候，提供finally块来执行任何的清除操作。如果抛出一个异常，那么相匹配的catch字句就会执行，然后控制就会进入finally块，前提是有finally块。



finally作为异常处理的一部分，它只能用在try/catch语句中，并且附带一个语句块，表示这段语句最终一定会被执行（不管有没有抛出异常），经常被用在需要释放资源的情况下。（×）（这句话其实存在一定的问题） 

- 异常情况说明：
  - 在执行try语句块之前已经返回或抛出异常，所以try对应的finally语句并没有执行。 
  - 我们在 try 语句块中执行了 System.exit (0) 语句，终止了 Java 虚拟机的运行。那有人说了，在一般的 Java 应用中基本上是不会调用这个 System.exit(0) 方法的 
  - 当一个线程在执行 try 语句块或者 catch 语句块时被打断（interrupted）或者被终止（killed），与其相对应的 finally 语句块可能不会执行 
  - 还有更极端的情况，就是在线程运行 try 语句块或者 catch 语句块时，突然死机或者断电，finally 语句块肯定不会执行了。可能有人认为死机、断电这些理由有些强词夺理，没有关系，我们只是为了说明这个问题。 



### finalize

finalize是方法名，Java技术允许使用finalize()方法在垃圾收集器将对象从内存中清除出去之前做必要的清理工作。这个方法是在垃圾收集器确认一个对象没有被引用时对这个对象调用的。它是在Object类中定义的，因此，所有的类都继承了它。子类覆盖finalize()方法已整理系统资源或者执行其他清理工作。finalize()方法是在垃圾收集器删除对象之前对这个对象调用的。



参考资料：

- [final、finally与finalize的区别 - 涛声依旧~ - 博客园](https://www.cnblogs.com/ktao/p/8586966.html)
  

## 4. assert有什么作用？

在实现中，assertion就是在程序中的一条语句，它对一个boolean表达式进行检查，一个正确程序必须保证这个boolean表达式的值为true；如果该值为false，说明程序已经处于不正确的状态下，系统将给出警告并且退出。一般来说，assertion用于保证程序最基本、关键的正确性。assertion检查通常在开发和测试时开启。为了提高性能，在软件发布后，assertion检查通常是关闭的。下面简单介绍一下Java中assertion的实现。

在语法上，为了支持assertion，Java增加了一个关键字assert。它包括两种表达式，分别如下：

**assert <boolean表达式>**

如果<boolean表达式>为true，则程序继续执行。

如果为false，则程序抛出AssertionError，并终止执行。

 

**assert <boolean表达式> : <错误信息表达式>**

如果<boolean表达式>为true，则程序继续执行。

如果为false，则程序抛出java.lang.AssertionError，并输入<错误信息表达式>。



```java
public static void main(String[] args) {
    System.out.println("123");

    int a = 0;
    int b = 1;
    assert a == b; //需显示开启，默认为不开启状态 
    assert a == b : "执行失败！";

    System.out.println("1234");
}
```



## 5. volatile

> 每次都读错，美式发音：volatile /'vɑlətl/ adj. [化学] 挥发性的；不稳定的；爆炸性的；反复无常的 

​	volatile是一个**类型修饰符**（type specifier），它是被设计用来修饰被不同线程访问和修改的变量。在使用volatile修饰成员变量后，所有线程在任何时间所看到变量的值都是相同的。此外，使用volatile会组织编译器对代码的优化，因此会降低程序的执行效率。所以，除非迫不得已，否则，能不使用volatile就尽量不要使用volatile

- 每次访问变量时，总是获取主内存的最新值
- 每次修改变量后，立刻写回到主内存中

 <div align="center"> <img src="../pics/../pics/java-volatile.png" width="500"/></div><br/>



参考资料：

- [理解java Volatile 关键字 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000015087945)
  



## 6. instanceof

instanceof 是 Java 的一个二元操作符，类似于 ==，>，< 等操作符。

instanceof 是 Java 的保留关键字。它的作用是测试它左边的对象是否是它右边的类的实例，返回 boolean 的数据类型。

```java
public class Main {
 
public static void main(String[] args) {
   Object testObject = new ArrayList();
      displayObjectClass(testObject);
   }
   public static void displayObjectClass(Object o) {
      if (o instanceof Vector)
      System.out.println("对象是 java.util.Vector 类的实例");
      else if (o instanceof ArrayList)
      System.out.println("对象是 java.util.ArrayList 类的实例");
      else
      System.out.println("对象是 " + o.getClass() + " 类的实例");
   }
}
```



## 7. strictfp

strictfp, 即 **strict float point** (精确浮点)。 

strictfp 关键字可应用于类、接口或方法。使用 strictfp 关键字声明一个方法时，该方法中所有的float和double表达式都严格遵守FP-strict的限制,符合IEEE-754规范。当对一个类或接口使用 strictfp 关键字时，该类中的所有代码，包括嵌套类型中的初始设定值和代码，都将严格地进行计算。严格约束意味着所有表达式的结果都必须是 IEEE 754 算法对操作数预期的结果，以单精度和双精度格式表示。

如果你想让你的浮点运算更加精确，而且不会因为不同的硬件平台所执行的结果不一致的话，可以用关键字strictfp.



## 8. transient

> transient 英 /'trænzɪənt/   adj. 短暂的；路过的  n. 瞬变现象；过往旅客；候鸟

我们都知道一个对象只要实现了Serilizable接口，这个对象就可以被序列化，Java的这种序列化模式为开发者提供了很多便利，我们可以不必关系具体序列化的过程，只要这个类实现了Serilizable接口，这个类的所有属性和方法都会自动序列化。

然而在实际开发过程中，我们常常会遇到这样的问题，这个类的有些属性需要序列化，而其他属性不需要被序列化，打个比方，如果一个用户有一些敏感信息（如密码，银行卡号等），为了安全起见，不希望在网络操作（主要涉及到序列化操作，本地序列化缓存也适用）中被传输，这些信息对应的变量就可以加上transient关键字。换句话说，这个字段的生命周期仅存于调用者的内存中而不会写到磁盘里持久化。

总之，Java 的transient关键字为我们提供了便利，你只需要实现Serilizable接口，**将不需要序列化的属性前添加关键字transient，序列化对象的时候，这个属性就不会序列化到指定的目的地中**。



参考资料：

- [Java transient关键字使用小记 - Alexia(minmin) - 博客园](https://www.cnblogs.com/lanxuezaipiao/p/3369962.html)





# 四、基本数据类型与运算

## 1. Java的基本数据类型/引用类型有哪些？知道自动装箱和拆箱吗？

- 4类8种基本数据类型。4整数型，2浮点型，1字符型，1布尔型

| 数据类型 | 存储需求 | 取值范围                                                     | 默认值          | 对应包装类 |
| -------- | -------- | ------------------------------------------------------------ | --------------- | ---------- |
| byte     | 8位      | 最大存储数据量是255，最小-2<sup>7</sup>，最大2<sup>7</sup>-1，即：[-128~127] | (byte) 0        | Byte       |
| short    | 16位     | 最大数据存储量是65536，数据范围是-32768~32767之间            | (short) 0       | Short      |
| int      | 32位     | 最大数据存储容量是2^31-1，数据范围是负的2的31次方到正的2的31次方减1 | 0               | Integer    |
| long     | 64位     | 最大数据存储容量是2的64次方减1，数据范围为负的2的63次方到正的2的63次方减1 | 0L              | Long       |
| float    | 32位     | 数据范围在3.4e-45~1.4e38，直接赋值时必须在数字后加上f或F     | 0.0f            | Float      |
| double   | 64位     | 数据范围在4.9e-324~1.8e308，赋值时可以加d或D也可以不加       | 0.0d            | Double     |
| boolean  | 1位      | 只有true和false两个取值                                      | false           | Boolean    |
| char     | 16位     | 存储Unicode码，用单引号赋值                                  | '\u0000' (null) | Character  |

- 引用数据类型
  - 类（class）、接口（interface）、数组
- 自动装箱和拆箱
  - 基本数据类型和它对应的封装类型之间可以相互转换。自动拆装箱是`jdk5.0`提供的新特特性，它可以自动实现类型的转换
  - **装箱**：从<u>基本数据类型</u>到<u>封装类型</u>叫做装箱
  - **拆箱**：从<u>封装类型</u>到<u>基本数据类型</u>叫拆箱

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



## 2. 缓存池

`new Integer(123) `与` Integer.valueOf(123) `的区别在于，new Integer(123) 每次都会新建一个对象，而 Integer.valueOf(123) 可能会使用缓存对象，因此多次使用 Integer.valueOf(123) 会取得同一个对象的引用。

```java
Integer x = new Integer(123);
Integer y = new Integer(123);
System.out.println(x == y);    // false
Integer z = Integer.valueOf(123);
Integer k = Integer.valueOf(123);
System.out.println(z == k);   // true
```

编译器会在自动装箱过程调用 valueOf() 方法，因此多个 Integer 实例使用自动装箱来创建并且值相同，那么就会引用相同的对象。

```java
Integer m = 123;
Integer n = 123;
System.out.println(m == n); // true
```

valueOf() 方法的实现比较简单，就是先判断值是否在缓存池中，如果在的话就直接使用缓存池的内容。

```java
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}
```

在 Java 8 中，Integer 缓存池的大小默认为 -128\~127。

```java
static final int low = -128;
static final int high;
static final Integer cache[];

static {
    // high value may be configured by property
    int h = 127;
    String integerCacheHighPropValue =
        sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
    if (integerCacheHighPropValue != null) {
        try {
            int i = parseInt(integerCacheHighPropValue);
            i = Math.max(i, 127);
            // Maximum array size is Integer.MAX_VALUE
            h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
        } catch( NumberFormatException nfe) {
            // If the property cannot be parsed into an int, ignore it.
        }
    }
    high = h;

    cache = new Integer[(high - low) + 1];
    int j = low;
    for(int k = 0; k < cache.length; k++)
        cache[k] = new Integer(j++);

    // range [-128, 127] must be interned (JLS7 5.1.7)
    assert IntegerCache.high >= 127;
}
```

Java 还将一些其它基本类型的值放在缓冲池中，包含以下这些：

- boolean values true and false
- all byte values
- short values between -128 and 127
- int values between -128 and 127
- char in the range \u0000 to \u007F

因此在使用这些基本类型对应的包装类型时，就可以直接使用缓冲池中的对象。

[StackOverflow : Differences between new Integer(123), Integer.valueOf(123) and just 123
](https://stackoverflow.com/questions/9030817/differences-between-new-integer123-integer-valueof123-and-just-123)

## 3. ++i和i++有什么区别





# 五、字符串与数组

## 1. String、StringBuffer、StringBuilder以及对String不变性的理解

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
  - 在 java 中, 通过使用 "+" 符号来串联字符串的时候, 实际上底层会转成通过 StringBuilder 实例的 append() 方法来实现。 

 

## 2. String有重写Object的hashcode和toString吗？如果重写equals不重写hashcode会出现什么问题？

- String有重写Object的hashcode和toString吗？ 

  - String重写了Object类的hashcode和toString方法。 

- 当equals方法被重写时，通常有必要重写hashCode方法，以维护hashCode方法的常规协定，该协定声明相对等的两个对象必须有相同的hashCode 

  - object1.euqal(object2)时为true， object1.hashCode() ==  object2.hashCode() 为true 
  - object1.hashCode() ==  object2.hashCode() 为false时，object1.euqal(object2)必定为false 
  - object1.hashCode() ==  object2.hashCode() 为true时，但object1.euqal(object2)不一定定为true 

- 重写equals不重写hashcode会出现什么问题 

  - 在存储散列集合时(如Set类)，如果原对象.equals(新对象)，但没有对hashCode重写，即两个对象拥有不同的hashCode，则在集合中将会存储两个值相同的对象，从而导致混淆。因此在重写equals方法时，必须重写hashCode方法。 

  

## 3. 如果你定义一个类，包括学号，姓名，分数，如何把这个对象作为key？要重写equals和hashcode吗

- 需要重写equals方法和hashcode，必须保证对象的属性改变时，其hashcode不能改变。 



## 4. 字符串字面量







# 六、异常处理

## 1. 常见异常分为那两种(Exception，Error)，常见异常的基类以及常见的异常

- Throwable是java语言中所有错误和异常的超类（万物即可抛）。它有两个子类：Error、Exception。 

- 异常种类 

  - **Error**：Error为错误，是程序无法处理的，如OutOfMemoryError、ThreadDeath等，出现这种情况你唯一能做的就是听之任之，交由JVM来处理，不过JVM在大多数情况下会选择终止线程。 
  - **Exception**：Exception是程序可以处理的异常。它又分为两种CheckedException（受捡异常），一种是UncheckedException（不受检异常）。 
    - **受检异常**（CheckException）：<u>发生在编译阶段，必须要使用try…catch（或者throws）否则编译不通过。</u> 
    - **非受检异常** （UncheckedException）：<u>是程序运行时错误，例如除 0 会引发 Arithmetic Exception，此时程序奔溃并且无法恢复。</u> （发生在运行期，具有不确定性，主要是由于程序的逻辑问题所引起的，难以排查，我们一般都需要纵观全局才能够发现这类的异常错误，所以在程序设计中我们需要认真考虑，好好写代码，尽量处理异常，即使产生了异常，也能尽量保证程序朝着有利方向发展。 ）

- 常见异常的基类（Exception）

  - IOException 
  - RuntimeException 

- 常见的异常 

  ![图像](../pics/exception_and_error.png)



# 七、Object 通用方法

## 1.概述

```java
public final native Class<?> getClass()

public native int hashCode()

public boolean equals(Object obj)

protected native Object clone() throws CloneNotSupportedException

public String toString()

public final native void notify()

public final native void notifyAll()

public final native void wait(long timeout) throws InterruptedException

public final void wait(long timeout, int nanos) throws InterruptedException

public final void wait() throws InterruptedException

protected void finalize() throws Throwable {} // JVM内存回收之finalize()方法
```

## equals()

**1. equals() 与 == 的区别**

- 对于基本类型，== 判断两个值是否相等，基本类型没有 equals() 方法。
- 对于引用类型，== 判断两个实例是否引用同一个对象，而 equals() 判断引用的对象是否等价。

```java
Integer x = new Integer(1);
Integer y = new Integer(1);
System.out.println(x.equals(y)); // true
System.out.println(x == y);      // false
```

**2. 等价关系** 

（一）自反性

```java
x.equals(x); // true
```

（二）对称性

```java
x.equals(y) == y.equals(x); // true
```

（三）传递性

```java
if (x.equals(y) && y.equals(z))
    x.equals(z); // true;
```

（四）一致性

多次调用 equals() 方法结果不变

```java
x.equals(y) == x.equals(y); // true
```

（五）与 null 的比较

对任何不是 null 的对象 x 调用 x.equals(null) 结果都为 false

```java
x.euqals(null); // false;
```

**3. 实现** 

- 检查是否为同一个对象的引用，如果是直接返回 true；
- 检查是否是同一个类型，如果不是，直接返回 false；
- 将 Object 实例进行转型；
- 判断每个关键域是否相等。

```java
public class EqualExample {
    private int x;
    private int y;
    private int z;

    public EqualExample(int x, int y, int z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EqualExample that = (EqualExample) o;

        if (x != that.x) return false;
        if (y != that.y) return false;
        return z == that.z;
    }
}
```

## hashCode()

hasCode() 返回散列值，而 equals() 是用来判断两个实例是否等价。<u>等价的两个实例散列值一定要相同，但是散列值相同的两个实例不一定等价。</u>

在覆盖 equals() 方法时应当总是覆盖 hashCode() 方法，保证等价的两个实例散列值也相等。

下面的代码中，新建了两个等价的实例，并将它们添加到 HashSet 中。我们希望将这两个实例当成一样的，只在集合中添加一个实例，但是因为 EqualExample 没有实现 hasCode() 方法，因此这两个实例的散列值是不同的，最终导致集合添加了两个等价的实例。

```java
EqualExample e1 = new EqualExample(1, 1, 1);
EqualExample e2 = new EqualExample(1, 1, 1);
System.out.println(e1.equals(e2)); // true
HashSet<EqualExample> set = new HashSet<>();
set.add(e1);
set.add(e2);
System.out.println(set.size());   // 2
```

理想的散列函数应当具有均匀性，即不相等的实例应当均匀分布到所有可能的散列值上。这就要求了散列函数要把所有域的值都考虑进来，可以将每个域都当成 R 进制的某一位，然后组成一个 R 进制的整数。R 一般取 31，因为它是一个奇素数，如果是偶数的话，当出现乘法溢出，信息就会丢失，因为与 2 相乘相当于向左移一位。

一个数与 31 相乘可以转换成移位和减法：`31\*x == (x<<5)-x`，编译器会自动进行这个优化。

```java
@Override
public int hashCode() {
    int result = 17;
    result = 31 * result + x;
    result = 31 * result + y;
    result = 31 * result + z;
    return result;
}
```

## toString()

默认返回 ToStringExample@4554617c 这种形式，其中 @ 后面的数值为散列码的无符号十六进制表示。

```java
public class ToStringExample {
    private int number;

    public ToStringExample(int number) {
        this.number = number;
    }
}
```

```java
ToStringExample example = new ToStringExample(123);
System.out.println(example.toString());
```

```html
ToStringExample@4554617c
```

## clone()

**1. cloneable** 

clone() 是 Object 的 protect 方法，它不是 public，一个类不显式去重写 clone()，其它类就不能直接去调用该类实例的 clone() 方法。

```java
public class CloneExample {
    private int a;
    private int b;
}
```

```java
CloneExample e1 = new CloneExample();
// CloneExample e2 = e1.clone(); // 'clone()' has protected access in 'java.lang.Object'
```

重写 clone() 得到以下实现：

```java
public class CloneExample {
    private int a;
    private int b;

    @Override
    protected CloneExample clone() throws CloneNotSupportedException {
        return (CloneExample)super.clone();
    }
}
```

```java
CloneExample e1 = new CloneExample();
try {
    CloneExample e2 = e1.clone();
} catch (CloneNotSupportedException e) {
    e.printStackTrace();
}
```

```html
java.lang.CloneNotSupportedException: CloneTest
```

以上抛出了 CloneNotSupportedException，这是因为 CloneTest 没有实现 Cloneable 接口。

```java
public class CloneExample implements Cloneable {
    private int a;
    private int b;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

应该注意的是，clone() 方法并不是 Cloneable 接口的方法，而是 Object 的一个 protected 方法。Cloneable 接口只是规定，如果一个类没有实现 Cloneable 接口又调用了 clone() 方法，就会抛出 CloneNotSupportedException。



## ★ 2. 深拷贝与浅拷贝 

- 浅拷贝：对基本数据类型进行值传递，对引用数据类型进行引用传递般的拷贝，此为浅拷贝。 

![](D:/gitdoc/2019_campus_appy/notes/pics/shadow_copy.jpg)



- 深拷贝：对基本数据类型进行值传递，对引用数据类型，创建一个新的对象，并复制其内容，此为深拷贝。 

![](D:/gitdoc/2019_campus_appy/notes/pics/deep_copy.jpg)











## &和&& 、|和||的区别？【阿里实习生面试】






