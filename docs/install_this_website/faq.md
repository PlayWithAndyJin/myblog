---
title: 常见问题与FAQ
sidebar_position: 8
---

# 常见问题与FAQ

### Q1: 端口被占用/无法访问？
- 默认端口为 3000，可用 `npx kill-port 3000` 释放端口。
- 或修改 `package.json` 的 `start` 脚本指定其它端口。

### Q2: 构建后页面空白？
- 检查 `baseUrl` 配置是否正确，通常为 `/` 或 `/你的项目名/`。
- 静态资源路径需与部署路径一致。

### Q3: 如何添加/修改导航栏、页脚？
- 编辑 `docusaurus.config.js` 的 `navbar` 和 `footer` 字段。

### Q4: 如何添加新教程/文档？
- 在 `docs/` 目录下新建文件夹和 `index.md`，并在侧边栏配置中添加。
