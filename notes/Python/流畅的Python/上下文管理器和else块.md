# 第15章 上下文管理器和else块

<!-- TOC -->

- [第15章 上下文管理器和else块](#%e7%ac%ac15%e7%ab%a0-%e4%b8%8a%e4%b8%8b%e6%96%87%e7%ae%a1%e7%90%86%e5%99%a8%e5%92%8celse%e5%9d%97)
  - [try..except..finally](#tryexceptfinally)
  - [with语句](#with%e8%af%ad%e5%8f%a5)
  - [上下文管理器](#%e4%b8%8a%e4%b8%8b%e6%96%87%e7%ae%a1%e7%90%86%e5%99%a8)
  - [@contextmanager 装饰器](#contextmanager-%e8%a3%85%e9%a5%b0%e5%99%a8)

<!-- /TOC -->

## try..except..finally

看一个例子：
```python
def get_result():
    a = 3
    b = 0
    try:
        b = 3 / 0
    except Exception as e:
        print("ERROR=", e)
    finally:
        print("a=", a)


if __name__ == "__main__":
    get_result()
   
```

返回结果是：
```python
ERROR= division by zero
a= 3
```

<br>
总结：
>try..except..else没有捕获到异常，执行else语句
try..except..finally不管是否捕获到异常，都执行finally语句



## with语句


python文本文件读写的3种方法

```python
# 第一种方法：
file1 = open("test.txt")
file2 = open("output.txt", "w")
while True:
    line = file1.readline()
    # 这里可以进行逻辑处理
    file2.write(line)
    if not line:
        break

# 记住文件处理完，关闭是个好习惯
file1.close()
file2.close()

# 读文件有3种方法：
# - read()将文本文件所有行读到一个字符串中。
# - readline()是一行一行的读
# - readlines()是将文本文件中所有行读到一个list中，文本文件每一行是list的一个元素。

# 优点：readline()可以在读行过程中跳过特定行。

# 第二种方法：文件迭代器，用for循环的方法
file2 = open("output.txt", "w")
for line in open("test.txt"):
    # 这里可以进行逻辑处理
    file2.write(line)

# 第三种方法： 推荐使用这个方法文件上下文管理器
with open('somefile.txt', 'r') as f:
    data = f.read()

with open('somefile.txt', 'r') as f:
    for line in f:
        print(line)

with open('somefile.txt', 'w') as f:
    f.write("hello")
```



**这里重点说说第三种方法**

打开文件在进行读写的时候可能会出现一些异常状况，如果按照常规的f.open
写法，我们需要try,except,finally，做异常判断，并且文件最终不管遇到什么情况，都要执行finally f.close()关闭文件，with方法帮我们实现了finally中f.close


## 上下文管理器

上下文管理器协议包含`__enter__ 和 __exit__` 两个方法。

with 语句开始运行时，会在上下文管理器对象上调用 `__enter__ `方法。
with 语句运行结束后，会在上下文管理器对象上调用` __exit__ `方法，以此扮演 finally 子句的角色。

最常见的例子是确保关闭文件对象
```python
class T(object):
    def __enter__(self):
        print('T.__enter__')
        return '我是__enter__的返回值'

    def __exit__(self, exc_type, exc_val, exc_tb):
        print('T.__exit__')


with T() as t:
    print(t)
```

返回结果：
```
T.__enter__
我是__enter__的返回值
T.__exit__
```


with之于上下文管理器，就像for之于迭代器一样。with就是为了方便上下文管理器的使用。


## @contextmanager 装饰器


下文管理器就不得不提一下@contextmanager 装饰器，它能减少创建上下文管理器的样板代码量，

因为不用编写一个完整的类，定义` __enter__和 __exit__ `方法，而只需实现有一个 yield 语句的生成器，生成想让` __enter__ `方法返回的值。


@contextmanager 装饰器优雅且实用，把三个不同的 Python 特性结合到了一起：**函数装饰器、生成器和 with 语句。**

在使用 @contextmanager 装饰的生成器中，yield 语句的作用是把函数的定义体分成两部分：

	1. yield 语句前面的所有代码在 with 块开始时（即解释器调用` __enter__` 方法时）执行
	2. yield 语句后面的代码在with 块结束时（即调用 `__exit__` 方法时）执行。


例子：
```python
import sys
import contextlib


@contextlib.contextmanager
def WoHa(n):
    original_write = sys.stdout.write

    def reverse_write(text):
        original_write(text[::-1])

    sys.stdout.write = reverse_write
    yield n
    sys.stdout.write = original_write
    return True


obj1 = WoHa('你手机拿反了')
with obj1 as content:
    print('哈哈镜花缘')
    print(content)

print('#### with 执行完毕后，在输出content: ####')
print(content)

```


返回结果：
```
缘花镜哈哈
了反拿机手你
#### with 执行完毕后，在输出content: ####
你手机拿反了
```


这里我们需要注意的是：

代码执行到yield时，会产出一个值，这个值会绑定到 with 语句中 as 子句的变量上。
执行 with 块中的代码时，这个函数会在yield这里暂停。
