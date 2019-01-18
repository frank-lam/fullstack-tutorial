# Git 命令速查

> 本文参考极客时间苏玲老师的《玩转Git三剑客》



## 添加配置
```bash
git config [--local | --global | --system] user.name 'Your name'
git config [--local | --global | --system] user.email 'Your email'
```





## 查看配置

```bash
git config --list [--local | --global | --system]
```
### 区别
```bash
local：区域为本仓库
global: 当前用户的所有仓库
system: 本系统的所有用户
```


## `git add .` 和 `git add -u`区别

```bash
git add . ：将工作空间新增和被修改的文件添加的暂存区
git add -u :将工作空间被修改和被删除的文件添加到暂存区(不包含没有纳入Git管理的新增文件)
```



## 创建仓库

```bash
git init [project folder name]  初始化 git 仓库
git add [fileName]  把文件从工作目录添加到暂存区
git commit -m'some information'  用于提交暂存区的文件
git commit -am'Some information' 用于提交跟踪过的文件
git log  查看历史
git status  查看状态
```

**额外**    
git add -u 可以添加所有已经被 git 控制的文件到暂存区
以前删除文件夹只会用 「-rf」，今天学到了 「-r」，并得知它们两个区别：「-r」 有时候会提示是否确认删除。    



## 给文件重命名的简便方法

```bash
git  mv  [old file name]  [new file name]
git commit -m 'some information'
```



## 通过`git log`查看版本演变历史

```bash
git log --all 查看所有分支的历史
git log --all --graph 查看图形化的 log 地址
git log --oneline 查看单行的简洁历史。
git log --oneline -n4 查看最近的4条简洁历史。
git log --oneline --all -n4 --graph 查看所有分支最近4条单行的图形化历史。
git help --web log 跳转到git log 的帮助文档网页
```

```bash
git branch -v 查看本地有多少分支
```



## 通过图形界面工具来查看版本历史

```bash
gitk
```



## 探密`.git`目录

查看`.git`文件夹下的内容：    
```bash
ls .git/ -al
```
如下:   
```shell
drwxr-xr-x 1 Andy 197609   0 12月 17 22:38 ./
drwxr-xr-x 1 Andy 197609   0 12月 17 21:50 ../
-rw-r--r-- 1 Andy 197609   7 12月 17 22:38 COMMIT_EDITMSG
-rw-r--r-- 1 Andy 197609 301 12月 12 22:55 config
-rw-r--r-- 1 Andy 197609  73 12月 12 22:55 description
-rw-r--r-- 1 Andy 197609  96 12月 19 00:00 FETCH_HEAD
-rw-r--r-- 1 Andy 197609  23 12月 12 22:55 HEAD
drwxr-xr-x 1 Andy 197609   0 12月 12 22:55 hooks/
-rw-r--r-- 1 Andy 197609 249 12月 17 22:38 index
drwxr-xr-x 1 Andy 197609   0 12月 12 22:55 info/
drwxr-xr-x 1 Andy 197609   0 12月 12 22:55 logs/
drwxr-xr-x 1 Andy 197609   0 12月 17 22:38 objects/
-rw-r--r-- 1 Andy 197609 114 12月 12 22:55 packed-refs
drwxr-xr-x 1 Andy 197609   0 12月 12 22:55 refs/
```

```bash
cat命令主要用来查看文件内容，创建文件，文件合并，追加文件内容等功能。
cat HEAD 查看HEAD文件的内容
git cat-file 命令 显示版本库对象的内容、类型及大小信息。
git cat-file -t b44dd71d62a5a8ed3 显示版本库对象的类型
git cat-file -s b44dd71d62a5a8ed3 显示版本库对象的大小
git cat-file -p b44dd71d62a5a8ed3 显示版本库对象的内容
```

`.git`里几个常用的如下：    
```bash
HEAD：指向当前的工作路径
config：存放本地仓库（local）相关的配置信息。
refs/heads: 存放分支
refs/heads/master/: 指向master分支最后一次commit
refs/tags: 存放tag，又叫里程牌 （当这次commit是具有里程碑意义的 比如项目1.0的时候 就可以打tag）
objects：核心文件，存储文件
```
.git/objects/ 存放所有的 git 对象，对象哈希值前 2 位作为文件夹名称，后 38 位作为对象文件名, 可通过 git cat-file -p 命令，拼接文件夹名称+文件名查看。    

## `commit`、`tree`和`blob`三个对象之间的关系
![tree](./images/img1.jpg)     

```bash
commit: 提交时的镜像
tree: 文件夹
blob: 文件
```

**【同学问题】** 每次commit，git 都会将当前项目的所有文件夹及文件快照保存到objects目录，如果项目文件比较大，不断迭代，commit无数次后，objects目录中文件大小是不是会变得无限大？    
**【老师解答】** Git对于内容相同的文件只会存一个blob，不同的commit的区别是commit、tree和有差异的blob，多数未变更的文件对应的blob都是相同的，这么设计对于版本管理系统来说可以省很多存储空间。其次，Git还有增量存储的机制，我估计是对于差异很小的blob设计的吧。    



## `分离头指针`情况下的注意事项

detached HEAD   



## 进一步理解`HEAD`和`branch`

```bash
git checkout -b new_branch [具体分支 或 commit] 创建新分支并切换到新分支
git diff HEAD HEAD~1 比较最近两次提交
git diff HEAD HEAD~2 比较最近和倒数第三次提交
git diff HEAD HEAD^  比较最近两次提交
git diff HEAD HEAD^^ 比较最近和倒数第三次提交
```



## 怎么删除不需要的分支？

查看分支：   
```bash
git branch -av
```
删除分支命令：    
```bash
git branch -d [branch name]  删除
git branch -D [branch name]  强制删除
```



## 怎么修改最新 commit 的 message？

```bash
git commit --amend  对最近一次的commit信息进行修改
```



## 怎么修改老旧 commit 的 message？

```bash
git rebase -i [要更改的commit的上一级commit]
```
接下来就是一个交互过程...    
这期间会产生一个detached HEAD，然后将改好的commit指向该detached HEAD，如下图所示：    
![rebase](./images/img2.jpg)    

**git rebase工作的过程中，就是用了分离头指针。rebase意味着基于新base的commit来变更部分commits。它处理的时候，把HEAD指向base的commit，此时如果该commit没有对应branch，就处于分离头指针的状态，然后重新一个一个生成新的commit，当rebase创建完最后一个commit后，结束分离头状态，Git让变完基的分支名指向HEAD。**    



## 怎样把连续的多个commit整理成1个？

```bash
git rebase -i [要更改的commit的上一级commit]
```
```bash
$ git log --graph
* commit 7d3386842a2168ae630b65f687364243139c893c (HEAD -> master, origin/master, origin/HEAD)
| Author: aimuch <liuvay@gmail.com>
| Date:   Thu Dec 20 23:34:18 2018 +0800
|
|     update
|
* commit 9eb3188bbc63cae1bfed5f9dfc1593019e360a6a
| Author: aimuch <liuvay@gmail.com>
| Date:   Wed Dec 19 20:30:14 2018 +0800
|
|     update
|
* commit bbe6d53e2b477f2d2aa402af7f315ecdfc63459e
| Author: aimuch <liuvay@gmail.com>
| Date:   Wed Dec 19 20:12:29 2018 +0800
|
|     update
|
* commit 7735d66ded7f98adeca93d96fb7be12ffb67c76a
| Author: aimuch <liuvay@gmail.com>
| Date:   Wed Dec 19 00:27:00 2018 +0800
|
|     update
|
* commit d9f9d115fab425b5654f8ccfec6a996aef35b76b
| Author: aimuch <liuvay@gmail.com>
| Date:   Wed Dec 19 00:23:36 2018 +0800
|
|     update

```
```bash
pick   7735d66 update #合并到该commit上
squash bbe6d53 update
squash 9eb3188 update
squash 7d33868 update
# Rebase d9f9d11..7d33868 onto d9f9d11 (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
```

```bash
# This is a combination of 4 commits.
# This is the 1st commit message:

update

# This is the commit message #2:

update

# This is the commit message #3:

update

# This is the commit message #4:

update

```
## git 修改.gitignore后生效
```bash
git rm -r --cached .    #清除缓存
git add .               #重新trace file
git commit -m "update .gitignore" #提交和注释
git push origin master  #可选，如果需要同步到remote上的话
```



## 怎么比较暂存区和HEAD所含文件的差异？

```bash
git diff --cached
```
或者
```bash
git diff --staged
```



## 怎么比较工作区和暂存区所含文件的差异？

```bash
git diff
```
```bash
git diff -- [filename/pathname] #比较具体的文件或者路径
```



## 如何让暂存区恢复成和HEAD的一样？

```bash
git reset HEAD
```
```bash
git reset 有三个参数
--soft 这个只是把 HEAD 指向的 commit 恢复到你指定的 commit，暂存区 工作区不变
--hard 这个是 把 HEAD， 暂存区， 工作区 都修改为 你指定的 commit 的时候的文件状态
--mixed 这个是不加时候的默认参数，把 HEAD，暂存区 修改为 你指定的 commit 的时候的文件状态，工作区保持不变
```



##  如何让工作区的文件恢复为和暂存区一样？

```bash
git checkout -- <file>...
```
**恢复工作区用checkout，恢复暂存区用reset。**   



## 怎样取消暂存区部分文件的更改？

```bash
git reset HEAD -- <file>...
```



## 看看不同提交的指定文件的差异

```bash
git diff commit-id1 commit-id2 -- <file>...
```



## 正确删除文件的方法

```bash
git rm <file>
```



## 开发中临时加塞了紧急任务怎么处理？

```bash
git stash list #查看stash中存放的信息
git stash #将当前工作区内容存放到"堆栈"中
```
```bash
git stash apply #把"堆栈"里面的内容弹出到工作区中，同时"堆栈"中信息还在
```
```bash
git stash pop #把"堆栈"里面的内容弹出到工作区中，同时丢弃"堆栈"中最新的信息
```



## 如何指定不需要Git管理的文件？

```bash
.gitignore
```
**【同学提问】** 如果提交commit后，想再忽略一些已经提交的文件，怎么处理。    
**【老师回答】** The problem is that .gitignore ignores just files that weren't tracked before (by git add). Run git reset name_of_file to unstage the file and keep it. In case you want to also remove given file from the repository (after pushing), use git rm --cached name_of_file.    
把想忽略的文件添加到 .gitignore ；然后通过 git rm -- cached name_of_file 的方式删除掉git仓库里面无需跟踪的文件。    



##  添加远程仓库
```bash
git remote add [shortname] [url]
```



## 配置公私钥

1、 检查是否已存在相应的`ssh key`:    
打开终端, 输入:   

```bash
ls -al ~/.ssh
```
核对列出来的ssh key是否有已存在的，假如你没有看到列出的公私钥对，或是不想再用之前的公私钥对，你可以选择下面的步骤生成新的公私钥对.    

2、生成新的`ssh key`,并添加至`ssh-agent`:    
打开终端, 使用`ssh key`生成命令：
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
**注意** ：后面的邮箱对应相应账号的邮箱，假如是github的账号，且注册账号的邮箱为xxxx@qq.com，则命令行为：`ssh-keygen -t rsa -b 4096 -C "xxxx@qq.com`。    

3、接下来会提示你保存的`ssh key`的名称以及路径。默认路径是(`/Users/you/.ssh/id_rsa`) (`you`为用户个人目录)。这一步很重要，如果你使用默认的，且下一个账号也是使用默认的路径和文件名，那么之前的`ssh key`就会被后来生成的`ssh key`重写，从而导致之前的账号不可用。因此，正确的做法是给它命名，最后以应用名进行命名，因为更容易区分。以下是我个人配的：
```bash
/Users/andy/.ssh/github_rsa 
```

4、接下来会提示设置ssh安全密码。这一步可以使用默认的（即不设置密码），直接按回车即可。倘若想了解更多关于ssh key密码设置的细节，可访问： “Working with SSH key passphrases” 。    

5、 `ssh key`生成后，接下来需要为`ssh key`添加代理，这是为了让请求自动对应相应的账号。网上很多文章写到需要另外配置`config`文件，经本人亲测，其实是不需要的，在生成了`ssh key`后，通过为生成的`ssh key`添加代理即可，为`ssh key`添加代理命令：`ssh-add ~/.ssh/xxx_rsa,xxx_rsa`是你生成的`ssh key`的私钥名。    

6、连接测试    
接下来我们测试是否配置成功，打开终端，输入:    
```bash
ssh -T git@github.com
```



## 怎么快速淘到感兴趣的开源项目？

**UI界面高级搜索**： https://github.com/search/advanced     

**命令高级搜索**：   
```bash
git 最好 学习 资料 in:readme stars:>1000 language:c
```
上述命令的意思是搜索reademe中包含`git、最好、学习、资料`”且`star大于1000`的，用`C语言编写`的仓库。    