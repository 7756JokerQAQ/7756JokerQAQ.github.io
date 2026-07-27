---
title: "Java基础刷题"
---

<!-- truncate -->
#### 1.继承自 Collection 接口的容器

![img](/img/cos/837161_1488616442711_250E74268F38A4202D8C30E4329DEBCC)

**二.局部内部类可以用哪些修饰符修饰**

局部内部类是放在代码块或方法中的，不能有访问控制修饰符，且不能用static修饰

1、内部类不能被public、private、static修饰；

2、在外部类中不能创建内部类的实例；

3、创建内部类的实例只能在包含他的方法中；

4、内部类访问包含他的方法中的变量必须有final修饰；

5、外部类不能访问局部内部类，只能在方法体中访问局部内部类，且访问必须在内部类定义之后。

![image-20230120205310361](/img/cos/image-20230120205310361.png)

①实例化：是把类创建为对象的过程。格式一般为:｛类名 对象名 = new 类名（参数1，参数2…参数n）构成｝，也就是new对象。

②序列化：将对象的状态信息转换为可以存储或传输的形式的过程(对象转化为字节序列的过程)。序列化期间，对象将其当前状态写入到临时或持久性存储区。

③反序列化:把字节序列恢复为对象的过程称为对象的反序列化。

```plaintext
Data0bject对象中的word和i的值分别为 
  静态成员属于类级别的，所以不能序列化，序列化只是序列化了对象而已，这里“不能序列化”的意思是序列化信息中不包含这个静态成员域，如果测试都在同一个机器（而且是同一个进程），因为这个jvm已经把i加载进来了，所以获取的是加载好的i，即2，如果是传到另一台机器或者关掉程序重新写个程序读入，此时因为别的机器或新的进程是重新加载i的，所以i信息就是初始时的信息，即0。所以，总结来看，静态成员是不能被序列化的，静态成员定以后的默认初始值是0，所以结果i是0 
  一定要注意是在 另外一个jvm中
```

-   Java异常和错误的基类Throwable,包括Exception和Error
-   java是面向对象的，但是不是所有的都是对象，基本数据类型就不是对象，所以才会有封装类的；
-   垃圾回收器并不总是工作，只有当内存资源告急时，垃圾回收器才会工作；
-   即使垃圾回收器工作，finalize方法也不一定得到执行，这是由于程序中的其他线程的优先级远远高于执行finalize（）函数线程的优先级。
    
-   访问权限控制从最大权限到最小权限依次为：public 、protected、包访问权限（默认访问权限）、private
    
-   HttpServletResponse方法调用客户端回应了一个定制的HTTP回应头:response.setHeader(“X-MyHeader”,”34”) response.addHeader(“X-Header”,”34”)
-   局部变量不能用static来修饰

![image-20230120211012620](/img/cos/image-20230120211012620.png)

-   LinkedList是继承自AbstractSequentialList（抽象类，实现了List接口）的，并且实现了List接口。
-   AbstractSet是实现了Set接口的，本身是一个抽象类。继承自AbstractCollection（抽象类，实现了Collection接口）
-   HashSet是继承自AbstractSet，实现了Set接口。
-   WeakMap不存在于java集合框架的。只有一个叫做WeakHashMap（继承自AbstractMap）。

![img](/img/cos/740942_1470042423855_86F5A9F9F791DD7EA7C96F158F0FEA87)

-   方法重载是一个类中定义了多个方法名相同的函数，而他们的参数的数量不同或者数量相同而类型次序不同
-   方法重写是在子类和父类的函数名字相同而且参数的个数与类型一样,返回值也一样的方法,就称为重写(Overriding)，重写是子类与父类的一种多态性表现
-   Threadlocal类解决哈希冲突的开放定址法

### 解决Hash碰撞冲突的四种方法：

**Hash碰撞冲突**

Hash的前提是实现equals()和hashCode()两个方法，那么HashCode()的作用就是保证对象返回唯一hash值，但当两个对象计算值一样时，这就发生了碰撞冲突。[解决Hash碰撞冲突方法总结 - little飞 - 博客园 (cnblogs.com)](https://www.cnblogs.com/little-fly/p/7907935.html?time=1674220763464)

**1.开放地址法**

2.再哈希发

3.链地址发

4.建立一个公共的溢出区

-   off-heap叫做堆外内存，将你的对象从堆中脱离出来序列化，然后存储在一大块内存中，这就像它存储到磁盘上一样，但它仍然在RAM中。对象在这种状态下不能直接使用，它们必须首先反序列化，也不受垃圾收集。序列化和反序列化将会影响部分性能（所以可以考虑使用FST-serialization）使用堆外内存能够降低GC导致的暂停。堆外内存不受垃圾收集器管理，也不属于老年代，新生代。
    

![image-20230123234759250](/img/cos/image-20230123234759250.png)

选择B : 能够读写文件的数据流是`OutputStream`和`InputStream` File能操作文件本身，但是不能对文件进行修改

**监视器** **”monitor”** 是操作系统实现同步的重要基础概念，同样它也用在JAVA的线程同步中， 在语法的表现就是synchronized

![image-20230124000557336](/img/cos/image-20230124000557336.png)

​ A.StringBuilder线程不安全，StringBuffer线程安全。

B.同时用 abstract和final就会自相矛盾。

C.Hashmap中的value可以之null，get(key)==null有两种情况，一是key不存在，二是该key中存的是null，所以应该使用map.containskey(key)返回的true/false来判断是否存在这个key。

D.volatile关键字有两个作用：

1.并发环境可见性：volatile修饰后的变量能够保证该变量在线程间的可见性，线程进行数据的读写操作时将绕开工作内存（CPU缓存）而直接跟主内存进行数据交互，即线程进行读操作时直接从主内存中读取，写操作时直接将修改后端变量刷新到主内存中，这样就能保证其他线程访问到的数据是最新数据

2.并发环境有序性：通过对volatile变量采取内存屏障（Memory barrier）的方式来防止编译重排序和CPU指令重排序，具体方式是通过在操作volatile变量的指令前后加入内存屏障，来实现happens-before关系，保证在多线程环境下的数据交互不会出现紊乱。

![image-20230124002016356](/img/cos/image-20230124002016356.png)

A—————抽象类不一定含有抽象方法，接口中的方法都是抽象方法。接口中的方法默认修饰符有public abstract。

B—————一个类只能继承一个一个抽象类，但可以实现多个接口；一个接口可以继承多个接口。Java里类是单继承的，接口是可以多继承的，用关键字extends。

C—————抽象类和接口中的方法都没有方法体。抽象类中的方法是可以有方法体的。JDK1.8之后，接口中的方法也可以有方法体，用default关键字修饰方法。

D—————抽象类可以含有私有成员变量，接口不含有私有成员变量。接口中的成员变量都是public static final的，一般用作常量。

![image-20230124002205840](/img/cos/image-20230124002205840.png)

-   CountDownLatch 是等待一组线程执行完，才执行后面的代码。此时这组线程已经执行完。
-   CyclicBarrier 是等待一组线程至某个状态后再同时全部继续执行线程。此时这组线程还未执行完。
-   Semaphore 通常我们叫它信号量， 可以用来控制同时访问特定资源的线程数量，通过协调各个线程，以保证合理的使用资源。
-   future表示一个可能还没有完成的异步任务的结果，针对这个结果可以添加Callback以便在任务执行成功或失败后作出相应的操作。

![image-20230124002325820](/img/cos/image-20230124002325820.png)

![image-20230124002545291](/img/cos/image-20230124002545291.png)

![image-20230129094248057](/img/cos/image-20230129094248057.png)

![image-20230129094440920](/img/cos/image-20230129094440920.png)

![image-20230129095038824](/img/cos/image-20230129095038824.png)

-   初始化阶段：调用init方法
-   相应客户端请求：调用service
-   终止：调用destory方法

初始化阶段：在下列时刻servlet容器装载servlet

1.  servlet容器再启动时自动装载某些servlet
2.  在servlet容器启动后，客户首次向servlet发送请求
3.  servlet类文件被更新后重新装载servlet

![image-20230129095403763](/img/cos/image-20230129095403763.png)

![image-20230129100852645](/img/cos/image-20230129100852645.png)

![image-20230129101816282](/img/cos/image-20230129101816282.png)

![image-20230129101635871](/img/cos/image-20230129101635871.png)

在Java中，常用的线程通信方式有两种，分别是利用Monitor实现线程通信、利用Condition实现线程通信。线程同步是线程通信的前提，所以究竟采用哪种方式实现通信，取决于线程同步的方式。

如果是采用synchronized关键字进行同步，则需要依赖Monitor（同步监视器）实现线程通信，Monitor就是锁对象。在synchronized同步模式下，锁对象可以是任意的类型，所以通信方法自然就被定义在**Object**类中了，这些方法包括：wait()、notify()、notifyAll()。一个线程通过Monitor调用wait()时，它就会释放锁并在此等待。当其他线程通过Monitor调用notify()时，则会唤醒在此等待的一个线程。当其他线程通过Monitor调用notifyAll()时，则会唤醒在此等待的所有线程。

JDK 1.5新增了Lock接口及其实现类，提供了更为灵活的同步方式。如果是采用Lock对象进行同步，则需要依赖**Condition**实现线程通信，Condition对象是由Lock对象创建出来的，它依赖于Lock对象。Condition对象中定义的通信方法，与Object类中的通信方法类似，它包括await()、signal()、signalAll()。通过名字就能看出它们的含义了，当通过Condition调用await()时当前线程释放锁并等待，当通过Condition调用signal()时唤醒一个等待的线程，当通过Condition调用signalAll()时则唤醒所有等待的线程。

[以下哪几种方式可用来实现线程间通知和唤醒？_阿里巴巴笔试题_牛客网 (nowcoder.com)](https://www.nowcoder.com/questionTerminal/c6126fd5ba2d40b0bfca35439a6c3563)

![image-20230129103221307](/img/cos/image-20230129103221307.png)

![image-20230129103733515](/img/cos/image-20230129103733515.png)

![image-20230129103808822](/img/cos/image-20230129103808822.png)

![image-20230129104015205](/img/cos/image-20230129104015205.png)

![image-20230203164358837](/img/cos/image-20230203164358837.png)

![img](/img/cos/643412545_1596634989327_DEF638F8839D3C558612E08DC0A11BFF)
