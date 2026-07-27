---
title: "LINUX理论学习"
---

<!-- truncate -->
网络链接的三种模式：

1.桥接模式，虚拟系统可以和外部系统通讯，但容易造成IP冲突

2.NAT模式，网络地址转换模式，虚拟系统可以和外部系统通讯，不造成IP冲突

3.主机模式：独立的系统

#### 2.虚拟机克隆

1.  直接拷贝一份安装好的虚拟机文件
2.  使用vmware软件
3.  注意科隆时关闭虚拟机linux系统

#### 3.虚拟机的快照

如果在使用虚拟机系统的时候，想回到原先的某一个状态，也就是担心有可能进行误操作造成的系统的异常，需要回到原先某个正常运行的状态，vmware也提供了这样的功能叫做快照管理。

应用实例：

1.  安装好系统以后，先做一个快照A
2.  进入到系统创建一个文件夹，再存一个快照b
3.  回到系统刚刚安装好的状态即快照A

#### 3\. Linux目录结构

1.  Linux的文件系统时采用级层式的树状目录结构
2.  在Linux 中一切皆文件

**目录结构详解**

![img](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/d253f567a574442c98facc4e74aebf66.bmp)

**目录**

**注解**

**介绍**

/bin

常用

是 Binary 的缩写, 这个目录存放着最经常使用的命令；子目录：/usr/bin 和 /usr/local/bin

/sbin

s 就是 Super User 的意思，这里存放的是系统管理员使用的系统管理程序；子目录：/usr/sbin 和 /usr/local/sbin

/home

常用

存放普通用户的主目录，在 Linux 中每个用户都有一个自己的目录，一般该目录名是以用户的账号命名

/root

常用

该目录为系统管理员，也称作超级权限者的用户主目录

/lib

系统开机所需要最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库

/etc

常用

所有的系统管理所需要的配置文件和子目录, 比如安装 mysql 数据库 my.conf

/user

常用

这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似与 windows 下的 program files 目录

/boot

常用

存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件

/proc

这个目录是一个虚拟的目录，它是系统内存的映射，访问这个目录来获取系统信息

/srv

service 缩写，该目录存放一些服务启动之后需要提取的数据

/sys

这是 linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs

/tmp

这个目录是用来存放一些临时文件的

/dev

类似于 windows 的设备管理器，把所有的硬件用文件的形式存储

/media

常用

linux 系统会自动识别一些设备，例如 U 盘、光驱等等，当识别后，linux 会把识别的设备挂载到这个目录下

/mnt

常用

系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将外部的存储挂载在/mnt/上，然后进入该目录就可以查看里的内容了。 (比如共享文件)

/opt

这是给主机额外安装软件所存放的目录(想要安装某个软件，把它的安装软件放在这个目录下)。如想要在虚拟系统上安装 ORACLE 数据库就可以先把其安装文件放在该目录下。默认为空

/user/local

常用

这是另一个给主机额外安装软件所安装的目录(软件安装后的目标目录)。一般是通过编译源码方式安装的程序

/var

常用

这个目录中存放着在不断扩充着的东西，习惯将经常被修改的目录放在这个目录下。包括各种日志文件

/selinux

security-enhanced linux

SELinux 是一种安全子系统,它能控制程序只能访问特定文件, 有三种工作模式，可以自行设置. 类似于360，保证系统安全。这个目录看不到，因为没有被启用

#### 4.为什么需要远程登录Linux

说明: 公司开发时候，具体的应用场景是这样的：

1.  linux 服务器是开发小组共享
2.  正式上线的项目是运行在公网
3.  因此程序员需要远程登录到 Linux 进行项目管理或者开发

![img](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/6db4149faa9c4a2f82cce5210927803e.bmp)

**Xshell和Xftp6**

远程登录工具Xshell：  
1.Xshell 是目前最好的远程登录到 Linux 操作的软件，流畅的速度并且完美解决了中文乱码的问题，是目前程序员首选的软件。  
2.Xshell 是一个强大的安全终端模拟软件，它支持 SSH1, SSH2, 以及 Microsoft Windows 平台的 TELNET 协议。  
3.Xshell 可以在 Windows 界面下用来访问远端不同系统下的服务器，从而比较好的达到远程控制终端的目的。

注意：  
1.使用Xshell之前，需要知道Linux的ip地址  
如何知道ip地址？  
在Linux中，鼠标右击桌面打开终端，输入ifconfig指令，ens33中，就可以知道ip地址了。  
2.要保证本机可以ping通虚拟主机  
在本机DOS命令窗口中输入命令：ping 虚拟主机ip地址

登录Xshell：  
打开Xshell—->添加会话—->主机(虚拟主机ip地址)—->确定  
双击密钥—->选择接受并保存主机密钥(就不用重复接受了)  
远程登陆成功

远程上传下载文件Xftp：  
是一个基于 windows 平台的功能强大的 SFTP、FTP 文件传输软件。  
使用了 Xftp 以后，windows 用户能安全地在 UNIX/Linux 和 Windows PC 之间传输文件

```
操作同上
注意：xftp打开时乱码：属性--->选项--->UTF-8编码
```

#### 5\. vi 和 vim 的基本介绍

**Linux 系统会内置 vi 文本编辑器**

​ Vim可以看作是Vi的增强版本，Vim 具有程序编辑的能力，可以主动的以字体颜色辨别语法的正确性，方便程序设计。代码补完、编译及错误跳转等方便编程的功能特别丰富。

**vi 和 vim 常用的三种模式**

1.  正常模式： 以 vim 打开一个档案就直接进入一般模式了(这是默认的模式)。 在这个模式中，你可以使用『上下左右』按键来移动光标， 可以使用『删除字符』或『删除整行』来处理档案内容， 也可以使用『复制、粘贴』来处理你的文件数据。
2.  插入模式 按下 i, I, o, O, a, A, r, R 等任何一个字母之后才会进入编辑模式, 一般来说按 i 即可. 可以写东西了。
3.  命令行模式 在这个模式当中，可以提供你相关指令，完成读取、存盘、替换、离开 vim，显示行号等动作。

**例子：**

```tcl
案例：使用 vim 开发一个 Hello.java 程序
使用xshell登录编写(因为以后工作都是这样写的)：
	首先输入：vi Hello.java 或者 vim Hello.java (使用vim编辑器编写java程序)
	回车后进入正常模式
	之后输入i等字母，进入插入模式(编辑模式)
	然后可是写代码：
		public class Hello{
			public static void main(String[] args){
				System.out.println("Hello World");
			}
		}
	然后保存，怎么保存？
		先 按 Esc 回到正常模式
		然后输入冒号:  接着输入wq (代表写入并退出write quit)
		回车
	结束
	输入ls命令，就可以看到Hello.java文件
	还想修该文件：再输入 vim Hello.java (按Tab键 代码补全) 就有回到了上面
```

![img](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/138b0786b5ae48c8a5d0fdbc2c712419.bmp)

**vi 和 vim 快捷键**

快捷键

模式

介绍

yy

正常模式

复制当前行

p

正常模式

粘贴

5yy

正常模式

复制当前行向下的5行

dd

正常模式

删除当前行

5dd

正常模式

删除当前行向下的5行

```tcl
在文件中查找某个单词：
	初始在正常模式，输入/，进入命令行模式，然后输入要查找的单词，回车查找
	输入n查找到下一个
	想查找另一个单词：输入/，重复上述即可
正常模式--->命令行模式
给文件每行设置行号：
	先冒号: 
	然后set nu  (set number)
	回车
取消行号：
	先冒号:
	然后set nonu
	回车
快捷键到该文档的最首行(正常模式)：gg
快捷键到该文档的最末行(正常模式)：G
撤销动作(比如删除某一行，发现删错了，然后恢复这一行)(正常模式)：u
在某个文件中，想让光标移动到第20行(正常模式)：输入20，再输入 shift+g
更多的快捷键：有整理的文档和下图
```

**关机和重启命令**

命令

介绍

`shutdown -h now`

立即关机(h—>halt停止)

`halt`

立即关机，同上

`shutdown`

1分钟后关机

`shutdown -h 1`

同上，给每一个登录到Linux系统的用户发一条消息：1分钟后关机

`shutdown -h 2`

2分钟后关机

`shutdonw -r now`

现在重新启动(r—>rboot重启)

`reboot`

现在重新启动，同上

`sync`

把内存的数据同步到磁盘

注意

不管是重启还是关机，首先要运行 sync 命令，把内存中的数据写到磁盘中；目前的 `shutdown/reboot/halt` 等命令均已经在关机前进行了sync，但还是手动执行一下sync保险

**用户登录和注销**

**用户登录：**  
登录时尽量少用 root 帐号登录，因为它是系统管理员，最大的权限，避免操作失误。  
而且以后也用不到root，除非你是系统管理员。  
可以利用普通用户登录，登录后再用”su - 用户名’命令来切换成系统管理员身份.

**注销：**  
在提示符下输入 logout 即可注销用户

注意：logout 注销指令在图形运行级别无效，在运行级别 3 下有效.  
运行级别后面讲。

**验证：**  
使用普通用户登录  
使用Xshell远程登陆Linux  
输入命令：su - root 变为root用户  
再输入：logout 注销用户回到普通用户  
再输入：logout 退出系统

**注意：**退出系统后，如何要重新连接到Linux，双击左栏会话再重新输入即可。

#### 6.Linux 实操篇

1.  **介绍**

Linux 系统是一个多用户多任务的操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。

一个Linux系统中只有一个root用户，但是由root用户可以创建多个其他用户，可以给这些用户分配权限，  
其中每个用户会对应一个目录，这个目录叫做家目录。

1.  **添加用户**

语法：**useradd 用户名**  
比如：useradd milan 注册新用户milan

注意：当创建用户成功后，会自动创建和用户同名的家目录，该用户的家目录默认在home目录下

也可以给新用户指定家目录：**useradd -d 指定目录 新用户名**  
比如：**useradd -d /home/test king 创建一个新用户king，其家目录test**

1.  **指定修改密码**

语法：**passwd 用户名** 给某个用户设置/更改密码

注意：要写用户名。不写用户名默认设置当前用户，如果当前用户是root就麻烦了。

比如：给milan设置密码

命令：pwd —->显示当前用户所在目录 Print Working Directory

1.  **删除账户**

语法： **userdel 用户名**

普通用户不能删除别的用户，只有root用户可以；并且不能自己删除自己

-   删掉用户，但是保留其家目录： userdel 用户名
    
-   将用户和其家目录一起删除(这个操作要谨慎)： user -r 用户名
    

​ 一般情况，建议保留家目录(不删除)

1.  **查询用户信息**

**语法：id 用户名**  
id root:  
`uid=0(root) gid=0(root) 组=0(root) userid是0 gruopid组id是0 所在组0`

当用户不存在：返回无此用户 no such user

1.  **切换用户**

在操作 Linux 中，如果当前用户的权限不够，可以通过 su - 指令，切换到高权限用户(比如 root)

语法： **su - 切换用户名**

注意：

-   从权限高的用户切换到权限低的用户，不需要输入密码，反之需要。
-   当需要返回到原来用户时，使用 exit/logout 指令

1.  **查看当前用户**

**语法：who am i 或者 who am I**  
`who am i --->第一个登录该系统的用户信息`

假设A用户登录系统，切换到B用户，B输入命令who am i，输出的还是A用户的信息

1.  **用户组**

介绍：类似于角色，系统可以对有共性/有相同的权限的多个用户进行统一的管理

**新增组：groupadd 组名**

介绍：类似于角色，系统可以对有共性/有相同的权限的多个用户进行统一的管理  
**新增组：groupadd 组名**  
例子：增加一个用户zwj，把他直接放到组wudang中  
命令：  
**`groupadd wudang`**  
**`useradd -g wudang zwj`**  
`id zwj：uid=1001(zwj) gid=1001(wudang) 组=1001(wudang)`  
修改用户的组：**usermod -g 用户组 用户名**  
例子：把zwj 放到组 mojiao 中  
命令：  
`groupadd mojiao`  
`usermod -g mojiao zwj`  
`id zwj：uid=1001(zwj) gid=1002(mojiao) 组=1002(mojiao)`  
新增一个用户john，怎么把john放进组mojiao中？  
`useradd jhon`  
`usermod -g mojiao jhon`  
新增一个用户john，john在以自己的名字命名的组john中，从john组到mojiao组  
**删除组：groupdel 组名**

1.  **用户和组的相关文件**

(1)`/etc/passwd` 文件  
每增加一个用户，就会把用户的信息保存到该文件。  
用户（user）的配置文件，记录用户的各种信息  
每行都是一个用户，每行的含义：用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell

主目录：用户所在的家目录

shell：命令解释程序  
将发布的指令通过shell解析，再传给Linux内核  
Linux是看不懂发布的指令的  
shell有很多种，中国一般用的是bash

命令：`vim /etc/passwd` 可以查看该文件(还有其他命令)

(2)/etc/shadow 文件  
口令的配置文件  
每行的含义：登录名:加密口令:最后一次修改时间:最小时间间隔:最大时间间隔:警告时间:不活动时间:失效时间:标志

(3)`/etc/group` 文件  
组(group)的配置文件，记录 Linux 包含的组的信息每行含义：组名:口令:组标识号:组内用户列表

#### 7.Linux 实操篇-实用指令

1.  运行级别

Linux系统运行级别：  
0：关机  
1：单用户【可以找回丢失密码】  
2：多用户状态没有网络服务(一般不用，没网络)  
3：多用户状态有网络服务  
4：系统未使用保留给用户  
5：图形界面  
6：系统重启  
常用运行级别是 3 和 5

切换运行级别命令：init 选0-6

指定默认运行级别：  
CentOS7之前是在文件`/etc/inittab`文件中设置  
CentOS7之后对设置进行了简化：  
用 `multi-user.target` 代表3运行级别  
用 `graphical.target` 代表5运行级别  
7版本之后主要用3和5运行级别。

用命令：`systemctl get-default` 查看当前系统运行级别  
用命令：`systemctl set-default multi-user.target /graphical.target` 设置默认运行级别

1.  **帮助指令**

**语法：man 命令或配置文件**  
是manual的简写，manual是手册的意思

功能：获得帮助信息  
例子：查看ls命令的帮助信息

输入 man ls 之后，会看到ls的具体信息(要回到前一个页面，输入q)  
注意：可能不止一页，使用空格或下键，可以往下看

ls命令：列出目录内容  
格式：`ls [选项] [文件名...]`  
`ls -a` —->列出所有文件，包括隐藏文件(隐藏文件以 . 开头)  
`ls -l` —->单列输出

选项以 - 开始  
选项可以组合使用，没有顺序：  
比如： ls -al 也可以 ls -a -l 表示列出所有的文件 并 单列输出

ls默认是对当前目录下的文件  
也可以指定某个目录：

如： `ls -al /root` 把root目录下的所有文件单列输出

语法：help 命令  
功能：获得 shell 内置命令的帮助信息  
例子：查看 cd 命令的帮助信息`help cd`

语法：man \[命令或配置文件\]  
功能：获得帮助信息  
例子：查看ls命令的帮助信息`man ls`

1.  **文件目录指令**

```plaintext
基本语法：pwd    (print working directory)
功能：显示当前目录的绝对路径
---------------------------------------------------------------------

基本语法：ls [选项] [目录或是文件]
常用选项：
	-a：显示当前目录所有的文件和目录，包括隐藏的。
	-l：以列表的方式显示信息
---------------------------------------------------------------------

基本语法：cd [参数]	
功能：切换到指定目录

cd ~ 或者 cd --->回到当前用户的家目录 
cd ..   --->回到当前目录的上一级目录

案例 1：使用绝对路径切换到 root 目录
	cd /root
	
案例 2：使用相对路径到 root 目录
	比如当前在 /home/tom 
		cd ../../root    ../..回到了根目录,再/root
		
---------------------------------------------------------------------

基本语法：mkdir [选项] 要创建的目录路径
功能：创建目录
常用选项：
	-p：创建多级目录

案例1：在home下创建一个目录dog
	mkdir /home/dog
	
案例2：在home下创建多级目录 /home/animal/tiger 
	mkdir -p /home/animal/tiger

---------------------------------------------------------------------

基本语法：rmdir [选项] 要删除的空目录路径
功能：删除一个空目录

案例:删除一个目录 /home/dog
	rmdir /home/dog

注意：
	rmdir 删除的是空目录，如果目录下有内容是无法删除的。
	如果需要删除非空目录，需要使用命令：rm -rf 要删除的目录
	比如： 删除animal目录
		rm -rf /home/animal
---------------------------------------------------------------------

基本语法：touch 文件名称
功能：创建空文件

案例:：在/home 目录下，创建一个空文件 hello.txt
	touch /home/hello.txt
	或者当前目录是home：touch hello.text

---------------------------------------------------------------------

基本语法：cp [选项] 被拷贝的文件 拷贝到哪个地方
功能：拷贝文件到指定目录
常用选项：
	-r：递归复制整个文件夹

案例1：将 /home/hello.txt  拷贝到	/home/bbb  目录下
	若在根目录下操作：
	先创建 bbb目录
		mkdir /home/bbb
	然后复制
		cp /home/hello.txt /home/bbb
	
案例2：递归复制整个文件夹，比如将 /home/bbb 整个目录，拷贝到 /opt 
	cp -r /home/bbb /opt

注意：强制覆盖不提示的方法：\cp	
	\cp -r /home/bbb /opt

---------------------------------------------------------------------

基本语法：rm	[选项] 要删除的文件或目录
功能：移除文件或目录
常用选项：
	-r：递归删除整个文件夹
	-f：强制删除不提示

案例1：将 /home/hello.txt 删除 
	rm	/home/hello.txt
	
案例2：递归删除整个文件夹 /home/bbb ，并不提示
	rm -rf /home/bbb 
	
注意：强制删除不提示的方法：带上 -f 参数即可
---------------------------------------------------------------------

功能：移动文件与目录或重命名
基本语法：
	mv	原文件名 新文件名 	     (功能描述：重命名)
	mv  被移动的文件 移动到哪   (功能描述：移动文件)

案例 1: 将 /home/cat.txt 文件 重新命名为 pig.txt
	[root@hspEdu01 ~]# cd /home
	[root@hspEdu01 home]# touch cat.txt
	[root@hspEdu01 home]# ls
	cat.txt  jack  king  milan  zwj
	[root@hspEdu01 home]# mv cat.txt pig.txt
	[root@hspEdu01 home]# ls
	jack  king  milan  pig.txt  zwj

案例 2:将 /home/pig.txt	文件 移动到 /root 目录下
	[root@hspEdu01 home]# mv pig.txt /root
	[root@hspEdu01 home]# ls
	jack  king  milan  zwj
	[root@hspEdu01 home]# cd /root
	[root@hspEdu01 ~]# ls	
	Hello.java  pig.txt 

移动并重名：mv pig.txt /root/cow.txt

案例 3: 移动整个目录,比如将 /opt/bbb  移动到 /home 下
	 mv /opt/bbb /home/

---------------------------------------------------------------------
前面学过一个查看：vim
cat也可以查看，cat只能查看不能修改，cat更安全。

基本语法：cat	[选项] 要查看的文件
功能：查看文件内容
常用选项：
	-n：显示行号

案例1：查看 /etc/profile 文件内容，并显示行号。
	cat	-n /etc/profile 
注意：
	cat 只能浏览文件，而不能修改文件；为了浏览方便再加上管道命令 | more 
	管道命令：把前面的结果再交给下一个指令进行处理。
		语法：| 其他指令
		
	cat	-n /etc/profile | more 
		意思：先执行cat -n /etc/profile 然后，按回车键输出一行，按空格翻页等。

---------------------------------------------------------------------

基本语法：more 要查看的文件
功能：
more 指令是一个基于 VI 编辑器的文本过滤器，它以全屏幕的方式按页显示文本文件的内容。
more 指令中内置了若干快捷键(交互的指令)，详见操作说明：
```

![img](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/567c27b6513c4c8f948226bc232b38dc.bmp)

```plaintext
基本语法：less 要查看的文件
功能：
less 指令用来分屏查看文件内容，它的功能与 more 指令类似，但是比 more 指令更加强大，支持各种显示终端。
less 指令在显示文件内容时，并不是一次将整个文件加载之后才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率。

有一个文件是100M，用vim查看会将其全部加载再显示出来，这样会很慢。
使用less，会先加载一部分显示出来，再根据指令显示剩下的，这样更快。

所以要查找一些大的文件，建议用less。
案例: 采用 less 查看一个大文件文件 /opt/杂文.txt
首先使用xftp将杂文.txt传输到opt下
然后输入指令：less /opt/杂文.txt  

下面操作中：
	想要找某个字或词
	输入：/要找的字或词    然后按n向下找  按N向上找
操作说明：
```

## 第七章 Linux 实操-开机、重启和用户注销

### 7.1 关机&重启命令

-   `shutdown` -h now 立刻进行关机
-   shutdown -h 1 “hello,1分钟后就会关机了”
-   shutdown -r now 现在重新启动计算机
-   halt 关机
-   reboot 现在重新启动计算机
-   sync 把内存的数据同步到磁盘上

注意：不管重启系统还是关闭系统，首先要运行sync命令，把内存的数据写到磁盘中

其中`shutdown/reboot/halt` 等命令均已在关机前进行了sync

### 7.2 用户登录和注销

1.  `su -用户名`用来切换成管理员身份和用户身份
2.  `logout` 立即注销用户

注意：`logout`注销命令在图形运行级别无效，在运行级别3以下有效

## 第八章 LINUX实操篇-用户管理

### 8.1 基本介绍

![image-20221019090240881](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019090240881.png)

### 8.2 添加用户

#### 8.2.1 基本语法

`useradd` 用户名

-   细节:当创建用户完成后，会自动创建和用户同名的家目录
-   也可以通过useradd -d 指定目录 新的用户名 ，给新创建的用户指定家目录

### 8.3 指定修改密码

`passwd` 用户名 例子： passwd milan 给米蓝 指定密码

### 8.4 删除用户

`userdel` 用户名

-   userdel milan 删除用户但是保留家目录
-   删除用户及用户的主目录：userdel -r tom

### 8.5 查询用户信息指令

id 用户名 例如 # id root 查询root的信息

细节：当用户不存在是，返回无此用户

### 8.6 切换用户

su 切换用户名

-   从权限高的用户切换到权限低的用户，不需要输入密码反之需要
-   当需要返回到原来用户的桌面是，使用exit/logout 指令

### 8.7 查看当前用户/登录用户

`whoami/ who an i`

### 8.8 用户组

`groupadd` 组名

删除组：`gropudel` 组名

-   增加用户时直接加入组
-   useradd -g 用户组 用户名
-   增加一个用户 zwj 直接指定他的组为 wudang
-   groupadd wudang useradd -g wudang zwj

修改用户的组

```plaintext

### 8.9 用户和组的相关文件

`/etc/passwd` 文件 每行的含义 :用户名：口令：用户标识符：注释性描述：主目录：登录Shell

`/etc/shadow` 文件 每行的含义：登录名：加密口令：最后一次修改的时间：最小时间间隔：最大时间间隔：不活动时间：失效时间：标志

`/etc/group` 文件  每行的含义:组名：组标识号：组内用户列表

## 第九章 LINUX实操篇-实用指令

0：关机

1：单用户【可以找回丢失密码】

2：多用户状态没有网络服务(一般不用，没网络) 

3：多用户状态有网络服务 

4：系统未使用保留给用户 

5：图形界面 

6：系统重启

常用运行级别是 3 和 5  切换运行级别命令：init  * (选则0-6的一个)

CentOS7之前是在文件/etc/inittab文件中设置在其之后设置进行了简化：

`multi-user.target:analogous to runlevel 3`

`graphical.target:analogous to runlevel 5`

`systemctl get-default` 查看当前系统运行级别

`systemctl set-default multi-user.target /graphical.target`  设置默认运行级别

**找回用户密码**

1. 再开机启动进入开机界面按'e'进入编辑界面然后
2. 找到以 LINXU16开头的行 在最后输入的`init=/bin/sh`
3. 输入完成后按`Ctrl+x`进入单用户模式
4. 接着在光标闪烁的位置中输入 : `mount -o remount,rw /` 每个单词间有空格 完成后回车
5. 在新的一行最后输入: passwd  完成修改 再次输入密码
6. 接着在鼠标闪烁的最后一行中输入:`touch /.autorelable`  (注意touch与/后有一个空格)完成后回车
7. 接着在输入 `exec /sbin/init` 完成后回车等待系统重启

**帮助指令**

man 【命令或配置文件】

例如 输入 `man ls` 之后，会看到ls的具体信息(要回到前一个页面，输入q)

ls   （列出目录内容）

指令：ls [选项] [文件名...]

​            ls  -a  --->列出所有文件，包括隐藏文件(隐藏文件以 . 开头)

​			ls  -l  --->单列输出 

可以以 -开始使用组合，没有顺序

例如： `ls -al`  或者 `ls -a -l`  ：表示列出所有的文件并单列输出

​			`ls -al /root`  ：把root目录下的所有文件单列输出

`help` 命令：获得 shell 内置命令的帮助信息

 **关于文件目录的指令**

`pwd    (print working directory)` ：显示当前目录的绝对路径

基本语法：`ls  [选项] [目录或是文件]`

常用选项：`-a：显示当前目录所有的文件和目录，包括隐藏的。`

​					`-l：以列表的方式显示信息`

基本语法：`cd [参数]`	  ：切换到指定目录

​					`cd ~ 或者 cd` ：回到当前用户的家目录 

​					`cd ..`  ：回到当前目录的上一级目录

​					`cd /root`：使用绝对路径切换到 root 目录

基本语法：`mkdir [选项] 要创建的目录路径` ：创建目录

​					`madir -p 要创建的目录路径` :   创建多级目录

例如： `mkdir /home/dog` ：在home下创建一个目录dog

​			`mkdir -p /home/animal/tiger`  ：在home下创建多级目录 /home/animal/tiger 

基本语法：`rmdir [选项] 要删除的空目录路径`  ：删除一个空目录

注意： rmdir 删除的是空目录，如果目录下有内容是无法删除的。 如果需要删除非空目录，需要使用命令：rm -rf 要删除的目录

例如：`rm -rf /home/animal` ：删除animal目录

基本语法：`touch 文件名称 ` ：创建空文件

例如; `touch /home/hello.txt`  :在/home 目录下，创建一个空文件 hello.txt

基本语法：`cp [选项] 被拷贝的文件 拷贝到哪个地方 ` :拷贝文件到指定目录

​	选项		-r：递归复制整个文件夹

 例如：`cp /home/hello.txt /home/bbb` ：将 /home/hello.txt  拷贝到/home/bbb  目录下

​			`cp -r /home/bbb /opt `：递归复制整个文件夹，比如将 /home/bbb 整个目录，拷贝到 /opt 

​			`\cp -r /home/bbb /opt` ：强制覆盖不提示的方法：\cp	

基本语法：`rm	[选项] 要删除的文件或目录` ：移除文件或目录

常用选项：-r：递归删除整个文件夹

​					-f：强制删除不提示

例如： `rm -rf /home/bbb`  ：递归删除整个文件夹 /home/bbb ，并不提示

注意：强制删除不提示的方法：带上 -f 参数即可

```shell
基本语法：
	mv	原文件名 新文件名 	     (功能描述：重命名)
	mv  被移动的文件 移动到哪   (功能描述：移动文件)
案例 :将 /home/cat.txt 文件 重新命名为 pig.txt
	[root@hspEdu01 ~]# cd /home
	[root@hspEdu01 home]# touch cat.txt
	[root@hspEdu01 home]# ls
	cat.txt  jack  king  milan  zwj
	[root@hspEdu01 home]# mv cat.txt pig.txt
	[root@hspEdu01 home]# ls
	jack  king  milan  pig.txt  zwj
案例 2:将 /home/pig.txt	文件 移动到 /root 目录下
	[root@hspEdu01 home]# mv pig.txt /root
	[root@hspEdu01 home]# ls
	jack  king  milan  zwj
	[root@hspEdu01 home]# cd /root
	[root@hspEdu01 ~]# ls	
	Hello.java  pig.txt 
移动并重名：mv pig.txt /root/cow.txt
案例 3: 移动整个目录,比如将 /opt/bbb  移动到 /home 下
	 mv /opt/bbb /home/
```

```shell
vim 和 cat 都可以查看但是：cat只能查看不能修改，cat更安全。
基本语法：
cat	[选项] 要查看的文件
功能：查看文件内容
常用选项：
	-n：显示行号
案例1：查看 /etc/profile 文件内容，并显示行号。
		cat	-n /etc/profile
注意：        
cat 只能浏览文件，而不能修改文件；为了浏览方便再加上管道命令 | more 
管道命令：把前面的结果再交给下一个指令进行处理。
	语法：| 其他指令		
		
cat	-n /etc/profile | more 
意思：先执行cat -n /etc/profile 然后，按回车键输出一行，按空格翻页等。
基本语法：more 要查看的文件
功能:
more 指令是一个基于 VI 编辑器的文本过滤器，它以全屏幕的方式按页显示文本文件的内容。
more 指令中内置了若干快捷键(交互的指令)，详见操作说明：
```

![image-20221019100037822](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019100037822.png)

```shell
#基本语法：less 要查看的文件
#功能：
#less 指令用来分屏查看文件内容，它的功能与 more 指令类似，但是比 more 指令更加强大，支持各种显示终端。
#less 指令在显示文件内容时，并不是一次将整个文件加载之后才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率。
#有一个文件是100M，用vim查看会将其全部加载再显示出来，这样会很慢。
#使用less，会先加载一部分显示出来，再根据指令显示剩下的，这样更快。
#所以要查找一些大的文件，建议用less。

#案例: 采用 less 查看一个大文件文件 /opt/杂文.txt
#输入指令：
less /opt/杂文.txt  
#下面操作中：
#	想要找某个字或词
#	输入：/要找的字或词    然后按n向下找  按N向上找
```

操作说明：

![image-20221019100348211](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019100348211.png)

```shell
基本语法：echo [选项]	[输出内容]
#功能：输出内容到控制台
#案例: 使用 echo  指令输出环境变量
	echo $HOSTNAME (环境变量一般加$)
#案例: 使用 echo 指令输出 hello,world!
#	输入：echo hello,world!
		 echo "hello,world!"  #加不加引号都可以
```

```shell
#功能：head 用于显示文件的开头部分内容，默认情况下 head 指令显示文件的前 10 行内容。
基本语法：
head  文件	    #(功能描述：查看文件头 10 行内容)
head -n 5 文件	#(功能描述：查看文件头 5 行内容，5 可以是任意行数)
#案例: 查看/etc/profile 的前面 5 行代码
	head -n 5 /etc/profile
```

```shell
##功能：tail 用于输出文件中尾部的内容，默认情况下 tail 指令显示文件的前 10 行内容。
基本语法：
	tail 文件	    #（功能描述：查看文件尾 10 行内容）
	tail -n 5 文件	#（功能描述：查看文件尾 5 行内容，5 可以是任意行数）
	tail -f	文件	    #（功能描述：实时追踪该文档的所有更新，只要该文件改动了什么内容就可实时看到）
```

```shell
>指令和>>指令：
	> 输出重定向(覆盖)
    >> 追加
基本语法：
	ls -l >文件1	         #(功能描述：将列表的内容写入文件1中(覆盖写))
	ls -al >>文件1        #(功能描述：将列表的内容追加到文件1的末尾)
	cat 文件 1 > 文件 2	  #(功能描述：将文件 1 的内容覆盖到文件 2)
	echo "内容">> 文件1     #(将内容追加到文件1的末尾)
#案例 1: 将 /home 目录下的文件列表 写入到 /home/info.txt 中,覆盖写入。
	ls -l /home > /home/info.txt	#[如果 info.txt 没有，则会自动创建] 
#案例 2: 将当前日历信息 追加到	/home/mycal 文件中
	cal >> /home/mycal
#功能：给原文件创建一个软链接
#	 软链接也称为符号链接，类似于 windows 里的快捷方式，主要存放了链接其他文件的路径
基本语法：
	ln -s [原文件或目录] [软链接名] #（功能描述：给原文件创建一个软链接）
	ln是link
#案例1：在/home 目录下创建一个软连接 myroot，连接到 /root 目录
#(这样 切换到myroot 其实就是切换到root)
	ln -s /root	/home/myroot
#案例2: 删除软连接 myroot 
	rm	/home/myroot
#当我们使用 pwd 指令查看目录时，仍然看到的是软链接所在目录。
```

```shell
#功能：查看已经执行过历史命令,也可以执行历史指令
基本语法：
	history #（功能描述：查看已经执行过历史命令）
#	可以看其他登录的用户做了什么操作。
#案例 1: 显示所有的历史命令
history
#案例 2: 显示最近使用过的 10 个指令。
history 10
#案例 3：执行历史编号为 5 的指令
!5
```

```shell
date指令：
	1.显示当前日期
		基本语法：
			date	  （功能描述：显示当前时间）
			date +%Y  （功能描述：显示当前年份）
			date +%m  （功能描述：显示当前月份）
			date +%d  （功能描述：显示当前是哪一天）
			date "+%Y-%m-%d %H:%M:%S"（功能描述：显示年月日时分秒）
			Y year
			m month
			d day
			H hour
			M minute
			S second
		案例 1: 显示当前时间信息
		date
		案例 2: 显示当前时间年月日
		date "+%Y-%m-%d"
		案例 3: 显示当前时间年月日时分秒
		date "+%Y-%m-%d %H:%M:%S"

	2.设置日期
		基本语法：
			date -s	字符串时间
			
		案例 1: 设置系统当前时间
		date -s "2020-11-03 20:02:10"

cal指令：
	查看日历指令 cal
	
	基本语法：
	cal [选项]	（功能描述：不加选项，显示本月日历）
	
	案例 1: 显示当前日历 
	cal
	案例 2: 显示 2020 年日历 
	cal 2020
```

```shell
find 指令
	#从指定目录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端。
    
    基本语法：
	find [搜索范围] [选项]
```

选项说明：

![image-20221019101315674](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019101315674.png)

```shell
#案例 1: 按文件名：根据名称查找 /home 目录下的 hello.txt 文件
find /home -name hello.txt
#案例 2：按拥有者：查找 /opt 目录下，用户名称为 nobody 的文件
find /opt -user nobody
#案例 3：查找整个 linux 系统下大于 200M 的文件
	+n 大于
    -n 小于
    n 等于
	单位有 k,M,G 
find / -size +200M	
例子：
[root@hspEdu01 opt]# find / -size +200M
/run/media/root/CentOS 7 x86_64/LiveOS/squashfs.img (这个文件大于200M)
[root@hspEdu01 opt]# cd /run/media/root/CentOS\ 7\ x86_64/LiveOS/
[root@hspEdu01 LiveOS]# ls
squashfs.img  TRANS.TBL
[root@hspEdu01 LiveOS]# ls -l
总用量 442741
-rw-r--r--. 1 root root 453365760 11月 26 2018 squashfs.img
-r--r--r--. 1 root root       224 11月 26 2018 TRANS.TBL
[root@hspEdu01 LiveOS]# ls -lh  #(上面的总用量大小看不懂，加上h human 能看懂的内容)
总用量 433M
-rw-r--r--. 1 root root 433M 11月 26 2018 squashfs.img
-r--r--r--. 1 root root  224 11月 26 2018 TRANS.TBL
```

```shell
locate 指令
#	可以快速定位文件路径。
#	利用事先建立的系统中所有文件名称及路径的 locate 数据库实现快速定位给定的文件。
#	Locate 指令无需遍历整个文件系统，查询速度较快。
#	为了保证查询结果的准确度，管理员必须定期更新 locate 时刻
	
	基本语法:
	locate 搜索文件

#	注意：
#	由于 locate 指令基于数据库进行查询，
#	所以第一次运行前，必须使用 updatedb 指令创建 locate 数据库。
#	案例 1: 请使用 locate 指令快速定位 hello.txt 文件所在目录
	updatedb
	locate hello.txt
```

```shell
grep 指令和 管道符号 |  
#	grep指令往往和管道符号 | 结合使用
	grep：过滤查找
	管道符：“|”
#	表示将前一个命令的处理结果输出传递给后面的命令处理。
#	比如：先 cat a.txt，然后又想看a.txt文件中有没有hello这个词
#	那么就 cat a.txt | grep "hello" --->先找到a.txt，然后再在a.txt中找hello

	基本语法：
	grep [选项] 查找内容 源文件
	常用选项：
		-n  显示匹配行及行号
		-i   忽略字母大小写
#	案例 1: 请在 hello.txt 文件中，查找"yes"所在行，并且显示行号
		写法 1: 
        cat /home/hello.txt	| grep "yes"      #引号写不写都行
		cat /home/hello.txt	| grep -n "yes"   # 显示行号    			
		写法 2: 
        grep -n "yes" /home/hello.txt
```

```shell
gzip/gunzip 指令
	gzip    #用于压缩文件
	gunzip  #用于解压的
    基本语法：
	gzip 文件	  #功能描述：压缩文件，只能将文件压缩为*.gz 文件）
	gunzip 文件.gz #（功能描述：解压缩文件命令）
	

##	案例 1: gzip 压缩，将 /home 下的 hello.txt 文件进行压缩
	gzip /home/hello.txt
	
#	案例 2: gunzip 解缩，将 /home 下的 hello.txt.gz 文件进行解压
	gunzip /home/hello.txt.gz
```

```shell
zip/unzip 指令
	zip 用于压缩文件
	unzip 用于解压的 
#	（这个在项目打包发布中很有用的）
		
	基本语法：
	zip	[选项] XXX.zip 将要压缩的内容    #（功能描述：压缩文件和目录的命令）
	unzip [选项] XXX.zip	              #（功能描述：解压文件）
    
    zip 常用选项
		-r：递归压缩，即压缩目录
	
	unzip 的常用选项
		-d&lt;目录> ：指定解压后文件的存放目录

#	案例 1:将 /home 下的所有文件/文件夹压缩成 myhome.zip
	zip -r myhome.zip /home/	#[将 home 目录及其包含的文件和子文件夹都压缩] 
	
#	案例 2:将 myhome.zip 解压到 /opt/tmp 目录下
	mkdir /opt/tmp
	unzip -d /opt/tmp /home/myhome.zip
```

```shell
tar 指令
#	tar 指令是打包指令，最后打包后的文件是 .tar.gz 的文件。
#	把一个或者多个文件（夹）用压缩软件进行压缩的过程，一般可称之为打包。
	
#	tar指令可以压缩也可以解压。
#	根据选项来 压缩还是解压。

	基本语法：
	tar	[选项] XXX.tar.gz 打包的内容	 # (功能描述：打包目录，压缩后的文件格式.tar.gz)
```

![image-20221019102258590](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019102258590.png)

```shell
#案例 1:压缩多个文件，将 /home/pig.txt 和 /home/cat.txt 压缩成 pc.tar.gz 
tar -zcvf pc.tar.gz /home/pig.txt /home/cat.txt
##	使用了选项：-z -c -v -f
#	多个文件就 空格直接写在后面就好了

#案例 2:将 /home 的文件夹压缩成 myhome.tar.gz 
tar -zcvf myhome.tar.gz /home/

#案例 3:将 pc.tar.gz 解压到当前目录
tar -zxvf pc.tar.gz

#案例 4:将 myhome.tar.gz 解压到 /opt/tmp2 目录下	
	mkdir /opt/tmp2 
   tar -zxvf /home/myhome.tar.gz -C /opt/tmp2
#注意：-C 后写要解压到的位置
```

## 第十章 LINXU组管理和权限管理

在 linux 中的每个用户必须属于一个组，不能独立于组外。  
在 linux 中每个文件都有所有者、所在组、其它组的概念。

1) 所有者  
2) 所在组  
3) 其它组  
4) 改变用户所在的组

```shell
一般为文件的创建者，谁创建了该文件，就自然的成为该文件的所有者。
但是所有者也可以更改。

1.查看文件/目录的所有者(在/home下才能看到)
指令：ls –ahl
-ahl是三个选项
	-h human 让输出的结果方便人看(文件的大小容易看)

drwxr-xr-x.  6 root root   4.0K 2月  23 13:59 .
dr-xr-xr-x. 18 root root   4.0K 2月  20 16:45 ..
-rw-r--r--.  1 root root     24 2月  22 21:59 hello.txt
...
第三列就是文件的所有者

2.修改文件/目录所有者指令：chown 新所有者 文件名
案例：
	要求：使用 root 创建一个文件 apple.txt ，然后将其所有者修改成 tom
		  chown tom apple.txt
```

```shell
基本指令:
	groupadd 组名

#案例：创建一个组 monster 
	groupadd monster

#创建一个用户 fox ，并放入到	monster 组中
	useradd -g monster fox
```

```shell
#当某个用户创建了一个文件后，这个文件的所在组就是该用户所在的组(默认)。
#查看文件/目录所在组
	指令:
	ls –ahl  或者ll

#	ll并不是linux下一个基本的命令，它实际上是ls -l的一个别名。
#	Ubuntu默认不支持命令ll，必须用 ls -l，这样使用起来不是很方便。
	
	案例：使用 fox 来创建一个文件，看看该文件属于哪个组?
	使用fox创建一个文件：
		su fox
		然后touch ok.txt
		然后ll
		
	-rw-r--r--. 1 fox monster 0 11 月 5 12:50 ok.txt
#	第三列：文件的所有者(谁创建了这个文件，就是这个文件的所有者)
#	第四列：文件的所在组(某个用户创建了一个文件，该文件所在组=该用户所在组)

#	注意：/etc/group下存放着所有的组
#	使用指令：cat /etc/group 可以查看所有的组
	
#	比如查看有没有mojiao这个组
#	可以使用管道命令和grep过滤
		cat /etc/group | grep mojiao
#	当一个文件很大，想找某个关键词就可以这个过滤！

#修改文件/目录所在的组
	指令：
	chgrp 组名 文件名
	
#	案例：使用 root 用户创建文件 orange.txt ,看看当前这个文件属于哪个组，
#		 然后将这个文件所在组，修改到 fruit 组。
	
		groupadd fruit
		touch orange.txt
#		看看当前这个文件属于哪个组 -> root 组
		chgrp fruit orange.txt
```

```shell
#在添加用户时，可以指定将该用户添加到哪个组中，同样的用 root 的管理权限可以改变某个用户所在的组。

#改变用户所在组
	usermod	–g	新组名	用户名
	usermod	–d	目录名	用户名	 (改变该用户登陆的初始目录)

#特别说明：用户需要有进入到新目录的权限。

#如何查看用户所在的组？
	id 用户名  --->显示用户信息
	
#案例：
#将 zwj 这个用户从原来所在组，修改到 wudang 组
	#先查看zwj在哪个组：
	id zwj
	#然后查看有没有wudang这个组：
	cat /etc/group | grep wudang
	#修改：
	usermod -g wudang zwj
```

**权限的基本介绍**

```shell
ls -l 中显示的内容如下：
-rwxrw-r-- 1 root root 1213 Feb 2 09:39 abc
第一列共10位

0-9 位说明：
	 第 0 位确定文件类型(d, - , l , c , b)
		d 是目录，相当于 windows 的文件夹
		- 代表是普通文件(.txt)
		l 是链接，相当于 windows 的快捷方式
		c 是字符设备文件，比如鼠标，键盘    ---> /dev/目录下可以看到
		b 是块设备，比如硬盘    ---> /dev/目录下可以看到
		
	第 1-3 位确定 该文件的所有者 对该文件的 权限。---User
	第 4-6 位确定 该文件所属的组和该组中的用户 对该文件的 权限。---Group 
	第 7-9 位确定 其他用户(不是所有者，也不是同一组的其他用户) 对该文件的权限 ---Other
```

rwx权限的详解

```shell
权限有三种：
	r 代表可读(read)
	w 代表可写(write)
	x 代表可执行(execute)
	
rwx 作用到文件：
	r: 可以读取,查看
	w: 可以修改,但是不代表可以删除该文件
	   删除一个文件的前提条件是 对该文件所在的目录 有 写权限，才能删除该文件.
	x: 可以被执行,前提是可执行文件

rwx 作用到目录：
	r: 可以读取，可以用 ls 查看目录内容
	w: 可以修改, 可以对目录进行 创建+删除+重命名目录
	x: 可以进入该目录
```

**文件/目录权限的实际案例**

```shell
ls -l 中显示的内容如下：
-rwxrw-r-- 1 root root 1213 Feb 2 09:39 abc

第一列中 10 个字符 确定不同用户能对文件干什么(权限)：
	第一个字符代表文件类型： - l d c b
	其余字符每 3 个一组(rwx) 读(r) 写(w) 执行(x) 
	
	第一组 rwx：文件所有者的权限是 读、写和执行
	第二组 rw-：与文件所有者同一组的用户的权限是 读、写但不能执行
	第三组 r- ：不与文件拥所有者同组的其他用户 的权限是 读不能写和执行

也可以用数字表示对应的权限：
	r=4,w=2,x=1  
	因此 rwx=4+2+1=7 
	数字可以进行组合
	
其它说明：
	第二列：1				如果是普通文件，直接就是1；
							如果是目录，代表该目录下有多少内容(即子目录数+文件数)
							
	第三列：root				该文件/目录的所有者
	第四列：root				该文件/目录的所在组
	第五列：1213				文件大小(这里是字节)
	第六列：Feb 2 09:39		最后修改日期
	第七列：abc				文件名
```

**修改权限**

```shell
#基本说明：
#通过 chmod 指令，可以修改文件或者目录的权限。

#第一种方式：通过 + 、-、=  变更权限
	u:所有者	
	g:所在组(同一个组的其他用户)	
	o:其他人(不同一个组的其他用户)	
	a:所有人(所有用户)(u、g、o 的总和)
	
	chmod 	u=rwx,g=rx,o=x	#文件/目录名  (该文件/目录的u的权限是rwx，g的权限是rx，o的权限是x)
	chmod	o+w				#文件/目录名  (该文件/目录的o的权限加上w)
	chmod	a-x				#文件/目录名  (取消该文件/目录的a的x权限)
	
	
#案例演示：
#1.给 abc 文件 的所有者读写执行的权限，给所在组读执行权限，给其它组读执行权限。
chmod u=rwx,g=rx,o=rx abc

#2.给 abc 文件的所有者除去执行的权限，增加组写的权限
chmod u-x,g+w abc

#3.给 abc 文件的所有用户添加读的权限
chmod a+r abc

#注意：
#	可执行文件 	图标	   绿色
#	普通文件	 	图标    白色
#	目录/文件夹	图标    蓝色
##	压缩文件		图标    红色

#第二种方式：通过数字变更权限
#	权限可以用数字代替：r=4 w=2 x=1	
	 
	chmod u=rwx,g=rx,o=x 文件/目录名
#	相当于 
	chmod 751		     文件/目录名
	
	rwx=4+2+1=7
	rx=4+1=5
	x=1

#案例演示
#要求：将 /home/abc.txt 文件的权限修改成	rwxr-xr-x,使用给数字的方式实现：
	rwxr-xr-x：u-rwx g=r-x o=r-x
	chmod 755 /home/abc.txt
```

**修改文件/目录的所有者-chown**

```shell
基本介绍
chown	newowner			文件/目录	#(修改所有者)
chown 	newowner:newgroup	文件/目录 	#(同时修改所有者和所在组)

#选项：-R	如果是目录 则使其下所有子文件或目录递归生效

#案例演示
#1.请将 /home/abc.txt 文件的所有者修改成 tom
chown tom /home/abc.txt

#2.请将 /home/test 目录下所有的文件和目录的所有者都修改成 tom 
chown -R tom /home/test

#R:Recursive递归
```

修改文件/目录的所在组-chgrp

```shell
chgrp  newgroup  文件/目录	(改变所在组)

#案例演示:
#1.请将 /home/abc.txt 文件的所在组修改成 shaolin (少林) 
groupadd shaolin
chgrp shaolin /home/abc.txt

#2.请将 /home/test 目录下所有的文件和目录的所在组都修改成 shaolin(少林) 
chgrp -R shaolin /home/test
```

例子实验：

```shell
#有两个组：police组，bandit组
#有四个用户：jackie,jerry,xh,xq
#jackie,jerry: 警察
#xh,xq: 土匪

#1.创建组	
	groupadd police
	groupadd bandit
#2.创建用户(直接放到对应组)
	useradd -g police jackie
	useradd -g police jerry
	useradd -g bandit xh
	useradd -g bandit xq
#3.jackie 创建一个文件，自己可以读 r 写 w，本组人可以读，其它组没人任何权限
#	首先jackie登录，可以使用切换用户：su jackie ---->这样不行，无法创建文件，权限不够

#	使用jackie登录，先设置密码123，然后退出系统用jackie登录：passwd jackie
#	然后创建文件：touch jackie.txt 
#	权限设置：
#		原权限：rw-r--r--
		chmod o-r jackie.txt 
#		修改后权限：rw-r-----
		
#		也可以直接使用数字方式：chmod 640 jackie.txt
		
#4.jackie 修改该文件，让其它组人可以读，本组人可以读写
	chmod g+w o+r jackie.txt 
#	或者
	chmod 664 jackie.txt

##	改后权限：rw-rw-r--
	
5.xh投靠警察
#	由root执行这条指令
	usermod -g police xh

#6.测试xh和xq能不能对jackie.txt文件进行读写
#	分别使用xh和xq登录(首先对其设置密码123)
		
#	jackie.txt文件在jackie目录下
#	要想对jackie.txt文件进行操作，首先进入jackie目录
#	但是jackie目录权限是：rwx------
#	所以xh连jackie目录都进不去
#
#	解决办法：登录jackie，对jackie目录权限进行修改(也可以登录root进行修改)(必须都在home下才能执行这个修改权限命令)
#		登录
		cd /home/
		ll
#		得到jackie原目录权限：rwx------
#		修改权限：chmod 770 jackie			(权限中有x才能进入目录)
#		修改后jackie目录权限：rwxrwx---

#		这时xh就可以进入jackie目录，并对jackie.txt进行读写
#结论：如果要对目录内的文件进行操作，首先要有对该目录有相应权限
```

联系2：

```shell
##1.建立两个组（神仙(sx),妖怪(yg)）
	groupadd sx
	groupadd yg
#2.建立四个用户(唐僧,悟空，八戒，沙僧)
	useradd ts
	useradd wk
	useradd bj
	useradd ss
#3.设置密码(都为123)
	passwd ts
	passwd wk
	passwd bj
	passwd ss
#4.妖怪组：悟空，八戒；神仙组：唐僧，沙僧
	usermod -g yg wk
	usermod -g yg bj
	usermod -g sx ts
	usermod -g sx ss
#5.用悟空建立一个文件 monkey.txt ，该文件要输出 i am a monkey
#	先使用悟空登录
	vim monkey.txt
	i am a monkey
	:wq
#6.给八戒一个可以 r w 的权限
#	悟空和八戒是一组的
#	当前monkey.txt权限：-rw-r--r--
3	此时八戒只能r
#	命令：
	chmod g+w monkey.txt
##	现在monkey.txt权限：-rw-rw-r--

#7.八戒修改 monkey.txt 加入一句话( i am a pig)
#	monkey.txt文件在wk目录下
#	八戒要修改monkey.txt文件就要先进入wk目录
#	但是此时wk目录权限：rwx------
#	八戒进不去wk目录
#	所以先修改wk目录权限：chmod g+r+w+x wk  (先把所以权限都给，在wk的home下写指令或root的home下写指令，因为目录在home下)
#	现在wk目录权限：rwxrwx---
#	这时八戒就能进入wk目录了

#8.唐僧 沙僧 对该文件没有权限
#	唐僧和沙僧是其他组，进不去wk目录

#9.把 沙僧 放入妖怪组
	usermod -g yg ss
	
#10.让沙僧修改该文件 monkey.txt, 加入一句话 ("我是沙僧，我是妖怪!");
#	使用沙僧登录
	cd /home/wk
	viw monkey.txt
	...
	:wq

#注意：
#rwx权限对于 文件夹(目录) 的细节讨论和测试!!!
#	x: 表示可以进入到该目录,比如 cd
#	r: 表示可以 ls ,将目录的内容显示
#	w: 表示可以在该目录下删除或者创建文件
```

## 第十一章Linux 定时任务调度

**crond任务调度**

1.概述  
任务调度：是指系统在某个时间执行特定的命令或程序。  
crond—->周期任务  
任务调度分类：  
(1)系统工作：有些重要的工作必须周而复始地执行。如病毒扫描等  
(2)个别用户工作：个别用户可能希望执行某些程序，比如对 mysql 数据库的备份。  
示意图：

![image-20221019110415747](/img/cos/image-20221019110415747.png)

2.基本语法  
`crontab [选项]`  
功能：进行定时任务的设置  
![image-20221019110439761](/img/cos/image-20221019110439761.png)

```shell
#4.快速入门
#在/etc/下有一个crontab文件，在这个文件中写入所有的定时任务

#输入
crontab -e  #就会进入crontab文件
#然后在文件中写入定时任务：
*/1 * * * * ls –l	/etc/ > /tmp/to.txt
#意思说每小时的每分钟执行 ls –l /etc/ > /tmp/to.txt 命令
#最后保存退出
```

参数细节说明：

![image-20221019104157830](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221019104157830.png)

**特殊符号说明**

![image-20221019110548932](/img/cos/image-20221019110548932.png)

特定的事件执行任务案例：

![image-20221019110616007](/img/cos/image-20221019110616007.png)

```shell
#5.应用实例
#案例 1：每隔 1 分钟，就将当前的日期信息，追加到 /tmp/mydate 文件中
crontab -e
*/1 * * * * date >> /tmp/mydate

#案例 2：每隔 1 分钟，将当前日期和日历都追加到 /home/mycal 文件中
#第一种方法：
	crontab -e
#	在crontab文件中输入：
	*/1 * * * * date >> /home/mycal 
	*/1 * * * * cal >> /home/mycal 
#	保存退出

#第二种方法：
#	将 date >> /home/mycal 和  cal >> /home/mycal 命令写在文件 /home/my.sh中
#	就是将命令都写在shell脚本中，直接调用shell脚本

#	步骤：
		vim /home/my.sh
		在my.sh中写入：
			date >> /home/mycal
			cal >> /home/mycal
			:wq
#		给 my.sh 增加执行权限：chmod u+x /home/my.sh (否则无法使用crontab命令)
		crontab -e
		在crontab中写入：*/1 * * * *	/home/my.sh

#注意：可以写脚本也可以不写脚本

#案例 3:	每天凌晨 2:00  将 mysql 数据库 testdb 备份到文件中。
#提示: 指令为 mysqldump -u root -p密码 数据库 > /home/db.bak
#步骤(1) 
crontab -e
#步骤(2)
0 2 * * * mysqldump -u root -proot testdb > /home/db.bak

#6. crond 相关指令
conrtab –r：#终止任务调度。
crontab –l：#列出当前有那些任务调度
service crond restart：重启任务调度
```

at定时任务调度

```shell
1.基本介绍
(1)	at 命令是一次性定时计划任务，at 的守护进程 atd 会以后台模式运行，检查作业队列来运行；
(2) 每个作业队列(任务队列)中都有作业(作业里是指令/脚本)；
(3)	默认情况下，atd 守护进程每 60 秒检查作业队列；
	有作业时，会检查作业运行时间，如果时间与当前时间匹配，则运行此作业；
	运行完这个作业(任务)之后，这个作业就不会再被执行了；
(4)	at 命令是一次性定时计划任务，执行完一个任务后不再执行此任务了；
(5)	在使用 at 命令的时候，一定要保证 atd 进程的启动，可以使用相关指令来查看
	ps -ef	| grep atd //可以检测 atd 是否在运行
	ps -ef ---> 查看所有的进程	
总结：at命令就是对某个定时任务只执行一次
```

![image-20221019110826307](/img/cos/image-20221019110826307.png)

```shell
#2. at 命令格式
	at [选项] [时间]
	然后输入两次：Ctrl + D	(结束 at 命令的输入)
#3. at 命令选项：
```

![image-20221019113608977](/img/cos/image-20221019113608977.png)

```shell
4. at 指定时间的方法：

(1)	接受在当天的 hh:mm（小时:分钟）式的时间指定。
	假如该时间已过去，那么就放在第二天执行。 例如：04:00
(2)	使用 midnight（深夜），noon（中午），teatime（饮茶时间，一般是下午 4 点）等比较模糊的词语来指定时间。
(3)	采用 12 小时计时制，即在时间后面加上 AM（上午）或 PM（下午）来说明是上午还是下午。 
	例如：12pm
(4)	指定命令执行的具体日期，指定格式为 month day（月 日）或 mm/dd/yy（月/日/年）或 dd.mm.yy（日.月.年），指定的日期必须跟在指定时间的后面。 
	例如：04:00 2021-03-1 (小的时间写前面，大的时间写后面)
(5)	使用相对计时法。
	指定格式为：now + count time-units
	now 就是当前时间，time-units 是时间单位，这里能够是 minutes（分钟）、hours（小时）、days（天）、weeks（星期）。
	count 是时间的数量，几天，几小时。 
	例如：now + 5 minutes
(6)	直接使用 today（今天）、tomorrow（明天）来指定完成命令的时间。

#5.应用实例
#案例 1：2 天后的下午 5 点执行 /bin/ls /home
	at 5pm + 2 days
	/bin/ls /home
#	两次ctrl+D
	
#案例 2：atq 命令来查看系统中没有执行的工作任务
#	直接输入atq 查询

#案例 3：明天17点钟，输出时间到指定文件内 比如 /root/date100.log
	at 5pm tomorrow
	date > /root/date100.log
	两次ctrl+D
	
#案例 4：2分钟后，输出时间到指定文件内 比如 /root/date200.log
	at now + 2 minutes
	date > /root/date200.log
	两次ctrl+D
	
#案例 5：删除已经设置的任务
	atrm 任务编号
	atrm 4   #//表示将 job 队列，编号为 4 的 job 删除.

	atq:
	2	Thu Feb 24 09:53:00 2022 a root
	1	Fri Feb 25 17:00:00 2022 a root
#	第一列就是编号

#注意：也可以执行脚本
#比如：
	at now +2 minutes
	/root/my.sh  
#	但要有这个脚本，并且有执行权限x
```

## 第十二章 Linux实操篇磁盘分区、挂载

```shell
(1) Linux 无论有几个分区，分给哪一目录使用，它归根结底就只有一个根目录，一个独立且唯一的文件结构 
	Linux 中每个分区都是用来组成整个文件系统的一部分。

(2)	Linux 采用了一种叫“载入”的处理方法，它的整个文件系统中包含了一整套的文件和目录，且将一个分区和一个目录联系起来。
	这时要载入的一个分区将使它的存储空间在一个目录下获得。
(3)图解：
硬盘上的一个分区 通过挂载mount机制 与文件系统中的某个目录联系起来
即分区挂载到目录
访问这个目录即访问这个分区
可以通过指令查看挂载情况，下面会说。
```

![image-20221019113855644](/img/cos/image-20221019113855644.png)

**硬盘说明：**

```shell
(1)	Linux 硬盘主要分为：
	 IDE 硬盘和 SCSI 硬盘
	 目前基本上是 SCSI 硬盘

(2)	对于 IDE 硬盘，驱动器标识符为“hdx~”
	其中“hd”表明分区所在设备的类型，这里是指 IDE 硬盘
	
	“x”为盘号
		a 为基本盘 第一个硬盘
		b 为基本从属盘 第二个硬盘
		c 为辅助主盘 第三个硬盘
		d 为辅助从属盘 第四个硬盘
		
	“~”代表分区
		前四个分区用数字 1 到 4 表示，它们是主分区或扩展分区，从 5 开始就是逻辑分区
	
	例：hda3 表示为第一个 IDE 硬盘上的第三个主分区或扩展分区
	     hdb2 表示为第二个 IDE 硬盘上的第二个主分区或扩展分区
	     
(3)	对于 SCSI 硬盘则标识为“sdx~”
	SCSI 硬盘是用“sd”来表示分区所在设备的类型的，其余则和 IDE 硬盘的表示方法一样
```

查看所有设备挂载情况：

```shell
命令 ：lsblk	或者 lsblk -f

lsblk：list block devices 

NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk 
├─sda1   8:1    0    1G  0 part /boot
├─sda2   8:2    0    2G  0 part [SWAP]
└─sda3   8:3    0   17G  0 part /
sr0     11:0    1  4.3G  0 rom 

#sda1分区挂载到/boot目录
#sda2分区挂载到swap目录
#sda3分区挂载到根目录

lsblk -f  #(更加详细的显示)

NAME   FSTYPE  LABEL           UUID                                 MOUNTPOINT
sda                                                                 
├─sda1 ext4                    bd7b7249-b3fa-434f-acfd-5127a56c0673 /boot
├─sda2 swap                    4381675a-652c-4ffa-9a9d-cb23d19be79b [SWAP]
└─sda3 ext4                    531c2867-a7e9-4ae7-8f79-4453ceb76c5b /
sr0    iso9660 CentOS 7 x86_64 2018-11-25-23-54-16-00    

#第一列可以看到设备/硬盘分区情况
##FSTYPE:文件系统类型
#UUID:格式化之后，会给每一个分区分配一个 唯一的 不重复的 40位 的 字符串
#MOUNTPOINT:挂载点
```

如何增加一块硬盘:

```shell
1)	虚拟机添加硬盘
2)	分区
3)	格式化
4)	挂载
5)	设置可以自动挂载
```

1.  虚拟机添加硬盘

```shell
在【虚拟机】菜单中选择【设置】
然后设备列表里添加硬盘
然后一路【下一步】
中间只有选择磁盘大小的地方需要修改，至到完成

使用命令lsblk发现没有新增的硬盘？
	需要重启系统（才能识别）

NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk 
├─sda1   8:1    0    1G  0 part /boot
├─sda2   8:2    0    2G  0 part [SWAP]
└─sda3   8:3    0   17G  0 part /
sdb      8:16   0    1G  0 disk 
sr0     11:0    1  4.3G  0 rom  
新增硬盘sdb，还未分区。
```

1.  分区

```shell
对sdb进行分区：

分区命令：fdisk /dev/sdb   (dev目录下是一些设备)
步骤：
	开始分区后输入 n  (新增分区)
	然后选择 p     	(分区类型为主分区)
	两次回车
	最后输入 w  (写入分区并退出)(若不保存并退出输入 q，即上面步骤出错了想重来就可以输入q)

说明：
	m	显示命令列表           
	p	显示磁盘分区 (同 fdisk –l) 
	n	新增分区
	d	删除分区
	w	写入并退出

命令(输入 m 获取帮助)：m
命令操作
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

选择分区类型：主分区/扩展分区
命令(输入 m 获取帮助)：n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p): p

分区号 (1-4，默认 1)：                  --->输入2，硬盘就有2个分区
起始 扇区 (2048-2097151，默认为 2048)：
将使用默认值 2048
Last 扇区, +扇区 or +size&#123;K,M,G&#125; (2048-2097151，默认为 2097151)：
将使用默认值 2097151
分区 1 已设置为 Linux 类型，大小设为 1023 MiB

命令(输入 m 获取帮助)：w
The partition table has been altered!

Calling ioctl() to re-read partition table.
正在同步磁盘。

lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   20G  0 disk 
├─sda1   8:1    0    1G  0 part /boot
├─sda2   8:2    0    2G  0 part [SWAP]
└─sda3   8:3    0   17G  0 part /
sdb      8:16   0    1G  0 disk 
└─sdb1   8:17   0 1023M  0 part 
sr0     11:0    1  4.3G  0 rom  
分区成功
硬盘sdb中只有一个分区sdb1
```

1.  格式化

```shell
#格式化磁盘

#为什么要格式化？
#	给这个分区指定它的文件类型

[root@Edu01 ~]# lsblk -f
NAME   FSTYPE  LABEL           UUID                                 MOUNTPOINT
sda                                                                 
├─sda1 ext4                    bd7b7249-b3fa-434f-acfd-5127a56c0673 /boot
├─sda2 swap                    4381675a-652c-4ffa-9a9d-cb23d19be79b [SWAP]
└─sda3 ext4                    531c2867-a7e9-4ae7-8f79-4453ceb76c5b /
sdb                                                                 
└─sdb1                                                              
sr0    iso9660 CentOS 7 x86_64 2018-11-25-23-54-16-00    

#sdb1的UUID为空，说明还没有格式化。

#格式化命令:
	mkfs -t	ext4 /dev/sdb1 		其中 ext4 是分区类型
```

1.  挂载

```shell
#挂载: 将一个分区与一个目录联系起来，
#	命令：mount 设备名称 挂载目录

#首先创建一个目录newdisk (目录位置随便)
#假如在根目录下创建：mkdir newdisk
#进行挂载：mount /dev/sdb1 /newdisk

NAME   FSTYPE  LABEL           UUID                                 MOUNTPOINT
sda                                                                 
├─sda1 ext4                    bd7b7249-b3fa-434f-acfd-5127a56c0673 /boot
├─sda2 swap                    4381675a-652c-4ffa-9a9d-cb23d19be79b [SWAP]
└─sda3 ext4                    531c2867-a7e9-4ae7-8f79-4453ceb76c5b /
sdb                                                                 
└─sdb1 ext4                    d1856552-dee4-4fbc-9953-f650231ecaac /newdisk
sr0    iso9660 CentOS 7 x86_64 2018-11-25-23-54-16-00  
#挂载点有了，挂载成功。

#卸载(去除分区与目录的联系)：
#	命令：umount	设备名称 或者	挂载目录
#	例如：umount	/dev/sdb1 或者 umount /newdisk

#注意: 用命令行挂载,重启后会失效。
```

1.  设置可以自动挂载

```shell
解决  用命令行挂载,重启后会失效 问题

永久挂载: 
	通过修改/etc/fstab 实现挂载
	添加完成后 执行 mount	–a 即刻生效 或者 重启系统reboot

步骤：
vim /etc/fstab
增加一行：UUID=上面sdb1的UUID    /newdisk    ext4    defaults     0 0
也可以是：/dev/sdb1    		  /newdisk    ext4    defaults     0 0

要挂载的设备或伪文件系统  挂载点  文件系统类型  挂载选项 转储频率 自检次序
UUID=上面sdb1的UUID   /newdisk    ext4    defaults   0 	   0

要挂载的设备或伪文件系统：
	设备文件、LABEL(LABEL="")、UUID(UUID="")、伪文件系统名称(proc, sysfs)

挂载点：指定的文件夹

挂载选项：defaults

转储频率：
  0：不做备份
  1：每天转储
  2：每隔一天转储

自检次序：
  0：不自检
  1：首先自检；一般只有rootfs才用1；
```

查询磁盘使用情况

```shell
#基本语法:
	df -h   (disk free)
#查询系统整体磁盘使用情况
```

查询指定目录磁盘占用情况：

```shell
基本语法：
	du -h  指定目录    (disk usage)
功能：查询指定目录的磁盘占用情况，默认为当前目录
	-s 指定目录占用大小汇总
	-h 带计量单位
	-a 含文件
	--max-depth=1	子目录深度
	-c 列出明细的同时，增加汇总值

应用实例
查询 /opt 目录的磁盘占用情况，深度为 1
	du -hac --max-depth=1 /opt
```

工作实用 指令

```shell
#1. 统计/opt 文件夹下文件的个数
	ls -l /opt | grep "^-" | wc -l

#	说明：
		grep "^-" --->筛选出以-开头的，因为以-开头的都是文件
		wc (word count) 统计数量
			wc -l 统计行数 l即lines
			统计grep筛选后的行数即文件个数

#2. 统计/opt 文件夹下目录的个数
	ls -l /opt | grep "^d" | wc -l

3. 统计/opt 文件夹下文件的个数，包括子文件夹里的
	ls -lR /opt | grep "^-" | wc -l
		-R 递归列出遇到的子目录

4. 统计/opt 文件夹下目录的个数，包括子文件夹里的
	ls -lR /opt | grep "^d" | wc -l

#5. 以树状显示目录结构 
# 	指令：tree 目录 
 #	默认情况下没有tree指令
 #	如果没有 tree ,则使用 yum install tree 指令安装
```

## LINUX网络配置

![image-20221019114700324](/img/cos/image-20221019114700324.png)

```shell
1.通过ifconfig指令查看Linux虚拟机的ip地址
	192.168.2.131
2.然后在本机DOS命令窗口输入指令ipconfig，查看vmnet8的ip地址
	192.168.2.1
	上两个在同一网段，所以可以通信。
	
3.由第二步骤可以得到本机的无线网络适配器(无线网卡)的ip地址
	192.168.101.8

为什么Linux虚拟机可以连外网(比如打开百度)？
	Linux虚拟机--->本机vmnet8--->本机无线网卡--->教室局域网网关--->外网	

每次开机linux虚拟机的ip地址不一定相同
linux虚拟机的ip地址可以设置

以下：如何编辑虚拟机的网络和修改其ip地址？
```

查看网络IP和网关

```shell
vmware--->编辑--->虚拟网络编辑器
这样就可以查看和修改虚拟网络vmnet8的ip地址和网关

通过本机DOS命令窗口，输入指令：ipconfig
	查看vmnet8的网络配置

在xshell或linux终端输入命令：ifconfig
	查看 linux 的网络配置

ping命令 测试主机之间网络连通性
	基本语法：
		ping 目的主机 （功能描述：测试当前服务器是否可以连接目的主机）

应用实例
	测试当前服务器是否可以连接百度
	ping www.baidu.com
```

Linux网络环境配置

自动获取ip：

```shell
登陆后，通过界面设置自动获取ip
	应用程序--->系统工--->设置--->网络--->小齿轮--->IPV4
特点：linux 启动后会自动获取 IP，可以避免ip冲突
缺点：每次自动获取的 ip 地址可能不一样，但是作为服务器ip地址不能变。
工作时，一般将Linux的ip地址手动设定，不改变。
```

手动设置ip

```shell
手动指定linux的ip地址，使其不变化。

直接修改配置文件来指定 IP,并可以连接到外网(程序员推荐)
关于网络的配置文件在：/etc/sysconfig/network-scripts/ifcfg-ens33

要求：将ip地址配置为静态的(不变的)，比如: ip 地址为 192.168.200.130

输入指令：vim /etc/sysconfig/network-scripts/ifcfg-ens33
修改文件内容：
	BOOTPROTO="static"
	加上：
		IPADDR=192.168.200.130   (IP地址,自己设定的)
		GATEWAY=192.168.200.2	 (网关,自己设定的)
		DNS1=192.168.200.2		 (域名解析器,自己设定的)

下一步：vmnet8和Linux在同一网段上，要能够通信，也要修改相应的vmnet8
vmware--->编辑--->虚拟网络编辑器
打开虚拟编辑器，点击vmnet8，修改下面的子网ip为：192.168.200.0
然后点击NAT设置，将网关改为192.168.200.2

应用确定
输入指令：service network restart 或 reboot  使上述修改生效
```

设置Linux系统的主机名和 hosts 映射

```shell
Linux系统的主机名相当于其ip地址，起一个主机名是因为ip地址不好记忆，不方便。
也可以修改主机名。

查看当前主机的主机名指令：hostname

主机名放在/etc/hostname文件中，要修改主机名即修改文件内容：
	输入指令：
		vim /etc/hostname
		修改内容
		:wq
		重启系统
#设置host映射

在Windows中，如何通过 主机名 找到(比如 ping) 某个 linux 系统?

	修改ip地址与主机名的映射关系：
		在windows C:\Windows\System32\drivers\etc\hosts 文件中
		指定Linux系统的ip地址与主机名的映射关系
			格式：linux系统ip地址 linux系统主机名
			如指定为: 192.168.200.130 hspedu100 (这行代码添加到文件中就行了)
		
		ping hspedu100 ---->就会去该文件中找相应的ip地址
	
	
那么，如果也想在Linux系统中，使用主机名 来 ping 某个Windows系统，怎么做？
	在 linux 系统的 /etc/hosts 文件中 指定
	如指定为: 192.168.200.1 ThinkPad-PC
	这样就可以 ping ThinkPad-PC
```

主机名解析过程分析(hosts、DNS)

hosts是一个文本文件，用来记录 IP 和 Hostname(主机名)的映射关系

```shell
DNS  Domain Name System 域名系统
是互联网上作为域名和 IP 地址相互映射的一个分布式数据库
为什么可以通过主机名访问？
	通过DNS域名解析系统，将主机名解析为ip地址，实际上还是用的ip地址。
```

例子：

```shell
用户在浏览器输入了www.baidu.com

1.浏览器先检查浏览器缓存中有没有该域名解析 IP 地址，有就先调用这个 IP 完成解析；
	如果没有，就检查 DNS 解析器缓存，如果有直接返回 IP 完成解析。
	这两个缓存，可以理解为 本地解析器缓存

DNS 解析器缓存：
一般来说，当电脑第一次成功访问某一网站后，在一定时间内，浏览器或操作系统会缓存他的 IP 地址（DNS 解析记录）
	如在 cmd 窗口中输入
	ipconfig /displaydns	//DNS 域名解析缓存
	ipconfig /flushdns	//手动清理 dns 缓存

2. 如果本地解析器缓存没有找到对应映射，检查系统中 hosts 文件中有没有配置对应的域名 IP 映射，如果有，则完成解析并返回。

3. 如果本地 DNS 解析器缓存 和 hosts 文件 中均没有找到对应的 IP，则到域名服务器找
4. 还找不到，就没有了。
```

图解

![image-20221019115203027](/img/cos/image-20221019115203027.png)

第十四章进程管理：

基本介绍：

```shell
(1)在 LINUX 中，每个执行的程序都称为一个进程。每一个进程都分配一个 ID 号(pid,进程号)。
程序执行之后加载到内存中成为进程。程序是静态的，进程是动态的。
(2)每个进程都可能以两种方式存在：
	前台与后台
	前台进程：是用户目前的屏幕上可以进行操作的。
	后台进程：是实际在操作的，但屏幕上无法看到，通常使用后台方式执行。
(3)一般系统的服务都是以后台进程的方式存在，而且都会常驻在系统中，直到关机才结束。
```

ps命令：显示系统正在执行的进程

```shell
1.基本介绍：
	ps命令是用来查看目前系统中，有哪些进程正在执行，以及它们执行的状况。
	可以不加任何参数。

语法：
	ps [选项]    Process Status
	选项：
		-a		显示当前终端的所有进程信息
		-u		以用户的格式显示进程信息
		-x		显示后台程序运行的参数

一般三个选项一起用：
	ps -aux
	
	显示出如下内容：
		USER 			 执行进程用户名称  
		PID 		     进程号
		%CPU          	 进程占用CPU百分比
		%MEM    	 	 进程占用物理内存的百分比
		VSZ     		 进程占用的虚拟内存大小（单位：KB）
		RSS 		 	 进程占用的物理内存大小（单位：KB）
		TTY     		 终端名称(有时缩写)
		STAT             进程状态：
							 S-睡眠
							 s-表示该进程是会话的先导进程
							 N-表示进程拥有比普通优先级更低的优先级
							 R-正在运行
							 D-短期等待
							 Z-僵死进程
							 T-被跟踪或者被停止等等
		START            进程执行的开始时间
		TIME             CPU 时间，即进程使用 CPU 的总时间
		COMMAND     	 启动进程所用的命令和参数，如果过长会被截断显示

上述命令将所有进程显示出来，若只想查找某一个进程：
	指令：ps –aux|grep xxx  
		比如查找 sshd 进程：ps -aux | grep sshd

应用实例：
	要求：以全格式显示当前所有的进程，查看进程的父进程。 

父进程：一个进程可以生成多个子进程，该进程称为父进程。

查看 sshd 的父进程信息：
	知道一个父进程的pid就可以知道它的信息。
	
ps -ef 是以全格式显示当前所有的进程。-e 显示所有进程。-f 全格式。

ps -ef 指令显示内容如下： 
	UID         用户ID
	PID   		进程ID
	PPID  		父进程ID             
	C 			CPU 用于计算执行优先级的因子。
					数值越大，表明进程是 CPU 密集型运算，执行优先级会降低；
					数值越小，表明进程是 I/O 密集型运算，执行优先级会提高
	STIME    	进程启动的时间
	TTY         完整的终端名称
	TIME        CPU 使用时间
	CMD    		启动进程所用的命令和参数

输入：ps -ef | grep sshd
得到第三列为1，即父进程ID=1
```

kill 和 killall指令：终止进程

```shell
1.介绍:
若是某个进程执行一半需要停止时，或是已经消耗了很大的系统资源时，此时可以考虑停止该进程。
使用 kill 命令来完成此项任务。

2.基本语法：
kill [选项] 进程号	（功能描述：通过进程号杀死/终止进程）
killall 进程名称	    （功能描述：通过进程名称杀死进程，也支持通配符，这在系统因负载过大而变得很慢时很有用）
					 使用killall，会将该进程的所有子进程也都删除/终止。

3.常用选项：
	-9   表示强制终止进程
		 (系统觉得某个程序重要，可能会屏蔽你的kill指令，这时使用选项-9强制终止进程)

4.案例：
案例 1：踢掉某个非法登录用户
kill 进程号 
比如 kill 11421

假如使用tom登录，然后在图形界面打开终端写代码
假设认为tom是个非法用户，要踢掉它
先在图形界面写代码：ps -aux | grep sshd
sshd 是记载远程连接服务的配置文件
上述指令显示出了，远程登录的进程信息，从中看到了tom登录的进程的进程号11421
所以 kill 11421  这样tom就下线了！

案例 2：终止远程登录服务 sshd, 在适当时候再次重启 sshd 服务
sshd ---> secure shell

首先查看 sshd 对应的进程号：
	使用命令：ps -aux | grep sshd
	有 /user/sbin/sshd 的那个进程就是 sshd 服务进程 进程号10748
	终止 sshd 之后，就无法在xshell远程登陆了！
	
重启 sshd 服务指令：
	/bin/systemctl start 服务名称
	/bin/systemctl start sshd.service

案例 3：终止多个 gedit (文本编辑器)
在Linux桌面，主文件夹中，打开多个文本，然后使用killall 可以同时关闭所有打开的文本
killall	gedit

案例 4：强制杀掉一个终端
	在Linux系统桌面打开两个终端，bash即代表终端进程
	在一个终端中输入指令强制关闭另一个终端
	首先：查看终端进程的进程号：ps -aux | grep bash
	得到对应的进程号，输入：kill -9  对应的进程号

	也可以终端自己终止自己
```

查看进程树 pstree

```shell
1.基本语法：pstree [选项] 
功能：可以更加直观的来看进程信息(树的形式)

2.常用选项：
-p :显示进程的 PID (父进程ID)
-u :显示进程的所属用户

3.应用实例：
案例 1：用树状的形式显示进程的pid(进程号)
pstree -p

案例 2：用树状的形式显示进程的用户
pstree -u
```

服务管理

```plaintext
服务(service) 本质就是进程，但是是运行在后台的，
通常都会监听某个端口，等待其它程序的请求，比如(mysqld , sshd防火墙等)，
因此我们又称为守护进程，是 Linux 中非常重要的知识点。
```

service 管理指令

```shell
(1)	service	服务名 [start | stop | restart | reload | status]
start 	开启服务
stop 	终止服务
restart 重启服务
reload 	重载服务
status 	查看服务的状态

(2)	在 CentOS7.0 后很多服务不再使用 service指令管理,而是使用 systemctl (后面专门讲)

(3)	还有一些在 /etc/init.d 下的服务仍使用 service 指令管理

案例：
请使用 service 指令，查看，关闭，启动 network
[注意：在虚拟系统打开终端演示，因为网络连接会关闭]
指令:
	service network status 
	service network stop 
	service network start
```

查看服务名的方式：

```shell
方式 1：直接输入 setup 即可看到所有服务
其中前面带 * 的服务会随着Linux系统的启动而自动启动。
方式 2:	ls -l /etc/init.d
只能看到部分服务：还有一些在 /etc/init.d 下的服务仍使用 service 指令管理
```

服务的运行级别(runlevel)

```shell
Linux 系统有 7 种运行级别(runlevel)：常用的是级别 3 和 5

运行级别 0：系统停机状态，系统默认运行级别不能设为 0，否则不能正常启动
运行级别 1：单用户工作状态，root 权限，用于系统维护，禁止远程登陆
运行级别 2：多用户状态(没有 NFS)，不支持网络
运行级别 3：完全的多用户状态(有 NFS)，无界面，登陆后进入控制台命令行模式
运行级别 4：系统未使用，保留
运行级别 5：X11 控制台，登陆后进入图形 GUI 模式
运行级别 6：系统正常关闭并重启，默认运行级别不能设为 6，否则不能正常启动
授课时使用5，工作时大多使用3。
```

开机的流程说明：

![image-20221019115702418](/img/cos/image-20221019115702418.png)

CentOS7 后运行级别说明

```shell
在 /etc/initab 
进行了简化，如下:
multi-user.target: analogous to runlevel 3 
graphical.target: analogous to runlevel 5 

查看当前运行级别：systemctl get-default
ctl ---> control

更改运行级别：systemctl set-default multi-user.target/graphical.target
		    然后重启 reboot
```

chkconfig 指令

```shell
通过 chkconfig 命令可以给服务在 各个运行级别 设置开启自启动/关闭自启动

chkconfig 指令管理的服务在 /etc/init.d  查看

注意: Centos7.0 后，很多服务使用 systemctl 管理 (后面马上讲)

chkconfig 基本语法：
(1)查看服务和服务在各个级别是开启/关闭自启动  (有限，只能查看chkconfig管理下的服务)
chkconfig --list [| grep	xxx]    (若查找某一个服务使用grep过滤)
 
(2)chkconfig 服务名 --list

(3)chkconfig --level 5 服务名 on   给该服务在5运行级别开启自启动
chkconfig --level 5 服务名 off     给该服务在5运行级别关闭自启动

案例演示: 对network服务进行各种操作,把 network 在 3 运行级别 关闭自启动
chkconfig --level 3 network off 

注意：chkconfig 重新设置服务后自启动或关闭，需要重启机器 reboot 生效.
```

systemctl 管理指令

```plaintext
基本语法：systemctl [start | stop | restart | status] 服务名
systemctl 指令管理的服务在 /usr/lib/systemd/system 查看
```

systemctl 设置服务的自启动状态

```shell
systemctl list-unit-files [ | grep 服务名] (查看服务开机启动状态, grep 可以进行过滤) 
systemctl enable 服务名 		(设置服务开机自启动)
systemctl disable 服务名 	(关闭服务开机自启动)
systemctl is-enabled 服务名  (查询某个服务是否是自启动的)

centos7之后运行级别只有3和5，所以以上指令对3和5运行级别同时适用。

应用案例：
查看当前防火墙的状况，关闭防火墙和重启防火墙 firewalld.service 
	查看当前防火墙情况：systemctl status firewalld
	关闭防火墙：systemctl stop firewalld
	重启防火墙：systemctl start firewalld
	.service写不写都行
注意：关闭或者启用防火墙后，立即生效。
但是 这种方式只是临时生效，当重启系统后，还是回归以前对服务的设置。

如果希望设置某个服务自启动或关闭永久生效
	要使用 systemctl	[enable|disable] 服务名
```

firewall 指令：打开或者关闭指定端口

```shell
在真正的生产环境，往往需要将防火墙打开。
但问题来了，如果我们把防火墙打开，那么外部请求数据包就不能跟服务器监听端口通讯。
这时，需要打开指定的端口。比如 80、22、8080 等。
```

![image-20221019115940049](/img/cos/image-20221019115940049.png)

```shell
(1)	打开端口: firewall-cmd --permanent --add-port=端口号/协议

通过 netstat -anp | more 指令查看端口号的协议 (more 分页显示)
该指令输出的信息中：
	Local Address下是 ip地址:端口号
	Proto 是协议   (protocol 协议)

(2)	关闭端口: firewall-cmd --permanent --remove-port=端口号/协议

注意：无论是打开端口还是关闭端口，要重新载入才能生效
重新载入：firewall-cmd --reload

(3) 查询端口是否开放: firewall-cmd --query-port=端口/协议

应用案例：
(1)	启用防火墙，测试 111 端口是否能 telnet (远程登录) 不行
	在本地主机DOS命令窗口输入：telnet Linux虚拟机ip地址:端口号
	测试本地主机能否访问虚拟机的111端口
	telnet 192.168.200.130 111

	防火墙打开+端口关闭--->不可以访问端口

(2)	开放 111 端口
	firewall-cmd --permanent --add-port=111/tcp ;
	需要 firewall-cmd --reload

	防火墙打开+端口打开--->可以访问端口
	
(3)	再次关闭 111 端口
	firewall-cmd --permanent --remove-port=111/tcp 
	需要 firewall-cmd --reload
```

top指令：动态监控进程

```shell
top 与 ps 命令很相似。
它们都用来显示正在执行的进程。
top 与 ps 最大的不同之处在于: top 在执行一段时间可以更新正在运行的的进程。
语法：
top [选项]
```

![image-20221019120108788](/img/cos/image-20221019120108788.png)

```shell
输入top指令后：每一条都是一个进程
	显示：
	第一行
		第一个时间      当前时间
		第二个时间      系统运行时间
		2 users	       有几个用户
		load average   负载值(三个值相加除以3>0.7 说明系统负载过大，要提高性能)
	第二行
		Tasks 			系统任务数
		1 running 		1个正在运行进程
		184 sleeping 	184个休眠进程
		0 stopped 		0个终止进程
		0 zombie 		0个僵死进程   (要清除僵死进程，因为僵死进程无用且占内存空间)
	第三行 占用的CPU百分比
		us 用户占用的CPU
		sy 系统占用的CPU
		id 空闲
	第四行 Mem 内存占用情况
		total 	总共内存
		free 	空闲内存
		user 	已使用内存
	第五行 Swap 分区
		total 	总共大小
		free 	未使用大小
		used 	已用大小
		avail Mem 可获取的内存大小
```

交互操作说明

```shell
输入命令top
然后输入以下命令，得以下功能对进程进行排序
```

![image-20221019120213845](/img/cos/image-20221019120213845.png)

```shell
案例 1：监视特定用户, 比如监控 tom 用户
输入top
回车
输入u
回车
输入要监控用户名 (该用户要登录才能看到他的进程信息)

案例 2：终止指定的进程, 比如我们要结束 tom 登录
输入top
回车
输入k
回车
输入要结束的进程 ID 号 （bash那个进程的PID）
回车
输入信号量 9 强制删除
tom掉线

案例 3：指定系统状态更新的时间(每隔 10 秒自动更新),默认是 3 秒
top -d 10
```

查看系统网络情况netstat

```shell
基本语法：
	netstat [选项]

选项说明：
	-an	按一定顺序排列输出
	-p	显示哪个进程在调用

输入netstat -an | more (more 分页展示)
显示：
	Proto 					协议
	Recv-Q					接收信息队列
	Send-Q 					发送信息队列
	Local Address      		本地地址 Linux地址 
	Foreign Address         外部地址    
	State 					LISTEN 监听  ESTABLISHED 已建立连接 TIME_WAIT 超时等待

TIME_WAIT 超时等待 
	--->某个连接断了之后(如用户退出登录)，连接不会立刻消失，而是State变为TIME_WAIT
	系统认为可能是网络状态不好，过一段时间仍无法连接，则连接消失。 

Proto 	Recv-Q 	Send-Q 		Local Address           Foreign Address         State 
tcp        0     36 		192.168.200.130:22      192.168.200.1:14498     ESTABLISHED
要建立连接双方都要有一个端口
22端口在Linux
14498端口在Windows
如下图：
```

![image-20221019120328489](/img/cos/image-20221019120328489.png)

```shell
案例：查看服务名为 sshd 的服务的信息。
netstat -anp | grep sshd
是一种网络检测工具，它主要是用检测远程主机是否正常，或是两部主机间的网线或网卡故障。
如: ping 对方的ip地址
```

## 第十五章：Linux 实操篇- RPM 与 YUM

#### RPM 介绍

```shell
RPM 是 Red-Hat Package Manager（红帽软件包管理器）的缩写
这一文件格式名称虽然打上了RedHat的标志，但是其原始设计理念是开放式的，
包括OpenLinux、S.u.S.E.以及Turbo Linux等Linux的分发版本都有采用，可以算是公认的行业标准了。
是一种用于互联网下载包的打包及安装工具，它包含在某些Linux分发版中。它生成具有.RPM扩展名的文件。
类似于 windows 的 setup.exe
###########################
#rpm 的简单查询指令
查询已安装的 rpm软件包 列表：
rpm –qa|grep xx 
查询结果返回一个软件包的包名

举例：查看当前系统是否安装了 firefox 
指令: rpm -qa | grep firefox
查询结果：firefox-60.2.2-1.el7.centos.x86_64
结果说明：
	软件名：firefox
	版本号：60.2.2-1
	适用操作系统: el7.centos.x86_64 (表示 centos7.x 的 64 位系统)
	如果是 i686、i386 表示 32 位系统，noarch 表示通用(32/64位系统都适用)
```

rpm 的其它查询指令

```shell
rpm -qa 			(查询所安装的所有 rpm 软件包)

rpm -qa | more  	(分页显示more)

rpm -qa | grep X    (过滤,比如 rpm -qa | grep firefox )

rpm -q  软件包名      (查询某个软件包是否安装)
案例：rpm -q firefox

rpm -qi 软件包名   	 (查询软件包的详细信息)
案例: rpm -qi firefox

rpm -ql 软件包名 	 (查询软件包中的文件和该软件包在哪个文件下)
案例： rpm -ql firefox

rpm -qf 文件全路径名 	 (查询某个文件所属在哪个软件包)
案例：rpm -qf /etc/passwd rpm 
案例：-qf /root/install.log
```

删除 rpm 软件包

```shell
基本语法：rpm -e RPM软件包的名称	//-e erase擦去
案例：删除 firefox 软件包
rpm -e firefox

注意：
(1)如果其它软件包依赖于您要删除的软件包，删除时则会产生错误信息。
如：	
rpm -e foo
removing these packages would break dependencies:foo is needed by bar-1.0-1
foo软件包被 bar-1.0-1需要，删除foo对barr-1.0-1有影响

(2)如果我们就是要删除 foo 这个 rpm 包，可以增加参数 --nodeps ,就可以强制删除
   但是一般不推荐这样做，因为依赖于该软件包的程序可能无法运行
如：rpm -e --nodeps foo            (nodeps 不检查依赖关系 no dependencies)
```

安装 rpm 软件包

```shell
基本语法：rpm -ivh RPM软件包全路径名称

rpm软件包其实是一个软件的安装包
点击Linux系统桌面的光盘，里面有一个Packages文件夹，这个文件夹里有很多rpm软件安装包

在/run/media/root/CentOS\ 7\ x86_64/Packages/ 目录下

选项：
	i=install 安装
	v=verbose 提示
	h=hash	  进度条

应用实例：
演示卸载和安装 firefox 浏览器
rpm -e firefox 
rpm -ivh /run/media/root/CentOS\ 7\ x86_64/Packages/firefox-60.2.2-1.el7.centos.x86_64.rpm

也可以在Packages中找到firefox安装包，复制到某一个目录下，这样写路径简单
```

#### yum介绍

```shell
Yum（全称为 Yellow dog Updater, Modified）是一个 Shell 前端软件包管理器。
基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，
可以自动处理依赖性关系，并且一次安装所有依赖的软件包。

使用 yum list|grep 软件名 向yum服务器查询有没有该软件
有的话，使用 yum install 软件名 下载安装该软件
```

yum 的基本指令

```shell
查询 yum 服务器是否有 需要安装的软件：
yum list|grep 软件名

安装指定的软件：
yum install 软件名

案例：请使用 yum 的方式来安装 firefox 
rpm -e firefox
yum list | grep firefox 
yum install firefox
```

总结：

```shell
rpm 是从本地安装包下载
yum 是从yum服务器下载安装软件
```

## 第十七章：大数据定制篇-Shell编程

#### Shell 是什么

```shell
Shell 是一个命令行解释器，它为用户提供了一个向 Linux 内核发送请求以便运行程序的界面系统级程序，用户可以用 Shell 来启动、挂起、停止甚至是编写一些程序。

在计算机科学中，Shell俗称壳（用来区别于核）
是指“为使用者提供操作界面”的软件（command interpreter，命令解析器）。
它类似于DOS下的COMMAND.COM和后来的cmd.exe。
它接收用户命令，然后调用相应的应用程序。

中文名	壳
外文名	shell
性质		命令解析器
用途		接收用户命令
Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。是用户使用 Linux 的桥梁.
用户写了一个指令，该指令不能直接发给Linux内核去执行，而是由shell帮我们去执行，执行完之后再通过shell返回给我们结果。
在Linux中不止一种shell，我们常用的是bash。
可以直接发一个指令给shell，也可以将指令写在一个文件/脚本(.sh shell脚本)里。
shell编程就是在shell脚本中写指令。
```

Shell脚本

```shell
1.脚本格式要求：
	脚本以 #!/bin/bash 开头 --->确定shell的类型
    脚本需要有可执行权限
    shell脚本文件以.sh结尾，也可以不以.sh结尾

2.编写第一个Shell 脚本
需求说明：创建一个 Shell 脚本，输出 hello world! 
创建一个目录：mkdir /root/shcode
cd /root/shcode
vim hello.sh
写入：
	#!/bin/bash
	echo "hello,world!"

3.shell脚本的常用执行方式
方式 1：
	首先要给shell脚本加x执行权限：chomod u+x hello.sh
	再输入该脚本的相对路径或绝对路径来执行该脚本
    比如：
	 	使用相对路径：	./hello.sh 
	 	使用绝对路径：	/root/shcode/hello.sh

方式 2：
	不用赋予脚本+x 权限，直接执行即可。(使用以下指令，即使没有执行权限也可以执行)
	使用指令： sh  shell脚本/shell脚本的绝对路径
	比如	sh hello.sh 
```

#### Shell 的变量

```shell
(1)	Linux Shell 中的变量分为:系统变量和用户自定义变量。
系统变量：系统自带的变量

(2)	系统变量比如：$HOME、$PWD、$SHELL、$USER 等等
echo $HOME	--->显示当前用户的家目录

(3)	可以通过 set 指令显示出shell中的所有系统变量
```

#### shell 自定义变量

```shell
基本语法：
(1)	定义变量：变量名=值  --->不加空格
(2)	撤销变量：unset 变量名
(3)	声明静态变量：readonly 变量 (改变量不能 unset撤销)

案例 1：定义变量 A
案例 2：撤销变量 A
案例 3：声明静态的变量 B=2，不能 unset

cd /root/shcode
vim vr.sh
输入： 
	#!/bin/bash
	
	#案例 1：定义变量 A=100  (#为注释符)
	A=100
	#输出变量需要加上$ ($--->引用变量)
	echo $A
	
	#上述输出结果是100，想要输出结果为A=100，这样写(A=以普通文本形式输出，$A引用变量的值)
	echo A=$A 或者 echo "A=$A" 
		
		
	#案例 2：撤销变量 A 
	unset A
	echo "A=$A"    (--->输出 A= )

	
	#案例 3：声明静态的变量 B=2，不能 unset 
	readonly B=2
	echo "B=$B" 
	
保存：wq
最后输入执行命令：sh vr.sh

--------------------------------------------------------------------

shell 变量名的定义规则：
(1)	变量名称可以由字母、数字和下划线组成，但是不能以数字开头。5A=200(×)
(2)	等号两侧不能有空格
(3)	变量名称一般习惯为大写，这是一个规范，我们遵守即可

--------------------------------------------------------------------
将命令的返回值赋给变量：
(1)	A=`date`反引号，运行里面的命令，并把结果返回给变量 A 
(2)	A=$(date) 等价于反引号
案例：
#将指令返回的结果赋给变量
	C=`date` 
	D=$(date)
	echo "C=$C" 
	echo "D=$D"
	
	#使用环境变量 TOMCAT_HOME
	echo "tomcat_home=$TOMCAT_HOME"
```

#### 设置环境变量(全局变量)

```shell
可以将变量提升为全局环境变量，供多个shell程序共同使用。

基本语法：
(1)	export 	变量名=变量值 	
（功能描述：将 shell 变量输出为环境变量/全局变量）

(2)	source 	配置文件		    
（功能描述：在某文件中定义环境变量之后，要对该文件进行刷新才能使其生效，即让修改后的配置信息立即生效）

(3)	echo 	$变量名			
（功能描述：查询环境变量的值）

快速入门：
(1)	在/etc/profile 文件中定义 TOMCAT_HOME 环境变量
TOMCAT_HOME --->意思是tomcat的家目录是什么
(2)	查看环境变量 TOMCAT_HOME 的值
vim /etc/profile
	写入：export TOMCAT_HOME=/opt/tomcat
	保存退出
source /etc/profile
echo $TOMCAT_HOME ---输出 /opt/tomcat

(3)	在另外一个 shell 程序中使用 TOMCAT_HOME
在另一个shell程序中写入：
	echo "tomcat_home=$TOMCAT_HOME"

注意：在输出 TOMCAT_HOME 环境变量前，需要让其生效source /etc/profile

shell 脚本的
	单行注释：#
	多行注释：   :&lt;&lt;!   独占一行	
				内容 
			    ! 	   独占一行
```

#### 位置参数变量

```shell
1.介绍
当我们执行一个 shell 脚本时，如果希望获取到命令行的参数信息，就可以使用到位置参数变量
比如： ./myshell.sh 100 200 这个就是一个执行 shell 的命令行，可以在 myshell 脚本中获取到参数信息

./myshell.sh --->执行myshell脚本命令
100 200 都是该命令行的参数
使用位置参数变量可以在myshell脚本中获得参数

2.基本语法
$n （功能描述：n 为数字，$0 代表命令本身(如./myshell.sh)，$1-$9 代表第一到第九个参数(如：$1 就是100 $2 就是200)，十以上的参数需要用大括号包含，如$&#123;10&#125;）
$* （功能描述：这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体）
$@ （功能描述：这个变量也代表命令行中所有的参数，不过$@把每个参数区分对待）
$# （功能描述：这个变量代表命令行中所有参数的个数）

案例：编写一个 shell 脚本 myshell.sh ，在脚本中获取到命令行的各个参数信息。
vim myshell.sh
	写入:
		#!/bin/bash
		echo "命令本身=$0 第一个参数=$1 第二个参数=$2"
		echo "所有的参数=$*"
		echo "$@"
		echo "参数个数=$#"
		保存退出
sh myshell.sh 100 200
```

#### 预定义变量

```shell
1.基本介绍：
预定义变量是 shell 设计者事先已经定义好的变量，可以直接在 shell 脚本中使用

2.基本语法：
(1)	$$ （功能描述：当前进程的进程号（PID））
(2)	$! （功能描述：后台运行的最后一个进程的进程号（PID））
(3)	$？（功能描述：最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行；如果这个变量的值为非 0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了。）

3.应用实例：
在一个 shell 脚本中简单使用一下预定义变量

vim preVar.sh
	写入：
	#!/bin/bash
	echo "当前执行的进程 id=$$"
	
	#以后台的方式运行一个脚本(在脚本后加一个$)，并获取他的进程号
	/root/shcode/myshell.sh &
	
	echo "最后一个后台方式运行的进程 id=$!" 

	echo "执行的结果是=$?"
	保存并退出
sh preVar.sh
```

运算符：

```shell
1.基本介绍：
学习如何在 shell 中进行各种运算操作。

2.基本语法：
(1)	三种写法：
	$((运算式))
	$[运算式]
	expr m + n 	(expression 表达式)
	 
(2)	注意 expr 运算符间要有空格
	如果希望将 expr 的结果赋给某个变量，使用 `` 或者 $( )

(3)	expr m - n

(4)	expr \*, /, %	乘，除，取余

3.应用实例 oper.sh
案例 1：计算（2+3）X4 的值
案例 2：请求出命令行的两个参数[整数]的和 20 50

vim oper.sh
	写入:
	#!/bin/bash
	#案例 1：计算（2+3）X4 的值
	#使用第一种方式
	RES1=$(((2+3)*4))        --->用一个变量RES1接收
	echo "res1=$RES1"
	保存并退出
sh oper.sh

vim oper.sh
	写入:
	#!/bin/bash
	#使用第二种方式, 推荐使用
	RES2=$[(2+3)*4]
	echo "res2=$RES2"
	保存并退出
sh oper.sh	

vim oper.sh
	写入:
	#!/bin/bash	
	#使用第三种方式 expr 
	TEMP=`expr 2 + 3`       
	RES4=`expr $TEMP \* 4` 
	echo "temp=$TEMP"
	echo "res4=$RES4"
	保存并退出
sh oper.sh

vim oper.sh
	写入:
	#!/bin/bash	
	#案例 2：请求出命令行的两个参数[整数]的和 20 50 
	SUM=$[$1+$2]
	echo "sum=$SUM"
	保存并退出
sh oper.sh 20 50
```

#### 条件判断

```shell
1.基本语法：
[ condition ] （注意 condition 前后要有空格）
#非空返回 true，可使用$?验证（0 为 true，>1 为 false）

2.应用实例：
[ hspEdu ]		返回 true 
[ ]				返回 false
[ condition ] && echo OK || echo notok	条件满足，执行后面的语句

3.判断语句：
	常用判断条件：
	(1) = 字符串比较
	(2)	两个整数的比较
		-lt 小于     less than
		-le 小于等于  less equal
		-eq 等于      equal
		-gt 大于      greater
		-ge 大于等于   greater equal
		-ne 不等于     not equal
	(3)	按照文件权限进行判断
		-r 有读的权限
		-w 有写的权限
		-x 有执行的权限
	(4)	按照文件类型进行判断
		-f 文件存在并且是一个常规的文件
		-e 文件存在
		-d 文件存在并是一个目录

4.应用实例：
案例 1："ok"是否等于"ok"
判断语句：使用 =
案例 2：23 是否大于等于 22
判断语句：使用 -ge
案例 3：/root/shcode/aaa.txt 目录中的文件是否存在
判断语句： 使用 -f

代码如下:
vim ifdemo.sh
	#!/bin/bash
	#案例 1："ok"是否等于"ok"
	if [ "ok" = "ok"  ]
	then
	        echo "equal"
	fi                    -----> if语句 以if开头 以fi结尾
	
	#案例 2：23 是否大于等于 22
	#判断语句：使用 -ge
	if [ 23 -ge 22 ]
	then
	        echo "大于"
	fi
	
	#案例 3：/root/shcode/aaa.txt 目录中的文件是否存在
	#判断语句： 使用 -f
	if [ -f  /root/shcode/aaa.txt ]
	then
	        echo "文件存在"
	fi
	
	#看几个案例
	if [ ]
	then
	        echo "存在"
	fi
	
	if [ hspEdu01 ]
	then
	        echo "hello hspEdu01"
	fi
sh ifdemo.sh

输出结果：
	equal
	大于
	hello hspEdu01
```

#### if 语句

```shell
1.基本语法：
if [ 条件判断式 ] 
then
	代码
fi

或者 多分支

if [ 条件判断式 ] 
then
	代码
elif [条件判断式] 
then
	代码
fi

2.注意事项：[ 条件判断式 ]，中括号和条件判断式之间必须有空格

3.应用实例 ifCase.sh
案例：请编写一个 shell 程序，如果输入的参数，大于等于 60，则输出 "及格了"，如果小于 60,则输出 "不及格"
	if [ $1 -ge 60 ]
	then
	        echo "及格了"
	else
	        echo "不及格"
	fi

	或者

	if [ $1 -ge 60 ]
	then
	        echo "及格了"
	elif[ $1 -lt 60]
	then
	        echo "不及格"
	fi
```

#### case 语句

```shell
1.基本语法：

case $变量名 in
"值 1")
如果变量的值等于值 1，则执行程序 1
;;
"值 2")
如果变量的值等于值 2，则执行程序 2
;;
…省略其他分支…

*)
如果变量的值都不是以上的值，则执行此程序
;;
esac

应用实例 testCase.sh
案例1：当命令行参数是1时，输出 "周一", 是2时，就输出"周二"，其它情况输出"other"
vim testCase.sh
	写入：
	#!/bin/bash
	#案例1：当命令行参数是1时，输出 "周一", 是2时，就输出"周二"，其它情况输出"other"
	case $1 in
	"1")
	echo "周一"
	;;
	"2")
	echo "周二"
	;;
	*)
	echo "other..."
	;;
	esac
	保存并退出
	
sh testCase.sh 1
周一
```

#### for 循环

```shell
基本语法：

第一种方式：

for 变量 in  值 1  值 2  值 3… 
do
程序/代码
done

应用实例 testFor1.sh
案例：打印命令行输入的参数 [这里可以看出$*  和 $@ 的区别]
	#!/bin/bash
	#案例：打印命令行输入的参数 [这里可以看出$*  和 $@ 的区别]
	#注意：$* 是把输入的参数当作一个整体，所以只会输出一句话
	for i in "$*"
	do
	        echo "num is $*"
	done
	
	#使用 $@ 来获取输入的参数，注意：也是把输入的参数看作一个整体，但这是分别对待；所以有几个参数就输出几句
	echo "======================================"
	for j in "$@"
	do
	        echo "num is $@"
	done

sh testFor1.sh 100 200 300
num is 100 200 300
======================================
num is 100 200 300
num is 100 200 300
num is 100 200 300

第二种方式：

for (( 初始值;循环控制条件;变量变化 ))
do
程序/代码
done

应用实例 testFor2.sh
案例：从 1 加到 100 的值输出显示
	#!/bin/bash
	#案例：从 1 加到 100 的值输出显示
	#定义一个变量SUM
	SUM=0
	for(( i=1; i&lt;=100; i++  ))
	do
	        SUM=$[$SUM+$i]
	done
	echo "总和SUM=$SUM"

sh testFor2.sh 
总和SUM=5050

如果1加到x x由自己输入
	SUM=0
	for(( i=1; i&lt;=$1; i++  ))
	do
	        SUM=$[$SUM+$i]
	done
	echo "总和SUM=$SUM"

sh textFor2.sh 1000
总和SUM=500500
```

#### while 循环

```shell
基本语法：
while [ 条件判断式 ]
do
程序/代码
done

注意：while 和 [有空格，条件判断式和[  ]也有空格

应用实例：testWhile.sh
案例：从命令行输入一个数 n，统计从 1+..+ n  的值是多少？
	#!/bin/bash
	SUM=0
	i=0
	while [ $i -le $1 ] 
	do
	SUM=$[$SUM+$i]
	#i 自增
	i=$[$i+1]
	done
	echo "执行结果=$SUM"

sh testWhile.sh 100
执行结果=5050
```

#### read 读取控制台输入

```shell
1.基本语法：
read(选项)(参数)
选项：
	-p：指定读取值时的提示符；
	-t：指定读取值时等待的时间（秒），如果没有在指定的时间内输入，就不再等待了
参数：
	变量：指定读取值的变量名

2.应用实例 testRead.sh
案例 1：读取控制台输入一个 NUM1 值
案例 2：读取控制台输入一个 NUM2 值，在 10 秒内输入。代码:

	#!/bin/bash
	#案例 1：读取控制台输入一个 NUM1 值
	read -p "请输入一个数 NUM1=" NUM1 
	echo "你输入的 NUM1=$NUM1"
	
	#案例 2：读取控制台输入一个 NUM2 值，在 10 秒内输入。
	read -t 10 -p "请输入一个数 NUM2=" NUM2 
	echo "你输入的 NUM2=$NUM2"

sh testRead.sh
请输入一个数 NUM1=100
你输入的 NUM1=100
```

#### 函数介绍

```shell
shell 编程和其它编程语言一样，有系统函数，也可以自定义函数。系统函数中，我们这里就介绍两个。
```

#### 系统函数

```sh
1.basename 基本语法
功能：返回完整路径最后 / 的部分，常用于获取文件名
basename [pathname] [suffix]
basename [string] [suffix]	

功能描述：basename 命令会删掉所有的前缀包括最后一个（‘/’）字符，然后将字符串显示出来。
选项：suffix 为后缀，如果 suffix 被指定了，basename 会将 pathname 或 string 中的 suffix 去掉。

案例 1：请返回 /home/aaa/test.txt 的 "test.txt" 部分
basename /home/aaa/test.txt
返回test.txt

如果输入：basename /home/aaa/test.txt .txt
返回test
2.dirname 基本语法
功能：返回完整路径最后 / 的前面的部分，常用于返回路径部分
dirname 文件绝对路径 

功能描述：从给定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分）

案例 1：请返回 /home/aaa/test.txt 的 /home/aaa 
dirname /home/aaa/test.txt
返回/home/aaa
```

#### 自定义函数

```sh
基本语法：
[ function ] funname[()]
&#123;
	Action; 
	[return int;]
&#125;

调用直接写函数名：funname	[值]

案例 1：计算输入两个参数的和(动态的获取) testFun.sh
	#!/bin/bash
	#案例 1：计算输入两个参数的和(动态的获取)
	
	#定义函数 getSum 
	function getSum() &#123;
		SUM=$[$n1+$n2] 
		echo "和是=$SUM"
	&#125;

	#输入两个值
	read -p "请输入一个数 n1=" n1 
	read -p "请输入一个数 n2=" n2
	
	#调用自定义函数
	getSum $n1 $n2

sh testFun.sh 
请输入一个数 n1=10
请输入一个数 n2=90
和是=100
```

## 第二十一章：Linux 高级篇-日志管理

#### 基本介绍

```shell
(1)日志文件是重要的系统信息文件，其中记录了许多重要的系统事件，包括用户的登录信息、系统的启动信息、系统的安全信息、邮件相关信息、各种服务相关信息等。
(2)日志对于安全来说也很重要，它记录了系统每天发生的各种事情，通过日志来检查错误发生的原因，或者受到攻击时攻击者留下的痕迹。
(3)可以这样理解 日志是用来记录重大事件的工具
```

#### 系统常用的日志

```shell
系统日志文件的保存位置：/var/log/ 目录下
应用案例：
使用 root 用户通过 xshell6 登陆，第一次使用错误的密码，第二次使用正确的密码登录成功看看在日志文件/var/log/secure 里有没有记录相关信息
系统常用日志：
```

![image-20221019121939561](/img/cos/image-20221019121939561.png)

日志管理服务rsyslogd

```shell
CentOS7.6 日志服务是 rsyslogd   (rocket-fast system for log)
CentOS6.x 日志服务是 syslogd 
rsyslogd 功能更强大
rsyslogd 的使用、日志文件的格式，和 syslogd 服务是兼容的

rsyslogd是一个后台程序(服务)，来管理/记录/操作相关日志。
将日志记录到对应的文件中。

/etc/rsyslog.conf配置文件中记录了要管理哪些日志和将这些日志记录到哪个文件中。
```

![image-20221019145550645](/img/cos/image-20221019145550645.png)

```shell
1.在进行日志管理时，要保证rsyslogd服务是启动的！

(1)查询 Linux 中的 rsyslogd 服务是否启动
ps aux | grep "rsyslog" 

ps aux | grep "rsyslog" | grep -v "grep"
| grep -v "grep" ---> 筛选出ps aux | grep "rsyslog" 结果中不是grep的

(2)查询 rsyslogd 服务的自启动状态(是否是自启动状态enable)
systemctl list-unit-files | grep rsyslog

2.配置文件：/etc/rsyslog.conf
该配置文件中记录了：日志和日志存放在哪个文件

关于日志：*.*
其中第一个*代表日志类型，第二个*代表日志级别

(1)日志类型分为：
auth					##pam 产生的日志
authpriv				##ssh、ftp 等登录信息的验证信息
corn					##时间任务相关
kern					##内核
lpr						##打印
mail					##邮件
mark(syslog)-rsyslog	##服务内部的信息，时间标识
news					##新闻组
user					##用户程序产生的相关信息
uucp					##unix to nuix copy主机之间相关的通信
local 1-7				##自定义的日志设备

(2)日志级别分为：
debug		##有调试信息的，日志通信最多
info		##一般信息日志，最常用
notice		##最具有重要性的普通条件的信息
warning		##警告级别
err			##错误级别，阻止某个功能或者模块不能正常工作的信息
crit		##严重级别，阻止整个系统或者整个软件不能正常工作的信息
alert		##需要立刻修改的信息
emerg		##内核崩溃等重要信息
none		##什么都不记录	
注意：从上到下，级别从低到高，记录信息越来越少

3.由日志服务 rsyslogd 记录的日志文件，
日志文件的内容：每一行都代表一个事件，每一行有以下四个内容：
1)	事件产生的时间
2)	产生事件的服务器的主机名
3)	产生事件的服务名或程序名
4)	事件的具体信息

4.日志如何查看实例
查看一下 /var/log/secure 日志，这个日志中记录的是用户验证和授权方面的信息 来分析如何查看

5.日志管理服务应用实例（增加自定义的日志）
在/etc/rsyslog.conf 中添加一个日志文件/var/log/hsp.log,当有事件发送时(比如 sshd 服务相关事件)，该文件会接收到信息并保存. 
给小伙伴演示 重启，登录 的情况，看看是否有日志保存

vim /etc/rsyslog.conf 
写入：
	*.*  		/var/log/hsp.log
	保存退出
> /var/log/hsp.log  (创建日志文件)
然后重启，重启事件会被记录到/var/log/hsp.log中
cat hsp.log | grep sshd 	就可以查到信息(sshd远程连接)
```

#### 日志轮替

```shell
日志轮替(logrotate)就是把旧的日志文件移动并改名，同时建立新的空日志文件，当旧日志文件超出保存的范围之后，就会进行删除
清除日志中旧的信息
(1)	centos7 使用 logrotate 进行日志轮替管理
要想改变日志轮替文件名字，通过 /etc/logrotate.conf 配置文件中“dateext” 参数

(2)	如果配置文件中有“dateext”参数，那么日志会用日期来作为日志文件的后缀，例如 “secure-20201010”。
这样日志文件名不会重叠，也就不需要日志文件的改名，只需要指定保存日志个数，删除多余的日志文件即可。

(3)	如果配置文件中没有“dateext”参数，日志文件就需要进行改名了。
当第一次进行日志轮替时，当前的“secure”日志会自动改名为“secure.1”，然后新建“secure”日志， 用来保存新的日志。
当第二次进行日志轮替时，“secure.1” 会自动改名为“secure.2”， 当前的“secure”日志会自动改名为“secure.1”，然后也会新建“secure”日志，用来保存新的日志，以此类推。
```

#### logrotate 配置文件

```shell
/etc/logrotate.conf 为 logrotate 的全局配置文件(写了日志文件轮替规则)

/etc/logrotate.conf中的轮替规则适用于所有日志文件(除了单独指定轮替规则的日志文件)
可以在/etc/logrotate.conf对某些日志文件单独指定轮替规则
也可以把对某些日志文件单独指定的轮替规则写在/etc/logrotate.d目录下，然后在/etc/logrotate.conf 中include调用

/etc/logrotate.conf文件内容：
	# rotate log files weekly--->每周对日志文件进行一次轮替
	weekly
	
	# keep 4 weeks worth of backlogs--->共保存 4 份日志文件，当建立新的日志文件时，旧的将会被删除
	rotate 4
	
	# create new (empty) log files after rotating old ones--->创建新的空的日志文件，在日志轮替后
	create
	
	# use date as a suffix of the rotated file--->使用日期作为日志轮替文件的后缀
	dateext
	
	# uncomment this if you want your log files compressed--->日志文件是否压缩。如果取消注释，则日志会在转储的同时进行压缩
	#compress
	
	#RPM packages drop log rotation information into this directory 
	include /etc/logrotate.d--->可以把一些单独的轮替规则写在/etc/logrotate.d下(在本文件中include调用一下就行)，也可以写在本文件中(如下面写的)
	
	#下面是单独设置，优先级更高。
	# no packages own wtmp and btmp -- we'll rotate them here
	/var/log/wtmp &#123;
		monthly					 # 每月对日志文件进行一次轮替
		create 0664 root utmp 	 # 建立的新日志文件，权限是 0664  ，所有者是 root ，所属组是 utmp 组
		minsize 1M				 # 日志文件最小轮替大小是 1MB 。也就是日志一定要超过 1MB 才会轮替，否则就算时间达到一个月，也不进行日志转储
		rotate 1 				 # 仅保留一个日志备份。也就是只有 wtmp  和 wtmp.1  日志保留而已
	&#125;
	
	/var/log/btmp &#123;
		missingok 				 # 如果日志不存在，则忽略该日志的警告信息
		monthly
		create 0600 root utmp rotate 1
	&#125;
	

	单独指定某个日志文件的轮替规则的参数说明：
		daily					日志的轮替周期是每天
		weekly					日志的轮替周期是每周
		monthly					日志的轮替周期是每月
		rotate 数字				保留的日志文件的个数。0 指没有备份
		compress				日志轮替时，旧的日志进行压缩
		create mode owner group	建立新日志，同时指定新日志的权限与所有者和所属组。
		mail address			当日志轮替时，输出内容通过邮件发送到指定的邮件地址。
		missingok				如果日志不存在，则忽略该日志的警告信息
		notifempty				如果日志为空文件，则不进行日志轮替
		minsize 大小				日志轮替的最小值。也就是日志一定要达到这个最小值才会轮替，否则就算时间达到也不轮替
		size 大小				日志只有大于指定大小才进行日志轮替，而不是按照时间轮替。
		dateext					使用日期作为日志轮替文件的后缀。
		sharedscripts			在此关键字之后的脚本只执行一次。
		prerotate/endscript		在日志轮替之前执行脚本命令。
		postrotate/endscript	在日志轮替之后执行脚本命令。
```

#### 把自己的日志加入日志轮替

```shell
1)	第一种方法：
		直接在/etc/logrotate.conf 配置文件中写入该日志的轮替策略
2)	第二种方法：
		在/etc/logrotate.d/目录中新建立该日志的轮替文件，在该轮替文件中写入正确的轮替策略，因为该目录中的文件都会被“include”到主配置文件中，所以也可以把日志加入轮替。

3)	推荐使用第二种方法，因为系统中需要轮替的日志非常多，如果全都直接写 入/etc/logrotate.conf 配置文件，那么这个文件的可管理性就会非常差，不利于此文件的维护。
```

案例：

```sh
案例：在/etc/logrotate.conf 进行配置, 或者直接在 /etc/logrotate.d/ 下创建文件 hsplog  
编写如下内容,	具体轮替的效果 可以参考 /var/log  下的 boot.log 情况.
/var/log/hsp.log
&#123;
	missingok
	daily
	copytruncate
	rotate 7
	notifempty
&#125;

在 /etc/logrotate.d/ 下创建文件 hsplog  
vim  hsplog  
写入：
	/var/log/hsp.log
	&#123;
		missingok
		daily
		copytruncate
		rotate 1
		notifempty
	&#125;
	保存退出

这样就好了，因为/etc/logrotate.conf 中有：include /etc/logrotate.d
```

日志轮替机制原理：

```shell
日志轮替之所以可以在指定的时间备份日志，是依赖系统定时任务。
在 /etc/cron.daily/目录，就会发现这个目录中是有 logrotate 文件(可执行)，
logrotate 通过这个文件依赖定时任务执行的。

crond定时后台程序会定时执行cron.daily内的文件
logrotate 文件在cron.daily下
所以也会定时执行文件中的轮替规则
写日志是rsyslogd
日志轮替是logrotate
```

查看内存日志

```shell
有一些日志是写到内存里的，还没有写到文件里，因为这些日志是实时变化的
重启之后内存日志会被清空

查看内存日志指令：journalctl
journalctl				查看全部
journalctl -n 3			查看最新 3 条
journalctl --since 19:00	--until 19:10:10	查看起始时间到结束时间的日志可加日期
journalctl -p err		报错日志
journalctl -o verbose	日志详细内容
journalctl _PID=1245 _COMM=sshd	查看包含这些参数的日志（在详细日志查看） 或者 journalctl |	grep sshd
 

注意: journalctl	查看的是内存日志, 重启清空

演示案例:
使用 journalctl | grep sshd	来看看用户登录清空, 重启系统，再次查询，看看日志有什么变化没有
```
