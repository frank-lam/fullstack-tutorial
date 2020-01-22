# 第22章 python字节码-补充内容

<!-- TOC -->

- [第22章 python字节码-补充内容](#%e7%ac%ac22%e7%ab%a0-python%e5%ad%97%e8%8a%82%e7%a0%81-%e8%a1%a5%e5%85%85%e5%86%85%e5%ae%b9)
  - [python编译过程](#python%e7%bc%96%e8%af%91%e8%bf%87%e7%a8%8b)
    - [py文件](#py%e6%96%87%e4%bb%b6)
      - [__pycache__](#pycache)
      - [pyc文件](#pyc%e6%96%87%e4%bb%b6)
      - [pyo文件](#pyo%e6%96%87%e4%bb%b6)
  - [python程序执行原理](#python%e7%a8%8b%e5%ba%8f%e6%89%a7%e8%a1%8c%e5%8e%9f%e7%90%86)

<!-- /TOC -->



## python编译过程


在日常生活中，Python代码一般是不编译的，几个py文件复制来就能用。再加上脚本语言的名头，有些不太了解Python的朋友就以为Python没有编译这个过程。

其实，虽然Python是脚本语言，但它与Java和C#一样，**`只能执行字节码`**。

只是Python将编译过程隐藏起来，不大明显而已。


这一章就详细记述一下Python的编译过程以及一些技巧。

`这里使用的python版本是3.6.6`


### py文件

**py文件 就是python代码文件**

这里准备两个py文件为下面分析使用

mymodule.py
```python
class MyModule(object):
    def say(self, name):
        print("Say...", name)
```

demo.py
```python
from mymodule import MyModule

test = MyModule()

test.say("Hello")
```

<br>
运行demo.py方法在当前目录会产生一个`__pycache__`目录

进入这个目录我们看到里面有个文件mymodule.cpython-36.pyc

<br>
这里就有两个问题了

`__pycache__`目录是什么？

pyc文件又是什么？


#### `__pycache__`

`__pycache__`是包含编译并准备执行Python 3字节码的目录

当第一次运行 python 脚本时,解释器会将 *.py 脚本进行编译并保存到 `__pycache__` 目录

**这里有个问题？** 

我就写个一个文件，里面就打印一句话，会不会产生pycache目录呢？

```
print("hello world")
```

实验表明：
> 并不会产生这个pycache目录，这个目录只有当**`import xxx`**才会生成


**`这个目录能不能删掉呢？删掉有什么影响呢?`**

下次执行脚本时,若解释器发现你的 *.py 脚本没有变更,便会跳过编译一步,直接运行保存在 `__pycache__ `目录下的 *.pyc 文件


**执行python脚本会导致字节代码在内存中生成并保持到程序关闭。**

**如果导入模块，为了更快的可重用性，Python将创建一个缓存.pyc(PYC是'Python''Compiled')文件，其中导入的模块的字节代码被缓存。**

想法是通过避免在重新导入时重新编译(编译一次，运行多次策略)来加速python模块的加载。

文件名与模块名称相同。
初始点后面的部分表示创建缓存的Python实现(可能是CPython)，后跟其版本号。

如前面说的mymodule.cpython-36.pyc文件

#### pyc文件

python2 代码 运行是直接在本地产生pyc文件
python3 代码运行是把pyc文件放在pycache目录


.pyc文件是由.py文件经过编译后生成的字节码文件，其加载速度相对于之前的.py文件有所提高，而且还可以实现源码隐藏，以及一定程度上的反编译


pyc文件，是python编译后的字节码（bytecode）文件。
只要你运行了py文件，python编译器就会自动生成一个对应的pyc字节码文件。
这个pyc字节码文件，经过python解释器，会生成机器码运行

下次调用直接调用pyc，而不调用py文件。直到你这个py文件有改变。

python解释器会检查pyc文件中的生成时间，对比py文件的修改时间，如果py更新，那么就生成新的pyc。


#### pyo文件

pyo文件也是优化（注意这两个字，便于后续的理解）编译后的程序（相比于.pyc文件更小），也可以提高加载速度。

但对于嵌入式系统，它可将所需模块编译成.pyo文件以减少容量。  但总的来说，作用上是几乎与原来的.py脚本没有区别的，


在所有的Python选项中：

>-O，表示优化生成.pyo字节码

>-OO，表示进一步移除-O选项生成的字节码文件中的文档字符串

>-m，表示导入并运行指定的模块


执行下面的命令查看是否生成pyo文件

```python
#py_compile是Python的自带模块
python -O -m py_compile demo.py
python -OO -m py_compile demo.py
```

到pycache目录看到生成了cpython-36.opt-1.pyc文件

![Alt text](https://raw.githubusercontent.com/Syncma/Figurebed/master/img/1578027718663.png)

我们发现下面的结果：

1.`咦，说好的生成pyo文件的呢？怎么又生成了pyc文件？`

2.两个pyc文件
-O 选择生成的是xxxx-1.pyc
-OO 选项生成的是xxxx-2.pyc

`这两个pyc又有啥区别呢？`


>查资料，发现从python3.5+开始就去除了pyo文件后缀名，
[消除pyo文件原文链接](https://www.python.org/dev/peps/pep-0488/)
[PYC目录链接](https://www.python.org/dev/peps/pep-3147/)

为啥官方要去除pyo呢？ 

我读完这两篇文章，简单总结下：

由于pyc 文件在 Python 主要版本之间并不兼容
所以引入了一种更灵活的替代机制 -pyc

格式包含实现名称和版本号

*.pyc 文件可以表示优化和未优化的字节码。

优化级别信息可以包含在 *.pyc 文件的名字中，

优化级别：
```
0: .pyc
1 (-O): .pyo
2 (-OO): .pyo
```



## python程序执行原理

![Alt text](https://raw.githubusercontent.com/Syncma/Figurebed/master/img/1578032890559.png)
