



Spring Boot 系列（六）web开发-Spring Boot 热部署 - 神奇Sam - 博客园
https://www.cnblogs.com/magicalSam/p/7196355.html



基于Maven的SpringBoot项目实现热部署的两种方式 - CSDN博客
https://blog.csdn.net/tengxing007/article/details/72675168



SpringBoot 热加载以及添加debug调试 - CSDN博客
https://blog.csdn.net/wbwal159/article/details/78678597





```
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
    <fork>true</fork>
    <jvmArguments>
    -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005
    </jvmArguments>
    </configuration>
    <dependencies>
    <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>springloaded</artifactId>
    <version>1.2.6.RELEASE</version>
    </dependency>
    </dependencies>
</plugin>
```





<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>



    <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
        <dependencies>
        <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>springloaded</artifactId>
        <version>1.2.5.RELEASE</version>
        </dependency>
        </dependencies>
    </plugin>


