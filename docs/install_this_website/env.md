---
title: 环境要求
sidebar_position: 2
---

# 环境要求

在安装和部署本网站前，请确保你的开发环境满足以下要求：

- **操作系统**：Windows、macOS 或 Linux
- **Node.js**：建议 16.x 或 18.x（推荐 [LTS 版本](https://nodejs.org/zh-cn/download/)）
- **npm**：建议 8.x 及以上（Node.js 自带）
- **Git**：用于克隆代码仓库

## Node.js 安装指导

### 方式一：官网下载
- 访问 [Node.js 官网](https://nodejs.org/zh-cn/download/)，下载对应操作系统的安装包并安装。
- 安装完成后，命令行输入 `node -v` 和 `npm -v` 检查版本。

### 方式二：使用 nvm（推荐，便于多版本管理）
- [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)
- [nvm for macOS/Linux](https://github.com/nvm-sh/nvm#installing-and-updating)
- 安装 nvm 后，运行：
  ```bash
  nvm install 18
  nvm use 18
  node -v
  npm -v
  ```

## npm/yarn 国内镜像源配置方法

### 临时使用国内镜像
每次安装依赖时加上 `--registry` 参数：
```bash
npm install --registry=https://registry.npmmirror.com
```

### 全局设置 npm 镜像源
以后所有 npm install 都会自动使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
```

检查当前 npm 镜像源：
```bash
npm config get registry
```
输出应为：
```
https://registry.npmmirror.com/
```

### 恢复为官方源
```bash
npm config set registry https://registry.npmjs.org
```

### yarn 镜像源配置（如有用 yarn）
```bash
yarn config set registry https://registry.npmmirror.com
```

:::tip
更多国内镜像源和包管理器配置方法，详见 [我收录的镜像库](http://andyjin.website/tools)。
:::

## 检查版本

可以通过以下命令检查 Node.js 和 npm 版本：

```bash
node -v
npm -v
git --version
```

---

下一步：克隆代码仓库 