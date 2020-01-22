# 第23章 python时间模块


<!-- TOC -->

- [第23章 python时间模块](#%e7%ac%ac23%e7%ab%a0-python%e6%97%b6%e9%97%b4%e6%a8%a1%e5%9d%97)
  - [time 模块](#time-%e6%a8%a1%e5%9d%97)
  - [datetime模块](#datetime%e6%a8%a1%e5%9d%97)
  - [字符串转换成datetime类型](#%e5%ad%97%e7%ac%a6%e4%b8%b2%e8%bd%ac%e6%8d%a2%e6%88%90datetime%e7%b1%bb%e5%9e%8b)
  - [datetime转换成字符串类型](#datetime%e8%bd%ac%e6%8d%a2%e6%88%90%e5%ad%97%e7%ac%a6%e4%b8%b2%e7%b1%bb%e5%9e%8b)
  - [时间戳转string](#%e6%97%b6%e9%97%b4%e6%88%b3%e8%bd%acstring)

<!-- /TOC -->


## time 模块


time模块提供各种操作时间的函数

一般有两种表示时间的方式:

第一种: 是时间戳的方式(相对于1970.1.1 00:00:00以秒计算的偏移量),时间戳是惟一的

第二种: 以数组的形式表示即(struct_time),共有九个元素，分别表示，同一个时间戳的struct_time会因为时区不同而不同


例子：
```python
import time

print(time.time())
# 1578030257.4879787

print(time.localtime())
# time.struct_time(tm_year=2020, tm_mon=1, tm_mday=3, tm_hour=13, tm_min=44, tm_sec=17, tm_wday=4, tm_yday=3, tm_isdst=0)

```



## datetime模块

Python提供了多个内置模块用于操作日期时间，像calendar，time，datetime。time模块。
相比于time模块，datetime模块的接口则更直观、更容易调用。

datetime模块定义了下面这几个类：

datetime.date：表示日期的类。常用的属性有year, month, day, today；

datetime.time：表示时间的类。常用的属性有hour, minute, second, microsecond；

datetime.datetime：表示日期时间。

datetime.timedelta：表示时间间隔，即两个时间点之间的长度。

datetime.tzinfo：与时区有关的相关信息。

datetime中，表示日期时间的是一个datetime对象

datetime中提供了strftime方法，可以将一个datetime型日期转换成字符串


举一个例子：
```python
import datetime


def datetostr(date):
    return str(date)[0:10]

def getDaysByNum(num):
    today = datetime.date.today()
    oneday = datetime.timedelta(days=1)
    li = []
    for i in range(0, num):
        today = today - oneday
        li.append(datetostr(today))
    return li


print(getDaysByNum(3))
```



## 字符串转换成datetime类型

```python
import datetime
s = "2016-01-12"
print(datetime.datetime.strptime(s, '%Y-%m-%d')
```


## datetime转换成字符串类型
```python
import datetime
s = "2016-01-12"
print(datetime.datetime.strptime(s, '%Y-%m-%d').strftime('%Y-%m-%d'))

```

## 时间戳转string
```python
import time

time1 = 1353254400

time_str = time.strftime('%Y-%m-%d', time.localtime(time1))
print(time_str)
```

##几个例子

获取小时：
```python
import datetime as dt
hours = [dt.time(i).strftime('%H:%M') for i in range(24)]

print(hours)
```


时间相减：
```python
import time
import datetime


def String2Time(s):
    return time.strptime(s, "%Y-%m-%d %H:%M:%S")


def dateMinDate(d1, d2):
    d1 = String2Time(d1)
    d2 = String2Time(d2)
    # 这里的*号表示将time.struct_time类型转换成datetime.datetime
    delta = datetime.datetime(*d1[:6]) - datetime.datetime(*d2[:6])
    print(delta)


if __name__ == "__main__":
    dateMinDate("2012-06-26 15:20:00", "2012-06-26 15:10:00")

```


时间间隔：
```python
import datetime
date1 = '2011-05-03'
date2 = '2011-05-10'
datelist = []

start = datetime.datetime.strptime(date1, '%Y-%m-%d')
end = datetime.datetime.strptime(date2, '%Y-%m-%d')
step = datetime.timedelta(days=1)

while start <= end:
    days = start.strftime("%Y-%m-%d")  # 此处要加入这一句
    datelist.append(days)
    start += step

print(datelist)
```


计算多久之前：
```python
import datetime
import sys
if sys.version_info[0] >= 3:
    unicode = str


def timebefore(d):
    chunks = (
        (60 * 60 * 24 * 365, u'年'),
        (60 * 60 * 24 * 30, u'月'),
        (60 * 60 * 24 * 7, u'周'),
        (60 * 60 * 24, u'天'),
        (60 * 60, u'小时'),
        (60, u'分钟'),
    )
    # 如果不是datetime类型转换后与datetime比较
    if not isinstance(d, datetime.datetime):
        d = datetime.datetime(d.year, d.month, d.day)
    now = datetime.datetime.now()
    delta = now - d
    # 忽略毫秒
    before = delta.days * 24 * 60 * 60 + delta.seconds  # python2.7直接调用 delta.total_seconds()
    # 刚刚过去的1分钟
    if before <= 60:
        return u'刚刚'
    for seconds, unit in chunks:
        count = before // seconds
        if count != 0:
            break
    return unicode(count) + unit + u"前"


d = datetime.datetime.fromtimestamp(1571500800)
print(timebefore(d))

```
