---
sidebar_position: 2
---

# Windows CUDA 版本安装 TensorFlow

适用于拥有 NVIDIA 显卡并希望使用 GPU 加速的用户。

## 1. 安装 CUDA

1. 访问 [NVIDIA CUDA Toolkit 官网](https://developer.nvidia.com/cuda-toolkit-archive)。
2. 下载与 TensorFlow 兼容的 CUDA 版本（如 11.8，具体版本请查阅 [官方兼容性表](https://www.tensorflow.org/install/source#gpu)）。
3. 安装 CUDA。

<!--
> ![CUDA下载页面](./img/tf-cuda-download.png)
-->

## 2. 安装 cuDNN

1. 访问 [NVIDIA cuDNN 官网](https://developer.nvidia.com/cudnn)（需注册）。
2. 下载与 CUDA 版本对应的 cuDNN。
3. 解压后，将 `bin`、`include`、`lib` 文件夹内容复制到 CUDA 安装目录下对应文件夹。

<!--
> ![cuDNN解压与复制](./img/tf-cudnn-copy.png)
-->

## 3. 配置环境变量

将以下路径添加到系统环境变量 `Path`：

- CUDA 路径（如 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin`）
- cuDNN 路径

<!--
> ![环境变量配置](./img/tf-env-path.png)
-->

## 4. 安装 TensorFlow

> **注意：TensorFlow 2.0 及以上版本已集成 GPU 支持，无需单独安装 `tensorflow-gpu` 包。对于 1.x 版本，请使用 `pip install tensorflow-gpu`。**

```bash
pip install tensorflow
```

<!--
> ![TensorFlow CUDA安装](./img/windows-tf-cuda-install.png)
-->

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。
