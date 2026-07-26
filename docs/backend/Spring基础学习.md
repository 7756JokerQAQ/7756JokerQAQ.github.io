---
title: "Spring5"
---

<!-- truncate -->
### 1.1Spring5学习

> IOC概念

1.  控制反转，把对象创建和对象之间的调用过程，交给Spring进行管理
2.  使用IOC目的，为了耦合度降低
3.  入门就是IOC的实现

> IOC的底层原理

1.  XML解析、工厂模式、反射

IOC过程：第一步 xml配置文件，配置创建的对象

​ 第二步：有Service类和dao类，创建工厂

```java
class Factory{
    public static UserDao getDao(){
        String classValue =class属性值;//1.xml解析
        Class clazz=Class.forName(classValue)  //2.通过反射创建对象
        return (UserDao)clazz.newInstance();
        //进一步降低耦合度
    }
}
```

#### **2.IOC(BeanFactory接口)**

1、IOC 思想基于 IOC 容器完成，IOC 容器底层就是对象工厂

2、Spring 提供 IOC 容器实现两种方式：（两个接口）

（1）BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象

（2）ApplicationContext：BeanFactory 接口的子接口，提供更多更强大的功能，一般由开发人员进行使用加载配置文件时候就会把在配置文件对象进行创建

(3) ApplicationContext 接口有实现类

#### 3.IOC操作Bean管理

**1、什么是 Bean 管理**

（0）Bean 管理指的是两个操作

（1）Spring 创建对象

（2）Spirng 注入属性

**2、Bean 管理操作有两种方式**

（1）基于 xml 配置文件方式实现

-   （1）在 spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以实现对象创建
-   （2）在 bean 标签有很多属性，介绍常用的属性（id 属性：唯一标识 、 class 属性：类全路径（包类路径）
-   （3）创建对象时候，默认也是执行无参数构造方法完成对象创建

（2）基于注解方式实现

DI：依赖注入，就是注入属性；

3.第一种注入方式：使用set方法进行注入

（1）创建类，定义属性和对应的set方法

![](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221008191922438.png)

(2) 在 spring 配置文件配置对象创建，配置属性注入

```xml
    <!--配置-->
    <bean id="user" class="com.atguigu.spring5.User">  
        <property name="bname" value="易筋经"></property>
        <property name="bauthor" value="达摩老祖"></property>
    </bean>
<!--使用 property 完成属性注入  name：类里面属性名称 value：向属性注入的值 -->
```

4.**第二种注入方式：使用有参数构造进行注入**

（1）创建类，定义属性，创建属性对应有参构造方法

```java
public class Order {
    private String oname;
    private String address;
    //有参构造
    public Order(String oname, String address) {
        this.oname = oname;
        this.address = address;
    }
}
```

(2) 在 spring 配置文件中进行配置

```xml
<!--3 有参数构造注入属性--> 
<bean id="orders" class="com.atguigu.spring5.Orders">
 <constructor-arg name="oname" value="电脑"></constructor-arg>
 <constructor-arg name="address" value="China"></constructor-arg>
</bean>
```

5、p 名称空间注入（了解

（1）使用 p 名称空间注入，可以简化基于 xml 配置方式 第一步 添加 p 名称空间在配置文件中

(2)第二步 进行属性注入，在 bean 标签里面进行操作

#### **4\. IOC** **操作** **Bean** **管理（xml** 注入其他类型属性）

**1**、**字面量**

(1)null值

```xml
<!--null 值--> <property name="address">
 <null/>
</property>
```

（2）属性值包含特殊符号

```xml
<!--属性值包含特殊符号
1 把<>进行转义 &lt; &gt;
 2 把带特殊符号内容写到 CDATA
--><property name="address">
 <value><![CDATA[<<南京>>]]></value>
</property>
```

**2**、**注入属性-外部** **bean**

（1）创建两个类 service 类和 dao 类

（2）在 service 调用 dao 里面的方法

（3）在 spring 配置文件中进行配置

```java
public class UserService {
 //创建 UserDao 类型属性，生成 set 方法
 private UserDao userDao;
 public void setUserDao(UserDao userDao) {
 this.userDao = userDao;
 }
 public void add() {
 System.out.println("service add...............");
 userDao.update();
 } }
```

```xml
<!--1 service 和 dao 对象创建--> <bean id="userService" class="com.atguigu.spring5.service.UserService">
 <!--注入 userDao 对象
 name 属性：类里面属性名称
 ref 属性：创建 userDao 对象 bean 标签 id 值
 -->
 <property name="userDao" ref="userDaoImpl"></property>
</bean> <bean id="userDaoImpl" class="com.atguigu.spring5.dao.UserDaoImpl"></bean>
```

**3.xml的其他注入**

**1**、注入数组类型属性

**2**、注入 **List** **集合类型属性**

**3**、注入 **Map** **集合类型属性**

-   首先定义一个类

```java
package com.atguigu.spring5.collectiontype;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class stu {
    //数组类型的属性
    private String[]courses;
    private List<String> list;
    private Map<String,String> map;
    private Set<String>set;

    public void setCourses(String[] courses) {
        this.courses = courses;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }

    public void setSet(Set<String> set) {
        this.set = set;
    }
    public  void text(){
        System.out.println(Arrays.toString(courses));
        System.out.println(list);
        System.out.println(map);
        System.out.println(set);
    }
}
```

-   接着在xml文件中注入属性值

```xml
<bean id="stu" class="com.atguigu.spring5.collectiontype.stu">
      <property name="courses">
          <array>
              <value>Java课程</value>
              <value>数据库课程</value>
          </array>
      </property>
      <property name="list">
          <list>
              <value>张三</value>
              <value>小三</value>
          </list>
      </property>
      <property name="map">
          <map>
              <entry key="Java" value="java"></entry>
              <entry key="PHP" value="php"></entry>
          </map>
      </property>
      <property name="set">
          <set>
              <value>MySQL</value>
              <value>Redis</value>
          </set>
      </property>
  </bean>
```

-   最后写出text方法进行调用

```java
@Test
public void textDemo1() {
    ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
    stu stu1 = context.getBean("stu", stu.class);
    stu1.text();
}
```

**6.工厂FactoryBean**

**1**、**Spring**有两种类型 **bean**，一种普通 bean**，另外一种工厂** **bean**（FactoryBean）

**2**、普通bean**：在配置文件中定义** bean **类型就是返回类型**

**3**、工厂 **bean**：在配置文件定义 **bean** **类型可以和返回类型不一样**

#### 5\. IOC操作Bean管理（Bean作用域）

**1**.**在** **Spring** **里面，默认情况下，bean 是单实例对象**

**2**、如何设置单实例还是多实例

（1）在 spring 配置文件 bean 标签里面有属性（scope）用于设置单实例还是多实例

（2）scope 属性值

-   第一个值 默认值，singleton，表示是单实例对象
-   第二个值 prototype，表示是多实例对象

（3）singleton 和 prototype 区别

第一 singleton 单实例，prototype 多实例

第二 设置 scope 值是 singleton 时候，加载 spring 配置文件时候就会创建单实例对象 设置 scope 值是 prototype 时候，不是在加载 spring 配置文件时候创建 对象，在调用getBean 方法时候创建多实例对象。

#### 6\. IOC操作Bean管理（Bean的生命周期）

（1）通过构造器创建 bean 实例（无参数构造）

（2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）

（3）调用 bean 的初始化的方法（需要进行配置初始化的方法）

（4）bean 可以使用了（对象获取到了）

（5）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）

```java
public class Orders {
 //无参数构造
 public Orders() {
 System.out.println("第一步 执行无参数构造创建 bean 实例");
 }
 private String oname;
 public void setOname(String oname) {
 this.oname = oname;
 System.out.println("第二步 调用 set 方法设置属性值");
 }
 //创建执行的初始化的方法
 public void initMethod() {
 System.out.println("第三步 执行初始化的方法");
 }
 //创建执行的销毁的方法
 public void destroyMethod() {
 System.out.println("第五步 执行销毁的方法");
 } }

 @Test
 public void testBean3() {
// ApplicationContext context =
// new ClassPathXmlApplicationContext("bean4.xml");
 ClassPathXmlApplicationContext context =
 new ClassPathXmlApplicationContext("bean4.xml");
 Orders orders = context.getBean("orders", Orders.class);
 System.out.println("第四步 获取创建 bean 实例对象");
 System.out.println(orders);
 //手动让 bean 实例销毁
 context.close();
 }
```

```xml
<bean id="orders" class="com.atguigu.spring5.bean.Orders" initmethod="initMethod" destroy-method="destroyMethod">
 <property name="oname" value="手机"></property>
</bean>
```

![](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221009164124690.png)

**2、** bean **的后置处理器，** **bean** **生命周期有七步**

（1）通过构造器创建 bean 实例（无参数构造）

（2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）

（3）把 bean 实例传递 bean 后置处理器的方法 postProcessBeforeInitialization

（4）调用 bean 的初始化的方法（需要进行配置初始化的方法）

（5）把 **bean** **实例传递** **bean** **后置处理器的方法** postProcessAfterInitialization

（6）bean 可以使用了（对象获取到了）

（7）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）

#### 6.IOC操作Bean管理(基于注解方法)

**1** **、什么是注解**

（1）注解是代码特殊标记，格式：@注解名称(属性名称=属性值, 属性名称=属性值..)

（2）使用注解，注解作用在类上面，方法上面，属性上面

（3）使用注解目的：简化 xml 配置

**2** **、** **Spring** **针对** **Bean** **管理中创建对象提供注解**

（1）@Component

（2）@Service

（3）@Controller

（4）@Repository

\* 上面四个注解功能是一样的，都可以用来创建 bean 实例

**3** **、基于注解方式实现对象创建**

-   第一步 引入依赖
-   第二步 开启组件扫描
-   第三步 创建类，在类上面添加创建对象注解

**4** **、开启组件扫描细节配置**

```xml
<!--示例 1
 use-default-filters="false" 表示现在不使用默认 filter，自己配置 filter
 context:include-filter ，设置扫描哪些内容
--><context:component-scan base-package="com.atguigu" use-defaultfilters="false">
 <context:include-filter type="annotation" 
 
expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
<!--示例 2
 下面配置扫描包所有内容
 context:exclude-filter： 设置哪些内容不进行扫描
--><context:component-scan base-package="com.atguigu">
 <context:exclude-filter type="annotation" 
 
expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

**5** **、基于注解方式实现属性注入**

-   @Autowired：根据属性类型进行自动装配
    
    第一步 把 service 和 dao 对象创建，在 service 和 dao 类添加创建对象注解
    
    第二步 在 service 注入 dao 对象，在 service 类添加 dao 类型属性，在属性上面使用注解
    
-   @Qualifier：根据名称进行注入
    
    这个@Qualifier 注解的使用，和上面@Autowired 一起使用
    
    _//添加注入属性注解_
    
    @Autowired _//根据类型进行注入_
    
    @Qualifier(value = **“userDaoImpl1”**) _//根据名称进行注入_
    
-   @Resource：可以根据类型注入，可以根据名称注入 //@Resource(name = **“userDaoImpl1”**) _//根据名称进行注入_
    
-   @Value：注入普通类型属性
    

**6、完全注解开发**

```java
（1）创建配置类，替代 xml 配置文件
@Configuration //作为配置类，替代 xml 配置文件
@ComponentScan(basePackages = {"com.atguigu"})
public class SpringConfig {
}
```

#### 7.AOP(概念)

**1** **、什么是** **AOP**

（1）面向切面编程（方面），利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

（2）通俗描述：不通过修改源代码方式，在主干功能里面添加新功能

（3）使用登录例子说明 AOP

![image-20221010165047937](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221010165047937.png)

**1** **、** **AOP** **底层使用动态代理**

（1）有两种情况动态代理

**第一种 有接口情况，使用** **JDK** **动态代理**

⚫ 创建接口实现类代理对象，增强类的方法

![image-20221010165410954](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221010165410954.png)

**第二种 没有接口情况，使用** **CGLIB** **动态代理**

⚫ 创建子类的代理对象，增强类的方法

![image-20221010165427947](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221010165427947.png)

**2.AOP** **（** **JDK** **动态代理）**

1、使用 JDK 动态代理，使用 Proxy 类里面的方法创建代理对象

（1）调用 newProxyInstance 方法

![image-20221010165618081](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221010165618081.png)

方法有三个参数：

-   第一参数，类加载器
-   第二参数，增强方法所在的类，这个类实现的接口，支持多个接口
-   第三参数，实现这个接口 InvocationHandler，创建代理对象，写增强的部分

**2** **、编写** **JDK** **动态代理代码**

（1）创建接口，定义方法

（2）创建接口实现类，实现方法

（3）使用 Proxy 类创建接口代理对象

```java
//(1)
public interface UserDao {
 public int add(int a,int b);
 public String update(String id);
}
//(2)
public class UserDaoImpl implements UserDao {
 @Override
 public int add(int a, int b) {
 return a+b;
 }
 @Override
 public String update(String id) {
 return id;
 } }
//(3)
public class JDKProxy {
 public static void main(String[] args) {
 //创建接口实现类代理对象
 Class[] interfaces = {UserDao.class};
     UserDaoImpl userDao = new UserDaoImpl();
 UserDao dao = 
(UserDao)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, 
new UserDaoProxy(userDao));
 int result = dao.add(1, 2);
 System.out.println("result:"+result);
 } }
//创建代理对象代码
class UserDaoProxy implements InvocationHandler {
 //1 把创建的是谁的代理对象，把谁传递过来
 //有参数构造传递
 private Object obj;
 public UserDaoProxy(Object obj) {
 this.obj = obj;
 }
 //增强的逻辑
 @Override
 public Object invoke(Object proxy, Method method, Object[] args) throws 
Throwable {
 //方法之前
 System.out.println("方法之前执行...."+method.getName()+" :传递的参
数..."+ Arrays.toString(args));
 //被增强的方法执行
 Object res = method.invoke(obj, args);
 //方法之后
 System.out.println("方法之后执行...."+obj);
 return res;
 } }
```

**3.AOP(术语)**

1.链接点

类里面那些方法可以被增强，这些方法称为链接点

2.切入点

实际被真正增强的方法，称为切入点

3.通知（增强）

（1）实际增强的逻辑部分称为通知（增强）

（2）通知有多种类型

-   前置通知
-   后置通知
-   环绕通知
-   异常通知
-   最终通知

4.切面

是动作：把通知应用到切入点过程

#### 8.AOP操作（准备工作）

**1\*\***、**\*\*Spring** **框架一般都是基于** **AspectJ** **实现** **AOP** **操作**

（1）AspectJ 不是 Spring 组成部分，独立 AOP 框架，一般把 AspectJ 和 Spirng 框架一起使

用，进行 AOP 操作

**2** **、基于** **AspectJ** **实现** **AOP** **操作**

（1）基于 xml 配置文件实现

（2）基于注解方式实现（使用）

**3** **、在项目工程里面引入** **AOP** **相关依赖**

**4** **、切入点表达式**

（1）切入点表达式作用：知道对哪个类里面的哪个方法进行增强

（2）语法结构： execution(\[权限修饰符\] \[返回类型\] \[类全路径\] \[方法名称\] (\[参数列表\]) )

-   举例 1：对 com.atguigu.dao.BookDao 类里面的 add 进行增强 execution(\* com.atguigu.dao.BookDao.add(..))
    
-   举例 2：对 com.atguigu.dao.BookDao 类里面的所有的方法进行增强 execution( _com.atguigu.dao.BookDao._ (..))
    
-   举例 3：对 com.atguigu.dao 包里面所有类，类里面所有方法进行增强 execution( _com.atguigu.dao._.\* (..))
    

**5.AOP** **操作（** **AspectJ** **注解）**

**1** **、创建类，在类里面定义方法**

```java
public class User {
 public void add() {
 System.out.println("add.......");
 }
}
```

**2** **、创建增强类（编写增强逻辑）**

（1）在增强类里面，创建方法，让不同方法代表不同通知类型

```java
//增强的类
public class UserProxy {
 public void before() {//前置通知
 System.out.println("before......");
 } }
```

**3** **、进行通知的配置**

（1）在 spring 配置文件中，开启注解扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                            http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--开启组件扫描-->
    <context:component-scan base-package="com.atguigu.spring5.aopanno"></context:component-scan>
```

（2）使用注解创建 User 和 UserProxy 对象

（3）在增强类上面添加注解 @Aspect

```java
//User.java中
@Component
public class User {
    public void add() {
        System.out.println("add,......");
    }
}
//UserProxy.java中
@Component
@Aspect
public class UserProxy {
    @Before(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void before(){
        System.out.println("before.....");
    }
}
```

（4）在 spring 配置文件中开启生成代理对象

```xml
<!-- 开启 Aspect 生成代理对象-->
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```

**4** **、配置不同类型的通知**

（1）在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

```java
@Component
@Aspect //生成代理对象
public class UserProxy {
    //前置通知
    //@Before 注解表示作为前置通知
    @Before(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void before() {
        System.out.println("before.........");
    }
    //后置通知（返回通知）
    @AfterReturning(value = "execution(* 
            com.atguigu.spring5.aopanno.User.add(..))")

    public void afterReturning() {
        System.out.println("afterReturning.........");
    }

    //最终通知
    @After(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void after() {
        System.out.println("after.........");
    }
    //异常通知
    @AfterThrowing(value = "execution(* 
            com.atguigu.spring5.aopanno.User.add(..))")

    public void afterThrowing() {
        System.out.println("afterThrowing.........");
    }

    //环绕通知
    @Around(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws
            Throwable {
        System.out.println("环绕之前.........");
        //被增强的方法执行
        proceedingJoinPoint.proceed();
        System.out.println("环绕之后.........");
    }
}
```

**5** **、相同的切入点抽取**

_//相同切入点抽取_

@Pointcut(value = **“execution(\* com.atguigu.spring5.aopanno.User.add(..))”**)

**6** **、有多个增强类多同一个方法进行增强，设置增强类优先级**

（1）在增强类上面添加注解 @Order(数字类型值)，数字类型值越小优先级越高

```java
@Component
@Aspect
@Order(1)
public class PersonProxy
```

# 2.事务概念

**1** **、什么事务**

（1）事务是数据库操作最基本单元，逻辑上一组操作，要么都成功，如果有一个失败所有操

作都失败

（2）典型场景：银行转账

\* lucy 转账 100 元 给 mary

\* lucy 少 100，mary 多 100

**2** **、事务四个特性（** **ACID** **）**

（1）原子性

（2）一致性

（3）隔离性

（4）持久性

**3.事务操作（搭建事务操作环境）**

-   **创建数据库表，添加记录**
    
-   **创建** **service** **，搭建** **dao** **，完成对象创建和注入关系**
    

（1）service 注入 dao，在 dao 注入 JdbcTemplate，在 JdbcTemplate 注入 DataSource

```java
@Service
public class UserService {
 //注入 dao
 @Autowired
 private UserDao userDao; }
@Repository
public class UserDaoImpl implements UserDao {
 @Autowired
 private JdbcTemplate jdbcTemplate; }
```

-   **在** **dao** **创建两个方法：多钱和少钱的方法，在** **service** **创建方法（转账的方法）**

```java
@Repository
public class UserDaoImpl implements UserDao {
 @Autowired
 private JdbcTemplate jdbcTemplate;
 //lucy 转账 100 给 mary
 //少钱
 @Override
 public void reduceMoney() {
 String sql = "update t_account set money=money-? where username=?";
 jdbcTemplate.update(sql,100,"lucy");
 }
 //多钱
 @Override
 public void addMoney() {
 String sql = "update t_account set money=money+? where username=?";
 jdbcTemplate.update(sql,100,"mary");
 } }
@Service
public class UserService {
 //注入 dao
 @Autowired
 private UserDao userDao;
 //转账的方法
 public void accountMoney() {
 //lucy 少 100
 userDao.reduceMoney();
 //mary 多 100
 userDao.addMoney();
 } }
```

**4、事务操作（** **Spring** **事务管理介绍）**

-   **事务添加到** **JavaEE** **三层结构里面** **Service** **层（业务逻辑层）**
-   **在** **Spring** **进行事务管理操作**
-   **（** **1** **）有两种方式：**编程式事务管理**和声明式事务管理（使用）**
-   **声明式事务管理**
-   **（** **1** **）基于注解方式（使用）**
-   **（2）基于 xml 配置文件方式**
-   **在** **Spring** **进行声明式事务管理，底层使用** **AOP** **原理**
-   **Spring** **事务管理** **API**
-   （1）提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类

![image-20221011160228717](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221011160228717.png)

**事务的传播行为**

**3** **、** **ioslation** **：事务隔离级别**

（1）事务有特性成为隔离性，多事务操作之间不会产生影响。不考虑隔离性产生很多问题

（2）有三个读问题：脏读、不可重复读、虚（幻）读

（3）脏读：一个未提交事务读取到另一个未提交事务的数据

（4）不可重复读：一个未提交事务读取到另一提交事务修改数据

（5）虚读：一个未提交事务读取到另一提交事务添加数据

解决方案：

![image-20221011160356263](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/image-20221011160356263.png)

**4** **、** **timeout** **：超时时间**

（1）事务需要在一定时间内进行提交，如果不提交进行回滚

（2）默认值是 -1 ，设置时间以秒单位进行计算

**5** **、** **readOnly** **：是否只读**

（1）读：查询操作，写：添加修改删除操作

（2）readOnly 默认值 false，表示可以查询，可以添加修改删除操作

（3）设置 readOnly 值是 true，设置成 true 之后，只能查询

**6** **、** **rollbackFor** **：回滚**

（1）设置出现哪些异常进行事务回滚

**7** **、** **noRollbackFor** **：不回滚**

（1）设置出现哪些异常不进行事务回滚

# 3.总结

### 1.Spring5 IOC原理

**IOC :** **控制反转，把创建对象的过程交给Spring进行管理**

**1.1 原理理解：**

IOC是Inversion of Control的缩写，即控制反转，就是把对象创建和对象之间调用的过程交给Spring进行管理，使用 IOC 的目的是为了降低耦合。

对 IOC 的理解就是，比如说对象 A 要调用对象 B ，正常写代码的情况下，通常就是当对象 A 需要用到对象 B 的时候，然后就需要自己主动的 new 一个对象 B，主动权在对象 A 自己手中，但是引入了IOC 之后，，如果对象A在需要调用对象B，此时 IOC 会主动的创建一个B对象，然后注入到对象 A 需要的地方。这样就断绝了对象 A 和 对象 B 直接的直接联系。这点与电脑读取USB上文件的场景非常相似。

在电脑读取USB上的文件时，电脑不会关心这个是那个USB设备，只要这个USB是可用的，他就可以从上面读取文件，而电脑读取什么文件的决定权就在我的手上，我想要电脑读取什么文件，我就插入什么USB，这个时候 我 就扮演 IOC 的角色。

IOC 内部的底层原理主要包括xml解析 、 工厂模式 、 反射。

**1.2 Spring提供 IOC 容器的实现方式有两种：**

BeanFactory : IOC 容器的基本实现，是Spring内部的使用接口，不提供给开发人员使用，（加载配置文件时不会创建对象，只有使用对象时才会创建对象，不利于程序的时效性）

ApplicationContext : BeanFactory的子接口，提供给开发人员使用，（加载配置文件的时候就会把在配置文件中的对象创建，有利于程序的时效性）

IOC 操作bean管理

Bean管理是指两个操作 **创建对象** 和 **注入属性**

Bean管理有两种方式 **基于xml配置文件方式实现** 和 **注解方式实现**

### 2.AOP的基础概念

**2.1 AOP面向切面编程**，可以不修改源代码进行方法增强，AOP是OOP（面向对象编程）的延续，主要用于日志记录、性能统计、安全控制、事务处理等方面。它是基于代理设计模式，而代理设计模式又分为静态代理和动态代理，静态代理比较简单就是一个接口，分别由一个真实实现和一个代理实现，而动态代理分为基于接口的JDK动态代理和基于类的cglib的动态代理，咱们正常都是面向接口开发，所以AOP使用的是基于接口的JDK动态代理。

**2.2 AOP中的一些常用概念**

**切面(Aspect)**：AOP核心就是切面，它将多个类的通用行为封装成可重用的模块，该模块含有一组API提供横切功能。比如，一个日志模块可以被称作日志的AOP切面。根据需求的不同，一个应用程序可以有若干切面。在Spring AOP中，切面通过带有@Aspect注解的类实现。

**连接点(Join Point)**：哪些方法需要被AOP增强，这些方法就叫做连接点。

**通知(Advice)**：AOP在特定的切入点上执行的增强处理，有

```text
before
after
afterReturning
afterThrowing
around
```

**2.3 通知类型**

通知(advice)是你在你的程序中想要应用在其他模块中的横切关注点的实现。Advice主要有以下5种类型：

-   **前置通知(Before Advice)**：在连接点之前执行的Advice，不过除非它抛出异常，否则没有能力中断执行流。使用@Before注解使用这个Advice。
-   **返回之后通知(After Retuning Advice)**：在连接点正常结束之后执行的Advice。例如，如果一个方法没有抛出异常正常返回。通过 @AfterReturning注解使用它。
-   **抛出（异常）后执行通知(After Throwing Advice)**：如果一个方法通过抛出异常来退出的话，这个Advice就会被执行。通过 @AfterThrowing注解来使用。
-   **后置通知(After Advice)**：无论连接点是通过什么方式退出的(正常返回或者抛出异常)都会执行在结束后执行这些Advice。通过 @After注解使用。
-   **围绕通知(Around Advice)**：围绕连接点执行的Advice，就你一个方法调用。这是最强大的Advice。通过@Around注解使用。
