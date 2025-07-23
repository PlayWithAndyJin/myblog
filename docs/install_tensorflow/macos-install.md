---
sidebar_position: 3
---
# macOS 安装 TensorFlow

macOS 下可根据芯片类型选择不同安装方式。

## Intel 芯片

1. 安装 Python（建议 3.8~3.11）。
2. 打开终端，执行：

```bash
pip install tensorflow
```

<!--
> ![macOS Intel 安装示意图](./img/macos-tf-intel-install.png)
-->

## Apple Silicon（M1/M2及更高版）芯片

Apple Silicon 推荐使用 miniforge 环境和专用包 `tensorflow-macos`，以获得更好的兼容性和性能。

1. 安装 [miniforge](https://github.com/conda-forge/miniforge#miniforge3) 并创建新环境：

```bash
# 下载并安装 miniforge（可参考官网）
# 创建新环境
conda create -n tf python=3.9
conda activate tf
```

2. 安装 TensorFlow for macOS：

```bash
conda install -c apple tensorflow-deps
pip install tensorflow-macos
pip install tensorflow-metal  # 可选，启用 GPU 加速
```

<!--
> ![macOS M1 安装示意图](./img/macos-tf-m1-install.png)
-->

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。 