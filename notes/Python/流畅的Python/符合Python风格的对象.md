# 第9章-符合Python风格的对象

<!-- TOC -->

- [第9章-符合Python风格的对象](#%e7%ac%ac9%e7%ab%a0-%e7%ac%a6%e5%90%88python%e9%a3%8e%e6%a0%bc%e7%9a%84%e5%af%b9%e8%b1%a1)
  - [format表示法](#format%e8%a1%a8%e7%a4%ba%e6%b3%95)
  - [__slots__方法](#slots%e6%96%b9%e6%b3%95)

<!-- /TOC -->

## format表示法

```python

>>> print "Hello %(name)s !" % {'name': 'James'}
Hello James !

>>> print "I am years %(age)i years old" % {'age': 18}
I am years 18 years old

#format的写法:

>>> print "Hello {name} !".format(name="James")
Hello James !
```


## `__slots__`方法


Python内置属性很多，其中`__slots__`属性比较少会被用到，基本不会被当作是必选项。但如果您对内存使用有颇高的要求，`__slots__`会给你很大帮助。

`__slots__`的目的又是什么呢？

答案是：优化内存使用。限制实例属性的自由添加只是副作用而已。

那么`__slots__`属性究竟如何神奇？
这要先从`__dict_`_属性说起。


` __dict__`属性的用途在于记录实例属性：

`__dict__`属性用来记录实例中的属性信息，如果对实例中的属性信息进行修改或者添加新的属性，`__dict__`都会对其进行记录。

```python
class Person(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age


person = Person("tony", 20)  # 对Person类实例化
print(person.__dict__)  # 记录实例所有的属性 {'name': 'tony', 'age': 20}

person.age = 'jacky'
person.gender = 'male'

print(person.__dict__)  # {'name': 'tony', 'age': 'jacky', 'gender': 'male'}

```



那么`__slots__`跟`__dict__`又有什么关系呢？

简单点理解:

 `__slots_`_存在的价值在于删除`__dict__`属性，从而来**优化类实例对内存的需求**。
 
而这带来的副作用就是：由于缺少了`__dict__`，类实例木有办法再自由添加属性了！


```python
class Person(object):
    __slots__ = ("name", "age")

    def __init__(self, name, age):
        self.name = name
        self.age = age


person = Person("tony", 20)  # 对Person类实例化

print("__dict__" in dir(person))  # False, 没有了__dict__属性

person.age = 'jacky'
person.gender = 'male'  # AttributeError: 'Person' object has no attribute 'gender'
# 这就是__slots__的副作用，不能自由添加实例属性了

```


总结：

默认情况下，自定义的对象都使用dict来存储属性（通过obj.`__dict__`查看），而python中的dict大小一般比实际存储的元素个数要大（以此降低hash冲突概率），因此会浪费一定的空间。

在新式类中使用`__slots__`，就是告诉Python虚拟机，这种类型的对象只会用到这些属性，
因此虚拟机预留足够的空间就行了

如果声明了`__slots__`，那么对象就不会再有`__dict__`属性。


到底能省多少，取决于类自身有多少属性、属性的类型，以及同时存在多少个类的实例


可以查看这个[链接](http://tech.oyster.com/save-ram-with-python-slots/)



我们也可以自己测试下结果：

```python
# 使用 profile 进行性能分析
import profile


class A(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y


def profile_result():
    f = [A(1, 2) for i in range(100000)]


if __name__ == "__main__":
    profile.run("profile_result()")
```


返回结果：
```
         100006 function calls in 0.297 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    0.297    0.297 :0(exec)
        1    0.000    0.000    0.000    0.000 :0(setprofile)
        1    0.016    0.016    0.297    0.297 <string>:1(<module>)
        1    0.000    0.000    0.281    0.281 demo.py:11(profile_result)
        1    0.141    0.141    0.281    0.281 demo.py:12(<listcomp>)
   100000    0.141    0.000    0.141    0.000 demo.py:6(__init__)
        1    0.000    0.000    0.297    0.297 profile:0(profile_result())
        0    0.000             0.000          profile:0(profiler)

```


这里返回值参数意思：
```
其中输出每列的具体解释如下：

ncalls：表示函数调用的次数；

tottime：表示指定函数的总的运行时间，除掉函数中调用子函数的运行时间；

percall：（第一个 percall）等于 tottime/ncalls；

cumtime：表示该函数及其所有子函数的调用运行的时间，即函数开始调用到返回的时间；

percall：（第二个 percall）即函数运行一次的平均时间，等于 cumtime/ncalls；

filename:lineno(function)：每个函数调用的具体信息；
```


查看内存占用情况：

```python
# 使用 profile 进行性能分析
from memory_profiler import profile


class A(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y


@profile
def profile_result():
    f = [A(1, 2) for i in range(100000)]


if __name__ == "__main__":
    profile_result()

```

返回结果：
```python
Filename: d:\学习\python\demo\demo.py
Line #    Mem usage    Increment   Line Contents
================================================
    11     50.8 MiB     50.8 MiB   @profile
    12                             def profile_result():
    13     68.8 MiB      0.6 MiB       f = [A(1, 2) for i in range(100000)]


```

<br>
改用`__slots__`的方式：

```python
# 使用 profile 进行性能分析
from memory_profiler import profile


class A(object):
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x = x
        self.y = y


@profile
def profile_result():
    f = [A(1, 2) for i in range(100000)]


if __name__ == "__main__":
    profile_result()

```


返回结果：

```
Filename: d:\学习\python\demo\demo.py
Line #    Mem usage    Increment   Line Contents
================================================
    13     50.6 MiB     50.6 MiB   @profile
    14                             def profile_result():
    15     57.9 MiB      0.7 MiB       f = [A(1, 2) for i in range(100000)]

```
<br>

**可以看到内存使用由原先的68.8MB->57.9MB**