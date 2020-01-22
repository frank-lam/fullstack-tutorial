# 第17章 使用future处理并发

<!-- TOC -->

- [第17章 使用future处理并发](#%e7%ac%ac17%e7%ab%a0-%e4%bd%bf%e7%94%a8future%e5%a4%84%e7%90%86%e5%b9%b6%e5%8f%91)
  - [futures模块](#futures%e6%a8%a1%e5%9d%97)
    - [多线程模式ThreadPoolExecutor](#%e5%a4%9a%e7%ba%bf%e7%a8%8b%e6%a8%a1%e5%bc%8fthreadpoolexecutor)
    - [多进程模式ProcessPoolExecutor](#%e5%a4%9a%e8%bf%9b%e7%a8%8b%e6%a8%a1%e5%bc%8fprocesspoolexecutor)
    - [深入原理](#%e6%b7%b1%e5%85%a5%e5%8e%9f%e7%90%86)

<!-- /TOC -->
## futures模块

Python3引入的concurrent.futures模块。concurrent.futures 是python3新增加的一个库，用于并发处理，提供了多线程和多进程的并发功能 类似于其他语言里的线程池（也有一个进程池），他属于上层的封装，对于用户来说，不用在考虑那么多东西了


concurrent提供了两种并发模型，一个是多线程ThreadPoolExecutor，一个是多进程ProcessPoolExecutor。对于IO密集型任务宜使用多线程模型。对于计算密集型任务应该使用多进程模型。


### 多线程模式ThreadPoolExecutor
多线程模式适合IO密集型运算，这里我要使用sleep来模拟一下慢速的IO任务
这里使用Google fire开源库来简化命令行参数处理


```python
import time
import fire
import threading
from concurrent.futures import ThreadPoolExecutor, wait


# 分割子任务
def each_task(index):
    time.sleep(1)  # 睡1s，模拟IO
    print("thread %d square %d" % (threading.current_thread().ident, index))
    return index * index  # 返回结果


def run(thread_num, task_num):
    # 实例化线程池，thread_num个线程
    executor = ThreadPoolExecutor(thread_num)
    start = time.time()

    fs = []  # future列表
    for i in range(task_num):
        fs.append(executor.submit(each_task, i))  # 提交任务

    wait(fs)  # 等待计算结束
    end = time.time()
    duration = end - start

    s = sum([f.result() for f in fs])  # 求和
    print("total result=%d cost: %s" % (s, duration))
    executor.shutdown()  # 销毁线程池


if __name__ == '__main__':
    fire.Fire(run)
```

执行返回结果：
```
python 1.py 2 10 # 也就是2个线程跑10个任务
thread 5216 square 0
thread 5856 square 1
thread 5216 square 2
thread 5856 square 3
thread 5216 square 4
thread 5856 square 5
thread 5216 square 6
thread 5856 square 7
thread 5856 square 9
thread 5216 square 8
total result=285 cost: 5.06045389175415
```

为什么输出乱了，这是因为print操作不是原子的，它是两个连续的write操作合成的，第一个write输出内容，第二个write输出换行符，write操作本身是原子的，但是在多线程环境下，这两个write操作会交错执行，所以输出就不整齐了。如果将代码稍作修改，将print改成单个write操作，输出就整齐了  ---`发现改了还是不行`



调大参数看看效果：
```
python 1.py 10 10
thread 4792 square 9
thread 10380 square 6
thread 14420 square 7
thread 5720 square 3
thread 13808 square 4
thread 17344 square 1
thread 9172 square 5
thread 10684 square 8
thread 11696 square 0
thread 6300 square 2
total result=285 cost: 1.05
```

可以看到1s中就完成了所有的任务。这就是多线程的魅力，可以将多个IO操作并行化，减少整体处理时间。



### 多进程模式ProcessPoolExecutor

相比多线程适合处理IO密集型任务，多进程适合计算密集型。

```python
import os
import sys
import math
import time
import fire
from concurrent.futures import ProcessPoolExecutor, wait


# 分割子任务
def each_task(n):
    # 按公式计算圆周率
    s = 0.0
    for i in range(n):
        s += 1.0 / (i + 1) / (i + 1)
    pi = math.sqrt(6 * s)
    # os.getpid可以获得子进程号
    sys.stdout.write("process %s n=%d pi=%s\n" % (os.getpid(), n, pi))
    return pi


def run(process_num, *ns):  # 输入多个n值，分成多个子任务来计算结果
    # 实例化进程池，process_num个进程
    executor = ProcessPoolExecutor(process_num)
    start = time.time()
    fs = []  # future列表
    for n in ns:
        fs.append(executor.submit(each_task, int(n)))  # 提交任务
    wait(fs)  # 等待计算结束
    end = time.time()
    duration = end - start
    print("total cost: %.2f" % duration)
    executor.shutdown()  # 销毁进程池


if __name__ == '__main__':
    fire.Fire(run)
```

执行返回结果：
```
python 1.py  1 5000000 5001000 5002000 5003000
process 10024 n=5000000 pi=3.141592462603821
process 10024 n=5001000 pi=3.141592462641988
process 10024 n=5002000 pi=3.1415924626801544
process 10024 n=5003000 pi=3.141592462718321
total cost: 4.62
```

增大一个进程看看效果：
```
python 1.py 2 5000000 5001000 5002000 5003000
process 5860 n=5000000 pi=3.141592462603821
process 14948 n=5001000 pi=3.141592462641988
process 14948 n=5003000 pi=3.141592462718321
process 5860 n=5002000 pi=3.1415924626801544
total cost: 2.78
```

从耗时上看缩短了接近1半，说明多进程确实起到了计算并行化的效果


### 深入原理


[Python最广为使用的并发库futures使用入门与内部原理](https://mp.weixin.qq.com/s/NBBDou4rIMo9KibVb4fjeg)