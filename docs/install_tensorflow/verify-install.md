---
sidebar_position: 4
---
# 验证 TensorFlow 安装

安装完成后，打开 Python 终端，输入：

```python
import tensorflow as tf
print(tf.__version__)
print(tf.config.list_physical_devices('GPU'))  # 有 GPU 返回列表，无则为空
```

<!--
> ![验证安装](./img/tf-verify-install.png)
-->

如输出 TensorFlow 版本号且能检测到 GPU，说明 GPU 版本安装成功。
