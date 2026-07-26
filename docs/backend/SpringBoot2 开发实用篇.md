---
title: "SpringBoot2 开发实用篇"
---

<!-- truncate -->
## 1.热部署

热部署：程序改了，现在要重新启动服务器，不用重启，服务器会自己悄悄的把更新后的程序给重新加载一遍，这就是热部署。

**非springboot项目热部署实现原理**（麻烦）

​ 开发非springboot项目时，我们要制作一个web工程并通过tomcat启动，通常需要先安装tomcat服务器到磁盘中，开发的程序配置发布到安装的tomcat服务器上。如果想实现热部署的效果，这种情况其实有两种做法，一种是在tomcat服务器的配置文件中进行配置，这种做法与你使用什么IDE工具无关，不管你使用eclipse还是idea都行。还有一种做法是通过IDE工具进行配置，比如在idea工具中进行设置，这种形式需要依赖IDE工具，每款IDE工具不同，对应的配置也不太一样。但是核心思想是一样的，就是使用服务器去监控其中加载的应用，发现产生了变化就重新加载一次。

**springboot项目热部署实现原理**

​ 基于springboot开发的web工程其实有一个显著的特征，就是tomcat服务器内置了，服务器是以一个对象的形式在spring容器中运行的。本来我们期望于tomcat服务器加载程序后由tomcat服务器盯着程序，你变化后我就重新启动重新加载，但是现在tomcat和我们的程序是平级的了，都是spring容器中的组件，这下就麻烦了，缺乏了一个直接的管理权，那该怎么做呢？简单，再搞一个程序X在spring容器中盯着你原始开发的程序A不就行了吗？确实，搞一个盯着程序A的程序X就行了，如果你自己开发的程序A变化了，那么程序X就命令tomcat容器重新加载程序A就OK了。并且这样做有一个好处，spring容器中东西不用全部重新加载一遍，只需要重新加载你开发的程序那一部分就可以了，这下效率又高了，挺好。

### 手动启动热部署

**步骤①**：导入开发者工具对应的坐标

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

**步骤②**：构建项目，可以使用快捷键激活此功能

![image-20221025150834095](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025150834095.png)

![image-20221025150949793](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025150949793.png)

这样程序在运行的时候就可以进行自动构建了，实现了热部署的效果。

**总结**

1.  自动热部署要开启自动构建项目
2.  自动热部署要开启在程序运行时自动构建项目

### 自动启动热部署

​ 自动热部署其实就是设计一个开关，打开这个开关后，IDE工具就可以自动热部署。因此这个操作和IDE工具有关，以下以idea为例设置idea中启动热部署

**步骤①**：设置自动构建项目

​ 打开【File】，选择【settings…】,在面板左侧的菜单中找到【Compile】选项，然后勾选【Build project automatically】，意思是自动构建项目

![image-20221025152000279](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025152000279.png)

​ 自动构建项目选项勾选后

**步骤②**：允许在程序运行时进行自动构建

​ 使用快捷键【Ctrl】+【Alt】+【Shit】+【/】打开维护面板，选择第1项【Registry…】

![image-20221025152051460](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025152051460.png)

![image-20221025152258418](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025152258418.png)

​ 这样程序在运行的时候就可以进行自动构建了，实现了热部署的效果。

**总结**

1.  自动热部署要开启自动构建项目
2.  自动热部署要开启在程序运行时自动构建项目

### 参与热部署监控的文件范围配置

通过修改项目中的文件，你可以发现其实并不是所有的文件修改都会激活热部署的，原因在于在开发者工具中有一组配置，当满足了配置中的条件后，才会启动热部署，配置中默认不参与热部署的目录信息如下

-   /META-INF/maven
-   /META-INF/resources
-   /resources
-   /static
-   /public
-   /templates

​ 以上目录中的文件如果发生变化，是不参与热部署的。如果想修改配置，可以通过application.yml文件进行设定哪些文件不参与热部署操作

```yaml
spring:
  devtools:
    restart:
      # 设置不参与热部署的文件或文件夹
      exclude: static/**,public/**,config/application.yml
```

#### 关闭热部署

线上环境运行时是不可能使用热部署功能的，所以需要强制关闭此功能，通过配置可以关闭此功能。

```yaml
spring:
  devtools:
    restart:
      enabled: false
```

如果当心配置文件层级过多导致相符覆盖最终引起配置失效，可以提高配置的层级，在更高层级中配置关闭热部署。例如在启动容器前通过系统属性设置关闭热部署功能。

```yaml
@SpringBootApplication
public class SSMPApplication {
    public static void main(String[] args) {
        System.setProperty("spring.devtools.restart.enabled","false");
        SpringApplication.run(SSMPApplication.class);
    }
}
```

**总结**

1.  通过配置可以关闭热部署功能降低线上程序的资源消耗

### 配置高级

#### @ConfigurationProperties

@ConfigurationProperties注解，此注解的作用是用来为bean绑定属性的。开发者可以在yml配置文件中以对象的格式添加若干属性

```yaml
servers:
  ip-address: 192.168.0.1 
  port: 2345
  timeout: -1
```

然后再开发一个用来封装数据的实体类，注意要提供属性对应的setter方法

```java
@Component
@Data
public class ServerConfig {
    private String ipAddress;
    private int port;
    private long timeout;
}
```

使用@ConfigurationProperties注解就可以将配置中的属性值关联到开发的模型类上

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    private String ipAddress;
    private int port;
    private long timeout;
}
```

这样加载对应bean的时候就可以直接加载配置属性值了。使用@ConfigurationProperties注解其实可以为第三方bean加载属性，格式特殊一点而已。

**步骤①**：使用@Bean注解定义第三方bean

```java
@Bean
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
```

**步骤②**：在yml中定义要绑定的属性，注意datasource此时全小写

```yaml
datasource:
  driverClassName: com.mysql.jdbc.Driver
```

**步骤③**：使用@ConfigurationProperties注解为第三方bean进行属性绑定，注意前缀是全小写的datasource

```java
@Bean
@ConfigurationProperties(prefix = "datasource")
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
```

​ 操作方式完全一样，只不过@ConfigurationProperties注解不仅能添加到类上，还可以添加到方法上，添加到类上是为spring容器管理的当前类的对象绑定属性，添加到方法上是为spring容器管理的当前方法的返回值对象绑定属性，其实本质上都一样。

​ 做到这其实就出现了一个新的问题，目前我们定义bean不是通过类注解定义就是通过@Bean定义，使用@ConfigurationProperties注解可以为bean进行属性绑定，那在一个业务系统中，哪些bean通过注解@ConfigurationProperties去绑定属性了呢？因为这个注解不仅可以写在类上，还可以写在方法上，所以找起来就比较麻烦了。为了解决这个问题，spring给我们提供了一个全新的注解，专门标注使用@ConfigurationProperties注解绑定属性的bean是哪些。这个注解叫做@EnableConfigurationProperties。具体如何使用呢？

**步骤①**：在配置类上开启@EnableConfigurationProperties注解，并标注要使用@ConfigurationProperties注解绑定属性的类

```java
@SpringBootApplication
@EnableConfigurationProperties(ServerConfig.class)
public class Springboot13ConfigurationApplication {
}
```

**步骤②**：在对应的类上直接使用@ConfigurationProperties进行属性绑定

```java
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    private String ipAddress;
    private int port;
    private long timeout;
}
```

​ 现在绑定属性的ServerConfig类并没有声明@Component注解。当使用@EnableConfigurationProperties注解时，spring会默认将其标注的类定义为bean，因此无需再次声明@Component注解了。

最后再说一个小技巧，使用@ConfigurationProperties注解时，会出现一个提示信息

![image-20221025161509262](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025161509262.png)

出现这个提示后只需要添加一个坐标此提醒就消失了

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
```

**总结**

1.  使用@ConfigurationProperties可以为使用@Bean声明的第三方bean绑定属性
2.  当使用@EnableConfigurationProperties声明进行属性绑定的bean后，无需使用@Component注解再次进行bean声明

### 宽松绑定/松散绑定

​ 在进行属性绑定时，可能会遇到如下情况，为了进行标准命名，开发者会将属性名严格按照驼峰命名法书写，在yml配置文件中将datasource修改为dataSource，如下：

```yaml
dataSource:
  driverClassName: com.mysql.jdbc.Driver
```

此时程序可以正常运行，然后又将代码中的前缀datasource修改为dataSource，如下：

```java
@Bean
@ConfigurationProperties(prefix = "dataSource")  //发生错误 这里只能进行小写
public DruidDataSource datasource(){
    DruidDataSource ds = new DruidDataSource();
    return ds;
}
//此时就发生了编译错误，而且并不是idea工具导致的，运行后依然会出现问题，配置属性名dataSource是无效的
/*
Configuration property name 'dataSource' is not valid:

    Invalid characters: 'S'
    Bean: datasource
    Reason: Canonical names should be kebab-case ('-' separated), lowercase alpha-numeric characters and must start with a letter
Action:
Modify 'dataSource' so that it conforms to the canonical names requirements.
*/
```

springboot进行属性绑定时的一个重要知识点了，有关属性名称的宽松绑定，也可以称为宽松绑定。

​ 例如：在ServerConfig中的ipAddress属性名

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    private String ipAddress;
}
```

​ 可以与下面的配置属性名规则全兼容

```yml
servers:
  ipAddress: 192.168.0.2       # 驼峰模式
  ip_address: 192.168.0.2      # 下划线模式
  ip-address: 192.168.0.2      # 烤肉串模式
  IP_ADDRESS: 192.168.0.2      # 常量模式
```

​ 也可以说，以上4种模式最终都可以匹配到ipAddress这个属性名,原因就是在进行匹配时，配置中的名称要去掉中划线和下划线后，忽略大小写的情况下去与java代码中的属性名进行忽略大小写的等值匹配，以上4种命名去掉下划线中划线忽略大小写后都是一个词ipaddress，java代码中的属性名忽略大小写后也是ipaddress，这样就可以进行等值匹配了，这就是为什么这4种格式都能匹配成功的原因。

​ 以上规则仅针对springboot中@ConfigurationProperties注解进行属性绑定时有效，对@Value注解进行属性映射无效。

**总结**

1.  @ConfigurationProperties绑定属性时支持属性名宽松绑定，这个宽松体现在属性名的命名规则上
2.  @Value注解不支持松散绑定规则
3.  绑定前缀名推荐采用烤肉串命名规则，即使用中划线做分隔符

### 常用计量单位绑定

​ 第三项超时时间timeout描述了服务器操作超时时间，当前值是-1表示永不超时。

```yaml
servers:
  ip-address: 192.168.0.1 
  port: 2345
  timeout: -1
```

​ 每个人都这个值的理解会产生不同可能是分钟也可能是秒；

​ 除了加强约定之外，springboot充分利用了JDK8中提供的全新的用来表示计量单位的新数据类型，从根本上解决这个问题。以下模型类中添加了两个JDK8中新增的类，分别是Duration和DataSize

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
public class ServerConfig {
    @DurationUnit(ChronoUnit.HOURS)
    private Duration serverTimeOut;
    @DataSizeUnit(DataUnit.MEGABYTES)
    private DataSize dataSize;
}
```

**Duration**：表示时间间隔，可以通过@DurationUnit注解描述时间单位，例如上例中描述的单位为小时（ChronoUnit.HOURS）

**DataSize**：表示存储空间，可以通过@DataSizeUnit注解描述存储空间单位，例如上例中描述的单位为MB（DataUnit.MEGABYTES）

​ 使用上述两个单位就可以有效避免因沟通不同步或文档不健全导致的信息不对称问题，从根本上解决了问题，避免产生误读。

Druation常用单位如下：

![image-20221025163753780](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025163753780.png)

DataSize常用单位如下：

![image-20221025163822400](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025163822400.png)

当然也可以直接再yml文件中定义单位

```yaml
servers:
  ip-address: 192.168.0.1
  port: 2345
  timeout: -1
  serverTime: 3h
  datasize: 10MB
```

输入结果：

![image-20221025163947253](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025163947253.png)

### 校验

SpringBoot给出了强大的数据校验功能，可以有效的避免此类问题的发生。在JAVAEE的JSR303规范中给出了具体的数据校验标准，开发者可以根据自己的需要选择对应的校验框架，此处使用Hibernate提供的校验框架来作为实现进行数据校验.

**步骤①**：开启校验框架

```xml
<!--1.导入JSR303规范-->
<dependency>
    <groupId>javax.validation</groupId>
    <artifactId>validation-api</artifactId>
</dependency>
<!--使用hibernate框架提供的校验器做实现-->
<dependency>
    <groupId>org.hibernate.validator</groupId>
    <artifactId>hibernate-validator</artifactId>
</dependency>
```

**步骤②**：在需要开启校验功能的类上使用注解@Validated开启校验功能

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
//开启对当前bean的属性注入校验
@Validated
public class ServerConfig {
}
```

**步骤③**：对具体的字段设置校验规则

```java
@Component
@Data
@ConfigurationProperties(prefix = "servers")
//开启对当前bean的属性注入校验
@Validated
public class ServerConfig {
    //设置具体的规则
    @Max(value = 8888,message = "最大值不能超过8888")
    @Min(value = 202,message = "最小值不能低于202")
    private int port;
}
```

​ 通过设置数据格式校验，就可以有效避免非法数据加载，其实使用起来还是挺轻松的，基本上就是一个格式。

**总结**

1.  开启Bean属性校验功能一共3步：导入JSR303与Hibernate校验框架坐标、使用@Validated注解启用校验功能、使用具体校验规则规范数据校验格式

### 数据类型转换

开发者遇到的问题就是由于bean的属性注入引发的灾难：开发者连接数据库正常操作，但是运行程序后显示的信息是密码错误。

```cmd
java.sql.SQLException: Access denied for user 'root'@'localhost' (using password: YES)
```

其实看到这个报错，几乎所有的学习者都能分辨出来，这是用户名和密码不匹配，就就是密码输入错了，但是问题就在于密码并没有输入错误。

配置信息：

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/ssm_db?serverTimezone=UTC
    username: root
    password: 0127
```

密码就使用了0127，其实问题就出在这里了。属性注入时:**支持二进制，八进制，十六进制**

![image-20221025170355914](https://joker-qaq1-1314468534.cos.ap-beijing.myqcloud.com/learn/3481/image-20221025170355914.png)

​ 这个问题就处在这里了，因为0127在开发者眼中是一个字符串“0127”，但是在springboot看来，这就是一个数字，而且是一个八进制的数字。当后台使用String类型接收数据时，如果配置文件中配置了一个整数值，他是先安装整数进行处理，读取后再转换成字符串。

**解决方案给密码加上( “”)**

**总结**

1.  yaml文件中对于数字的定义支持进制书写格式，如需使用字符串请使用引号明确标注
