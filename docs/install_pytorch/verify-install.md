---
sidebar_position: 4
---
# 验证 PyTorch 安装

安装完成后，打开 Python 终端，输入：

```python
import torch
print(torch.__version__)
print(torch.cuda.is_available())  # Windows CUDA 用户应为 True
```

<!--
> ![验证安装](./img/verify-install.png)
-->

如输出 PyTorch 版本号且 `torch.cuda.is_available()` 为 True，说明 GPU 版本安装成功。 