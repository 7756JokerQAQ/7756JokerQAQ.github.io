---
title: "MyBatis"
---

<!-- truncate -->
### 1.什么使MyBatis

-   MyBatis是一款优秀的持久层框架，用于简化JDBC开发
-   MyBatis本事APache的一个开源项目iBatis

### 2.持久层

-   负责将数据保存到数据库的那一层代码
-   JavaEE三层架构：表现层、业务层、持久层

### 3.框架

-   框架就是在一个半成品的软件上，是一套可重用的，通用的、软件基础代码模型
-   在框架的基础之上构建软件编写更加高效、规范、通用、可扩展

### 4.JDBC的缺点

-   硬编码
    -   注册驱动，获取连接
    -   SQL语句
-   操作繁琐
    -   手动设置参数
    -   手动封装结果集

**MyBatis免除了几乎所有的JDBC代码以及设置参数和获取结果集的工作**

# MyBatis快速入门

> 查询user表中的所有数据

1.  创建user表，添加数据(在数据库中创建)
2.  创建模块，导入坐标
3.  编写MyBatis核心配置文件—->替换连接信息解决硬编码问题
4.  编写SQL映射文件——>统一管理sql语句，解决硬编码问题
5.  编码
    1.  定义PoJo类
    2.  加载核心配置文件获取SqlSessionFactory对象

> 操作步骤

1.新建文件创建Maven项目模块

![](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/bu1.png)

2.在创建好的pom.xml文件中导入坐标：在MyBatis官网上有入门操作

```xml
<!--mybatis的依赖-->
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>x.x.x</version>   <!--自己选择版本号-->
</dependency>
```

插入到下图二

![](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/bu2.png)

3、导入数据库的驱动mysql和单元测试的驱动junit

```xml
<dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <version>8.0.28</version>
     </dependency>
     <dependency>
         <groupId>junit</groupId>
         <artifactId>junit</artifactId>
         <version>4.13.2</version>
         <scope>test</scope>
     </dependency>
```

4.导入logback-core依赖可以直接复制就行

```xml
<!-- 添加slf4j日志api -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.20</version>
</dependency>
<!-- 添加logback-classic依赖 -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
<!-- 添加logback-core依赖 -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-core</artifactId>
    <version>1.2.3</version>
</dependency>
```

5.在添加完成后需要配置文件在src/main/resources文件目录下建立`lockback.xml`文件添加以下代码

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!--
        CONSOLE ：表示当前的日志信息是可以输出到控制台的。
    -->
    <appender name="Console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>[%level] %blue(%d{HH:mm:ss.SSS}) %cyan([%thread]) %boldGreen(%logger{15}) - %msg %n</pattern>
        </encoder>
    </appender>

    <logger name="com.itheima" level="DEBUG" additivity="false">
        <appender-ref ref="Console"/>
    </logger>
    <!--

      level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和 OFF
     ， 默认debug
      <root>可以包含零个或多个<appender-ref>元素，标识这个输出位置将会被本日志级别控制。
      -->
    <root level="DEBUG">
        <appender-ref ref="Console"/>
    </root>
</configuration>
```

6.编写MyBatis核心配置文件（替换数据库连接信息）在官网上看

![](https://cdn.jsdelivr.net/gh/7756JokerQAQ/picodemoo/img/bu5.png)

7.找到后返回idea继续在src/main/resources文件下建立`mybatis-config.xml`文件。并将下列代码copy到该文件下

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
     <!--配置数据库连接信息可以配置多个environments通过default
		属性来切换不同的environments-->
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
          <!--数据库连接信息-->
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
      <!--加载sql映射文件-->
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
```

8.拷贝完成后需要其中修改相关数据库连接信息:

```xml
<!--将${driver}改成jdbc的驱动路径-->
<property name="driver" value="com.mysql.jdbc.Driver"/> 
<!--将${url}改成jdbc的驱动路径-->
 <property name="url" value="jdbc:mysql://mybatis?useSSL=false"/>
<!--修改自己数据库的用户名和密码-->
 <property name="username" value="root"/>
<property name="password" value="123456"/>
```

9.加载sql的映射文件直接在官网上找相关映射实列代码如下：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace这个需要修改他是个名称空间,以下代码需要修改-->
<mapper namespace="org.mybatis.example.BlogMapper">
  <select id="selectBlog" resultType="Blog">
    select * from Blog where id = #{id}
  </select>
</mapper>
```

10.找到后在src/main/resources文件下建立`UserMapper.xml`文件 这个名字可以修改用户为UserMapper，汽车为CarMapper等等。完成后将9步骤的代码复制到该文件下。

11.然后在src/main/java下创建相关的User类

12.修改第9步的相关信息

```xml
<mapper namespace="test">  <!--修改名称空间为test-->
  <!--查询数据库所有改为selectAll,后面的参数为User类的路径直接写User就可以-->
    <select id="selectAll" resultType="User">  
       <!--修改相关的sql语句操作,tb_user为自己定义的表的名字-->
    select * from tb_user;  
  </select>
```

13.接着修改第七步里面的sql映射文件为`UserMapper.xml`

`<mapper resource="UserMapper.xml"/>`

## 开始编码

1.打开User类

创建相关数据库内的相关属性信息如下：

```java
package com.itheima.pojo;

public class User {
    private Integer id;
    private String username;
    private String PASSWORD;
    private String gender;
    private String addr;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", PASSWORD='" + PASSWORD + '\'' +
                ", gender='" + gender + '\'' +
                ", addr='" + addr + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPASSWORD() {
        return PASSWORD;
    }

    public void setPASSWORD(String PASSWORD) {
        this.PASSWORD = PASSWORD;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }
}
```

2.接着写MyBatis的测试类：直接在src/main/java目录下创建一个文件`MyBatisDemo`然后进入官网拷贝以下代码并修改

```java
String resource = "org/mybatis/example/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

修改resource=”mybatis-config.xml”第二句有异常直接try-catch抛出就行可以，接着需要获取SqlSession对象，用来执行sql最后执行sql语句

```java
public static void main(String[] args) {
     //加载MyBatis的核心配置文件获取SqlSessionFactory
     String resource = "mybatis-config.xml";
     InputStream inputStream = null;
     try {
         inputStream = Resources.getResourceAsStream(resource);
     } catch (IOException e) {
         e.printStackTrace();
     }
     SqlSessionFactory sqlSessionFactory = new 			        SqlSessionFactoryBuilder().build(inputStream);
     //获取SqlSession对象 用它来执行sql
     SqlSession sqlSession = sqlSessionFactory.openSession();
     //执行sql语句
    //调用selectList括号的内容为上面自己定义的名称作用域test和标识(id)selectAll
     List<User> users = sqlSession.selectList("test.selectAll");
    //打印结果
     System.out.println(users);
     sqlSession.close();
 }
```

# Mapper代理开发

### 代理步骤详解

-   定义与SQL映射文件同名的Mapper接口，并且将Mapper接口和SQL映射文件放在同一目录下。

需要在main下建立一个mapper类，而且在resource文件下建立相应的mapper路径 文件名称层次不用`.`用`\`来表示并且建立完成后将对应的UserMapper.xml放在该路径下即可。编译后IDEA自动将接口和SQL映射文件放在一起.

-   设置SQL映射文件的namespace属性为mapper接口的全限定名📂![](https://github.githubassets.com/images/icons/emoji/unicode/1f4c2.png?v8)UserMapper.xml修改代码

```xml
<mapper namespace="com.itheima.mapper.UserMapper"> 
  <!---修改text为com.itheima.mapper.UserMapper-->
	<!--就是你的UserMapper放在的地方路径-->
```

-   在Mapper接口中定义方法，方法名就是SQL映射文件中的sql语句的id，并保持参数类型和返回值类型的一致

在接口类：UserMapper中添加以下代码：

```java
public interface UserMapper {
    List<User> selectAll();   
    //因为在配置文件UserMapper.xml中有
    // <select id="selectAll" resultType="com.itheima.pojo.User">
    //上面代码有标识id和返回值类型为User所以这里定义的接口为List容器来盛放多个User对象
}
```

完成后需要修改mybatis-config.xml文件中的配置路径，因为刚刚我们把UserMapper.xml文件放在了新的目录下所以这里我们需要改变路径：复制文件的路径修改以下代码：

```xml
<mappers>
       <!--加载sql映射文件 更改后修改resource路径-->
       <mapper resource="com/itheima/mapper/UserMapper.xml"/>  
   </mappers>
```

-   编码
    1.  通过SqlSession的getMapper方法获取Mapper接口的代理对象
    2.  调用对应的方法完成sql的执行

```java
public static void main(String[] args) {
     //加载MyBatis的核心配置文件获取SqlSessionFactory
     String resource = "mybatis-config.xml";
     InputStream inputStream = null;
     try {
         inputStream = Resources.getResourceAsStream(resource);
     } catch (IOException e) {
         e.printStackTrace();
     }
     SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
     //获取SqlSession对象 用它来执行sql
     SqlSession sqlSession = sqlSessionFactory.openSession();
     //执行sql语句(在Mapper代理中下面这句代码注释掉)
    // List<User> users = sqlSession.selectList("test.selectAll");
     //重点！！！获取对应userMapper代理对象 
     UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
     List<User>users= userMapper.selectAll();
    //重点两句代码
     System.out.println(users);
     sqlSession.close();
 }
```

**运行流程分析：**

1.  利用`SqlSession sqlSession = sqlSessionFactory.openSession();`获取sqlSession
2.  通过sqlSession可以获取UserMapper代理对象就直接找到UserMapper.java接口
3.  接着在当前目录下有一个同名的映射文件就可以找到UserMapper.xml的sql语句
4.  通过最后一句`List<User>users= userMapper.selectAll();`调用UserMapper.java接口的方法然而该函数`List<User> selectAll();`名称为UserMapper.xml文件中sql的id名字：`<select id="selectAll" resultType="com.itheima.pojo.User">`
5.  所以接着就执行id对应的sql语句，执行完毕后因为有返回类型User所以就返回给UserMapper接口，在调用文件中我们用一个List来接收该返回值并打印输出。

> 细节

​ 如果Mapper接口名称和SQL映射文件名称相同，并且在同一目录下，则可以使用包扫描的方式简化SQL映射的加载

**相关操作：**在mybatis-config.xml文件中修改sql映射文件代码：

```xml
<mappers>
       <!--加载sql映射文件,在这里可以直接引入同一个包下面的文件-->
      <!-- <mapper resource="com/itheima/mapper/UserMapper.xml"/> -->
    <!--Mapper代理方式 一行代码全部搞定-->
    <package name="com.itheima.mapper"/>
   </mappers>
```

核心配置文件：

```java
<typeAliases>  <!--起别名-->
       <package name="com.itheima.pojo"/>
   </typeAliases>
```

### 配置文件完成增删改查

#### 1.查询所有数据

1.编写接口方法：Mapper接口

-   参数无
-   结果:List

2.编写SQL语句,SQL映射文件

3.执行方法，测试

> 编写方法

参数占位符 1.#&#123;&#125; 会将其替换为? 为了防止SQL注入

2.$&#123;&#125; 拼SQL 会存在SQL注入问题

3.使用时机 **\*在参数传递的时候；#&#123;&#125; 不使用$&#123;&#125;**

可以指定参数类型:

```xml
<select id="selectById"  resultMap="brandResultMap"> 
    <!--还有一个parameterType="参数类型" 一般不写-->
    select *from tb_brand where id=#{id};
</select>
```

> 对应的特殊字符

解决小于号不能用：

1.  转义字符 &lt;(&lt)
    
2.  输入CDATA区
