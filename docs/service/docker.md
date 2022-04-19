# Docker简介

**问题**

我们希望有一个工具可以帮我们一键智能部署，假如你要部署在多台不同的机器上，可以不用在担心不同系统，不同版本的差异，以及运行之前需要安装不同软件的痛苦。

**解决**

当红的虚拟化软件：Docker [https://www.docker.com/](https://www.docker.com/)

**Docker的进化**

<img src="./images/docker_jinhua.png" style="zoom:50%;" />

- 传统虚拟机，虚拟硬件以后，需要在上面安装一个完整的操作系统。

- Docker：推出了容器的概念，每个容器不需要安装完成的操作系统，里面的进程直接运行在 Docker 创造的宿主内核中，不需要虚拟硬件。

**Docker的优点**

- 更快速的启动速度

- 更少的资源占用

- 一致的运行环境

- 微服务架构， docker 天生适配微服务架构

**下载使用Docker**

下载地址：[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

**Docker images**

可以在 [https://hub.docker.com/search?q=&type=image](https://hub.docker.com/search?q=&type=image) 中获取各种官方的镜像, 并且可以上传你自己的自定义镜像

Docker 镜像仓库获取镜像的命令是 docker pull

```shell
# 下载镜像 
docker pull <image-name>:<tag>
# 查看以及下载的镜像
docker images
# 删除镜像
docker rmi <image-id>
# 上传
docker push <username>/<repository>:<tag>
```

**使用镜像代理**

```shell
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn/",
    "https://reg-mirror.qiniu.com"
  ]
```

**Docker Container**

```shell
docker run -d -p 81:80 --name container-name image-name
# -d 后台运行
# -p 端口映射 81 为主机的端口，80为镜像中的端口
# --name 自定义容器名称
# image-name 镜像名称，假如本地没有下载，会先自动 pull 一次镜像
```

**其他命令**

```shell
# 查看所有容器
docker ps
# 停止容器
docker stop container-id
# 删除容器 
docker rm container-id
# 启动已终止容器
docker container start container-id
```

**进入容器内部**

```shell
docker exec -it <container-id> command
-i :即使没有附加也保持STDIN 打开
-t :分配一个伪终端
```

**持久化容器数据**

```shell
docker run -d -p 81:80 -v host:container image-name
```

**创建Volumn**

```shell
# 创建
docker volume create <volumn-name>
# 使用 volumn 启动
docker run -d -v <volumn-name>:/data/db mongo
# 检查
docker volume inspect <volumn-name>
# 删除
docker volumn remove mongo
```

**使用 Dockerfile 自定义镜像**

Dockerfile 是一个特殊的文本文件，里面包括一系列的指令，用来构建对应的镜像

```shell
# 指定基础镜像 从 node14 构建
FROM node:14
# 创建对应的文件夹，作为项目运行的位置
RUN mkdir -p /usr/src/app
# 指定工作区，后面的运行任何命令都是在这个工作区中完成的
WORKDIR /usr/src/app
# 从本地拷贝对应的文件 到 工作区
COPY server.js /usr/src/app
# 告知当前Docker image 暴露的是 3000 端口
EXPOSE 3000
# 执行启动命令，一个 Dockerfile 只能有一个
CMD node server.js
```

**Docker build 构建自定义镜像**

```shell
# 这里特别注意上下文的概念，不要在根目录使用 Dockerfile
docker build [选项] <上下文路径/URL/->
```
