---
sidebar_position: 3
---

# macOS 安装 PyTorch

macOS 目前仅支持 CPU 版本（Apple Silicon 可尝试 MPS 加速）。

## 安装步骤

1. 安装 Python（建议 3.8 及以上）。
2. 打开终端，执行：

```bash
pip install torch torchvision torchaudio
```

<!--
> ![macOS安装示意图](./img/macos-install.png)
-->

如需详细步骤或遇到问题，请参考 [常见问题](./faq.md)。 

## MPS（Apple Silicon）加速说明

PyTorch 1.12 及以上版本支持在 Apple Silicon（M1/M2/M3及更高版）芯片上通过 MPS（Metal Performance Shaders）进行硬件加速。

### 检查 MPS 支持

在 Python 终端输入：

```python
import torch
print(torch.backends.mps.is_available())  # True 表示可用
print(torch.backends.mps.is_built())      # True 表示已编译支持
```

### 使用 MPS 设备

将模型和数据移动到 MPS 设备：

```python
import torch
mps_device = torch.device("mps")
x = torch.ones(5, device=mps_device)
# 示例：模型放到 MPS
your_model = YourModel().to(mps_device)
```

> **注意：**
> - 仅 macOS 12.3 及以上、Apple Silicon 芯片支持 MPS。
> - MPS 后端部分算子支持有限，遇到不支持的操作可回退到 CPU。
> - 训练时建议先用小模型测试。

更多信息请参考 [PyTorch 官方 MPS 支持说明](https://pytorch.org/docs/stable/notes/mps.html)。 