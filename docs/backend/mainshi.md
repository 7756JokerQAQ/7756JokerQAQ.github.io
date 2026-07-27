---
title: "面试题性的总结与回答"
---

<!-- truncate -->
![img](/img/cos/learn/3481/2019061210551736.png)

![image-20230224093155759](/img/cos/learn/3481/image-20230224093155759.png)

### 1\. Java 常用的集合？

-   Collection接口：Set、List
-   Map的接口：map、TreeMap、HashMap、LinkedHashMap、HashTable、ConcurrentHashMap

### 2\. 集合之间有什么区别？

List、set、map是三个接口，List和set继承自collection接口，Map也属于集合系统，与collection不同。

Set不允许元素重复，HashSet和TreeSet是两个主要的实现类，Set只能通过游标来取值，并且值是不能重复的

**AbstractList集合：**

-   list列表是个有序集合、它的直接实现类是Arraylist(直接实现类)，它是线程不同步的，主要以数组的方式建立了一个列表,适合进行遍历和快速查找某一个元素、修改，不适用于删除和在任意位置增加一个元素。
-   LinkedList(间接实现类)它也是线程不同步的列表、但是他是通过列表来实现的、该方法主要用于对元素的增加删除但不适用于遍历。
-   ArrayList线程不同步：实现一个数组，他是以数组的方式实现的List，允许随机存取
-   Vector（直接实现类）他是线程同步的，它实现了一个可增长的对象数组，它也可以实用整数的数组访问元素。

**AbstractSet集合**：

-   Set集合的特点是元素无序的、不允许重复的元素，有且仅有一个空的元素。只是简单的将对象加入到集合中
-   HashSet（直接实现类）它是线程不同步的、他不保证集合的迭代顺序、他不能保证顺序会随着时间不变
-   TreeSet（直接实现类）是线程不同步的，他底层是基于TreeMap实现的,底层结构是个二叉树，它可以给Set集合中的元素进行指定的方式排序保证元素的唯一性的方式。
-   LinkedHashSet(间接实现类) 哈希表和链表的实现集合接口，具有可预测的迭代顺序,这个链表定义了迭代顺序、这是元素插入到集合的顺序（插入顺序）

Set与List的区别：

List基本上都是以Array为基础（LinkedList是以链表存储）但是Set是以HashMap

**AbstractMap集合：**

map是一种键值对集合，键值不能重复值可以重复，Map没有继承于Collection接口从map集合中检索元素市，根据键得到值，对map集合遍历时先得键的set集合，对set集合进行遍历得到相应的值。map的遍历主要时以KeySet（）因为Set具备迭代器可以迭代取出所有的键，再根据get方法获取每一个键值对应的值，KeySet（）迭代后只能通过get（）取Key。entrySet（）它包含映射关系的Set视图（一个关系就是一个键值对）就是把Key—value作为一个整体，一对一对的存放在Set集合中，Map.Entry表示映射关系可以通过e.getKey(),e.getValue（）两种方法取得key和value，返回的是Entry接口。

-   HashMap直接（实现类）优点访问速度快，无顺序的保存元素。
-   HashTable 不允许有null，HashMap允许
-   HashTable有一个Enumeration遍历，HashMap是Iterator迭代器遍历
-   HashTable有一个contains()方法功能和containsValue（）功能一样；
-   HashTable中的hash数组默认的默认大小11增长方式是old\*2+1;HashMap中hash数组默认大小是16一定是2的指数
-   哈希值的使用不同，hashtable直接使用对象的hashcode而hashmap重新计算hash值

### 3.集合之间有什么转换关系？

数组转集合使用asList（）方法需要注意：

-   如果传入的是一个数组一定得是引用类型才能将其转换为List集合
-   无法对集合进行修改操作，否则会报错
-   仅仅局限于一维数组系列

**集合转数组**： 必须是包装类型的数组

JDK8可以用stream API可以很容易解决

**原生数组、包装类型的数组互转：** **包装类数组与list集合互转**

```java
// int<---->Integer<---->List
//原生数组转包装类型的数组：
int[] nums = {1,2,4,3,3,3,4,2,5,5,5,5,6,6,6,7,8,9,10};
Integer[]boxdNums=Arrays.stream(nums).boxed().toArray(Integer[]::new);
//包装类型转换为原生类型的数组
int[] arrs = Arrays.stream(boxdNums).mapToInt(Integer::intValue).toArray();
//包装类数组转为List/ArraysList：Arrays.asList
List<Integer>listInteget=Arrays.asList(boxdNums);
//List/ArrayList转包装类数组    .toArray(new Integer[])
Integer[] arrayInter2 = listInter.toArray(new Integer[listInter.size()]);
/**
* String<------->List
*/
 	    List<String> listStringStr = new ArrayList<String>();
        listStringStr.add("str1");
        listStringStr.add("str2");
        int size = listStringStr.size();
        String[] arr = (String[]) listStringStr.toArray(new String[size]);//使用了第二种接口，返回值和参数均为结果
        List<String> strings = Arrays.asList(arr);
//集合转数组 toArray()
//使用toArray()是要注意，有参方法和无参方法，一般都选择使用有参方法， 
//无参方法返回的是一个Object类型数组，
// 即使集合携带泛型。所以用如果使用无参方法会面临数据类型转换，相对更加麻烦。
List<Integer> listIntegerStr = new ArrayList<>();
        listIntegerStr.add(1);
        listIntegerStr.add(2);
        // 方式一
        Integer[] arrays = new Integer[listIntegerStr.size()];
        listIntegerStr.toArray(arrays);
        // 方式二
        Integer[] arrays_00 = listIntegerStr.toArray(new Integer[0]);
        //方式三 不推荐
       Object[] objects = listIntegerStr.toArray();
```

**比较器是什么？方法**

Comparable和Comparator接口

-   对于Comparable 接口来说就有一个CompareTo（）方法只有一个参数，返回值为int
-   对于Comparator接口称为比较器包含一个compare（）方法返回值与CompareTo（）一样不同的是Comparator接口一般不会被集合元素类所实现，而是单独的使用或者在匿名内部类中使用，比较器不仅用于比较大小还用于排序只需要将Comparator传递给sort方法。

**基本数据类型和引用数据类型的区别**

![img](/img/cos/learn/3481/a610ff04860149ccbc3e55732f042526.png)

每一个基本数据类型都会对应一个包装类型

**装箱和拆箱**

装箱：把基本数据类型转换成对应的包装类型

拆箱：把包装类型转换为基本的数据类型

java是一个面向对象的语言，而基本数据类型不具备面向对象的特点。

**String、StringBuild和Stringbuffer的区别：**

-   String是Immutable类的基本实现声明了final class 因为它的不可变性，拼接字符串是会出现很多无用的中间对象，如果频繁的操作对性能有些影响。
-   StringBuffer就是为了解决大量的字符串拼接产生的中间变量而提供的一个类，其中append方法和add方法，它的本质是个线程安全的可修改的字符串序列，牺牲了部分性能它的方法都加上了synchronized方法
-   StringBuilder是JDK1.5发布的 去掉了线程安全的部分减少了开销
-   Stringbuffer和StringBuilder都继承了Abstract StringBuilder 底层都是可以修改的char数组JDK9 以后是byte数组
    
    **java 基本数据类型、包装类、字符串、数组之间的类型转换**
    

![img](/img/cos/learn/3481/8ff5f5752eb1446eac015180987cbbb3.png)

**优雅的将List集合转为Set集合：**

```java
/*
list集合和set集合的区别
两者都集成了Collection
list是有顺序的所以它的值是可重复的
list的数据结构是线性结构所以他在遍历的时候特别快
set是无序的不能够插入重复的元素
Set的数据结构是哈希表所以在频繁添加或移除元素的业务场景下特别有优势
*/
//xxx.stream().collect(Collectors.toSet());
	@Test
	public void lisToSetTest() {
		
		List<String> list = new ArrayList<String>();
		list.add("A");
		list.add("A");
		list.add("B");
		Set<String> set = new HashSet<String>();
		set = list.stream().collect(Collectors.toSet());
		System.out.println(set);
	}
//第二种方法
Set<Integer> setFromList = new HashSet<>(list);

//set转为list集合
List list=Stream.of(set.toArray(new String[0])).collect(Collectors.toList());
List<Integer> listFromSet = new ArrayList<>(set);
List<Integer> hashSetList = new ArrayList<Integer>(hashSet);
List<Integer> linkedHashSetList = new ArrayList<Integer>(linkedHashSet);
```

**List转为Map**

先把集合转为流，在调用流的归并操作collect方法。collect方法的参数通过调用Collectors.toMap（）方法获取该方法的两个参数为两个Function类型的对象分别代表根据List中生成的Map的key和value策略

### 4\. Stream流的方法？

特点：不是数据结构，不会保存数据。不会修改原来的数据源，它的将操作后的数据保存到另一个对象中。惰性求值，流在中间处理过程中，只对操作进行记录，并不会立即执行

**分类**

![img](/img/cos/learn/3481/13170952_625693608975b29303.png)

无状态：指元素的处理不受之前元素的影响；

有状态：指该操作只有拿到所有元素之后才能继续下去

非短路操作：指必须处理所有元素才能得到的最终结果

短路操作：遇到某些符合条件的元素就能得到最终的结果如A||B只要A为Treu则无需判断B的结果

**流的创建方法：**

```java
List<String> list = new ArrayList<>();
Stream<String> stream = list.stream(); //获取一个顺序流
Stream<String> parallelStream = list.parallelStream(); //获取一个并行流
//使用Arrays 中的stream()方法，将数组转成流
Integer[] nums = new Integer[10];
Stream<Integer> stream = Arrays.stream(nums);
```

Stream中的静态方法：of() 、iterator（）、generate（）

-   使用BufferedReader.line（）方法将每行内容转换为流

```java
BufferedReader reader = new BufferedReader(new FileReader("F:\\test_stream.txt"));
Stream<String> lineStream = reader.lines();
lineStream.forEach(System.out::println);
```

-   使用Pattern.splitAsStream（）方法将字符串分割成流

```java
Pattern pattern = Pattern.compile(",");
Stream<String> stringStream = pattern.splitAsStream("a,b,c,d");
stringStream.forEach(System.out::println);
```

**流的中间操作**

-   filter（）：过滤流中的某些元素
-   limit（）：获取n个元素
-   skip（）：跳过n个元素配合limit可以实现分页
-   distinct：通过流中的元素hashCode（）和equls（）去除重复元素

**映射**

-   map：接收一个函数作为参数，该函数可以被应用到每个元素上，并将其映射成一个新的元素
-   flatMap：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有的流连接成一个流

```java
List<String> list = Arrays.asList("a,b,c", "1,2,3");
 
//将每个元素转成一个新的且不带逗号的元素
Stream<String> s1 = list.stream().map(s -> s.replaceAll(",", ""));
s1.forEach(System.out::println); // abc  123

Stream<String> s3 = list.stream().flatMap(s -> {
    //将每个元素转换成一个stream
    String[] split = s.split(",");
    Stream<String> s2 = Arrays.stream(split);
    return s2;
});
s3.forEach(System.out::println); // a b c 1 2 3
```

**排序**

-   sort（）：自然排序，流中元素需要实现Comparable接口
-   sorted（Comparator com）：定制排序，自定义Comparator排序器

```java
List<String> list = Arrays.asList("aa", "ff", "dd");
//String 类自身已实现Compareable接口
list.stream().sorted().forEach(System.out::println);// aa dd ff
 class Student{
     String a;
     int b;
 }
List<Student> studentList = Arrays.asList(s1, s2, s3, s4);

//自定义排序：先按姓名升序，姓名相同则按年龄升序
studentList.stream().sorted(
        (o1, o2) -> {
            if (o1.getName().equals(o2.getName())) {
                return o1.getAge() - o2.getAge();
            } else {
                return o1.getName().compareTo(o2.getName());
            }
        }
).forEach(System.out::println);
```

peek：如同于map，能得到流中的每一个元素。但map接收的是一个Function表达式，有返回值；而peek接收的是Consumer表达式，没有返回值

allMatch：接收一个 Predicate 函数，当流中每个元素都符合该断言时才返回true，否则返回false

-   noneMatch：接收一个 Predicate 函数，当流中每个元素都不符合该断言时才返回true，否则返回false
-   anyMatch：接收一个 Predicate 函数，只要流中有一个元素满足该断言则返回true，否则返回false
-   findFirst：返回流中第一个元素
-   findAny：返回流中的任意元素
-   count：返回流中元素的总个数
-   max：返回流中元素最大值
    
-   min：返回流中元素最小值
    

```java
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
 
boolean allMatch = list.stream().allMatch(e -> e > 10); //false
boolean noneMatch = list.stream().noneMatch(e -> e > 10); //true
boolean anyMatch = list.stream().anyMatch(e -> e > 4);  //true
 
Integer findFirst = list.stream().findFirst().get(); //1
Integer findAny = list.stream().findAny().get(); //1
 
long count = list.stream().count(); //5
Integer max = list.stream().max(Integer::compareTo).get(); //5
Integer min = list.stream().min(Integer::compareTo).get(); //1
```

-   collect：接收一个Collector实例，将流中元素收集成另外一个数据结构。

### 5\. 多线程的理解?

线程是进程的执行单位、在程序中、线程是独立的、并发的执行流

线程的特点：

1.  每个线程都有自己的堆栈，程序计数器、局部变量、体现了线程的独立性
2.  相同父进程下的所有线程共享进程独立的内存单元（eg：代码段、进程的共有数据），为此可以实现线程的相互通信(动态性)
3.  多个线程之间可以并发进行、互不影响.（并发性）

### 6\. 什么时候用到多线程？

1.  当需要同时执行多个任务的时候（高并发）
2.  当需要在不影响其他部分的情况下执行大量的计算时候（后台处理大量的任务）
3.  当需要并行执行多个网络操作时

对于**处理时间短的服务**或者**启动频率高**的要用单线程，相反用多线程

### 7.线程怎么用？

1.  创建一个线程类，继承Thread类或者实现Runnable接口，这个类就成为了一个线程类
2.  重写run（）方法：在这个线程类中，重写run（）方法，该方法是线程执行的入口，定义线程执行操作
3.  创建线程实例：创建线程实例并调用start（）方法启动线程
4.  线程执行：线程启动后会自动调用run（）方法中的定义操作，执行线程
5.  线程控制：在执行过程中可以使用线程控制方法如:sleep() 、yield（）、join（）等方法

```java
class MyThread extend Thread{
    public void run(){
        System.out.println("MyThread running");
    }
}

class MyThread implments Runnable{
    public void run(){
        System.out.println("MyRunnable running");
    }
}
public class Main(){
      public static void main(String args[]) {
      // 创建线程类实例
      MyThread t1 = new MyThread();
      // 创建线程实例，并启动线程
      Thread t2 = new Thread(new MyRunnable());
      t1.start();
      t2.start();
   }
}
```

### 8\. run方法和start方法有什么区别?

-   run()方法是线程的执行体、是线程执行的代码块，如果直接调用run（）方法，那么该方法会在当前线程中执行，而不是创建一个线程。
-   Start（）方法用于启动一个新的线程，启动线程的同时能够自动的调用run（）方法，在新的线程中执行线程操作。

所以两者的区别为：start（）方法是用于启动新的线程、而run（）方法是用于定义线程执行的操作。

```java
class MyThread extends Thread {
   public void run() {
      for (int i = 0; i < 10; i++) {
         System.out.println("Thread running: " + i);
      }
   }
}

public class Main {
   public static void main(String[] args) {
      // 创建线程实例
      MyThread t = new MyThread();

      // 直接调用run()方法
      t.run();

      // 调用start()方法，启动新线程
      t.start();
   }
}
```

### 9.谈谈对spring的理解

他是一个开源的java程序框架，它基于IOC（控制反转）和AOP（面向切面编程）的开发模式，便于系统程序的开发以及维护，它主要特点是**轻量级**（低侵入、低耦合）的开发

-   Core Container：包含核心容器和依赖注入功能，提供了BeanFactory、ApplicationContext等容器和Bean，Bean的生命周期、属性注入等相关功能
-   AOP提供了面向切面的编程，可以通过配置来实现日志记录，性能监控，事务管理等横向领域从而提高系统的可重用性和可维护性
-   Data Access/Intergration：提供了对数据库访问和继承的支持包括JDBC、ORM、NoSQL等数据库
-   Web：提供了对Web开发的支持、包括MVC、REST、Web服务和WebSocket等
-   Test：提供了对单元测试和集成测试的支持

Spring框架的核心是IOC容器，IOC容器负责对象的实例化、配置和管理对象（Bean）、并将它们之间的依赖关系进行注入。spring框架通过IOC容器实现了高度的可重用性和松耦合性、只需要关心Bean的定义和依赖关系的配置，不需要关心他如何被创建和管理

另外AOP功能可以将日志、安全、事务等与核心业务逻辑分离使得系统更加容易被维护和扩展。

IOC执行流程：

1.  读取标注的配置文件，找到配置信息对应的类名
2.  使用反射API，基于类名进行实例化对象
3.  将对象实例，通过构造函数或者setter传递给所实例化的对象

AOP编程：

```java
package service;
 //在 Packge【service】下创建 【ProductService】类：
public class ProductService {
    public void doSomeService(){
        System.out.println("doSomeService");
    }
}
//在xml文件中装配该bean
<bean name="productService" class="service.ProductService" />
//在【TestSpring】中编写测试代码在 Packge【aspect】下准备日志切面 【LoggerAspect】类：
package aspect;
 
import org.aspectj.lang.ProceedingJoinPoint;
 
public class LoggerAspect {
    
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("start log:" + joinPoint.getSignature().getName());
        Object object = joinPoint.proceed();
        System.out.println("end log:" + joinPoint.getSignature().getName());
        return object;
    }
}
```

在xml文件中声明业务对象和日志切面

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
   http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
   http://www.springframework.org/schema/aop
   http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
   http://www.springframework.org/schema/tx
   http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
   http://www.springframework.org/schema/context
   http://www.springframework.org/schema/context/spring-context-3.0.xsd">
 
    <bean name="productService" class="service.ProductService" />
    <bean id="loggerAspect" class="aspect.LoggerAspect"/>
 
    <!-- 配置AOP -->
    <aop:config>
        <!-- where：在哪些地方（包.类.方法）做增加 -->
        <aop:pointcut id="loggerCutpoint"
                      expression="execution(* service.ProductService.*(..)) "/>
 
        <!-- what:做什么增强 -->
        <aop:aspect id="logAspect" ref="loggerAspect">
            <!-- when:在什么时机（方法前/后/前后） -->
            <aop:around pointcut-ref="loggerCutpoint" method="log"/>
        </aop:aspect>
    </aop:config>
</beans>
```

### 10\. spring 的 bean 是什么时候初始化的？

Bean的初始化可以分为以下几个阶段：

1.  实例化bean对象：容器根据bean的配置信息创建bean实例，可以通过构造函数或工厂方法来实现
2.  设置bean的属性值：容器将bean的属性值注入到bean实例中、可以通过依赖注入或者其他方式来实现
3.  调用bean的初始化方法：容器调用bean实例的初始化方法可以通过实现InitializingBean接口在配置文件中指定init-method方法来实现
4.  使用bean：容器将初始化后的bean实例返回给调用者，调用者可以使用该实例来完成相应的业务逻辑

大概就是：spring容器启动时，先扫描配置文件或者注解，实例化bean对象，并将bean注册到容器中，当调用bean时，容器会根据bean的依赖关系和初始化顺序来初始化bean；需要注意的是如果bean实现了DisposableBean接口或在配置文件中指定了destroymethod方法当容器关闭的时候，会调用bean实例的销毁方法来释放资源

在Spring容器启动时，会扫描配置文件或注解，实例化bean对象，并将bean注册到容器中，在默认情况下，Spring只会在使用到某个bean时进行初始化，即懒加载模式，而不是一次性初始化所有的bean，这样可以节约系统资源和提高应用程序的启动速度。不过也可以将所有的bean在启动时初始化，只需要在配置文件中加入lazy-init属性为false 或者在bean的配置中设置@lazy注解为false来改变Bean的初始化方式。

### 11\. spring的bean默认是单例还是多例的

默认时单例的，也就是说Spring容器在启动的时候会创建Bean的唯一实例，并在后续的请求中共享该实例，这样可以减少程序中对象的创造次数和销毁次数，提高效率，对于单例的bean，Spring容器在启动时就会将Bean实例化并缓存起来，每次请求后缓存中的Bean，因此单例的Bean需要注意线程安全问题，尤其是在多线程的情况下需要进行合适的同步处理，否则会导致并发访问的问题

他也支持多例Bean，即每次请求都会创建一个新的Bean，对于多例的Bean容器不会缓存Bean实例而在每次请求时创建一个新的实例。如果需要使用多例可以在Bean配置文件中或者注解中设置scope属性为prototype

### 12\. 对事务的理解？

就是指作为一个单独的逻辑工作单元执行一系列的操作，要么所有的操作全部执行成功，要么其中一步或者多步操作执行失败全部回滚到事务开始的状态，不会出现部分执行成功部分执行失败的场景，它可以保证数据的一致性。

在关系数据库中事务由一组SQL语句组成，可以通过提交commit或者回滚（rollback）来进行事务对数据库的操作：

-   原子性：事务是一个原子的操作，要么全部执行成功，要么全部回滚，是个不可再分的单元
-   一致性：事务执行前和执行后，数据库必须处于一致的状态，在执行事务期间，所有的操作结果都是符合预期的规则和约束
-   隔离性：多个事务的执行是相互隔离的，不会相互影响；
-   持久性：一旦事务提交成功，其所作的修改是永久保存在数据库中，并能够在数据库重启后恢复

在spring框架中事务通常使用声明式事务管理来实现在方法或者类的上面添加@Transaction注解。事务的隔离级别：读未提交、 读提交、可重复读、序列化

-   脏读：读取了另一个事务的未提交数据。
    
-   不可重复读：多次读取统一数据的结果不一致，该数据被另一个事务更新并提交了
    
-   幻读：多次查询的结果不一致，后查询的结果比之前增加或者减少了数据
    

### 13\. java中事务的回滚

编程式可以使用TransactionTemplate 可以调用其execute方法执行事务逻辑并用tryCache来捕获异常，通过setRollbackOnly方法来标记回滚

```java
@Autowired
private TransactionTemplate transactionTemplate;

public void doTransaction() {
    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
        @Override
        protected void doInTransactionWithoutResult(TransactionStatus status) {
            try {
                // 在这里执行事务操作
                // 如果发生异常，则抛出异常
            } catch (Exception e) {
                status.setRollbackOnly(); // 标记回滚
            }
        }
    });
}
```

注解式：可以声明事务的级别 isolation来进行事务的管理方式

```java
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
public void doTransaction() {
    // 在这里执行事务操作
    // 如果发生异常，则抛出异常
}
```

### 14\. springboot项目中 controller层接收前端的参数传递

1.  通过@RequestParam注解接收参数

```java
@RequestMapping(value = "/hello")
public String hello(@RequestParam("name") String name, Model model) {
    model.addAttribute("name", name);
    return "hello";
}
//该方法@RequestParam注解将name参数绑定到name方法的参数上
```

1.  通过@PathVariable注解接收路径的参数实例如下：

```java
@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
public User getUserById(@PathVariable("id") Long id) {
    return userService.getUserById(id);
}
```

1.  通过RequestBody注解接收请求体的参数

```java
@RequestMapping(value="/users",method=RequestMethod.POST)
pubilc void createUser(@RequestBody User user){
    userService.createUser(user);
}
//上面的例子中，通过@RequestBody注解将请求体中的JSON/XML格式的参数绑定到User对象上。
```

1.  通过@RequestHeader注解接收请求头的参数

```java
@RequestMapping(value = "/hello")
public String hello(@RequestHeader("User-Agent") String userAgent, Model model) {
    model.addAttribute("userAgent", userAgent);
    return "hello";
}
```

### 15\. SpringMVC执行流程？

![img](/img/cos/learn/3481/5220087-3c0f59d3c39a12dd.png)

1.  用户发送请求到前端控制器DispacherServlet
2.  DispacherServlet收到请求调用处理器映射器HandlerMapping
3.  处理器映射器根据请求的url找到具体的处理器，生成处理器执行链HandlerExecutitonChain(保括处理器对象和处理器拦截器)一并返回给DisptcherServlet
4.  DispatcherServlet根据处理器Handler获取处理适配器HandlerAdapter执行HandlerAdapter的一系列操作，如参数封装，数据格式转换，数据的验证等操作
5.  执行处理器Handler（Controller也叫做页面控制器）
6.  Handler执行完成后返回ModelAndView
7.  HandlerAdapter将Handler执行的结果ModelAndView返回到DispacherServlet
8.  DispacherServlet将ModelAndView传给ViewReslover视图解析器
9.  ViewReslover解析后返回具体的View
10.  DispacherServlet对View进行渲染视图（即将模型数据model填充至视图）
11.  DispatcherServlet相应用户

[https://www.jianshu.com/p/8a20c547e245](https://www.jianshu.com/p/8a20c547e245)

```java
1.客户端发送请求到DispatcherServlet；
//客户端通过浏览器向Web应用程序发送请求，请求到达Web容器（如Tomcat），Web容器通过Servlet规范将请求交给DispatcherServlet处理。

2.DispatcherServlet 根据请求的URL调用HandlerMapping，找到对应的Handler（Controller）；
//DispatcherServlet通过HandlerMapping（通常是RequestMappingHandlerMapping）找到对应的Handler（Controller）。HandlerMapping将请求映射到对应的Controller方法上，根据注解（如@RequestMapping）或配置文件（如XML）中的信息来确定对应的Controller方法。
3.Handler执行业务逻辑，返回ModelAndView对象；
//DispatcherServlet调用找到的Controller方法，并将请求参数（如URL参数或请求体）传递给Controller方法。Controller方法执行业务逻辑，然后返回一个ModelAndView对象，其中包含要渲染的视图名称和模型数据。
    
4.DispatcherServlet根据ViewResolver找到ModelAndView对象对应的View；
//DispatcherServlet将ModelAndView对象传递给ViewResolver，ViewResolver根据配置找到对应的View。ViewResolver可以使用多种类型的视图解析器（如InternalResourceViewResolver、VelocityViewResolver等），每种视图解析器对应一种视图类型。
5.View将模型渲染成HTML，返回给客户端。
//View将模型数据渲染成HTML，返回给DispatcherServlet，DispatcherServlet将HTML返回给客户端，客户端浏览器显示HTML。
```

### 16\. 如何理解前后端分离

前后端分离是一种应用架构模式，将web应用程序的前端和后端分离成两个工程，他们通过接口通信，前端和后端可以使用不同的编程语言进行开发从而提高开发效率，分离架构模式包括：

1.  前端端开发人员使用HTML、CSS、JavaScript等技术栈，开发Web应用程序界面和交互逻辑，前端程序运行在web浏览器上。
2.  后端使用java、python、Node.s等编程语言开发web应用程序的业务逻辑和数据处理路逻辑，后端运行在Web服务器上。
3.  接口设计：前后端开发人员协商并设计接口、接口定义了前后端应用程序之间的数据传输格式和协议，可以使用RESTful API接口来实现。
4.  接口开发：后端根据接口设计，开发接口端的服务，提供前端应用程序访问后端数据和服务能力
5.  前端集成：前端开发人员将接口集成到前端应用程序中，使用Ajax等技术从后端获取数据

### 17\. mybatis和mybatisplus的区别

**mybaits**

1.  没有第三方依赖的数据访问框架、封装了JDBC底层访问数据库的细节。
2.  解除了SQL语句与代码的耦合，提供了DAO（数据库访问层），将业务逻辑和数据访问逻辑分离
3.  使用原生的SQL语句来完成数据库的访问，可以用xml文件或者注解的方式编写SQL语句，方便维护、优化和统一性管理
4.  所有的SQL语句都是自己写的，这导致过渡的依赖数据库SQL语句，移植性差
5.  支持驼峰命名映射xml文件设置对象和数据库字段映射
6.  手动解析，实体关系映射转换为mybatis内部对象，然后注入容器进行操作
7.  不支持lambd形式调用
8.  xml文件编写SQL语句方式，不适合重载，不支持DAO类方法的重载，因为xml标签中的id唯一
9.  xml文件提供了动态SQL标签支持动态编写SQL

**Mybatis-plus**

-   一键移植：可以在mybaits基础上进行扩展，只做增强不做改变
-   损耗小：内置了基本的单表CRUD语句，性能无损耗，面向对象操作
-   通用的CRUD操作，内置的CRUD方法是通用的泛型接口，DAO类需要实现BaseMapper接口、实体类需要序列化，Service类同样有相应的泛型接口。
-   自动解析：实体关系映射转换为Mybatis内部对象，然后注入容器操作
-   支持Lambda调用
-   可以预防SQL注入：内置SQL注入剥离器，有效预防SQL注入攻击

[https://juejin.cn/post/7152141448321138718](https://juejin.cn/post/7152141448321138718)

-   Mybatis-plus式mybatis的升级版，mybatisplus在增加了支持lambda形式调用并在实体类配置中添加了：@TableName(value=””)、@TableId(value=””)、@TableField（value=””）等三个注解用来映射数据库表及表字段与实体类的关系。
-   增加了：主键策略、分页插件、全局拦截插件、性能分析插件等。

### 18\. mp的查询怎么做比较多？

-   条件构造器：使用MP提供的Wrapper类通过条件构造查询条件进行查询，Wrapper类中封装了常用的查询条件方法，例如eq、ne、like、in等可以根据需要自由的组合查询条件
-   分页查询，mp提供分页查询工具Page机型分页查询
-   Lambda查询：使用lambda表达式进行查询可以实现类型安全的查询，需要传入一个实体
-   Chain查询：使用链式调用的方法进行查询可以简化查询语句提高代码的可读性

### 19\. mp可以做多表的联合查询吗？

可以在xml文件中书写对应的sql语句然后注入对应的方法

也可以在@Select方法中直接编写SQL语句注入

### 20\. 对索引的理解？什么情况下需要建立索引？

可以将索引当作字典的目录，我们查询数据就是根据索引建立起来的目录进行查找，常规的SQL表如果不定义索引（默认主键也就是索引）会进行全表扫描浪费性能，所以一般来书索引能优化性能。

索引的分类：

1.  主键索引，是特殊的唯一索引
2.  普通索引也成为单列索引
3.  组合索引
4.  唯一索引
5.  全文索引

根据数据结构分类：哈希索引、数组索引、B+树索引

根据物理存储分类：聚簇索引和非聚簇索引

建立索引的情况：

-   索引不是越多越好，维护起来耗费空间和性能
-   对于数据量少的不建立索引
-   对于频繁查找的，数据量大的字段建立索引
-   给频繁作为排序和分组的字段建立索引
-   给条件表达式中经常用到不同值的列添加索引

### 21\. 慢查询指令

慢查询是用来记录或分析MySQL数据库中执行时间超过一定阈值的查询语句，可以通过以下几种方式启动或者配置慢查询指令：

-   `set global slow_query_log='ON';`开启慢查询日志功能
-   `set global slow_query_log_file=<some file name>`；设置慢查询日志文件的路径和名称
-   `set global long_query_time =<some value>` ;设置慢查询的阈值，单位为秒
-   `set global log_queries_not_using_index='ON'`;记录没有使用索引的查询语句

在my.cnf或者my.ini配置文件中添加以下选项

-   `log_slow_queries=1` ;开启慢查询日志功能
-   `slow_query_log_file = <some file name>;` 设置慢查询日志文件的路径和名称。
-   `long_query_time = <some value>;` 设置慢查询的阈值，单位为秒。
-   `log_queries_not_using_indexes = 1;` 记录没有使用索引的查询语句。

### 22\. 单句sql如何判断是否走了索引？

可以使用EXPLAIN关键字判断是否走索引，他是个模拟过程，实际上并不执行，它可以用来查看MYSQL执行查询时的执行计划、包括表的链接方式，使用索引、扫描的行数

```sql
EXPLAIN SELECT id FROM user;
```

![image-20230225154315271](/img/cos/learn/3481/image-20230225154315271.png)

执行上述语句会放回详细的查询计划信息：包括使用的索引、扫描的行数、连接方式等，其中的key表示索引，如果为NULL则未使用索引；

### 23.数据库的锁？

![一张图彻底搞懂 MySQL 的锁机制](/img/cos/learn/3481/Zu4vlv7L2S.png!large)

按照锁的类型分为表锁、行锁、页锁

-   表锁：
    -   读锁：也叫做共享锁，针对同一份数据多个读操作可以同时进行互不影响(select)
    -   写锁：排他锁，当前操作没完成之前会阻塞其他读和写操作（update\\insert\\delete）
    -   默认存储引擎：MyISAM
    -   特点：对整张表加锁，开销小、加锁快、无死锁、所得粒度大、发生锁的冲突概率大并发性低
-   行锁：
    -   读锁：共享锁，允许一个事务去读一行，组织其他事务获得相同数据集的排他锁
    -   写锁：排它锁，允许获得排他锁的事务更新数据，阻止其他事务取得相同数据集的共享锁和排它锁
    -   意向共享锁：一个事务给另一个数据行加共享锁时必须先获得表的IS锁
    -   意向排他锁：一个事务给一个数据行加排它锁时必须先获得该表的IX锁
    -   默认存储引擎：InnoDB
    -   特点：对一行数据加锁、开销大、加锁慢、会出现死锁、锁的粒度小、发生锁冲突概率最低、并发性高
    -   带来问题：读未提交、脏读、不可重复度、幻读
-   页锁
    -   开销、加锁时间和锁粒度介于表锁和行锁之间，会出现死锁，并发处理能力一般

![一张图彻底搞懂 MySQL 的锁机制](/img/cos/learn/3481/ZEw4DFkZI2.png!large)

悲观锁：是指在访问数据之前先对数据加锁，防止其他事务修改数据，直到当前事务完成才释放锁。悲观锁适合写多读少的场景，可以避免脏读、不可重复读和幻读等问题，但是会降低数据库的并发性能，增加死锁或超时的风险。

乐观锁：是指在访问数据时不加锁，而是在提交更新时检查是否有其他事务修改了数据。乐观锁适合读多写少的场景，可以提高数据库的效率和吞吐量，但是会增加程序的复杂度，可能导致数据丢失或重试失败。

### 24\. 锁和锁的冲突通常发生在？

1.  并发的访问相同数据：当多个事务并发访问相同数据时，由于每个事务都需要独占访问权限就可能产生锁冲突
2.  长事务：当一个事务长时间占用资源而没有释放的时，其他事务可能因为等待该事务而产生锁冲突
3.  数据库死锁：当多个事务等待对方释放资源的时候，就可能产生死锁，导致所有的事务无法继续执行。

采取措施：

-   优化SQL语句尽量减少对数据库的访问次数，减少锁的竞争机会
-   提高事务的执行效率：减少事务的执行时间、降低锁的冲突概率
-   降低事务的隔离级别：降低事务的隔离级别可以减少锁的竞争，但是也会降低数据的一致性和完整性
-   使用分布式锁：在分布式系统中，可以使用分布式锁来避免锁和锁的冲突产生

### 25.后端接口性能优化

1.  善于利用异步编程
    
    -   利用多线程实现异步 ：使用自定义的TreadPool来实现多线程或者CompletableFuture
        
    -   使用MQ中间件实现异步如分布式消息的中间件：rabbitMQ，kafka等
        
2.  数据量大的时候使用分批与分量操作
    
    -   避免for中操作数据库可以使用Mybatis-plus封装好的批处理API
    -   避免在for中进行rpc调用
3.  避免大事务
    
    -   ​ 尽量少使用@Transactional注解，推荐使用编程式的事务
4.  优化SQL慢查询
    
    -   关键词建立索引并且用上索引
    -   SQL复杂且慢可以使用java代码来实现对应逻辑
    -   对数据库进行分表管理
    -   旧数据访问较少可以对数据进行冷热分离
5.  利用Redis作为分布式缓存
    
6.  利用Caffeine作为本地缓存
    
7.  控制好锁的粒度：锁的粒度太大能影响系统的吞吐量
    

当一个接口相应特别慢的时候可以从：

1.  查看系统资源的占用情况CPU、内存、磁盘、和网络看是否需要升级
2.  分析数据库查询的性能：查看数据库的查询日志、执行计划、索引的实行情况确定是否存在慢查询和索引失效等问题
3.  分析日志和监控数据：通过查看系统日志和监控数据，找出异常情况和系统瓶颈进而进行优化

### 26\. 什么时候用缓存？Redis是什么数据库？数据存储在哪里

缓存通常使用在：

-   数据频繁的被访问
-   数据不经常变动
-   数据量较大

Redis是一个基于内存的数据存储系统，它支持多种数据结构、它的本质是个Key—value键值对进行存储，他提供了数据的持久化、事务、发布订阅、Lua脚本、Redis是一个高性能得数据库、被使用在WEb应用程序、分布式系统、缓存系统等

Redis数据存储在内存中、可以通过RDB和AOF两种持久化方式将数据写入磁盘防止数据丢失、Redis也支持主从复制和哨兵机制，可以实现高可用性和数据备份等功能。

### 27\. java的业务逻辑实现在那一层

通常在Service层实现也成为业务逻辑层是介于控制层和数据访问层之间的一层，主要负责业务逻辑的处理和控制

### 28\. service层的代码怎么去优化，什么方式去写会有性能问题？

1.  减少数据库的访问来提高性能，可以使用缓存、课批处理来减少数据库的访问
2.  优化算法和数据结构：降低查询的算法时间复杂度，如果数据量大时，可以采用分页查询方式、减少单次查询的数据量
3.  使用多线程：在服务层中采用多线程来处理大量的业务场景
4.  避免重复计算：在服务层可能存在多个方法需要进行相同的计算，我们可以将这些计算结果缓存起来，避免重复计算
5.  使用合适的框架，减少代码的编写量，例如使用缓存框架减少数据库的访问次数

存在性能问题：

1.  过渡依赖ORM框架：
2.  过度使用同步的方法
3.  使用第三方的库多
4.  过度使用数据库的链接

### 29\. mysql数据量大怎么进行优化

-   优化表结构建立索引、避免过多的冗余字段、提高查询性能
-   对大量数据进行批处理
-   引入缓存框架如Redis来将部分数据缓存到内存提高访问速度
-   对数据进行分库分表管理
-   查询语句的优化避免使用复杂的SQL语句，使用Explain名能查看SQL执行计划，避免全表扫描
-   数据库连接池优化，合理配置数据库连接池的大小、链接时间、减少资源的占用避免频繁的数据库链接与关闭

### 30\. git提交代码出现冲突

冲突1:当commit以后执行git pull —rebase出现冲突

1.  git status 找到冲突文件，解决冲突
2.  执行git add xxx(xxx为冲突文件全路径)
3.  执行 git rebase —continue
4.  执行 git pull —rebase
5.  执行 git push

当执行了git stash然后幼虫服务器上pull了最新代码（git pull —rebase）

1.  git status 找到冲突文件，解决冲突
2.  执行git add xxx (xxx为冲突文件全路径)
3.  git commit
4.  git pull -rebase
5.  git push

在解决冲突之前可以使用git fetch来获取最新代码，避免代码冲突的发生

### 31\. git和SDK的区别

Git是一个分布式版本的控制系统可以帮助开发者进行版本管理、代码协作和代码备份等操作，开发者可以通过git来管理自己的代码库，跟踪代码的变化并进行版本的回滚分支的合并等操作

SDK时软件开发包。包含了软件开发过程中的各种工具、库文档等资源

总的来说git时用来进行版本控制的工具，SDK是用来辅助开发者进行软件开发的工具包

### 32\. git的分支什么时候用？

git branch 是指在代码仓库中创建一个独立的开发分支，避免相互打扰，分支的使用情况：

1.  并行开发
2.  版本管理
3.  修复bug

### 33\. springboot的理解

springboot是一个基于spring的开源框架他为开发人员提供了一种快速创建spring的应用程序，简化了spring的配置和部署过程提供了大量的开箱即用的特性，如web内嵌服务器，自动配置、健康检查、度量指标、也提供了许多可插拔的组件，他也支持多种开发场景如Web应用程序、Restful服务、批处理任务、微服务。他也集成了Spring Data\\Spring Security\\Spring Cloud等框架

### 34\. Redis如何实现分布式的session的？

实现一个共享存储，将数据放到单台服务器的内存中。实现方法

1.  Redis（基于内存的Key—value）
2.  mysql
3.  文件服务器ceph

首先引入Redis接着引入spring-session整合redis

修改spring-session存储配置`spring.session.store-type`默认是none，表示存储在单台服务器上

`store-type: redis`,表示从redis中读写数据

### 35\. 缓存预热？

首先对Redis进行序列化：

```java
package com.yupi.yupao.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisTemplateConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(connectionFactory);
        redisTemplate.setKeySerializer(RedisSerializer.string());
        return redisTemplate;
    }
}
```

引入Spring Data Redis：因为他是一个通用的数据访问框架，定义了一组增删改查的接口 mysql、redis、jpa

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
    <version>2.6.4</version>
</dependency>
```

接着配置Redis地址：

```yaml
spring:
  # redis 配置
  redis:
    port: 6379
    host: localhost
    database: 0
```

Redisson：分布式操作 Redis 的 Java 客户端，让你像在使用本地的集合一样操作 Redis（分布式 Redis 数据网格）

**设计缓存的Key：**

systemId:moduleId:func:options（不要和别人冲突）

yupao:user:recommed:userId

**redis内存不能无限的增加、一定要设置过期时间**

实现缓存预热：定时

1.  缓存的意义：（新增少、总用户多）
2.  缓存的空间不能太大，要预留给其他缓存空间
3.  缓存数据周期（每天一次）

定时任务可以开启一个Spring Scheduler（SpringBoot默认整合了）

主类开启@EnableScheduling

![image-20230225195214062](/img/cos/learn/3481/image-20230225195214062.png)

给定时任务添加@Scheduling注解指定cron表达式和执行频率(不需要背);

[https://cron.qqe2.com/](https://cron.qqe2.com/)

### 36\. 分布式锁

Redis 实现：内存数据库，**读写速度快** 。支持 **setnx**、lua 脚本，比较方便我们实现分布式锁。用完锁要释放、锁要加载过期时间。

Redisson 是一个 java 操作 Redis 的客户端，**提供了大量的分布式数据集来简化对 Redis 的操作和使用，可以让开发者像使用本地集合一样使用 Redis，完全感知不到 Redis 的存在。**

定时任务+锁

1.  waitTime 设置为 0，只抢一次，抢不到就放弃
2.  注意释放锁要写在 finally 中

实现代码逻辑：

```java
void testWatchDog() {
    RLock lock = redissonClient.getLock("yupao:precachejob:docache:lock");
    try {
        // 只有一个线程能获取到锁
        if (lock.tryLock(0, -1, TimeUnit.MILLISECONDS)) {
            // todo 实际要执行的方法
            doSomeThings();
            System.out.println("getLock: " + Thread.currentThread().getId());
        }
    } catch (InterruptedException e) {
        System.out.println(e.getMessage());
    } finally {
        // 只能释放自己的锁
        if (lock.isHeldByCurrentThread()) {
            System.out.println("unLock: " + Thread.currentThread().getId());
            lock.unlock();
        }
    }
}
```

### 37\. 分布式锁的实现原理？

它是在分布式系统总为了保证数据的一致性和避免多个客户端同时对共享资源进行修改而引入的一种同步机制，在实现需要满足以下两个条件：

1.  互斥性：同一时间只能有一个客户端获得锁，其他客户端需要等待锁的释放
2.  安全性：在客户端获取锁之后，即使客户端的崩溃或者网络异常，锁应该自动释放，避免死锁和数据不一致。

常见的使用方式基于数据库，基于Redis的实现方式、基于Zookeeper的实现方式，这三种的实现核心都是基于同步机制。

### 38\. 什么是集群？一个项目改成集群需要注意什么？

集群式多个计算机或者服务器连接起来形成一个整体，通过共享资源和分配任务来提高系统的可用性和性能，在集群中，每个节点都可以独立工作，但是通过协调和通信，共同完成复杂的任务和处理大量的请求。

将一个项目修改成集群需要注意：

1.  分布式架构的设计

为了实现集群，需要将系统的架构设计成分布式架构，将不同的功能模块拆分到不同的节点上，通过消息中间件、负载均衡器等技术协调和管理不同节点之间的通信和数据同步。

1.  数据库的选型和分库分表

在分布式架构中，通常需要使用分布式数据库来管理数据，如MySQL集群、MongoDB集群等。同时，为了提高数据库的性能，需要进行分库分表来将数据水平切分到多个节点上

1.  负载均衡和容错机制

为了保证系统的可用性和性能，需要使用负载均衡器来将请求均衡地分配到不同的节点上，并通过容错机制来处理节点故障和网络异常等问题。

1.  代码和配置优化

在集群中，需要对代码和配置进行优化，如减少锁的使用、优化SQL查询、合理配置缓存等，以提高系统的性能和可伸缩性。

1.  监控和调试

在集群中，需要使用监控和调试工具来实时监测系统的运行状态和性能指标，及时发现和解决问题，保证系统的稳定性和可靠性。

### 39\. mybatis-plus执行流程工作原理

1.  读取核心配置文件`mybatis-config.xml`并返回`InputStream`流对象。
2.  根据`InputStream`流对象解析出`Configuration`对象，然后创建`SqlSessionFactory`工厂对象
3.  根据一系列属性从`SqlSessionFactory`工厂中创建`SqlSession`
4.  从`SqlSession`中调用`Executor`执行数据库操作&&通过解析生成具体SQL指令
5.  通过`TypeHandler(数据库与java类型转换)`对执行结果进行二次封装
6.  提交与事务处理

### 40\. JDK8的新特性

1.  lambda表达式：允许开发人员更简洁的写代码，而且支持函数式编程
2.  方法引用：式lambda表达式的一个扩展，允许直接引用现有的方法和构造函数；
3.  默认方法：允许想接口添加新方法而不破坏现有的方法
4.  Stream API：它支持对集合数组等数据结构进行函数式的操作，如过滤、映射、排序等
5.  Date and time API：全新的日期和时间API更好的处理日期和时间提供了LocalDate、LocalTime
6.  CompletableFuture类：CompletableFuture类是Java 8中的一个新的异步编程API，它支持非阻塞的、基于回调的编程方式。CompletableFuture可以用于并行处理、异步任务等场景，使得代码更加简洁和易于理解。

### 41\. git常用命令

![img](/img/cos/learn/3481/24bafa1f034d193c81f57897efd086e2.jpg)

-   git init\[project-name\]
-   git clone url
-   git add 提交全部文件修改到缓存区
-   git add &lt;具体某个文件路径+全名>提交某些文件到缓存区
-   git diff 查验当前代码add后 会add那些内容
-   git diff —staged查看当前commit提交后，会提交那些内容
-   git status查看当前分支的状态
-   git pull &lt;远程仓库名>&lt;远程分支名>拉取远程仓库的分支与本地当前分支合并
-   git pull &lt;远程仓库名> &lt;远程分支名>:&lt;本地分支名> 拉取远程仓库的分支与本地某个分支合并
-   git commit -m “&lt;注释>” 提交代码到本地仓库，并写提交注释
-   git commit -v 提交时显示所有的diff信息
-   git commit —amend\[file1\]\[file2\]重做上一次的commit并指定文件的新变化

分支操作：

-   git branch 查看本地分支
-   git branch -r 查看所有远程分支
-   git branch -a查看本地和远程的所有分支
-   git merge &lt;分支名>合并分支

### 42\. Linux的常用命令

-   top 查看内存、显示系统当前的进程信息
-   df -h：查看磁盘的存储状态
-   iotop：查看IO的读写
-   iotop -o：查看比较高的磁盘读写程序
-   netstat -tunIp |grep 端口号 ：查看端口号占用情况
-   Isof -i：端口号：查看端口号占用情况
-   uptime：查看报告系统运行时长及平均负载
-   ps axu：查看进程

基础：

-   ls ：查看目录
-   ls -la：显示当前目录下所有文件的详细信息
-   cd ：切换目录
-   cd… 返回上一级目录
-   cd…/… 返回上两级目录
-   pwd 显示当前的目录
-   touch desc.txt：在当前目录下创建文件
-   mkdir text: 在当前目录下创建目录
-   cat 查看文件内容
-   more 分页查看文件内容
-   tail 查看文件尾部内容
-   cp 拷贝
-   mv 剪切文件
-   rm 删除文件
-   find 搜索文件
-   ifconfig ：显示网络设备情况
-   netstat ：显示网络相关信息
-   ps 显示进程状态 -ef当前所有进程
-   kill 杀死进程 kill -s 9 27810:杀死进程号为27810的进程，强制终止，系统资源无法回收
-   tar 压缩解压缩(tar -zcvf test.tar.gz ./test：打包test目录为test.tar.gz文件，-z表示用gzip压缩 —tar -zxvf test.tar.gz：解压test.tar.gz文件)
-   chown:改变文件或者目录的拥有者
-   chmod:改变文件或者目录的访问权限
-   vim 文本编译器
-   shutdown 关机和重启（-h 和-r）
-   man 帮助命令

### 43\. Nginx简介

nginx是一个软件级别的负载均衡。通过nginx的高性能，并发能力强，占用内存小，可以搭建高性能的代理服务器，同时nginx也可以作为web服务器，反向代理，动静态分离服务器。

**正向代理：**

正向代理来进行上网等功能：用户访问局域网需要通过代理服务器来访问，这种代理称为正向代理，偏重于用户进行访问如下图

![1534147-20200522085220242-1137326185.png](/img/cos/learn/3481/1534147-20200522085220242-1137326185.png)

**反向代理：**

客户端对代理服务器无感知，客户端不需要任何配置就可以访问，用户只需要将请求发送到反向代理服务器，有反向代理服务器选择目标服务器获取数据再返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器的地址，隐藏的真实的服务器的IP地址

**负载均衡：**

增加服务器的数量，然后将请求分发到各个服务器上，将原本请求到单个服务器上的情况改为请求分发到多个服务器上、将负载分发到不同分服务器我们称为负载均衡

**动静态分离：**

把动态页面和静态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力；如图：

![1534147-20200522090350284-1607145726.png](/img/cos/learn/3481/1534147-20200522090350284-1607145726.png)

### 44\. 多线程常见的概念和技术

1.  线程：操作系统最小的执行单位每个线程都有自己的堆栈和程序计数器
2.  线程状态：线程可以处于不同的状态：就绪、运行、新建、阻塞、终止
3.  线程同步：多个线程访问共享资源需要进行同步，同步技术：互斥锁、条件变量、信号量、读写锁
4.  线程池：为了避免创建和销毁线程的开销，通过线程池来管理一组线程
5.  并发集合：java提供的一些线程安全的集合类如ConcurrentHashMap等

### 45\. java里面的垃圾回收分几类？

可以分为以下几类：

-   标记清除法：标记出所有需要回收的对象，然后清除未标记的对象。这种算法的缺点是效率低，会产生内存碎片。
-   复制算法：内存空间分为两个区域，每次只使用其中一个区域，缺点是需要额外的空间。
-   标记-整理算法：标记出所有需要回收的对象，然后将存活的对象往一端移动，然后清空另一端的内存。缺点是效率低，需要移动对象。
-   分代算法：分为年轻代（复制算法、清除算法）、老年代（标记清楚法和标记整理法）和持久代（不需要进行垃圾回收）

### 46\. 线程的可见性

当一个线程被修改了共享变量的值后，其他线程能够立即的看到这个修改，如果看不到就出现了线程的可见性问题；

为了解决以上问题可以使用volatile关键字来休修饰共享变量

-   线程在读取volatile变量时，总是读取最新的值
-   线程在修改volatile变量时，总是将修改后的值立即写入主内存，而不是写入本地缓存

也可以使用锁、原子变量等机制来保证线程的可见性。

### 47\. Array和ArrayList的区别？

1.  内存分配方式不同Array创建的时候就需要指定数组的长度，ArrayList使用了动态数组方式来存储元素可以动态的增加和删除元素，不需要一块连续的内存空间
2.  访问方式不同，Array可以直接通过数组下标来进行访问，而ArrayList需要通过get来获取指定位置上的元素
3.  增删元素效率不同，Array增加和删除元素效率低因为要复制，而ArrayList可以直接使用add和remove方法来增加和删除元素
4.  数据类型不同：Array可以存储基本数据类型和对象类型，而ArrayList只能存储对象类型的元素

### 48\. 请说说Redis的持久化机制

Redis数据存储在内存中、可以通过RDB和AOF两种持久化方式将数据写入磁盘防止数据丢失；

-   RDB持久化：将redis中的数据在指定的时间间隔定时的进行快照存储到硬盘上，它会将当前时间点的redis数据以快照的方式保存到磁盘上，优点数据恢复速度快，适合大规模数据的备份与恢复
-   AOF持久化：将Redis中的所有写操作以日志的形式追加到磁盘上，优点AOF的数据可靠性高，即使Rdis在持久化之前宕机，也可以通过重放日志文件的方式恢复数据库，缺点是AOF文件大，恢复速度慢

### 49\. 项目哪里用到了redis 怎么用？

​ 共享存储：获取当前登录的信息将数据存放在单台服务器的内存中，保证用户无论在服务器A登录还是登录服务器B都从同一个服务器内存中获取数据

实现方式：Session的共享实现，导入spring-session整合redis的包，修改spring-session存储配置，选择一台服务器；

​ Redis实现热点数据的缓主要利用Redission分布式操作，Redis实现缓存预热，首先需要一个定时任务@EnableScheduling 并给定时任务添加@Scheduling注解并且指定cron表达式

### 50\. InnoDB和MyISAM的区别？

1.  数据库表的锁定方式不同：MyISAM锁定整个表，所以在执行读操作时，不能进行写操作，而InnoDB支持行锁，可以在并发访问时对数据库进行锁定
2.  数据库的事务处理能力不同：MyISAN不支持事务处理，而InnoDB支持事务处理。因此对于需要频繁更新的数据应用，使用InnoDB更为合适
3.  对数据库的完整性约束不同：MyISAM不支持外键约束，而InnoDB支持外键约束
4.  数据库的性能表现不同：MyISAN在执行大量的SELECT查询操作时性能比InnoDB要快，而InnoDB执行大量的INSERT和UPDATE操作时，InnoDB性能更好，特别是在高并发的情况下。

### 51\. 线程的创建方式有哪几种？

1.  继成Thread类：创建一个类，集成Thread类重写run（）方法
2.  实现Runnable接口，并重写run（）方法、然后实例化Thread类，将该类作为参数传如Thread构造方法中，并且调用start（）方法启动线程
3.  实现Callable接口：创建一个类，实现Callable接口，并重写call（）方法，然后使用ExecutorService提交任务并返回一个Future对象，并通过Future对象获取异步执行的结果
4.  使用线程池：通过ThreadPoolExecutor等线程池类来创建线程，将任务提交给线程池进行管理，线程会自动创建线程并执行任务
5.  使用匿名内部类创建线程：使用匿名内部类创建Thread类或者实现Runnable接口，并重写run（）方法然后调用start（）方法

### 52.hashMap和HashTable的区别

1.  线程安全性不同：hashMap是线程不安全的HashTable是线程安全的，可以使用Collections.synchronizedMap方法转换为线程安全的
2.  null键和值得的处理不同，Hashtable不允许键或值为null，否则会抛出空指针异常，而hashMap允许键或值为null。但需要对null处理
3.  初始容量和扩容机制不同：hashTable的初始容量为11，扩容时容量会翻倍，而hashMap的初始容量为16，扩容时容量增加一倍，并且可以设置负载因子来调整扩容的时机
4.  遍历方式不同：hashTable的元素是无序的，遍历时需要Enumeration，而hashMap的元素时无序的遍历可以使用iterator和forEach等方式
5.  底层的实现不同：HashTable是基于哈希表的实现，而hashMap是基于哈希表和红黑树的实现；

### 53\. #和$的区别？

-   在linux系统中#表示root用户，$表示普通用户，在mybatis中，#表示占位符号，$表示sql拼接符号
    
-   #和$在处理传入的数据时有不同的方式。在mybatis中，#会把传入的数据都当成一个字符串来处理，并自动给其添加引号；而$则是把传入的数据直接显示在sql语句中。
    
    -   where username=# &#123;username&#125;，解析后为where username=”username”。
        
    -   where username=$ &#123;username&#125;，解析后为where username=username
        
-   #和$在防止sql注入方面有不同的效果。在mybatis中，#可以有效地防止sql注入攻击，因为它会对传入的数据进行转义；而$则不能防止sql注入攻击，因为它会直接执行传入的数据。
    

一般来说，在JDBC能使用占位符的地方，最好优先使用#&#123;&#125;；在JDBC不支持使用占位符的地方，就只能使用$&#123;&#125;，比如动态指定表名或排序字段

### 54\. springboot自动装配

所有注解都在做一件事：注册bean到spring容器

-   @springbootConfiguration通过@Bean结合完成Bean的JavaConfig配置；
-   @ComponentScan通过范围扫描的方式，扫描特定的注解注释类，将其注册到spring容器
-   @EnableAutoCOnfiguration通过spring.factories的配置，并结合@Condition条件完成bean的注册
-   @Import通过导入的方式，将指定的class注解解析到pring容器

springboot实现自动装配的过程可以分为三步：

-   扫描classpath下的META-INF/spring.factories文件

spring.factories文件中定义了各个自动配置类的全限定名。在Spring Boot应用启动时，Spring Boot会自动扫描classpath下的所有spring.factories文件，并将其中的自动配置类加载到应用上下文中。

-   加载自动配置类

自动配置类是Spring Boot自动装配的核心，它会根据不同的条件选择不同的装配方案。Spring Boot会根据上一步中扫描到的自动配置类的全限定名来加载这些类，并将它们注册到应用上下文中。

-   根据条件装配Bean

当自动配置类加载完成后，Spring Boot会根据自动配置类中定义的条件来确定哪些Bean需要被装配

### 55\. springboot配置文件的加载顺序？

1.  首先会加载项目根目录下的config文件夹中所有的properties或yml文件，按照文件名排序后进行加载
2.  其次会加载项目根目录下的所有properties或yml文件（不包括config文件），按照文件名排序后进行加载
3.  然后会加载classpath下的config问价夹中的所有properties或yml文件
4.  最后加载classpath下所有的properties或yml文件（不包括config文件夹）

在加载过程中，后面的配置文件会覆盖前面的配置文件中相同的属性值；

### 56\. springbuffer和stringbuilder的区别

两者都是可变字符串可以动态的添加和删除字符串内容；

-   stringbuffer是线程安全的，stringbuilder是线程不安全的
-   stringbuffer的性能低于stringbuilder因为stringbuffer的每个方法都加上了线程同步所以性能较差一点
-   应用场景：如果需要多线程操作或者需要进行字符串的频繁修改操作，建议使用stringbuffer，而对于单线程使用stringbuilder，因为它的性能更好

### 57\. 如何解决哈希冲突

开放地址法：按照一定的次序，从哈希表中找到一个空闲的单元，然后把发生冲突的元素存入该单元

链地址法：将哈希值相同的元素构成一个同义词的单链表

再哈希法

建立公共溢出区：哈希表分为公共表和溢出表，当溢出发生时，将所有溢出数据统一放到溢出区。

### 58\. mysql索引的缺点

-   需要占用磁盘空间：索引文件如果太大占用空间也会很大
-   索引会降低写操作的性能：每次写操作要更新索引，频繁的更新索引，会导致写操作的性能下降

（因为索引的前缀查询会使B+数的节点匹配更多的值，增加IO操作、模糊查询的匹配规则，需要对索引列进行字符匹配，匹配效率低会导致性能下降）

-   索引也可能导致查询性能下降，如果索引不当会导致性能下降，如使用前缀查询和模糊查询会导致性能下降
-   维护索引需要成本 ：需要避免过多的使用索引

### 59\. 索引的底层实现

B+树和哈希表

### 60\. 什么情况下索引会失效

1.  对索引进行函数操作，如在where中使用函数操作符
2.  查询中使用了不等式操作符
3.  在索引列上进行隐式转换或者强制类型转换
4.  当查询条件中的列与索引的最左侧前缀不匹配时
5.  当表的数据量非常小
6.  使用了大字段的类型
7.  使用了联合查询，查询条件中使用除索引的第一个字段还是使用了其他字段
8.  使用子查询、临时表、视图

### 61\. 过滤器和拦截器的区别？

1.  触发时机不同：过滤器在请求进入Servlet容器之前拦截请求，而拦截器在请求进入处理器之前或者之后拦截请求。
2.  应用范围不同：过滤器可以在Web.xml文件中进行配置，作用于整个Web应用程序、而拦截器只是对某个特定的处理器进行拦截
3.  接口不同：过滤器实现了javax.servlet.Filter接口，而拦截器实现了Spring框架的HandlerInterceptor接口
4.  共能不同：过滤器是基于Servlet规范实现的可以对请求和响应进行操作，拦截器是SpringMVC框架提供的，对处理器的执行过程进行干预

### 62.Stream流的终止方法有

stream常用的方法：

-   filter：根据指定的条件过滤
-   map：将数据转换为新的格式
-   flatMap：将嵌套的Stream扁平化
-   sorted：对数据进行排序
-   distinct：去重
-   forEach：遍历数据
-   reduce：将数据集合成一个值

1.  count：统计个数
2.  collect：将数据收集到一个容器中
3.  toArray：将数据转换为数组
4.  max/min：查找最大值/最小值
5.  findFirst/findAny：查找符合条件的第一个/任意一个数据

```java
//stream流的倒序排序
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> reversedList = list.stream()
    .sorted(Comparator.reverseOrder())
    .collect(Collectors.toList());
```

### 63\. CountDownLatch的作用，如何使用？

它可以控制多个线程的执行顺序，作用是让某个线程等待其他线程执行完毕后在执行，它是通过一个计数器实现的，每当一个线程执行完毕后计数器会减一

1.  创建countDownLatch对象，初始化计数器的值为需要等待的线程数
2.  在需要等待的线程执行完毕的地方调用CountDownLatch对象的countDown方法，使得计数器减一

### 64\. 使用explain关键字查询执行计划返回字段？

1.  id:查询标识符，判断查询中是否存在子查询以及子查询的执行顺序
2.  select\_type：查询类型、简单的查询、联合查询、子查询
3.  table：查询的类型。“all”、index、range、ref
4.  possible\_keys：可能用到的索引
5.  key：实际用到的索引
6.  key\_len：索引的长度
7.  ref:索引的参考对象
8.  rows：扫描的行数
9.  extra：一些额外的信息

### 65\. redis的内存淘汰策略，默认的是哪个，redis的IO多路复用的原理，socket的IO多路复用原理，poll，epoll，select区别

1.  Redis的默认内存淘汰策略是volatile-lru，即从已设置过期时间的键中，选择最近最少使用的键淘汰。
2.  Redis的IO多路复用使用的是单线程的事件驱动模型，其中有一个事件循环负责监听所有socket的读写事件，并调用对应的处理程序。Redis支持多种IO多路复用技术，包括select、poll、epoll，其中select和poll是比较早的技术，epoll是Linux内核2.6版本之后才加入的新技术，相比于select和poll，epoll在处理大量连接时有更好的性能。
3.  Socket的IO多路复用原理：在应用程序中，如果需要同时处理多个socket连接，可以使用IO多路复用技术，避免使用多线程或多进程的方式处理。使用IO多路复用的方式，可以将多个socket注册到一个监听集合中，然后将监听集合交给操作系统的select/poll/epoll系统调用，等待IO事件的发生。当某个socket有数据可读/可写时，IO多路复用会通知应用程序进行处理。
4.  select：最早出现的IO多路复用技术，它通过轮询的方式查询所有注册的socket，发现有数据可读/可写的socket后再进行处理。select有一些缺点，比如对socket数量的限制，每次轮询需要将socket集合从用户空间复制到内核空间等。
5.  poll：在select的基础上进行了优化，它支持更多的socket数量，并且可以避免每次轮询时将socket集合复制到内核空间的操作，但它仍然存在效率

### 66.查询某个进程的端口号

1.  netstat -anp | grep 端口号
2.  ss -ltp |grep 端口号

### 67\. spring里面的装饰器是怎么实现的？

spring框架中的装饰器主要通过AOP实现的，AOP可以通过代理模式实现，在spring中可以使用@AspectJ语法或者基于注解的方式实现AOP。

### 68\. exists和in怎么选？

两者都是SQL语句数据查询时的选择

-   exists判断某个子查询是否返回了结果、如果返回了结果，则条件成立，exists比in更高效，因为它值判断是否存在而in需要将结果加载到内存在进行比较
-   当需要查询某个字段是否在另一个表中出现时可以使用in语句，in将某个字段和另一个表中的字段进行比对，如果相同，则符合条件，可以将这个条件作为筛选数据的条件。

### 69\. JVM内存模型

JVM包括线程独占的线程栈、各线程共享堆、方法区、以及直接内存区

堆内存分为：新生代、老年代；新生代内存分为：eden、Survivor 0、Survivor 1三个区域

方法区时各线程共享的内存区域，用于存储类、常量和静态变量也指永久代 JDK8以后替换为元空间

线程私有区：存放线程自己的栈帧，每个栈帧对应一个方法的执行过线程：线程栈还可以分为：本地方法栈和虚拟机栈

直接内存区域：NIO，特点可以减少在java堆和直接内存之间的数据拷贝，提高数据读写效率

### 70\. volatile的作用，volatile如何保证可见性？

volatile主要来修饰变量，它的作用时保证变量的可见性、禁止指令重排和保证原子性。当一个变量被声明为volatile时，它会被存储在主内存中而不是线程的工作内存中、这样其他线程能够立刻看到该变量的变化，因为他们共享一块主内存。

### 71.动态代理的实现以JDK为例？

1.  定义接口和目标类

```java
public interface UserService {
    void save();
}

public class UserServiceImpl implements UserService {
    @Override
    public void save() {
        System.out.println("save user");
    }
}
```

1.  实现InvocationHandler接口它是JDK提供的一个接口，他只有一个invok方法，它是代理实例的调用程序

```java
public class MyInvocationHandler implements InvocationHandler {
    // 目标对象
    private Object target;

    public MyInvocationHandler(Object target) {
        this.target = target;
    }

    // 代理对象调用方法时，会自动调用invoke方法
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("before method");
        Object result = method.invoke(target, args);
        System.out.println("after method");
        return result;
    }
}
```

1.  创建代理对象

```java
public class Test {
    public static void main(String[] args) {
        // 创建目标对象
        UserService userService = new UserServiceImpl();

        // 创建 InvocationHandler 对象
        MyInvocationHandler invocationHandler = new MyInvocationHandler(userService);

        // 通过 Proxy.newProxyInstance() 创建代理对象
        UserService proxy = (UserService) Proxy.newProxyInstance(
                userService.getClass().getClassLoader(),
                userService.getClass().getInterfaces(),
                invocationHandler);

        // 调用代理对象的方法
        proxy.save();
    }
}
```

创建代理对象调用JDK的静态方法Proxy.newProxyInstance(),该方法会返回一个代理对象传入的两个参数就是代理目标类和目标接口类、InvocationHandler对象

### 72.流的分类，字符流字节流区别，读取图片用什么流？

1.  字节流：以字节为单位进行操作，主要处理二进制数据，如图片、音频、视频等。字节流的抽象类是InputStream和OutputStream
2.  字符流：以字符为单位主要处理文本数据，如文本文件、字符流的抽象类是Reader和Writer

字节流可以处理任何类型的数据，而字符流只能处理文本数据。

当需要读取或写入图片等二进制文件时，应该使用字节流，即InputStream和OutputStream
