# Docker实战系列

## Docker搭建自己的Gitlab CI Runner

> 这里主要将采用 docker 镜像方式安装
>

1. 拉取gitlab-runner镜像

```
docker pull gitlab/gitlab-runner:latest
```

2. 添加 gitlab-runner container

```
sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
  
  sudo docker run -d --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest
```

3. 注册runner

```
sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register
```

4. 注册

```shell
sudo docker exec -it gitlab-runner gitlab-ci-multi-runner register
```







sudo docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest













[Docker搭建自己的Gitlab CI Runner - 哎_小羊的博客 - CSDN博客](https://blog.csdn.net/aixiaoyang168/article/details/72168834)
