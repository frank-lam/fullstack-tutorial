# 第24章 python命名空间

<!-- TOC -->

- [第24章 python命名空间](#%e7%ac%ac24%e7%ab%a0-python%e5%91%bd%e5%90%8d%e7%a9%ba%e9%97%b4)
  - [内置命令空间](#%e5%86%85%e7%bd%ae%e5%91%bd%e4%bb%a4%e7%a9%ba%e9%97%b4)
  - [全局命名空间](#%e5%85%a8%e5%b1%80%e5%91%bd%e5%90%8d%e7%a9%ba%e9%97%b4)
  - [局部命名空间](#%e5%b1%80%e9%83%a8%e5%91%bd%e5%90%8d%e7%a9%ba%e9%97%b4)
  - [区别](#%e5%8c%ba%e5%88%ab)
  - [func函数内存地址](#func%e5%87%bd%e6%95%b0%e5%86%85%e5%ad%98%e5%9c%b0%e5%9d%80)
  - [NotImplementedError](#notimplementederror)

<!-- /TOC -->

## 内置命令空间

就是python解释器 ，启动就可以使用的名字存储在内置命名空间中
内置的名字在启动解释器的时候被加载进内存里


## 全局命名空间

自己写的代码，但不是函数中的代码

是在程序从上到下被执行的过程中依次加载进内存的
放置了我们设置的所有变量名和函数名


## 局部命名空间

就是函数内部定义的名字
当调用函数的时候，才会产生这个名称空间，随着函数执行的结束，这个命名空间就消失了


## 区别

1、在局部： 可以使用全局，内置命名空间中的名字

2、在全局：可以使用内置命名空间中的名字，但是不能使用局部中变量使用

例子：
```python
def func():
    a = 1


func()
print(a)
```

运行结果:

```
NameError: name 'a' is not defined
```

3、在内置： 不能使用局部和全局的名字的

顺序是这样的：
**`内置>全局>局部`**

例子:
```python
def max():
    print("in max func")


max()
```

运行结果：
```python
in max func
```

在正常情况下，直接使用内置的名字
当我们在全局定义了和内置名字空间中同名的名字时，就会使用全局的名字
一级一级找


## func函数内存地址

```python
# 函数名() 函数的调用
# 加入id 就是函数的内存地址


def max():
    print("in max func")


print(max)
print(id(max))
```
运行结果：
```
<function max at 0x0000025D7091D9D8>
2600343820760

```



##  NotImplementedError

Python编程中raise可以实现报出错误的功能，而报错的条件可以由程序员自己去定制。

在面向对象编程中，可以先预留一个方法接口不实现，在其子类中实现。

如果要求其子类一定要实现，不实现的时候会导致问题，那么采用raise的方式就很好。

而此时产生的问题分类是NotImplementedError


例子：
```python
class ClassDemo(object):
    def run(self):
        raise NotImplementedError


class ChildClass(ClassDemo):
    def run(self):
        print("Hello world")


ChildClass().run()
```
<br>

例子:
```python
class ClassDemo(object):
    def run(self):
        raise NotImplementedError

    def wrong(self):
        # Will raise a TypeError
        NotImplemented = "don't do this"
        return NotImplemented


class ChildClass(ClassDemo):
    def run(self):
        print("Hello world")

    def wrong(self):
        print("wrong")


ChildClass().run()  # Hello world

wrong = ClassDemo().wrong()
print(wrong)  # don't do this

```


这里区分下 NotImplemented && NotImplementedError

```
 type(NotImplemented)
<class 'NotImplementedType'>
 type(NotImplementedError)
<class 'type'>
issubclass(NotImplementedError,Exception)
True
```



NotImplemented 是 Python 内建命名空间内仅有的 6 个常量（Python 中没有真正的常量）之一，
其它几个分别是 False、True、None、Ellipsis 和` __debug__`。

和 Ellipsis 一样，NotImplemented 也可以被重新赋值：
NotImplemented = "don't do this"

两者是什么关系呢？答案是**“没啥关系”**。

Python 中 NotImplemented 广泛应用于二元魔术方法中，比如 `__eq__()、__lt__() `等等，表示该类型无法和其它类型进行对应的二元运算


例子：
```python
class A(object):
    def __init__(self, value):
        self.value = value

    def __eq__(self, other):
        if isinstance(other, A):
            print('Comparing an A with an A')
            return other.value == self.value
        if isinstance(other, B):
            print('Comparing an A with a B')
            return other.value == self.value
            print('Could not compare A with the other class')
            return NotImplemented


class B(object):
    def __init__(self, value):
        self.value = value

    def __eq__(self, other):
        # raise NotImplementedError
        if isinstance(other, B):
            print('Comparing a B with another B')
            return other.value == self.value
            print('Could not compare B with the other class')
            return NotImplemented


a, b = A(1), B(1)
aa, bb = A(1), B(1)
a == aa  # True
b == bb  # True
a == b  # True
b == a  # True

```

运行结果：
```
Comparing an A with an A
Comparing a B with another B
Comparing an A with a B
```



说明 == 运算符执行时会先寻找 B 的 `__eq__() `方法，
遇到 NotImplemented 返回值则反过来去寻找 A 的 `__eq__()` 方法。


什么时候该使用 NotImplementedError？

>NotImplementedError 是 RuntimeError 的子类：
>issubclass(NotImplementedError, RuntimeError) # True

>官网 的建议是当你需要一个方法必须覆盖才能使用时，其效果类似于 Java 中的接口，用于定义一个未实现的抽象方法。