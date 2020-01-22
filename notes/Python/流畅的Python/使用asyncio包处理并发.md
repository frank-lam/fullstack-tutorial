# 第18章 使用asyncio包处理并发

<!-- TOC -->

- [第18章 使用asyncio包处理并发](#第18章-使用asyncio包处理并发)
    - [主线程与子线程](#主线程与子线程)
    - [守护线程](#守护线程)
    - [线程同步](#线程同步)
    - [asyncio介绍](#asyncio介绍)
        - [关键组件说明](#关键组件说明)
        - [回调](#回调)
    - [asyncio与gevent关系](#asyncio与gevent关系)
    - [asyncio与Flask](#asyncio与flask)
        - [aiohttp](#aiohttp)
        - [与单进程、多进程对比](#与单进程多进程对比)

<!-- /TOC -->


## 主线程与子线程


当一个进程启动之后，会默认产生一个主线程，因为线程是程序执行流的最小单元。

当设置多线程时，主线程会创建多个子线程，在python中，默认情况下（其实就是`setDaemon(False)`），主线程执行完自己的任务以后，就退出了。

此时子线程会继续执行自己的任务，直到自己的任务结束。


例子：
```python
import time
import threading


def run():
    time.sleep(2)
    print('当前线程名称是:%s' % threading.currentThread().name)
    time.sleep(2)


if __name__ == "__main__":

    start_time = time.time()
    print('这是主线程:%s' % threading.current_thread().name)

    thread_list = []

    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.start()

    print('主线程结束:%s' % threading.current_thread().name)

print('一共用时:%f' % float(time.time() - start_time))
```

运行结果：
```
这是主线程:MainThread
主线程结束:MainThread
一共用时:0.002953
当前线程名称是:Thread-2
当前线程名称是:Thread-1
当前线程名称是:Thread-5
当前线程名称是:Thread-3
当前线程名称是:Thread-4
```


##守护线程
当我们使用`setDaemon(True)`方法，设置子线程为守护线程时，主线程一旦执行结束，则全部线程全部被终止执行

可能出现的情况就是，子线程的任务还没有完全执行结束，就被迫停止。

例子：
```python
import time
import threading


def run():
    time.sleep(2)
    print('当前线程名称是:%s' % threading.currentThread().name)
    time.sleep(2)


if __name__ == "__main__":

    start_time = time.time()
    print('这是主线程:%s' % threading.current_thread().name)

    thread_list = []

    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.setDaemon(True)
        t.start()

    print('主线程结束:%s' % threading.current_thread().name)

print('一共用时:%f' % float(time.time() - start_time))
```

运行结果：
```
这是主线程:MainThread
主线程结束:MainThread
一共用时:0.002954
```


## 线程同步

join所完成的工作就是线程同步，即主线程任务结束之后，进入阻塞状态，一直等待其他的子线程执行结束之后，主线程在终止

例子：
```python
import time
import threading


def run():
    time.sleep(2)
    print('当前线程名称是:%s' % threading.currentThread().name)
    time.sleep(2)


if __name__ == "__main__":

    start_time = time.time()
    print('这是主线程:%s' % threading.current_thread().name)

    thread_list = []

    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.start()
        t.join()

    print('主线程结束:%s' % threading.current_thread().name)

print('一共用时:%f' % float(time.time() - start_time))
```

运行结果：
```
这是主线程:MainThread
当前线程名称是:Thread-1
当前线程名称是:Thread-2
当前线程名称是:Thread-3
当前线程名称是:Thread-4
当前线程名称是:Thread-5
主线程结束:MainThread
一共用时:20.015406
```




##asyncio介绍

asyncio的编程模型就是一个`消息循环`, 异步非阻塞的协程


### 关键组件说明

asyncio使用了与以往python用法完全不同的构造：`事件循环、协程和futures`


关于asyncio的一些关键字的说明：

>* event_loop 事件循环：程序开启一个无限循环，把一些函数注册到事件循环上，当满足事件发生的时候，调用相应的协程函数

>* coroutine 协程：协程对象，指一个使用async关键字定义的函数，它的调用不会立即执行函数，而是会返回一个协程对象。协程对象需要注册到事件循环，由事件循环调用。

>* task 任务：一个协程对象就是一个原生可以挂起的函数，任务则是对协程进一步封装，其中包含了任务的各种状态

>* future: 代表将来执行或没有执行的任务的结果。它和task上没有本质上的区别
	
>* async/await 关键字：python3.5用于定义协程的关键字，async定义一个协程，await用于挂起阻塞的异步调用接口。


例子：



```python
import asyncio
import datetime


# 写法1
# @asyncio.coroutine
# def hello():

#     print('hello world')
#     r = yield from asyncio.sleep(1)

# print('hello again')

# 写法2
async def hello():
    print('hello world')
    await asyncio.sleep(1)
    print('hello again')


if __name__ == "__main__":

    loop = asyncio.get_event_loop()
    task = loop.create_task(hello())

    print(datetime.datetime.now())

    # print(task)
    loop.run_until_complete(task)

    # print(task)
    print(datetime.datetime.now())
    loop.close()
```



协程对象不能直接运行，在注册事件循环的时候，其实是run_until_complete方法将协程包装成为了一个任务（task）对象。

所谓task对象是Future类的子类。保存了协程运行后的状态，用于未来获取协程的结果。

在通过loop.create_task(hello())的时候，任务其实是处于pending状态。

在hello中通过asyncio.sleep(1)耗时一秒最后任务执行完后状态变为done.

asyncio.ensure_future(coroutine) 和 loop.create_task(coroutine)都可以创建一个task，run_until_complete的参数是一个futrue对象。

当传入一个协程，其内部会自动封装成task，task是Future的子类



再来看一个例子：
```python
import asyncio
import random


async def MyCoroutine(id):
    process_time = random.randint(1, 5)
    # 使用asyncio.sleep模拟一些耗时的操作
    await asyncio.sleep(process_time)
    print("协程: {}, 执行完毕。用时： {} 秒".format(id, process_time))


async def main():
    # ensure_future方法 接收协程或者future作为参数，作用是排定他们的执行时间
    tasks = [asyncio.ensure_future(MyCoroutine(i)) for i in range(10)]

    # 返回结果
    await asyncio.gather(*tasks)


# 事件循环
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(main())
finally:
    loop.close()
```

运行结果：
```
协程: 7, 执行完毕。用时： 1 秒
协程: 9, 执行完毕。用时： 1 秒
协程: 5, 执行完毕。用时： 2 秒
协程: 0, 执行完毕。用时： 4 秒
协程: 6, 执行完毕。用时： 4 秒
协程: 2, 执行完毕。用时： 4 秒
协程: 3, 执行完毕。用时： 4 秒
协程: 8, 执行完毕。用时： 4 秒
协程: 4, 执行完毕。用时： 4 秒
协程: 1, 执行完毕。用时： 4 秒
```


从输出结果可以看出两点：
1.协程并没有按照顺序返回结果；
2.批量运行的任务所用的时间和所有任务中用时最长的相同。




### 回调

```python
import asyncio
import requests

async def request():
    url = 'https://www.baidu.com'
    status = requests.get(url)
    return status

def callback(task):
    print('Status:', task.result())

coroutine = request()
task = asyncio.ensure_future(coroutine)
task.add_done_callback(callback)
print('Task:', task)

loop = asyncio.get_event_loop()
loop.run_until_complete(task)
print('Task:', task)
```

也可以不用回调:
```python
import asyncio
import requests


async def request():
    url = 'https://www.baidu.com'
    status = requests.get(url)
    return status


coroutine = request()
task = asyncio.ensure_future(coroutine)
print('Task:', task)

loop = asyncio.get_event_loop()
loop.run_until_complete(task)
print('Task:', task)
print('Task Result:', task.result())

```

## asyncio与gevent关系


gevent是第三方库，通过greenlet实现协程

其基本思路是：
当一个greenlet遇到IO操作时，就自动切换到其他的greenlet，等到IO操作完成，再在适当的时候切换回来继续执行。


asyncio是Python 3.4版本引入的标准库，直接内置了对异步IO的支持，不需要第三方的支持，

asyncio的编程模型就是一个消息循环。

我们从asyncio模块中直接获取一个EventLoop的引用，然后把需要执行的协程扔到EventLoop中执行，就实现了异步IO。

很多异步io操作这两个库都可以用，只是他们在不同场景下的效率和易用性可能有区别，当然这个得进行深入的测试和研究，单就现在普通的场景来说 区别并不大



## asyncio与Flask

首先使用flask编写一个web服务器
```python
from flask import Flask
import time

app = Flask(__name__)

@app.route('/')
def index():
    time.sleep(3)
    return 'Hello!'

if __name__ == '__main__':
    app.run(threaded=True)
```

这里run() 方法加了一个参数 threaded，这表明 Flask 启动了多线程模式，不然默认是只有一个线程的。

如果不开启多线程模式，同一时刻遇到多个请求的时候，只能顺次处理，这样即使我们使用协程异步请求了这个服务，也只能一个一个排队等待，瓶颈就会出现在服务端。

所以，多线程模式是有必要打开的。


程序运行后会开启一个web, 端口默认5000

使用asyncio模块进行测试
```python
import asyncio
import requests
import time

start = time.time()

async def request():
    url = 'http://127.0.0.1:5000'
    print('Waiting for', url)
    response = requests.get(url)
    print('Get response from', url, 'Result:', response.text)

tasks = [asyncio.ensure_future(request()) for _ in range(5)]
loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))

end = time.time()
print('Cost time:', end - start)
```


运行结果：
```
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Cost time: 15.0814049243927
```

可以发现和正常的请求并没有什么两样，依然还是顺次执行的，耗时 15 秒，平均一个请求耗时 3 秒，说好的异步处理呢？

其实，要实现异步处理，我们得先要有挂起的操作，当一个任务需要等待 IO 结果的时候，可以挂起当前任务，转而去执行其他任务，这样我们才能充分利用好资源，上面方法都是一本正经的串行走下来，连个挂起都没有，怎么可能实现异步？

要实现异步，接下来我们再了解一下 await 的用法，使用 await 可以将耗时等待的操作挂起，让出控制权。

当协程执行的时候遇到 await，时间循环就会将本协程挂起，转而去执行别的协程，直到其他的协程挂起或执行完毕。

改进后代码：
```python
import asyncio
import requests
import time

start = time.time()


# 这里增加异步get
# 否则会报错：TypeError: object Response can't be used in 'await' expression
async def get(url):
    return requests.get(url)


async def request():
    url = 'http://127.0.0.1:5000'
    print('Waiting for', url)
    response = await get(url)  # 修改这里增加await
    print('Get response from', url, 'Result:', response.text)


tasks = [asyncio.ensure_future(request()) for _ in range(5)]
loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))

end = time.time()
print('Cost time:', end - start)
```

运行结果：
```
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Waiting for http://127.0.0.1:5000
Get response from http://127.0.0.1:5000 Result: Hello!
Cost time: 15.083374977111816
```

还是不行，它还不是异步执行，也就是说我们仅仅将涉及 IO 操作的代码封装到 async 修饰的方法里面是不可行的！

我们必须要使用支持**异步操作的请求方式**才可以实现真正的异步，所以这里就需要 aiohttp 派上用场了.


### aiohttp

首先执行下面命令进行安装这个模块：

```python
pip install aiohttp
```


例子：
```python
import asyncio
import aiohttp
import time

start = time.time()

async def get(url):
    session = aiohttp.ClientSession()
    response = await session.get(url)
    result = await response.text()
    session.close()
    return result

async def request():
    url = 'http://127.0.0.1:5000'
    print('Waiting for', url)
    result = await get(url)
    print('Get response from', url, 'Result:', result)

tasks = [asyncio.ensure_future(request()) for _ in range(5)]
loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(tasks))

end = time.time()
print('Cost time:', end - start)
```

运行结果：
```
xx
Cost time: 3.056924819946289
```


我们发现这次请求的耗时由 15 秒变成了 3 秒，耗时直接变成了原来的 1/5

这就是异步操作的便捷之处，当遇到阻塞式操作时，任务被挂起，程序接着去执行其他的任务，而不是傻傻地等着，这样可以充分利用 CPU 时间，而不必把时间浪费在等待 IO 上


这里将 task 数量设置成 100 ,发现结果也是3秒
```
Cost time: 3.4409260749816895
```

### 与单进程、多进程对比


单进程代码：
```python
import requests
import time

start = time.time()


def request():
    url = 'http://127.0.0.1:5000'
    print('Waiting for', url)
    result = requests.get(url).text
    print('Get response from', url, 'Result:', result)


for _ in range(100):
    request()

end = time.time()
print('Cost time:', end - start)
```

运行结果：
```
Cost time: 301.17162680625916
```




多进程版本：


```python
import requests
import time
import multiprocessing

start = time.time()


def request(_):
    url = 'http://127.0.0.1:5000'
    print('Waiting for', url)
    result = requests.get(url).text
    print('Get response from', url, 'Result:', result)


if __name__ == "__main__":  # 这一行在windows下执行一定要添加，否则会报错

    cpu_count = multiprocessing.cpu_count()
    print('Cpu count:', cpu_count)
    pool = multiprocessing.Pool(cpu_count)

    pool.map(request, range(100))

    end = time.time()
    print('Cost time:', end - start)
```

运行结果：
```
Cost time: 48.85933017730713
```


这里想查看cpu个数也可以使用：
```python
 import psutil
 psutil.cpu_count()
```