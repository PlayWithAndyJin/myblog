---
sidebar_position: 2
---

# Windows CUDA 版本安装 PyTorch

适用于拥有 NVIDIA 显卡并希望使用 GPU 加速的用户。

## 1. 安装 CUDA

1. 访问 [NVIDIA CUDA Toolkit 官网](https://developer.nvidia.com/cuda-toolkit-archive)。
2. 选择与你显卡驱动兼容的 CUDA 版本（建议 11.8 或 12.x）。
3. 下载并安装。

<!--
> ![CUDA下载页面](./img/cuda-download.png)
-->

## 2. 安装 cuDNN

1. 访问 [NVIDIA cuDNN 官网](https://developer.nvidia.com/cudnn)（需注册）。
2. 下载与你 CUDA 版本对应的 cuDNN。
3. 解压后，将 `bin`、`include`、`lib` 文件夹内容复制到 CUDA 安装目录下对应文件夹。

<!--
> ![cuDNN解压与复制](./img/cudnn-copy.png)
-->

## 3. 安装 TensorRT（可选）

1. 访问 [NVIDIA TensorRT 官网](https://developer.nvidia.com/tensorrt)。
2. 下载与你 CUDA 版本兼容的 TensorRT。
3. 解压后，将 `lib`、`include` 文件夹内容复制到 CUDA 目录或添加到环境变量。

<!--
> ![TensorRT下载页面](./img/tensorrt-download.png)
-->

## 4. 配置环境变量

将以下路径添加到系统环境变量 `Path`：

- CUDA 路径（如 `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin`）
- cuDNN 路径
- TensorRT 路径

<!--
> ![环境变量配置](./img/env-path.png)
-->

## 5. 安装 PyTorch

以 CUDA 11.8 为例：

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

<!--
> ![PyTorch CUDA安装](./img/pytorch-cuda-install.png)
-->

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。 