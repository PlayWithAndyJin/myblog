---
sidebar_position: 4
---
# 配置 pip 使用清华源

在国内网络环境下，直接使用 pip 安装 Python 包时，常常会遇到下载速度慢、连接超时等问题。为提升安装速度、避免网络故障，推荐配置国内镜像源（如清华大学开源镜像站）。

## 1. 临时使用清华源

安装包时加上 `-i` 参数：

```bash
pip install 包名 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 2. 永久配置清华源

### 2.1 用户级配置（推荐）

1. 打开终端，执行：
   ```bash
   pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
   ```
2. 或手动编辑 `~/.pip/pip.conf`（Linux/macOS）或 `%APPDATA%\pip\pip.ini`（Windows），内容如下：
   ```ini
   [global]
   index-url = https://pypi.tuna.tsinghua.edu.cn/simple
   ```

### 2.2 恢复默认源

```bash
pip config unset global.index-url
```

> **注意：** 清华源同步官方源有3~5分钟延迟，部分新包可能暂不可用。这是因为镜像站需定期从官方源拉取和同步最新数据，非实时更新。

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。 