---
title: "Mybatis-Plus"
---

<!-- truncate -->
### 1\. 简介

**MyBatis-Plus**（简称 MP）是一个 **MyBatis** **的增强工具**，在 MyBatis 的基础上**只做增强不做改变**，为

**简化开发、提高效率而生**。

### 2\. 特性

**无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑

**损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作

**强大的** **CRUD** **操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分CRUD 操作，更有强大的条件构造器，满足各类使用需求

**支持** **Lambda** **形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错

**支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题

**支持** **ActiveRecord** **模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作

**支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）

**内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用

**内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询

**分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库

**内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询

**内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

### 3.支持的数据库

-   MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
    
-   达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库
    

### 4.框架结构

![framework](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/mybatis-plus-framework.jpg)

### 5.代码以及官方文档

官方地址: [http://mp.baomidou.com](http://mp.baomidou.com)

**代码发布地址:**

Github: [https://github.com/baomidou/mybatis-plus](https://github.com/baomidou/mybatis-plus)

Gitee: [https://gitee.com/baomidou/mybatis-plus](https://gitee.com/baomidou/mybatis-plus)

文档发布地址: [https://baomidou.com/pages/24112f](https://baomidou.com/pages/24112f)

# 二、入门案例

### 1.开发环境

IDE：idea 2021.1.3

JDK：JDK8+

构建工具：maven 3.5.4

MySQL版本：MySQL 8.0

Spring Boot：2.6.3

MyBatis-Plus：3.5.1

### 2.创建工程

使用 Spring Initializr 快速初始化一个 Spring Boot 工程

![image-20221022142442601](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022142442601.png)

![image-20221022142527037](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022142527037.png)

删除不需要的文件：

![image-20221022142631689](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022142631689.png)

### 3.a>创建数据库表

```sql
CREATE DATABASE `mybatis_plus`   /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
use `mybatis_plus`;
CREATE TABLE `user` (
`id` bigint(20) NOT NULL COMMENT '主键ID',
`name` varchar(30) DEFAULT NULL COMMENT '姓名',
`age` int(11) DEFAULT NULL COMMENT '年龄',
`email` varchar(50) DEFAULT NULL COMMENT '邮箱',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

### b>添加数据

```sql
INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
```

### c>引入依赖

```xml
      <dependency>
          <groupId>com.baomidou</groupId>
          <artifactId>mybatis-plus-boot-starter</artifactId>
          <version>3.5.1</version>
      </dependency>
<!--改lombok依赖IDEA可能已经内部集成-->
      <dependency>
          <groupId>org.projectlombok</groupId>
          <artifactId>lombok</artifactId>
          <optional>true</optional>
      </dependency>
      <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
          <scope>runtime</scope>
      </dependency>
```

### 4.编写代码

#### a>配置**application.yml**

首先在`src/resource`目录下创建一个application.yml文件然后写入以下代码

```yaml
spring:
# 配置数据源信息
  datasource:
  # 配置数据源类型
    type: com.zaxxer.hikari.HikariDataSource
    # 配置连接数据库信息
    driver-class-name: com.mysql.cj.jdbc.Driver
    #注意该路径需要自己配置3306/后面的时数据库名字
    url: jdbc:mysql://localhost:3306/db1?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
    username: root
    password: 123456
```

> 注意！！！
> 
> 1、驱动类driver-class-name
> 
> spring boot 2.0（内置jdbc5驱动），驱动类使用：
> 
> driver-class-name: com.mysql.jdbc.Driver
> 
> spring boot 2.1及以上（内置jdbc8驱动），驱动类使用：
> 
> driver-class-name: com.mysql.cj.jdbc.Driver
> 
> 否则运行测试用例的时候会有 WARN 信息
> 
> 2、连接地址url
> 
> MySQL5.7版本的url：
> 
> jdbc:mysql://localhost:3306/mybatis\_plus?characterEncoding=utf-8&useSSL=false
> 
> MySQL8.0版本的url：
> 
> jdbc:mysql://localhost:3306/mybatis\_plus?serverTimezone=GMT%2B8&characterEncoding=utf-8&useSSL=false
> 
> 否则运行测试用例报告如下错误：
> 
> java.sql.SQLException: The server time zone value ‘ÖÐ¹ú±ê×¼Ê±¼ä’ is unrecognized or represents more

#### b>启动类

> 在Spring Boot启动类中添加@MapperScan注解，扫描mapper包

```java
@SpringBootApplication
//扫描mapper接口所在的包
@MapperScan("com.atguigu.mybaitsplus.mapper")
public class MybaitsPlusApplication {
    public static void main(String[] args) {
        SpringApplication.run(MybaitsPlusApplication.class, args);
    }

}
```

#### c>添加实体

在该目录下建立一个pojo的文件夹用于存放实体、然后建立一个User类导入以下数据

```java

//lombok注解 该注解自动生成相应的get和set、hashcode方法
@Data 
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

#### d>添加mapper

> BaseMapper是MyBatis-Plus提供的模板mapper，其中包含了基本的CRUD方法，泛型为操作的实体类型

首先在java对应的目录下建立一个mapper文件夹用来存放各种mapper项目结构图如下

![image-20221022144551484](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022144551484.png)

添加一个UserMapper接口让他继承BaseMapper可以拥有一些基础的CRUD功能

```java
//这个注解使其持久化 解决后面的单词报错问题 可以不需要
@Repository
public interface UserMapper extends BaseMapper<User> {

}
```

#### d>测试

```java
//首先加上SpringBootTest的注解
@SpringBootTest
public class MybatisPlusTest {
    //对userMapper自动的装配
    @Autowired
    private UserMapper userMapper;
	//第一个测试案例打上注解
    @Test
    public void testSelectList(){
        //通过条件构造器查询list集合
        List<User> list = userMapper.selectList(null);
        list.forEach(System.out::println);
    }
}
```

#### f >添加日志

```yaml
mybatis-plus:
  configuration:
  #原生的日志
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

# 三、基本的CRUD

### 1.BaseMapper

```java
//他已经帮我门实现了一些基础的功能
public interface BaseMapper<T> extends Mapper<T> {
    /**
     * 插入一条记录
     *
     * @param entity 实体对象
     */
    int insert(T entity);

    /**
     * 根据 ID 删除
     *
     * @param id 主键ID
     */
    int deleteById(Serializable id);

    /**
     * 根据实体(ID)删除
     *
     * @param entity 实体对象
     * @since 3.4.4
     */
    int deleteById(T entity);

    /**
     * 根据 columnMap 条件，删除记录
     *
     * @param columnMap 表字段 map 对象
     */
    int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * 根据 entity 条件，删除记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where
     *                     语句）
     */
    int delete(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 删除（根据ID 批量删除）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    int deleteBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);

    /**
     * 根据 ID 修改
     *
     * @param entity 实体对象
     */
    int updateById(@Param(Constants.ENTITY) T entity);

    /**
     * 根据 whereEntity 条件，更新记录
     *
     * @param entity        实体对象 (set 条件值,可以为 null)
     * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成
     *                      where 语句）
     */
    int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updateWrapper);

    /**
     * 根据 ID 查询
     *
     * @param id 主键ID
     */
    T selectById(Serializable id);

    /**
     * 查询（根据ID 批量查询）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);

    /**
     * 查询（根据 columnMap 条件）
     *
     * @param columnMap 表字段 map 对象
     */
    List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /*** 根据 entity 条件，查询一条记录
     * <p>查询一条记录，例如 qw.last("limit 1") 限制取一条记录, 注意：多条数据会报异常
     </p>
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    default T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper) {
        List<T> ts = this.selectList(queryWrapper);
        if (CollectionUtils.isNotEmpty(ts)) {
            if (ts.size() != 1) {
                throw ExceptionUtils.mpe("One record is expected, but the query result is multiple records");
            }
            return ts.get(0);
        }
        return null;
    }

    /**
     * 根据 Wrapper 条件，查询总记录数
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    Long selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T>
                                                 queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     * <p>注意： 只返回第一个字段的值</p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件（可以为 RowBounds.DEFAULT）
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    <P extends IPage<T>> P selectPage(P page, @Param(Constants.WRAPPER)
            Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件
     * @param queryWrapper 实体对象封装操作类
     */
    <P extends IPage<Map<String, Object>>> P selectMapsPage(P page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
}
```

#### 2.插入操作

```java
@Test
 /**
  * 实现新增用户信息
  */
 public void testInsertUser() {
     User user = new User();
     user.setName("张三");
     user.setAge(29);
     user.setEmail("zhangsan@guigu");
     int result = userMapper.insert(user);
     System.out.println(result);
 }
```

#### **2.** **通过** **id** **批量删除记录**

```java
@Test
public void testDeleteById() {
    //删除一个
    // int result = userMapper.deleteById(1583380690149076993L);
    //System.out.println("result="+result);
    
    //根据map删除
   /* Map<String,Object>map=new HashMap<>();
    map.put("name","张三");
    map.put("age","23");
    int result = userMapper.deleteByMap(map);
    System.out.println("result="+result);
    */
    //实现批量删除
    List<Long> list = Arrays.asList(1L, 2L, 3L);
    int i = userMapper.deleteBatchIds(list);
    System.out.println("result=" + i);
}
```

#### 3.修改

```java
@Test
public void testUpdate() {
   //UPDATE user SET name=?, age=? WHERE id=?
    User user = new User();
    user.setId(4L);
    user.setName("李四");
    user.setAge(23);
    user.setEmail("lis@quda");
    int update = userMapper.updateById(user);
    System.out.println("result=" + update);
}
```

#### 4.查询

```java
@Test
   public void testSelectById() {
   //根据id查询用户信息
   //SELECT id,name,age,email FROM user WHERE id=?
       User user = userMapper.selectById(4L);
       System.out.println(user);
   }
```

**根据多个id查询多个用户信息**

```java
@Test
public void testSelectBatchIds() {
    //根据多个id查询多个用户信息
    //SELECT id,name,age,email FROM user WHERE id IN ( ? , ? )
    List<Long> idList = Arrays.asList(4L, 5L);
    List<User> list = userMapper.selectBatchIds(idList);
    list.forEach(System.out::println);
}
```

```java
@Test
public void testSelectByMap(){
 //通过map条件查询用户信息
 //SELECT id,name,age,email FROM user WHERE name = ? AND age = ?
    Map<String, Object> map = new HashMap<>();
    map.put("age", 22);
    map.put("name", "admin");
    List<User> list = userMapper.selectByMap(map);
    list.forEach(System.out::println);
}
```

> 通过观察BaseMapper中的方法，大多方法中都有Wrapper类型的形参，此为条件构造器，可针对于SQL语句设置不同的条件，若没有条件，则可以为该形参赋值null，即查询（删除/修改）所有数据

### 5.通用的Service

> 说明:
> 
> 通用 Service CRUD 封装IService接口，进一步封装 CRUD 采用 get 查询单行 remove 删除 list 查询集合 page 分页 前缀命名方式区分 Mapper 层避免混淆，泛型 T 为任意实体对象建议如果存在自定义通用 Service 方法的可能，请创建自己的 IBaseService 继承Mybatis-Plus 提供的基类
> 
> 官网地址：[https://baomidou.com/pages/49cc81/#service-crud-%E6%8E%A5%E5%8F%A3](https://baomidou.com/pages/49cc81/#service-crud-%E6%8E%A5%E5%8F%A3)

#### **a>IService**

MyBatis-Plus中有一个接口 IService和其实现类 ServiceImpl，封装了常见的业务层逻辑详情查看源码IService和ServiceImpl

#### **b>** **创建** **Service** **接口和实现类**

```java
/**
* UserService继承IService模板提供的基础功能
*/
public interface UserService extends IService<User> {
}
```

```java
/**
* ServiceImpl实现了IService，提供了IService中基础功能的实现
* 若ServiceImpl无法满足业务需求，则可以使用自定的UserService定义方法，并在实现类中实现
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {
}
```

![image-20221022150748320](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022150748320.png)

#### **c>** **测试查询记录数**

```java
@Autowired
 private UserService userService;
 @Test
 public void testGetCount(){
     long count = userService.count();
     System.out.println("总记录数：" + count);
 }
```

#### **d>** **测试批量插入**

```java
   @Test
   public void testSaveBatch() {
// SQL长度有限制，海量数据插入单条SQL无法实行，
// 因此MP将批量插入放在了通用Service中实现，而不是通用Mapper
       ArrayList<User> users = new ArrayList<>();
       for (int i = 0; i < 5; i++) {
           User user = new User();
           user.setName("ybc" + i);
           user.setAge(20 + i);
           users.add(user);
       }
   //SQL:INSERT INTO t_user ( username, age ) VALUES ( ?, ? )
       userService.saveBatch(users);
   }
```

# **四、常用注解**

### **1** **、** **@TableName**

> 经过以上的测试，在使用MyBatis-Plus实现基本的CRUD时，我们并没有指定要操作的表，只是在Mapper接口继承BaseMapper时，设置了泛型User，而操作的表为user表
> 
> 由此得出结论，MyBatis-Plus在确定操作的表时，由BaseMapper的泛型决定，即实体类型决定，且默认操作的表名和实体类型的类名一致

为了解决实体类类型的类名和要操作的表的表名不一致：**通过** **@TableName** **解决问题**

> 在实体类类型上添加@TableName(“t\_user”)，标识实体类对应的表，即可成功执行SQL语句 //括号内是要加入的指定数据库表名

![image-20221022151456161](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022151456161.png)

#### c>通过全局配置解决问题

> 在开发的过程中，我们经常遇到以上的问题，即实体类所对应的表都有固定的前缀，例如t _或tbl_ 此时，可以使用MyBatis-Plus提供的全局配置，为实体类所对应的表名设置默认的前缀，那么就不需要在每个实体类上通过@TableName标识实体类对应的表

```yaml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    # 配置MyBatis-Plus操作表的默认前缀
    db-config:
      table-prefix: t_
```

### **2** **、** **@TableId**

#### **b>** **通过** **@TableId** **解决主键不是id的问题**

经过以上的测试，MyBatis-Plus在实现CRUD时，会默认将id作为主键列，并在插入数据时，默认基于雪花算法的策略生成id

> 在实体类中uid属性上通过@TableId将其标识为主键，即可成功执行SQL语句

```java
@Data //lombok注解
public class User {
    @TableId
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

#### **c>@TableId** **的** **value** **属性**

> 若实体类中主键对应的属性为id，而表中表示主键的字段为uid，此时若只在属性id上添加注解@TableId，则抛出异常Unknown column ‘id’ in ‘field list’，即MyBatis-Plus仍然会将id作为表的主键操作，而表中表示主键的是字段uid此时需要通过@TableId注解的value属性，指定表中的主键字段，@TableId(“uid”)或@TableId(value=”uid”)

![image-20221022152333945](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022152333945.png)

**配置全局主键策略：**

```yaml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    # 配置MyBatis-Plus操作表的默认前缀
    db-config:
      table-prefix: t_
      # 配置MyBatis-Plus的主键策略
      id-type: auto
```

### 3.TableField

经过以上的测试，我们可以发现，MyBatis-Plus在执行SQL语句时，要保证实体类中的属性名和表中的字段名一致

#### **a>** **情况** **1**

> 若实体类中的属性使用的是驼峰命名风格，而表中的字段使用的是下划线命名风格例如实体类属性userName，表中字段user\_name此时MyBatis-Plus会自动将下划线命名风格转化为驼峰命名风格相当于在MyBatis中配置

#### **b>** **情况** **2**

> 若实体类中的属性和表中的字段不满足情况1例如实体类属性name，表中字段username此时需要在实体类属性上使用@TableField(“username”)设置属性所对应的字段名

```java
@Data //lombok注解
public class User {
    @TableId
    private Long id;
    @TableField("username")
    private String name;
    private Integer age;
    private String email;
}
```

### **4** **、** **@TableLogic**

说明:

只对自动注入的 sql 起效:

-   插入: 不作限制
-   查找: 追加 where 条件过滤掉已删除数据,如果使用 wrapper.entity 生成的 where 条件也会自动追加该字段
-   更新: 追加 where 条件防止更新到已删除数据,如果使用 wrapper.entity 生成的 where 条件也会自动追加该字段
-   删除: 转变为 更新

例如:

-   删除: `update user set deleted=1 where id = 1 and deleted=0`
-   查找: `select id,name,deleted from user where deleted=0`

字段类型支持说明:

-   支持所有数据类型(推荐使用 `Integer`,`Boolean`,`LocalDateTime`)
-   如果数据库字段使用`datetime`,逻辑未删除值和已删除值支持配置为字符串`null`,另一个值支持配置为函数来获取值如`now()`

附录:

-   逻辑删除是为了方便数据恢复和保护数据本身价值等等的一种方案，但实际就是删除。
-   如果你需要频繁查出来看就不应使用逻辑删除，而是以一个状态去表示。

#### 1.使用方法配置application.yml文件

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

#### 2.实体类字段上加上`@TableLogic`注解

```java
@TableLogic
private Integer deleted;
```

# **五、条件构造器和常用接口**

### **1** **、** **wapper** **介绍**

![image-20221022153506737](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221022153506737.png)

-   Wrapper ： 条件构造抽象类，最顶端父类
    -   AbstractWrapper ： 用于查询条件封装，生成 sql 的 where 条件
        -   QueryWrapper ： 查询条件封装
        -   UpdateWrapper ： Update 条件封装
        -   AbstractLambdaWrapper ： 使用Lambda 语法
            -   LambdaQueryWrapper ：用于Lambda语法使用的查询Wrapper
            -   LambdaUpdateWrapper ： Lambda 更新封装Wrapper

### **2** **、** **QueryWrapper**

#### **a>** **例** **1** **：组装查询条件**

```java
  @Autowired
  private UserMapper userMapper;
  @Test
  public void testSelectTest(){
      //查询用户名包含a，年龄在20到30之间，并且邮箱不为null的用户信息
//SELECT id,username AS name,age,email,is_deleted FROM t_user WHEREis_deleted=0 AND (username LIKE ? AND age BETWEEN ? AND ? AND email IS NOT NULL)
      QueryWrapper<User> queryWrapper=new QueryWrapper<User>();
      queryWrapper.like("name","a").between("age",18,30).isNotNull("email");
      List<User> list = userMapper.selectList(queryWrapper);
      list.forEach(System.out::println);
  }
```

#### **b>** **例** **2** **：组装排序条件**

```java
    @Test
    public void testSort(){
        //按年龄降序查询用户，如果年龄相同则按id升序排列
//SELECT id,username AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 ORDER BY age DESC,id ASC
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.orderByDesc("age").orderByAsc("id");
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out::println);
    }
```

#### **c>** **例** **3** **：组装删除条件**

```java
@Test
public void test03() {
//删除email为空的用户
//DELETE FROM t_user WHERE (email IS NULL)
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.isNull("email");
//条件构造器也可以构建删除语句的条件
    int result = userMapper.delete(queryWrapper);
    System.out.println("受影响的行数：" + result);
}
```

#### **d>** **例** **4** **：条件的优先级**

```java
@Test
public void testUpdate() {
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    //年龄大于20且包含a 或者邮箱为null的修改
    queryWrapper
            .gt("age", 20)
            .like("name", "a")
            .or()
            .isNull("email");
    User user = new User();
    user.setName("LYC");
    int update = userMapper.update(user, queryWrapper);
    System.out.println(update);
}
```

```java
//将用户名包含B并且（年龄大于20或者邮箱为空的）用户信息修改
@Test
   public void testUpdate2() {
       QueryWrapper<User> queryWrapper = new QueryWrapper<>();
       queryWrapper
               .like("name", "B")
               .and(i -> i
                       .gt("age", 20)
                       .or()
                       .isNull("email")
               );
       User user = new User();
       user.setName("王五");
       int update = userMapper.update(user, queryWrapper);
       System.out.println("result=" + update);
   }
```

#### **e>** **例** **5** **：组装** **select** **子句**

```java
 //查询用户的年龄邮箱和姓名
  @Test
  public void selectTest() {
      //查询用户信息的username和age字段
//SELECT username,age FROM t_user
      QueryWrapper<User> queryWrapper = new QueryWrapper<>();
      queryWrapper.select("name", "age");
      //selectMaps()返回Map集合列表，通常配合select()使用，避免User对象中没有被查询到的列值为null
      List<Map<String, Object>> maps = userMapper.selectMaps(queryWrapper);
      maps.forEach(System.out::println);
  }
```

```java
// f>例6：实现子查询
@Test
public void test06() {
 //查询id小于等于3的用户信息
 //SELECT id,username AS name,age,email,is_deleted FROM t_user WHERE (id IN(select id from t_user where id <= 3))
    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
    queryWrapper.inSql("id", "select id from t_user where id <= 3");
    List<User> list = userMapper.selectList(queryWrapper);
    list.forEach(System.out::println);
}
```

### **3** **、** **UpdateWrapper**

```java
@Test
public void test07() {
//将（年龄大于20或邮箱为null）并且用户名中包含有a的用户信息修改
//组装set子句以及修改条件
    UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
//lambda表达式内的逻辑优先运算
    updateWrapper
            .set("age", 18)
            .set("email", "user@atguigu.com")
            .like("username", "a")
            .and(i -> i.gt("age", 20).or().isNull("email"));
//这里必须要创建User对象，否则无法应用自动填充。如果没有自动填充，可以设置为null
//UPDATE t_user SET username=?, age=?,email=? WHERE (username LIKE ? AND(age > ? OR email IS NULL))
//User user = new User();
//user.setName("张三");
    //int result = userMapper.update(user, updateWrapper);
//UPDATE t_user SET age=?,email=? WHERE (username LIKE ? AND (age > ? ORemail IS NULL))
    int result = userMapper.update(null, updateWrapper);
    System.out.println(result);
}
```

### **4** **、** **condition**

> 在真正开发的过程中，组装条件是常见的功能，而这些条件数据来源于用户输入，是可选的，因此我们在组装这些条件时，必须先判断用户是否选择了这些条件，若选择则需要组装该条件，若没有选择则一定不能组装，以免影响SQL执行的结果

```java
   @Test
    public void test08UseCondition() {
//定义查询条件，有可能为null（用户未输入或未选择）
        String username = null;
        Integer ageBegin = 10;
        Integer ageEnd = 24;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
//StringUtils.isNotBlank()判断某字符串是否不为空且长度不为0且不由空白符(whitespace)构成
        queryWrapper
                .like(StringUtils.isNotBlank(username), "username", "a")
            .ge(ageBegin != null, "age", ageBegin)
                .le(ageEnd != null, "age", ageEnd);
//SELECT id,username AS name,age,email,is_deleted FROM t_user WHERE (age >=? AND age <= ?)
        List<User> users = userMapper.selectList(queryWrapper);
        users.forEach(System.out::println);
    }
```

### **5** **、** **LambdaQueryWrapper**

```java
@Test
 public void test09() {
 //定义查询条件，有可能为null（用户未输入）
     String username = "a";
     Integer ageBegin = 10;
     Integer ageEnd = 24;
     LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
 //避免使用字符串表示字段，防止运行时错误
     queryWrapper
             .like(StringUtils.isNotBlank(username), User::getName, username)
             .ge(ageBegin != null, User::getAge, ageBegin)
             .le(ageEnd != null, User::getAge, ageEnd);
     List<User> users = userMapper.selectList(queryWrapper);
     users.forEach(System.out::println);
 }
```
