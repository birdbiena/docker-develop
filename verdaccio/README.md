# Verdaccio搭建npm仓库
>Verdaccio是一个轻量级的私有NPM的Registry（从Sinopiafork过来的，sinopia最后一次更新是在几年前了）。最开始是打算使用cnpmjs这个来搭建私有的npm仓库但是搭建完成之后存在一些问题，所以使用了Sinopia，本文记录下来搭建的过程。


## 直接安装
```bash
npm install verdaccio -g

verdaccio
```

>对于服务器上面部署可以使用pm2

## 使用Docker安装
>由于之前搭建Nexus的时候安装了Docker的环境，刚好verdaccio支持Docker，所以直接使用Docker来安装了。

### 创建配置文件
```bash
mkdir -p /home/docker
git clone https://github.com/verdaccio/docker-examples
mv docker-local-storage-volume /home/docker/verdaccio
```

### 修改配置文件
```bash
# 使用淘宝的cnpmjs镜像，加速
uplinks:
  npmjs:
    url: https://registry.npm.taobao.org/
```

### 修改htpasswd
>到http://tool.oschina.net/htpasswd 生成需要的账号密码

## 创建并运行容器
```bash
docker run --name verdaccio -d -v /home/docker/verdaccio:/verdaccio -p 4873:4873 verdaccio/verdaccio:latest
docker logs verdaccio #查看日志发现存在权限问题，是由于使用了挂载的数据卷和容器内部的权限不一致的问题，需要修改下权限：

# 进入容器
docker exec -it verdaccio sh

# 查看用户ID
whoami & id

# 修改文件夹权限
sudo chown -R 200 verdaccio
```

## 客户端配置
```bash
# 配置使用私有的镜像
npm set registry http://localhost:4873

# 登录
npm adduser --registry http://localhost:4873

# 发布
npm publish --registry http://localhost:4873
```
