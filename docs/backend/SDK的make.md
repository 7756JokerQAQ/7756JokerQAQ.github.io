---
title: "开发简易的SDK"
---

<!-- truncate -->
-   首先新建一个springboot项目：

![image-20230114182700903](/img/cos/learn/3481/image-20230114182700903.png)

-   springboot版本选择2.7.0勾选两个依赖项目

![image-20230114182839313](/img/cos/learn/3481/image-20230114182839313.png)

接着打开pom文件：

将版本改成0.0.1任意其他数字都行

```xml
 <groupId>com.lyc</groupId>
    <artifactId>lycapi-client-sdk</artifactId>
    <version>0.0.1</version>
    <name>lycapi-client-sdk</name>

<!--可以删除测试的依赖，必须删除最下面的一个maven的依赖-->
<build>
	<plugins>
    	<groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <configuration>
        	<excludes>
            	<exclude>
                	<groupId>org-projectlombok</groupId>
                    <artifactId>lombok</artifactId>
                </exclude>
            </excludes>
        </configuration>
 	</plugins>
</build>

<!--因为进行了一个加密处理 这里引入一个依赖 -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.9</version>
        </dependency>
```

接着删除启动类：在重新新建一个文件名称为LycApiClientConfig:

![image-20230114183627522](/img/cos/learn/3481/image-20230114183627522.png)

对新建的LycApiClientConfig类加上注解：

```java
@Configuration
@ConfigurationProperties("lycapi.clint") //便于通过此路径配置yml文件进行赋值
@Data
public class LycApiClientConfig {
    //这里我们设置两个密令
    private String accessKey;
    private String secretKey;
    @Bean
    public LycApiClient lycApiClient(){
        return new LycApiClient(accessKey,secretKey);
    }
}
```

//接着将已经编写好的LycApiClient.java和User.java和SignUtils.java拷贝到本项目目录

LycApiClient.java

```java
package com.lyc.lycapiclientsdk.clint;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import com.lyc.lycapiclientsdk.model.User;
import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import static com.lyc.lycapiclientsdk.utils.SignUtils.getSign;

/**
 * 调用第三方接口客户段
 */
public class LycApiClient {
    private String accessKey;
    private String secretKey;
    private Map<String,String> getHeadMap(String body){
        Map<String,String > hashMap=new HashMap<>();
        hashMap.put("accessKey",accessKey);
        //一定不能在服务器中传输密码
      //  hashMap.put("secretKey",secretKey);
        hashMap.put("nonce", RandomUtil.randomNumbers(4));
        hashMap.put("body",body);
        hashMap.put("timestamp",String.valueOf(System.currentTimeMillis()/1000));
        hashMap.put("sign",getSign(body,secretKey));

        return hashMap;
    }
    public LycApiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }

    public String getNameByGet(String name){
        //可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);
        String result3= HttpUtil.get("http://localhost:8123/api/name/", paramMap);
        System.out.println(result3);
        return  result3;
    }

    public String getNameByPost(String name){
        //可以单独传入http参数，这样参数会自动做URL编码，拼接在URL中
        HashMap<String, Object> paramMap = new HashMap<>();
        paramMap.put("name", name);
        String result3= HttpUtil.post("http://localhost:8123/api/name/", paramMap);
        System.out.println(result3);
        return  result3;
    }

    public String getUserNameByPost(User user){
        String json = JSONUtil.toJsonStr(user);
        HttpResponse httpResponse = HttpRequest.post("http://localhost:8123/api/name/user")
                .addHeaders(getHeadMap(json))
                .body(json)
                .execute();
        System.out.println(httpResponse.getStatus());
        String result = httpResponse.body();
        System.out.println(result);
        return result;

    }
}
```

User.java

```java
package com.lyc.lycapiclientsdk.model;

import lombok.Data;

@Data
public class User {
    private String userName;
}
```

SignUtils.java

```java
package com.lyc.lycapiclientsdk.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

public class SignUtils {
    public  static  String  getSign(String body,String secretKey){
        //生成签名认证
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        String content=body+"."+secretKey;
        return md5.digestHex(content);
    }
}
```

接着在resources下面建立一个文件夹META-INF 并在下面建立一个文件 spring.factories并写入

```xml
org.springframework.boot.autoconfigure.EnableAutoConfiguration=com.lyc.lycapiclientsdk.LycApiClientConfig

//=后面的路径为LycApiClientConfig的引用路径
```

当上面都完成时需要点击Maven点击闪电图标排除测试类，否则会报错:

![image-20230114184415287](/img/cos/learn/3481/image-20230114184415287.png)

然后再点击Install就可以进行安装到本地仓库：

### SDK的使用

首先在Maven中引入本地仓库的SDK

```xml
<dependency>
    <groupId>com.lyc</groupId>
    <artifactId>lycapi-client-sdk</artifactId>
    <version>0.0.1</version>
</dependency>
```

接着在application.yml文件中定义改传入的参数:

```yaml
lycapi:
  clint:
    access-key: yupi
    secret-key: abcdefg
```

接着编写controller类来调用改SDk 编写文件名称为NameController.java

```java
package com.yupi.lycapiinterface.controller;
import com.lyc.lycapiclientsdk.model.User;
import com.lyc.lycapiclientsdk.utils.SignUtils;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
@RestController
@RequestMapping("/name")
public class NameController {
    @GetMapping("/")
    public String getNameByGet(String name){

        return "Get 你的名字为"+name;
    }

    @PostMapping("/")
    public String getNameByPost(String name){
        return "Post 你的名字为"+name;
    }

    @PostMapping("/user")
    public String getNameByPost(@RequestBody User user , HttpServletRequest request){
        String accessKey = request.getHeader("accessKey");
        String nonce=request.getHeader("nonce");
        String timestamp=request.getHeader("timestamp");
        String sign=request.getHeader("sign");
        String body=request.getHeader("body");
        if(!accessKey.equals("yupi")){
            throw new RuntimeException("无权限");
        }
        if(Long.parseLong(nonce)>10000){
            throw new RuntimeException("无权限");
        }
        String serverSign= SignUtils.getSign(body,"abcdefg");
        if(!sign.equals(serverSign)){
            throw new RuntimeException("无权限");
        }
        return "Post 用户的名字为"+user.getUserName();
    }
}
```

在测试类中调用改SDK和controller的检验逻辑:

```java
package com.yupi.lycapiinterface;

import com.lyc.lycapiclientsdk.clint.LycApiClient;

import com.lyc.lycapiclientsdk.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class LycapiInterfaceApplicationTests {
    @Resource
    private LycApiClient lycApiClient;
    @Test
    void contextLoads() {

        String result = lycApiClient.getNameByGet("yupi");
        User user = new User();
        user.setUserName("aaa");
        String usernameByPost = lycApiClient.getUserNameByPost(user);
        System.out.println(result);
        System.out.println(usernameByPost);
    }

}
```

文件目录结构:

![image-20230114185211972](/img/cos/learn/3481/image-20230114185211972.png)

运行结果:

![image-20230114185246930](/img/cos/learn/3481/image-20230114185246930.png)
