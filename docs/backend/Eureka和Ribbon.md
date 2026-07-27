---
title: "Eureka And Ribbon"
---

<!-- truncate -->
### 1.微服务大的远程调用

> 根据订单id查询订单功能

现实中常常用于一些查询的案例：比如根据订单的id查询订单的功能，主要实现把订单所属的用户信息一起返回具体流程如下图所示:

![image-20230319145450450](/img/cos/learn/202303191454501.png)

主要进行分区快的查询，一个去查询订单数据库信息，一个查询用户模块的信息，总的组成了一个用户的全部信息。

**微服务调用的实例:**

![image-20230319145804998](/img/cos/learn/202303191458094.png)

具体的实现方式如下:

-   注册RestTemplate

在一个在order-service的OrderApplication中注册RestTemplate（就拿订单服务来说事情）

```java
@MapperScan("cn.itcast.order.mapper")
@SpringBootApplication
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
        //声明bean进行注册
        @Bean
        public RestTemplate restTemplate () {
            return new RestTemplate();
        }
    }
```

-   服务远程调用RestTemplate

对order-service的OrderService的queryOrderById方法进行修改:也就是对利用RestTemplate进行远程地址url的调用

```java
@Service
public class OrderService {
    @Autowired
    private RestTemplate restTemplate;
        public Order queryOrderById(Long orderId) {
            // 1.查询订单
            Order order = orderMapper.findById(orderId);
            // TODO 2.查询用户 
            String url = "http://localhost:8081/user/" +  order.getUserId();
            User user = restTemplate.getForObject(url, User.class);
            // 3.封装user信息
            order.setUser(user);
            // 4.返回
            return order;
        }
}
```

该方法的主要重点:

1.  基于RestTemplate发起的http请求实现远程调用
2.  http请求做远程调用是与语言无关的调用，只要知道对方的ip、端口、接口路径、请求参数即可

在微服务远程调用中分为服务提供者和服务消费者他们两者的区别是：

-   服务提供者：一次业务中，被其它微服务调用的服务。（提供接口给其它微服务）
-   服务消费者：一次业务中，调用其它微服务的服务。（调用其它微服务提供的接口）

![image-20230319150708060](/img/cos/learn/202303191507095.png)

但是这个服务提供者和消费者并不是固定不变的，一个服务有时候两者都充当都起作用也就是提供者与消费者角色其实是**相对**的比如:

-   服务A调用服务B，服务B调用服务C，那么服务B两者都是

### 2.Eureka注册中心

主要解决以下服务调用出现问题:

-   服务消费者获取服务提供者的地址信息
-   有多个服务提供者，消费者如何选择
-   消费者如何得知服务提供者的健康状态

具体实现流程如下所示:

![image-20230319151207323](/img/cos/learn/202303191512429.png)

首先**服务提供者和服务消费者都**将服务信息注册到eureka-server中心进行存储，我们可以看到里面有注册成功的地址信息，对于服**务消费者**来说他进行调用的时候直接拉取注册中心的user-service信息然后如果有多个端口通过负载均衡策略选择合适的端口进行远程调用。

对于某个服务停止，eureka的策略是有一个心脏跳动策略，没30秒进行更新一侧当出现某个服务挂掉，他就将注册中心的服务进行清除。消费者再进行拉去就能得到最新的状态

> 在Eureka架构中，微服务角色有两类

**EurekaServer：服务端，注册中心**

-   记录服务信息
-   心跳监控

**EurekaClient：客户端**

-   Provider：服务提供者，例如案例中的 user-service
    -   注册自己的信息到EurekaServer
    -   每隔30秒向EurekaServer发送心跳
-   consumer：服务消费者，例如案例中的 order-service
    -   根据服务名称从EurekaServer拉取服务列表
    -   基于服务列表做负载均衡，选中一个微服务后发起远程调用

**搭建EurekaServer**

> 首先引入依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

> 编写启动类，添加@EnableEurekaServer注解
> 
> 添加application.yml文件，编写下面的配置：

```yaml
server:
  port: 10086  #服务中心地址
spring:
  application:
	name: eurekaserver  #服务中心得名字
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka/
```

**注册user-service**

将user-service服务注册到EurekaServer下：

> 在user-service项目引入spring-cloud-starter-netflix-eureka-client的依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

> 在application.yml文件，编写下面的配置

```yaml
spring:
  application:
    name: userservice  #服务得名称
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka/   #将其注册到该地址端口
```

**注册order-service**

order-service虽然是消费者，但与user-service一样都是eureka的client端，同样可以实现服务注册，和user-service的步骤一样只需要改下yml的服务名称就可以

**在order-service完成服务拉取**

基于服务名称获取服务列表，然后在对服务列表做负载均衡:

1.  修改OrderService的代码，修改访问的url路径，用服务名代替ip、端口：

```java
String url = "http://userservice/user/" + order.getUserId();   //user-service服务提供者的名称
```

1.  在order-service项目的启动类OrderApplication中的RestTemplate添加**负载均衡**注解：

```java
@Bean
@LoadBalanced  //开启负载均衡策略
public RestTemplate restTemplate() {
    return new RestTemplate();
}
```

### 3\. Ribbon负载均衡

![image-20230319153448836](/img/cos/learn/202303191534901.png)

默认的原则是轮询，具体底层原理:

![image-20230319153549009](/img/cos/learn/202303191535080.png)

首先发起请求后，该请求被LoadBalancerInterceptor负载均衡拦截器进行拦截,接着获取请求中的服务id也就是userservice，接着拉去注册中心的userservice服务信息返回服务的列表，根据负载均衡策略(IRule可以自己定义默认为轮询)选择合适的端口,端口选择完后修改url发起请求的地址。

![image-20230319154034973](/img/cos/learn/202303191540054.png)

**负载均衡策略**

定义IRule实现可以修改负载均衡规则，有两种方式：

> 代码方式,在order-service中的OrderApplication类中，定义一个新的IRule：

```java
@Bean
public IRule randomRule(){
    return new RandomRule();
}
//该方式作用域全局
```

> 配置文件方式：在order-service的application.yml文件中，添加新的配置也可以修改规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则 该方法作用某个微服务
```

**饥饿加载**

Ribbon默认是采用懒加载，即第一次访问时才会去创建LoadBalanceClient，请求时间会很长。而饥饿加载则会在项目启动时创建，降低第一次访问的耗时，通过下面配置开启饥饿加载：

```yaml
ribbon:
  eager-load:
    enabled: true  # 开启饥饿加载 
      clients: userservice  # 指定对userservice这个服务饥饿加载
```
