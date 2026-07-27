---
title: "Zookeeper"
---

<!-- truncate -->
### 1.概念

-   Zookeeper 是 Apache Hadoop 项目下的一个子项目，是一个树形目录服务。
    
-   是一个分布式的开源的分布式应用程序的协调服务
    
-   提供的功能有
    -   配置管理
    -   分布式锁
    -   集群管理

![image-20230101193326282](/img/cos/learn/3481/image-20230101193326282.png)

他类似一个配置中心来管理各个客户端保证数据的统一性：即访问不同的服务器得到相同的数据。

![image-20230101193352872](/img/cos/learn/3481/image-20230101193352872.png)

# 二、zookeeper 数据模型

zookeeper是一个属性目录服务、其数据模型和Unix的文件系统相类似，拥有一个层次化的结构。它类似于一个树形的结果如图：

![image-20230101193833720](/img/cos/learn/3481/image-20230101193833720.png)

这里的每一个节点都被称为ZNode每个节点都会保存自己的数据和节点的信息。

节点可以拥有自己的子节点，同时页允许少量的数据存储在该节点之下：

节点可以分为四大类：

-   PERSISTENT 持久化节点
-   EPHEMERAL 临时节点 -e
-   PERSISTENT\_SEQUENTIAL 持久化顺序节点: -s
-   EPHEMERAL\_SEQUENTIAL 临时顺序节点：-es

### zookeeper服务端常用的命令

-   启动服务zkServer.sh start
-   查看服务zkServer.sh status
-   停止服务zkServer.sh stop
-   重启服务zkServer.sh restart

![image-20230101194716844](/img/cos/learn/3481/image-20230101194716844.png)

-   链接服务器端 zkCli.sh -server ip:port
    
-   断开链接 quit
    
-   设置节点的值 set /节点path value
    
-   删除单个节点 delete /节点path 创建临时节点: create -e /节点path 创建顺序节点 create -s /节点path value
    
-   创建节点 create /节点path value
    
-   获取节点的值 get /节点path
    
-   查询节点的详细信息 ls -s /节点path它拥有的内容有
    
```tcl
czxid：节点被创建的事务ID 
czxid：节点被创建的事务ID 
mzxid: 最后一次被更新的事务ID 
mtime: 修改时间 
pzxid：子节点列表最后一次被更新的事务ID
cversion：子节点的版本号 
dataversion：数据版本号 
aclversion：权限版本号 
ephemeralOwner：用于临时节点，代表临时节点的事务ID，如果为持久节点则为0 
dataLength：节点存储的数据的长度 
numChildren：当前节点的子节点个数 
```
    
    # 三、Zookeeper JavaAPI操作
    
    Curator介绍：
    
    Curator是Apache ZooKeeper的Java客户端库
    
    常见的ZooKeeper javaAPI
    
    -   原生Java API 、ZkClient、Curator
        
    -   原生zookeeperAPI的不足：
        
    -   -   连接对象异步创建，需要开发人员自行编码等待
        -   连接没有自动重连超时机制
        -   watcher一次注册生效一次
        -   不支持递归创建树形节点
-   curator特点：
    
-   -   解决session会话超时重连
    -   watcher反复注册
    -   简化开发api
    -   遵循Fluent风格的API
    -   提供了分布式锁服务、共享计数器、缓存机制等机制

首先导入Maven依赖:

```xml
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>2.6.0</version>
    <type>jar</type>
    <exclusions>
        <exclusion>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.4.10</version>
    <type>jar</type>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>2.6.0</version>
    <type>jar</type>
</dependency>
```

它的常用操作有:

-   建立连接

```java
public class CuratorConnection {
        public static void main(String[] args) {
                // 创建连接对象
                CuratorFramework client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("create")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
                System.out.println(client.isStarted());
                // 关闭连接
                client.close();
        }
}
```

-   添加节点

```java
/**
 * 标题：新增节点
 */
public class CuratorCreate {
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() {
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("create")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        }

        /**
         * @功能: 新增节点
         */
        @Test
        public void create1() throws Exception {
                String path = client.create()
                                // 节点的类型
                                .withMode(CreateMode.PERSISTENT)
                                // 节点的权限列表 world:anyone:cdrwa
                                .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
                                // 第一个参数：节点的数据
                                // 第二个参数：节点的数据
                                .forPath("/node1", "node1".getBytes());
                System.out.println(path);
        }

        /**
         * @功能: 创建节点并自定义权限列表
         */
        @Test
        public void create2() throws Exception {
                // 权限列表
                List<ACL> acls = new ArrayList<>();
                // 授权模式和授权对象
                Id id = new Id("ip", "39.98.67.88");
                acls.add(new ACL(ZooDefs.Perms.ALL, id));
                String path = client.create()
                                .withMode(CreateMode.PERSISTENT)
                                .withACL(acls)
                                .forPath("/node2", "node2".getBytes());
                System.out.println(path);
        }

        /**
         * @功能: 递归创建节点树
         */
        @Test
        public void create3() throws Exception {
                String path = client.create()
                                // 支持递归节点的创建
                                .creatingParentsIfNeeded()
                                .withMode(CreateMode.PERSISTENT)
                                .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
                                .forPath("/node3/node31", "node31".getBytes());
                System.out.println(path);
        }

        /**
         * @功能: 异步创建节点
         */
        @Test
        public void create4() throws Exception {
                client.create()
                                .creatingParentsIfNeeded()
                                .withMode(CreateMode.PERSISTENT)
                                .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
                                .inBackground(new BackgroundCallback() {
                                        @Override
                                        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                                // 节点的路径
                                                System.out.println(curatorEvent.getPath());
                                                // 事件类型
                                                System.out.println(curatorEvent.getType());
                                        }
                                })
                                .forPath("/node4", "node4".getBytes());
                TimeUnit.SECONDS.sleep(1);
        }

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() {
                if (client != null) {
                        client.close();
                }
        }
}
```

-   删除节点

```java
public class CuratorDelete {
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() {
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("delete")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        }

        /**
         * @功能: 删除节点
         */
        @Test
        public void delete1() throws Exception {
                client.delete()
                                // 第一个参数：节点路径
                                .forPath("/node1");
                System.out.println("已删除！");
        }

        /**
         * @功能: 删除节点，并进行版本检测
         */
        @Test
        public void delete2() throws Exception {
                client.setData()
                                // 版本号 -1 标识忽略版本号
                                .withVersion(0)
                                .forPath("/node1");
                System.out.println("已删除");
        }

        /**
         * @功能: 删除包含子节点的节点
         */
        @Test
        public void delete3() throws Exception {
                client.delete()
                                // 如有子节点 则一并删除
                                .deletingChildrenIfNeeded()
                                .withVersion(-1)
                                .forPath("/node1");
                System.out.println("已删除");
        }

        /**
         * @功能: 异步删除节点
         */
        @Test
        public void delete4() throws Exception {
                client.delete()
                                .deletingChildrenIfNeeded()
                                .withVersion(0)
                                .inBackground(new BackgroundCallback() {
                                        @Override
                                        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                                System.out.println(curatorEvent.getPath());
                                                System.out.println(curatorEvent.getType());
                                        }
                                })
                                .forPath("/node1");
                TimeUnit.SECONDS.sleep(1);
                System.out.println("已删除");
        }

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() {
                if (client != null) {
                        client.close();
                }
        }
}
```

-   修改节点

```java
public class CuratorSet {
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() {
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("set")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        }

        /**
         * @功能: 更新节点
         */
        @Test
        public void set1() throws Exception {
                Stat stat = client.setData()
                                // 第一个参数：节点路径
                                // 第二个参数：节点的数据
                                .forPath("/node1", "hello".getBytes());
                System.out.println(stat);
        }

        /**
         * @功能: 更新节点，并进行版本检测
         */
        @Test
        public void set2() throws Exception {
                Stat stat = client.setData()
                                // 版本号 -1 标识忽略版本号
                                .withVersion(1)
                                .forPath("/node1", "world".getBytes());
                System.out.println(stat);
        }

        /**
         * @功能: 异步修改节点
         */
        @Test
        public void set3() throws Exception {
                client.setData()
                                .withVersion(2)
                                .inBackground(new BackgroundCallback() {
                                        @Override
                                        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                                System.out.println(curatorEvent.getPath());
                                                System.out.println(curatorEvent.getType());
                                        }
                                })
                                .forPath("/node1", "哈哈哈".getBytes());
                TimeUnit.SECONDS.sleep(1);
        }

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() {
                if (client != null) {
                        client.close();
                }
        }
}
```

-   查询节点

```java
/**
 * 标题：查询节点
 */
public class CuratorGet {
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() {
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("get")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        }

        /**
         * @功能: 查询节点内容
         */
        @Test
        public void get1() throws Exception {
                byte[] bytes = client.getData()
                                // 第一个参数：节点路径
                                .forPath("/node1");
                System.out.println(new String(bytes));
        }

        /**
         * @功能: 查询节点属性
         */
        @Test
        public void get2() throws Exception {
                Stat stat = new Stat();
                client.getData()
                                // 读取属性
                                .storingStatIn(stat)
                                .forPath("/node1");
                System.out.println(stat);
        }

        /**
         * @功能: 异步查询节点
         */
        @Test
        public void get3() throws Exception {
                client.getData()
                                .inBackground(new BackgroundCallback() {
                                        @Override
                                        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                                System.out.println(curatorEvent.getPath());
                                                System.out.println(curatorEvent.getType());
                                                System.out.println(new String(curatorEvent.getData()));
                                        }
                                })
                                .forPath("/node1");
                TimeUnit.SECONDS.sleep(1);
        }

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() {
                if (client != null) {
                        client.close();
                }
        }
}
```

-   查询子节点

```java
/**
 * 标题：查询子节点
 */
public class CuratorGetChildren {
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() {
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        }

        /**
         * @功能: 查询子节点内容
         */
        @Test
        public void getChildren1() throws Exception {
                List<String> childrens = client.getChildren()
                                // 第一个参数：节点路径
                                .forPath("/get");
                childrens.forEach(System.out::println);
        }

        /**
         * @功能: 异步查询子节点
         */
        @Test
        public void getChildren2() throws Exception {
                client.getChildren()
                                .inBackground(new BackgroundCallback() {
                                        @Override
                                        public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                                curatorEvent.getChildren().forEach(System.out::println);
                                        }
                                })
                                .forPath("/get");
                TimeUnit.SECONDS.sleep(3);
        }

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() {
                if (client != null) {
                        client.close();
                }
        }
}
```

-   检查节点是否存在

```java
/**
      * @功能: 判断节点是否存在
      */
     @Test
     public void exists1() throws Exception {
             Stat stat = client.checkExists()
                             // 第一个参数：节点路径
                             .forPath("/node2");
             System.out.println(stat);
     }

     /**
      * @功能: 异步判断节点是否存在
      */
     @Test
     public void exists2() throws Exception {
             client.checkExists()
                             .inBackground(new BackgroundCallback() {
                                     @Override
                                     public void processResult(CuratorFramework curatorFramework, CuratorEvent curatorEvent) throws Exception {
                                             System.out.println(curatorEvent.getPath());
                                             System.out.println(curatorEvent.getType());
                                             System.out.println(curatorEvent.getStat());
                                     }
                             })
                             .forPath("/node1");
             TimeUnit.SECONDS.sleep(3);
     }
```

-   Watch事件监听

**curator提供了两种Watcher(Cache)来监听结点的变化:**

-   NodeCache：
    
-   -   只是监听某一个特定的节点，监听节点的新增和修改。
-   PathChildrenCache：
    
-   -   监控一个ZNode的子节点. 当一个子节点增加、更新、删除时， Path Cache会改变它的状态， 会包含最新的子节点， 子节点的数据和状态。
-   \`\`\`java
    
    /\*\*
    
    -   标题：事件监听机制  
        \*/  
        public class CuratorWatcher &#123;
        
```
         CuratorFramework client;
        
         /**
          * @功能: 获取连接
          */
         @Before
         public void before() {
                 // 创建连接对象
                 client = CuratorFrameworkFactory
                                 .builder()
                                 // IP地址端口号
                                 .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                 // 会话超时时间
                                 .sessionTimeoutMs(5000)
                                 // 重连机制
                                 // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                 // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                 // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                 // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                 .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                 // 构建连接对象
                                 .build();
                 // 打开连接
                 client.start();
         }
        
         /**
          * @功能: 监视某个节点的数据变化
          */
         @Test
         public void watcher1() throws Exception {
                 // 参数1：连接对象
                 // 参数2：监视的节点路径
                 final NodeCache nodeCache = new NodeCache(client, "/watcher1");
                 // 启动解释器对象
                 nodeCache.start();
                 nodeCache.getListenable().addListener(new NodeCacheListener() {
                         // 节点变化时回调的方法
                         @Override
                         public void nodeChanged() throws Exception {
                                 System.out.println(nodeCache.getCurrentData().getPath());
                                 System.out.println(new String(nodeCache.getCurrentData().getData()));
                                 System.out.println(nodeCache.getCurrentData().getStat());
                         }
                 });
                 TimeUnit.SECONDS.sleep(30);
                 // 关闭监视器对象
                 nodeCache.close();
         }
        
         /**
          * @功能: 监视某子节点的数据变化
          */
         @Test
         public void watcher2() throws Exception {
                 // 参数1：连接对象
                 // 参数2：监视的节点路径
                 // 参数3：事件中是否可以获取节点的数据
                 final PathChildrenCache pathChildrenCache = new PathChildrenCache(client, "/watcher1", true);
                 // 启动解释器对象
                 pathChildrenCache.start();
                 pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
                         // 当子节点方法变化时回调的方法
                         @Override
                         public void childEvent(CuratorFramework curatorFramework, PathChildrenCacheEvent pathChildrenCacheEvent) throws Exception {
                                 // 节点的事件类型
                                 System.out.println(pathChildrenCacheEvent.getType());
                                 // 节点的路径
                                 System.out.println(pathChildrenCacheEvent.getData().getPath());
                                 // 节点的数据
                                 System.out.println(new String(pathChildrenCacheEvent.getData().getData()));
                         }
                 });
                 TimeUnit.SECONDS.sleep(30);
                 // 关闭监视器对象
                 pathChildrenCache.close();
         }
        
         /**
          * @功能: 关闭连接
          */
         @After
         public void after() {
                 if (client != null) {
                         client.close();
                 }
         }
```
        
        &#125;
        
```plaintext

- Curator事务

```java
/**
 * 标题：事务
 */
public class CuratorTransaction &#123;
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() &#123;
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 命名空间
                                .namespace("create")
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        &#125;

        /**
         * @功能: 事务
         */
        @Test
        public void transaction1() throws Exception &#123;
                // 开启事务
                Collection&lt;CuratorTransactionResult> collection = client.inTransaction()
                                .create()
                                .withMode(CreateMode.PERSISTENT)
                                .withACL(ZooDefs.Ids.OPEN_ACL_UNSAFE)
                                .forPath("/node1", "node1".getBytes())
                                .and()
                                .create().forPath("/node2", "node2".getBytes())
                                .and()
                                // 提交事务
                                .commit();
                System.out.println(collection);
        &#125;

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() &#123;
                if (client != null) &#123;
                        client.close();
                &#125;
        &#125;
&#125;
```
        

-   Curator分布式锁实现

```java
/**
 * 标题：分布式锁
 */
public class CuratorLock &#123;
        CuratorFramework client;

        /**
         * @功能: 获取连接
         */
        @Before
        public void before() &#123;
                // 创建连接对象
                client = CuratorFrameworkFactory
                                .builder()
                                // IP地址端口号
                                .connectString("39.98.67.88:2181,39.98.67.88:2182,39.98.67.88:2183")
                                // 会话超时时间
                                .sessionTimeoutMs(5000)
                                // 重连机制
                                // new RetryOneTime(3000)：每三秒重连一次，只重连一次
                                // new RetryNTimes(3, 3000)：每每三秒重连一次，共重连3次
                                // new RetryUntilElapsed(10000, 3000)：每三秒重连一次，10秒后停止重连
                                // new ExponentialBackoffRetry(1000, 3)：重连3次，每次重连的间隔会越来越长
                                .retryPolicy(new ExponentialBackoffRetry(1000, 3))
                                // 构建连接对象
                                .build();
                // 打开连接
                client.start();
        &#125;

        /**
         * @功能: 排他锁
         */
        @Test
        public void lock1() throws Exception &#123;
                // 参数1：连接对象
                // 参数2：节点路径
                InterProcessLock interProcessLock = new InterProcessMutex(client, "/lock1");
                System.out.println("等待获取锁对象");
                // 获取锁
                interProcessLock.acquire();
                for (int i = 0; i &lt; 5; i++) &#123;
                        TimeUnit.SECONDS.sleep(1);
                        System.out.println(i);
                &#125;
                System.out.println("等待释放锁");
                // 释放锁
                interProcessLock.release();
        &#125;

        /**
         * @功能: 读写锁 - 读锁
         */
        @Test
        public void lock2() throws Exception &#123;
                // 读写锁
                InterProcessReadWriteLock readWriteLock = new InterProcessReadWriteLock(client, "/lock1");
                // 获取读锁对象
                InterProcessMutex interProcessMutex = readWriteLock.readLock();
                System.out.println("等待获取锁对象");
                // 获取锁
                interProcessMutex.acquire();
                for (int i = 0; i &lt; 10; i++) &#123;
                        TimeUnit.SECONDS.sleep(1);
                        System.out.println(i);
                &#125;
                System.out.println("等待释放锁");
                // 释放锁
                interProcessMutex.release();
        &#125;

        /**
         * @功能: 读写锁 - 写锁
         */
        @Test
        public void lock3() throws Exception &#123;
                // 读写锁
                InterProcessReadWriteLock readWriteLock = new InterProcessReadWriteLock(client, "/lock1");
                // 获取读锁对象
                InterProcessMutex interProcessMutex = readWriteLock.writeLock();
                System.out.println("等待获取锁对象");
                // 获取锁
                interProcessMutex.acquire();
                for (int i = 0; i &lt; 10; i++) &#123;
                        TimeUnit.SECONDS.sleep(1);
                        System.out.println(i);
                &#125;
                System.out.println("等待释放锁");
                // 释放锁
                interProcessMutex.release();
        &#125;

        /**
         * @功能: 关闭连接
         */
        @After
        public void after() &#123;
                if (client != null) &#123;
                        client.close();
                &#125;
        &#125;
&#125;
```

### Zookeeper - 原子广播

-   zab协议 的全称是 Zookeeper Atomic Broadcast （zookeeper原子广播），**zookeeper 是通过 zab协议来保证分布式事务的最终一致性**。
-   基于zab协议，zookeeper集群中的角色主要有以下三类，如下表所示：
    
-   | 角色 | 描述 |  
    | ————————— | —————————————————————————————— |  
    | 领导者（Leader） | 领导者负责进行投票的发起和决议，更新系统状态 |  
    | 跟随者（Follower） | Follower用于接收客户请求并向客户端返回结果，在选主过程中进行投票 |  
    | 观察者（ObServer） | Observer可以接收客户端连接，将写请求转发给leader节点，但ObServer不参加选票过程，只同步，leader的状态。ObServer的目的是为了扩展系统，提高读取速度。 |  
    | 客户端（Client） | 请求发起方 |
    

1.  leader从客户端收到一个写请求
2.  leader生成一个新的事务并为这个事务生成一个唯一的ZXID
3.  leader将这个事务提议(propose)发送给所有的follows节点
4.  follower节点将收到的事务请求加入到历史队列(history queue)中,并发送ack给leader
5.  当leader收到大多数follower（半数以上节点）的ack消息，leader会发送commit请求
6.  当follower收到commit请求时，从历史队列中将事务请求commit

### Zookeeper - leader选举

-   服务器的状态
    
    -   looking:寻找leader状态
    -   leading：领导者状态 表明当前的服务器角色为：leader
    -   following ：跟随着状态 表明当前的服务器角色为：follower
    -   observing：观察者状态 表明当前的服务器角色为：observer
-   服务器leader选举：简言之就是 选取中间的为领导者要遵循临时顺序节点的创建关系
    
    -   服务器启动时期的leader选举：
    
```html
在集群初始化阶段，当有一台服务器server1启动时，其单独无法进行和完成leader选举，当第二台服务器server2启动时，此时两台机器可以相互通信，每台机器都试图找到leader，于是进入leader选举过程。选举过程如下:
			１. 每个server发出一个投票。由于是初始情况，server1和server2都会将自己作为leader服务器来进行投票，每次投票会包含所推举的服务器的myid和zxid，使用(myid, zxid)来表示，此时server1的投票为(1, 0)，server2的投票为(2, 0)，然后各自将这个投票发给集群中其他机器。
			２. 集群中的每台服务器接收来自集群中各个服务器的投票。
			３. 处理投票。针对每一个投票，服务器都需要将别人的投票和自己的投票进行pk，pk规则如下：
				□ 优先检查zxid。zxid比较大的服务器优先作为leader。
				□ 如果zxid相同，那么就比较myid。myid较大的服务器作为leader服务器。
				□ 对于Server1而言，它的投票是(1, 0)，接收Server2的投票为(2, 0)，首先会比较两者的zxid，均为0，再比较myid，此时server2的myid最大，于是更新自己的投票为(2, 0)，然后重新投票，对于server2而言，其无须更新自己的投票，只是再次向集群中所有机器发出上一次投票信息即可。
			４. 统计投票。每次投票后，服务器都会统计投票信息，判断是否已经有过半机器接受到相同的投票信息，对于server1、server2而言，都统计出集群中已经有两台机器接受了(2, 0)的投票信息，此时便认为已经选出了leader。
改变服务器状态。一旦确定了leader，每个服务器就会更新自己的状态，如果是follower，那么就变更为following，如果是leader，就变更为leading。
```
    
    -   服务器运行时期leader选举
    
```html
		○ 在zookeeper运行期间，leader与非leader服务器各司其职，即便当有非leader服务器宕机或新加入，此时也不会影响leader，但是一旦leader服务器挂了，那么整个集群将暂停对外服务，进入新一轮leader选举，其过程和启动时期的Leader选举过程基本一致。
		○ 假设正在运行的有server1、server2、server3三台服务器，当前leader是server2，若某一时刻leader挂了，此时便开始Leader选举。选举过程如下:
			１. 变更状态。leader挂后，余下的服务器都会将自己的服务器状态变更为looking，然后开始进入leader选举过程。
			２.  每个server会发出一个投票。在运行期间，每个服务器上的zxid可能不同，此时假定server1的zxid为122，server3的zxid为122，在第一轮投票中，server1和server3都会投自己，产生投票(1, 122)，(3, 122)，然后各自将投票发送给集群中所有机器。
			３. 接收来自各个服务器的投票。与启动时过程相同
			４. 处理投票。与启动时过程相同，此时，server3将会成为leader。
			５. 统计投票。与启动时过程相同。
改变服务器的状态。与启动时过程相同。
```
