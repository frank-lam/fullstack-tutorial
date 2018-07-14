##### 6. 集合框架（Java Collections Framework Internals）

​	Java集合框架提供了数据持有对象的方式，提供了对数据集合的操作。Java集合框架位于`java.util`包下，主要有三个大类：`Collection`、`Map`接口以及对集合进行操作的工具类。



Java集合类的整体框架如下： 

![](../pics/java_set_framework.jpg)





Collection

![]()

- `ArrayList`：线程不同步。默认初始容量为10，当数组大小不足时增长率为当前长度的`50%`。
- `Vector`：**线程同步**。默认初始容量为10，当数组大小不足时增长率为当前长度的`100%`。它的同步是通过`Iterator`方法加`synchronized`实现的。
- `LinkedList`：线程不同步。**双端队列形式**。
- `Stack`：**线程同步**。继承自`Vector`，添加了几个方法来完成栈的功能。
- `Set`：Set是一种不包含重复元素的Collection，Set最多只有一个null元素。
- `HashSet`：线程不同步，内部使用`HashMap`进行数据存储，提供的方法基本都是调用`HashMap`的方法，所以两者本质是一样的。**集合元素可以为**`NULL`。
- `NavigableSet`：添加了搜索功能，可以对给定元素进行搜索：小于、小于等于、大于、大于等于，放回一个符合条件的最接近给定元素的 key。
- `TreeSet`：线程不同步，内部使用`NavigableMap`操作。默认元素“自然顺序”排列，可以通过`Comparator`改变排序。
- `EnumSet`：线程不同步。内部使用Enum数组实现，速度比`HashSet`快。**只能存储在构造函数传入的枚举类的枚举值**。



Map

![]()

- `HashMap`：线程不同步。根据`key`的`hashcode`进行存储，内部使用静态内部类`Node`的数组进行存储，默认初始大小为16，每次扩大一倍。当发生Hash冲突时，采用拉链法（链表）。**可以接受为null的键值\(key\)和值\(value\)**。JDK 1.8中：当单个桶中元素个数大于等于8时，链表实现改为红黑树实现；当元素个数小于6时，变回链表实现。由此来防止hashCode攻击。
- `LinkedHashMap`：**保存了记录的插入顺序**，在用Iterator遍历LinkedHashMap时，先得到的记录肯定是先插入的. 也可以在构造时用带参数，按照应用次数排序。在遍历的时候会比HashMap慢，不过有种情况例外，当HashMap容量很大，实际数据较少时，遍历起来可能会比LinkedHashMap慢，因为LinkedHashMap的遍历速度只和实际数据有关，和容量无关，而HashMap的遍历速度和他的容量有关。
- `TreeMap`：线程不同步，基于 **红黑树** （Red-Black tree）的NavigableMap 实现，**能够把它保存的记录根据键排序,默认是按键值的升序排序，也可以指定排序的比较器，当用Iterator 遍历TreeMap时，得到的记录是排过序的。**
- `HashTable`：线程安全，HashMap的迭代器\(Iterator\)是`fail-fast`迭代器。**HashTable不能存储NULL的key和value。**



工具类

- `Collections`、`Arrays`：集合类的一个工具类\/帮助类，其中提供了一系列静态方法，用于对集合中元素进行排序、搜索以及线程安全等各种操作。

- `Comparable`、`Comparator`：一般是用于对象的比较来实现排序，两者略有区别。

  > - 类设计者没有考虑到比较问题而没有实现Comparable接口。这是我们就可以通过使用Comparator，这种情况下，我们是不需要改变对象的。
  > - 一个集合中，我们可能需要有多重的排序标准，这时候如果使用Comparable就有些捉襟见肘了，可以自己继承Comparator提供多种标准的比较器进行排序。





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





##### 7.ArrayList和LinkedList是常用的两种存储结构，有哪些区别呢？

- 1、ArrayList和LinkedList可想从名字分析，它们一个是Array(动态数组)的数据结构，一个是Link(链表)的数据结构，此外，它们两个都是对List接口的实现。前者是数组队列，相当于动态数组；后者为双向链表结构，也可当作堆栈、队列、双端队列
- 2、当随机访问List时（get和set操作），ArrayList比LinkedList的效率更高，因为LinkedList是线性的数据存储方式，所以需要移动指针从前往后依次查找。
- 3、当对数据进行增加和删除的操作时(add和remove操作)，LinkedList比ArrayList的效率更高，因为ArrayList是数组，所以在其中进行增删操作时，会对操作点之后所有数据的下标索引造成影响，需要进行数据的移动。
- 4、从利用效率来看，ArrayList自由性较低，因为它需要手动的设置固定大小的容量，但是它的使用比较方便，只需要创建，然后添加数据，通过调用下标进行使用；而LinkedList自由性较高，能够动态的随数据量的变化而变化，但是它不便于使用。
- 5、ArrayList主要控件开销在于需要在lList列表预留一定空间；而LinkList主要控件开销在于需要存储结点信息以及结点指针信息。







