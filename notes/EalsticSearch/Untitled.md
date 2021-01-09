elasticsearch-head的使用 - 仅此而已-远方 - 博客园
https://www.cnblogs.com/xuwenjin/p/8792919.html





tyrival/gitbook: Logstash + Elasticsearch 6.7 用户指南中文版
https://github.com/tyrival/gitbook





Mac下ElasticSearch安装 - 简书
https://www.jianshu.com/p/df4af12a420a





## 安装

Logstash在Linux上安装部署 - haw2106 - 博客园
https://www.cnblogs.com/haw2106/p/10410916.html

ElasticSearch在linux上安装部署 - socket强 - 博客园
https://www.cnblogs.com/socketqiang/p/11363024.html

详解Docker下使用Elasticsearch可视化Kibana_docker_脚本之家
https://www.jb51.net/article/138582.htm





docker下载镜像报net/http: TLS handshake timeout-西风未眠-51CTO博客
https://blog.51cto.com/10950710/2122702



Docker安装部署ELK教程 (Elasticsearch+Kibana+Logstash+Filebeat) - 万能付博 - 博客园
https://www.cnblogs.com/fbtop/p/11005469.html





1.拉取镜像

```
docker pull elasticsearch:6.5.4
docker pull kibana:6.5.4
```

 

2.启动容器

```
docker run  -d --name es1  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:6.5.4
docker run -d  -p 5601:5601 --name kibana --link es1:elasticsearch  kibana:6.5.4
```