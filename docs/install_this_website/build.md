---
title: 构建与部署
sidebar_position: 6
---

# 构建与部署

## 构建生产环境静态文件

```bash
npm run build
```

- 构建完成后，静态文件位于 `build/` 目录。
- 可用 `npm run serve` 本地预览生产环境：

```bash
npm run serve
```

## 部署方式

### Vercel（推荐）
1. 注册 [Vercel](https://vercel.com/signup) 账号，可用 GitHub 等一键登录。
2. 在 Vercel 控制台点击“Add New Project”，导入你的博客仓库（需先将该项目推送到自己的到 GitHub 等平台）。
3. 需要 GitHub 等平台授权 Vercel 访问平台的仓库。
4. 看到需要部署的项目名字，点击项目右边的"Import"。
5. 其余的配置均不用修改! 点击“Deploy”开始部署，首次部署需等待几分钟。
6. 部署成功后，Vercel 会分配一个预览域名（如 `xxx.vercel.app`）。
7. （可选）在页面右端点击“Domains”可以自行绑定自己注册过的域名，按提示配置域名的 DNS。
8. 以后每次推送到主分支会自动触发构建和部署，不需要手动进行部署。
9. 当 Vercel 自动构建和部署遇到错误时会自动发送错误提示的邮件（前提是拉取的平台已经绑定了邮箱）给您。

:::tip
Vercel 支持自动 HTTPS、全球 CDN、回滚历史版本等，因此在国内仍能有非常好的体验，适合个人和团队项目。
:::

### GitHub Pages 部署

```bash
GIT_USER=<你的GitHub用户名> npm run deploy
```
- 需在 `docusaurus.config.js` 配置 `url`、`baseUrl`、`organizationName`、`projectName`。
- 详见 [Docusaurus 官方文档](https://docusaurus.io/zh-CN/docs/deployment#deploying-to-github-pages)

### 传统服务器部署
1. 构建静态文件：
   ```bash
   npm run build
   ```
2. 将 `build/` 目录下所有文件上传到服务器（例如 Nginx、Apache、宝塔面板等）。
3. 配置 Nginx 以支持 SPA 路由，示例配置：
   ```nginx
   server {
     listen 80; # 监听80端口（HTTP）
     server_name your-domain.com; # 你的域名
     root /path/to/your/build; # build目录的绝对路径
     index index.html;
     location / {
       try_files $uri $uri/ /index.html; # SPA路由支持，找不到文件时回退到index.html
     }
   }
   ```
4. 重启 Nginx 服务。
5. 访问你的域名即可看到部署好的博客网站。

:::tip
如用宝塔面板等可视化工具，直接将 `build/` 目录内容上传到网站根目录即可。
:::

---

下一步：个性化配置 