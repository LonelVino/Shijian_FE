# 挑战网 nginx镜像

> 最近修订记录：
> 2016.12.04 - randolph 初稿

**[Type]** Middle Image

本镜像内置nginx，基于tz-base-alpine制作。

------

## Usage

首先编译本镜像，必须使用`configure`生成编译配置，直接使用docker build会失败。

```sh
# 生成编译配置
./configure --name=tz-nginx

# 开始编译
make build
```

如果编译成功，通过`docker images`能看到编译完成的镜像。

通过镜像来运行容器：

```sh
# 不指定运行CMD时，将使用run hook来启动
docker run -it --rm registry.op.tiaozhan.com/tz-nginx

# 你也可以覆盖入口进程，以sh为例
docker run -it --rm registry.op.tiaozhan.com/tz-nginx /bin/sh

# 测试镜像是否正常工作
docker run --rm registry.op.tiaozhan.com/tz-nginx test

# 显示镜像编译版本信息
docker run --rm registry.op.tiaozhan.com/tz-nginx version
```
