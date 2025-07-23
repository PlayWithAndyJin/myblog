---
sidebar_position: 1
---
# Windows 安装 Python

## 1. 下载 Python

1. 访问 [Python 官网](https://www.python.org/downloads/windows/)。
2. 下载最新的 Windows 安装包（建议 3.8 及以上）。

<!--
> ![Python 官网下载页面](./img/windows-python-download.png)
-->

## 2. 安装 Python

1. 双击安装包，建议勾选“Add Python to PATH”。
2. 按提示完成安装。

<!--
> ![Windows 安装界面](./img/windows-python-install.png)
-->

## 3. 配置环境变量（如未勾选 PATH）

1. 右键“此电脑”→属性→高级系统设置→环境变量。
2. 在 Path 中添加 Python 安装目录（如 `C:\Python311` 和 `C:\Python311\Scripts`）。

<!--
> ![环境变量配置](./img/windows-python-env.png)
-->

## 4. 验证安装

打开命令行，输入：

```bash
python --version
pip --version
```

## 5. pip 包管理工具

Python 安装自带 pip，可用如下命令安装包：

```bash
pip install 包名
```

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。 