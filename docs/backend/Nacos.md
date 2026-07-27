---
title: "Nacos注册中心"
---

<!-- truncate -->
[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件。相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高

#### **1\. 服务注册到Nacos**

在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
     <version>2.2.9.RELEASE</version>
     <type>pom</type>
     <scope>import</scope>
 </dependency>
```

然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

```xml
<!-- nacos客户端依赖 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

记得注释掉原有的eureka依赖(如果有的话)

修改user-service&order-service中的application.yml文件，添加nacos地址

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848 #nacos的服务端地址
```

> **注意**：不要忘了注释掉eureka的地址

然后重启，登录到nacos的界面就可以看到注册的服务信息:

![](/img/cos/learn/202303191906541.png)

#### **2, Nacos服务分级存储模型**

![](/img/cos/learn/202303191906245.png)

**服务跨集群调用问题**

服务调用尽可能选择本地集群的服务，跨集群调用延迟较高，当本地无法访问时再去访问其他的集群例如:

![image-20230319191140684](/img/cos/learn/202303191911730.png)

当调用的时候优先调用杭州的集群分布当杭州的无法调用再去调用上海的user-service

**服务集群属性配置**

> 修改application.yml，添加如下内容

```yaml
spring:
  cloud:
    nacos: 
      server-addr: localhost:8848 #nacos服务端地址
      discovery:
        cluster-name: HZ # 配置集群名称，也就是机房位置，例如：HZ，杭州
```

> 在控制台可以看到集群的变化

![](/img/cos/learn/202303191916003.png)

**Nacos服务分级存储模型**

-   一级是服务，例如userservice
    
-   二级是集群，例如杭州或上海
    
-   三级是实例，例如杭州机房的某台部署了userservice的服务器
    
    **如何设置实例的集群属性**：
    
-   修改application.yml文件，添加spring.cloud.nacos.discovery.cluster-name属性即可
    

#### **3\. 根据集群负载均衡也就是同集群优先的负载均衡**

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此Nacos中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。

> 就拿order-service为例修改其application.yml，设置集群为HZ

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

> 修改负载均衡规则

修改order-service的application.yml文件，修改负载均衡规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则 
```

**NacosRule负载均衡策略**

① 优先选择同集群服务实例列表

② 本地集群找不到提供者，才去其它集群寻找，并且会报警告

③ 确定了可用实例列表后，再采用随机负载均衡挑选实例

**根据权重负载均衡**

解决的问题就是：服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求，nacos提供了权重配置来控制访问频率，权重越大则访问的频率越高。

具体实现方法直接再nacos控制台进行修改：如找到user-service的实例列表，点击编辑，即可修改权重

![image-20210713235133225](/img/cos/learn/202303191924323.png)

直接对权重进行编辑即可。注意：如果修改权重为0则该实例永远不会被访问

#### **4\. 环境隔离**

Nacos中服务存储和数据存储的最外层都是一个名为namespace的东西，用来做最外层隔离：

![image-20230319192716865](/img/cos/learn/202303191927968.png)

> 具体实现策略直接再控制台中进行创建namespace用来隔离不同的环境

![image-20230319192756816](/img/cos/learn/202303191927871.png)

> 然后填写一个新的命名空间信息：

![image-20230319192829920](/img/cos/learn/202303191928969.png)

> 保存后会在控制台看到这个命名空间的id：

![image-20230319192848812](/img/cos/learn/202303191928857.png)

> 修改order-service的application.yml，添加namespace：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 492a7d5d-237b-46a1-a99a-fa8e98e4b0f9 # 命名空间，填ID
```

**Nacos环境隔离**

①每个namespace都有唯一id

②服务设置namespace时要写id而不是名称

③不同namespace下的服务互相不可见

![image-20230319193052260](/img/cos/learn/202303191930353.png)

**临时实例和非临时实例**

临时实例采用心跳检测策略，注册中心被动的接收服务提供者提供的信息每30秒更新一次，但这个带来的一些问题就是如果某个服务器端口挂掉了，而此时在注册中心并没有进行更新，而同时服务消费者就对该服务器端口进行访问就会报错。为了解决这个问题就推出了非临时实例，就是注册中心会主动的询问服务提供者是否发生改变，有无端口宕机一旦发生改变就主动的将变更消息推送到服务消费者：也就是在服务消费者之间有一个pull和push让一个改变快速被发现。

服务注册到Nacos时，可以选择注册为**临时或非临时实例**，通过下面的**配置来设置：**

-   临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。
    
-   非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。
    

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```

1.  **Nacos与eureka的共同点**
    
    ① 都支持服务注册和服务拉取
    
    ②都支持服务提供者心跳方式做健康检测
    
2.  **Nacos与Eureka的区别**
    

①Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式

②临时实例心跳不正常会被剔除，非临时实例则不会被剔除

③Nacos支持服务列表变更的消息推送模式，服务列表更新更及时

④Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

#### 5\. Nacos配置管理

**配置更改热更新**

![image-20230319194140073](/img/cos/learn/202303191941128.png)

**统一配置管理**

首先在nacos中添加配置信息:

![image-20230319194221281](/img/cos/learn/202303191942345.png)

![image-20230319194230490](/img/cos/learn/202303191942546.png)

> 注意：项目的核心配置，需要热更新的配置才有放到nacos管理的必要。基本不会变更的一些配置还是保存在微服务本地比较好。
> 
> 接着配置获取的步骤如下图所示

![img](/img/cos/learn/202303191948672.png)

所以这里我们需要写一个bootstrap.yml（它的优先级最高项目启动时先读取它的配置信息,会在application.yml之前被读取）文件其中得包含nacos的地址信息，然后再访问到本地的配置文件。具体操作如下所示:

> 引入Nacos的配置管理客户端依赖：

```xml
<!--nacos配置管理依赖-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

> 再user-service中添加bootstrap.yaml

```yaml
spring:
  application:
    name: userservice  # 1.服务名称
  profiles:
    active: dev  #2.开发环境，这里是dev 
  cloud:
    nacos:
      server-addr: localhost:8848 # Nacos地址
      config:
        file-extension: yaml  # 3.文件后缀名
        #123三部不可少正好构成你的配置文件id:userservice-dev.yaml
```

这里会根据spring.cloud.nacos.server-addr获取nacos地址，再根据`${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}`作为文件id，来读取配置。

本例中，就是去读取`userservice-dev.yaml`：

![](/img/cos/learn/202303191951761.png)

> 读取nacos配置信息

最简单的方法在user-service中的UserController中添加业务逻辑，读取pattern.dateformat配置：

![image-20210714170337448](/img/cos/learn/202303191952530.png)

@Value注入nacos的属性信息

**将配置交给Nacos管理的步骤**

①在Nacos中添加配置文件

②在微服务中引入nacos的config依赖

③在微服务中添加bootstrap.yml，配置nacos地址、当前环境、服务名称、文件后缀名。这些决定了程序启动时去nacos读取哪个文件

**配置自动刷新**

Nacos中的配置文件变更后，微服务无需重启就可以感知。不过需要通过下面两种配置实现：

**方式一:在@Value注入的变量所在类上添加注解@RefreshScope**

![image-20230319195437804](/img/cos/learn/202303191954875.png)

**方式二：使用@ConfigurationProperties注解**(常用)

![image-20230319195518864](/img/cos/learn/202303191955912.png)

Nacos配置更改后，微服务可以实现热更新，方式:

①通过@Value注解注入，结合@RefreshScope来刷新

②通过@ConfigurationProperties注入，自动刷新

**注意事项：**

-   不是所有的配置都适合放到配置中心，维护起来比较麻烦
    
-   建议将一些关键参数，需要运行时调整的参数放到nacos配置中心，一般都是自定义配置
    

![image-20230319195633449](/img/cos/learn/202303191956495.png)

**多服务共享配置**

不同微服务之间可以共享配置文件，通过下面的两种方式来指定：

方式一：

![image-20230319195821534](/img/cos/learn/202303191958605.png)

方式二：

![image-20230319195855010](/img/cos/learn/202303191958080.png)

**Nacos集群搭建**

![image-20230319195920525](/img/cos/learn/202303191959567.png)
