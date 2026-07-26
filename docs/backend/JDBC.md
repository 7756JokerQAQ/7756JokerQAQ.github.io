---
title: "JDBC"
---

<!-- truncate -->
> 详解DriveManager

驱动管理类(工具类)：

1.注册驱动 ——可以省略注册驱动这个步骤 `Class.forName("com.mysql.jdbc.Driver")`

2.获取数据库连接 ——url:连接路径 ——user：用户名—password:密码

语法：`jdbc:mysql://127.0.0.1:3306/db1` 解释 &#123;//ip地址（域名）:端口号/数据库名称?参数键值对1&参数键值对2&…&#125;

获取连接；如果连接的是本机的mysql并且端口号是默认的3306 可以简化书写`jdbc:mysql://db1`

可以配置useSSL=false 可以去除警告

> Connection详解

**1.获取执行的SQL对象**

-   普通执行SQL对象：`Statement creatStatement()`
-   预编译SQL的执行SQL对象：防止SQL注入`PreparedStatement prepareStatement(sql)`
-   执行存储过程的对象 `CallableStatement prepareCall(sql)`

**2.执行事务**

-   MySQL事务管理

开启事务：`BEGIN;/START TRANSACTION`

提交事务：`COMMIT`

回滚事务：`ROLLBACK`

mysql默认自动提交事务

-   JDBC 事务管理：Connection接口中定义了3个对应的方法

开启事务：`setAutoCommit(boolean autoCommit):true 为自动提交事务 false为手动提交事务，即开启事务`

提交事务：`COMMIT()`

回滚事务：`ROLLBACK()`

```java
package com.itheima.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCDemo3 {
    public static void main(String[] args) throws Exception {
        //注册驱动
        // Class.forName("com.mysql.jdbc.Driver");
        //获取连接
        String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
        String username = "root";
        String password = "123456";
        Connection conn = DriverManager.getConnection(url, username, password);
        //定义SQL语句
        String sql1 = "update account set money =3000 where id =1";
        String sql2 = "update account set money =3000 where id =2";
        //获取执行sql的对象Statement
        Statement stmt = conn.createStatement();

        try {
            //**开启事务
            conn.setAutoCommit(false); //如果注释掉则会修改数据
            //执行sql
            int count1 = stmt.executeUpdate(sql1);  //受影响的行数
            //处理结果
            System.out.println(count1);
           // int i = 3 / 0;  //打开手动制造一个异常
            int count2 = stmt.executeUpdate(sql2);  //受影响的行数
            //处理结果
            System.out.println(count2);
            //提交事务
            conn.commit();
        } catch (Exception throwables) {
            //回滚事务
            conn.rollback();
            throwables.printStackTrace();
        }

        //释放资源
        stmt.close();
        conn.close();
        ;
    }
}
```

> Statement详解

1.执行SQL语句

`int executeUpdate(sql)`执行DML、DDL语句

→返回值(1)DML语句影响的行数 （2）DDL语句执行后，执行成功也可能返回0

`ResultSet executeQuery(sql)`执行DQL语句 →返回值：ResultSet结果集对象

> ResultSet详解

-   ResultSet(结果集对象)作用：

​ 1.封装了DQL查询语句的结果

`ResultSet stmt.executrQuery(sql)` 执行DQL语句，返回ResultSet对象

-   获取查询结果

`boolean next()`(1)将光标从当前位置向前移动一行(2)判断当前行是否有效行；

→返回值:

-   true:有效行，当前行有数据
-   false：无效行，当前行没有数据

xxx getXxx(参数) 获取数据

→xxx：数据类型；如int getlnt(参数)；String getString(参数)

→参数：

-   int :列的编号，从一开始
-   String ：列的名称

使用步骤：

1.  游标向下移动一行，并判断改行是否有数据:next()
2.  获取数据：getXxx(参数)

> PreparedStatement

作用：

1.  预编译SQL语句并执行,预防SQL注入问题

```java
@Test
public void textResultSet() throws Exception {
    String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
    String username = "root";
    String password = "123456";
    Connection conn = DriverManager.getConnection(url, username, password);
    //接收用户名和密码
    String name = "zhangsan";
    String pwd = "123";
    String sql = "select * from tb_user where username='" + name + "' and password='" + pwd + "'";
    //获取stmt对象
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql);
    //判断登录是否成功
    if (rs.next()) {
        System.out.println("登录成功！！");
    } else {
        System.out.println("登录失败~~");
    }
    rs.close();
    stmt.close();
    conn.close();

}
```

-   SQL注入
    -   SQL注入是通过操作输入来修改事先定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法。

```java
/**
 * SQL注入
 * @throws Exception
 */
@Test
public void textLogin_Inject() throws Exception {
    String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
    String username = "root";
    String password = "123456";
    Connection conn = DriverManager.getConnection(url, username, password);
    //接收用户名和密码
    String name = "sadasdasd";
    String pwd = "' or '1' = '1";  //注入语法
    String sql = "select * from tb_user where username='" + name + "' and password='" + pwd + "'";
    //获取stmt对象
    System.out.println(sql);
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery(sql);
    //判断登录是否成功
    if (rs.next()) {
        System.out.println("登录成功！！");
    } else {
        System.out.println("登录失败~~");
    }
    rs.close();
    stmt.close();
    conn.close();

}
```

-   防止SQL注入的方法

1.  获取`PreparedStatement`对象

```java
//SQL语句中的参数值，使用?占位符来代替

String sql="select *from user where username =? and password = ?";

//通过Connection对象获取，并且传入对应的SQL语句
PrepareStatedment pstmt=conn.prepareStatement(sql);
```

2.设置参数值

```java
PreparedStatement 对象 ：setXxx(参数1，参数二):给？赋值
    →Xxx：数据类型; 如setInt(参数一，参数二)
    →参数：
        参数1：?的位置编号从一开始
        参数2: ?的值
```

3.执行SQL

```java
executeUpdate(); /executeQuery(); ：不需要在传递sql
```

### 源代码

```java
@Test
public void textPreparedStatement() throws Exception {
    String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
    String username = "root";
    String password = "123456";
    Connection conn = DriverManager.getConnection(url, username, password);
    //接收用户名和密码
    String name = "zhangsan";
    String pwd = "' or '1' = '1";  //此时注入无效
    //定义SQL
    String sql = "select*from tb_user where username=? and password=?";
    PreparedStatement pstmt = conn.prepareStatement(sql);
    //设置？的值
    pstmt.setString(1, name);
    pstmt.setString(2, pwd);
    ResultSet rs = pstmt.executeQuery();

    //判断登录是否成功
    if (rs.next()) {
        System.out.println("登录成功！！");
    } else {
        System.out.println("登录失败~~");
    }
    rs.close();
    pstmt.close();
    conn.close();
}
```

## 数据库连接池

> 数据库连接池简介

-   数据库连接池是个容器，负责分配管理数据库连接
-   它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个
-   释放空闲的实践超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库遗漏
-   好处

1.  资源重用
2.  提升数据库的响应速度
3.  避免数据库连接遗漏

> 数据库连接池的实现

-   标准接口：DataSource
    
    -   官方（SUN）提供的数据库连接池标准接口，由第三方组织实现此接口
    -   功能：获取连接`Connection getConnection()`
-   常见的数据库连接池
    
    -   DBCP
    -   C3P0
    -   Druid
-   Druid(德鲁伊)
    
    -   Druid连接池是阿里巴巴开源的数据库连接池项目
    -   功能强大，性能优秀，是java语言最好的数据库连接池之一
