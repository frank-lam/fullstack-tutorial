### 一、alias初体验

现在是时候，感受第一次编程经历了！我们将用 alias 命令创建我们自己的命令。但在 开始之前，我们需要展示一个命令行小技巧。可以把多个命令放在同一行上，命令之间 用”;”分开。它像这样工作

```
command1; command2; command3...
```

我们会用到下面的例子：  

```
[me@linuxbox ~]$ cd /usr; ls; cd -
bin  games    kerberos  lib64    local  share  tmp
...
[me@linuxbox ~]$
```

正如我们看到的，我们在一行上联合了三个命令。**首先**更改目录到/usr，**然后**列出目录 内容，**最后**回到原始目录（用命令”cd -“）,结束在开始的地方。

现在，通过 alias 命令 把这一串命令转变为一个命令。

我们要做的第一件事就是为我们的新命令构想一个名字。

比方说”test”。在使用”test”之前，查明是否”test”命令名已经存在系统中，是个很不错 的主意。

为了查清此事，可以使用 type 命令： 

```
[me@linuxbox ~]$ type test
test is a shell builtin
```

哦！”test”名字已经被使用了。试一下”foo”:  

```
[me@linuxbox ~]$ type foo
bash: type: foo: not found
```

太棒了！”foo”还没被占用。创建命令别名：

```
[me@linuxbox ~]$ alias foo='cd /usr; ls; cd -'
```

注意命令结构：

```
alias name='string'
```

在命令”alias”之后，输入“name”，紧接着（没有空格）是一个等号，等号之后是 一串用引号引起的字符串，字符串的内容要赋值给 name。我们定义了别名之后， 这个命令别名可以使用在任何地方。试一下：

```
[me@linuxbox ~]$ foo
bin   games   kerberos  lib64    local   share  tmp
...
[me@linuxbox ~]$
```

我们也可以使用 type 命令来查看我们的别名：

```
[me@linuxbox ~]$ type foo
foo is aliased to `cd /usr; ls ; cd -'
```

删除别名，使用 unalias 命令，像这样：

```
[me@linuxbox ~]$ unalias foo
[me@linuxbox ~]$ type foo
bash: type: foo: not found
```

虽然我们有意避免使用已经存在的命令名来命名我们的别名，但这是常做的事情。通常， 会把一个普遍用到的选项加到一个经常使用的命令后面。例如，之前见到的 ls 命令，会 带有色彩支持：

```
[me@linuxbox ~]$ type ls
ls is aliased to 'ls --color=tty'
```

要查看所有定义在系统环境中的别名，使用不带参数的 alias 命令。下面在 Fedora 系统中 默认定义的别名。试着弄明白，它们是做什么的：

```
[me@linuxbox ~]$ alias
alias l.='ls -d .* --color=tty'
...
```

在命令行中定义别名有点儿小问题。当你的 shell 会话结束时，它们会消失。



### 二、接如何设置永久有效的alias命令



#### 1.打开.bashrc文件

当系统重启之后就会失效，所以要实现永久有效，则需要 修改用户目录下的一个文件 .bashrc  目录为 ~/.bashrc  

```
vim ~/.bashrc
```



#### 2.自定义命令行

alias cls=’clear’这行，并且加一个注释` # User specific aliases and functions `方便我们日后的查阅
修改后如下：

```
#.bashrc
# User specific aliases and functions
alias cls='clear'


# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=
# User specific aliases and functions12345678910111213
```



#### 3.保存退出

```
:wq
```



#### 4.使用命令生效更改

```
source ~/.bashrc
```



#### 5.验证

- 重启后尝试
- 关闭ssh重新连接
- 输入alias可以看到所有的别名

