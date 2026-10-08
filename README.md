# 大模型（LLM）学习路径规划

一个帮助「零基础 → 能训练、能部署、能做应用」的大模型学习路线图网站。

把分散在 GitHub 上的优质开源学习项目，按**由浅入深的学习顺序**整理成 5 个阶段，每个项目都标注了定位、**优势**与**劣势**，并支持勾选记录学习进度（保存在浏览器本地）。

## 目录结构

```
llm-learning-path/
├─ src/
│  ├─ data/learningPath.js        # 全部学习路径数据（阶段 + 项目）
│  ├─ composables/useProgress.js  # 学习进度状态 + localStorage 持久化
│  ├─ components/
│  │  ├─ StageSection.vue         # 单个阶段区块
│  │  ├─ ProjectCard.vue          # 单个项目卡片（含勾选、链接、优劣势）
│  │  └─ ProgressBar.vue          # 总进度条
│  ├─ App.vue                     # 页面主结构
│  └─ style.css                   # 全局样式
├─ nginx/default.conf             # Nginx 静态站点配置（站点容器内部）
├─ Dockerfile                     # 多阶段构建：Node 打包 → Nginx 托管
├─ Caddyfile                      # 反向代理配置（对外的「总机」，负责 HTTPS）
├─ docker-compose.yml             # 一键启动（web + caddy 两个服务）
└─ index.html
```

## 架构说明

```
浏览器 → Caddy(反代, 对外 80/443, 负责 HTTPS) → web(Nginx, 仅内网 80) → 静态文件
```

- `web` 容器：只跑静态站点，不直接对外暴露，藏在内部网络里。
- `caddy` 容器：反向代理，唯一对外的入口，负责 HTTPS 证书、压缩与转发。

## 想改学习内容？

只需要编辑 [src/data/learningPath.js](src/data/learningPath.js)，按现有格式增删阶段或项目即可，页面会自动渲染，无需改动组件。

## 本地开发

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器（默认 http://localhost:5173）
npm run build     # 构建生产产物到 dist/
npm run preview   # 本地预览构建产物
```

## 用 Docker 运行

```bash
docker compose up -d --build        # 构建并启动（web + caddy）
```

启动后浏览器访问 `http://<服务器公网IP>/` 即可。

停止 / 更新：

```bash
docker compose down --remove-orphans   # 停止并移除容器
docker compose up -d --build           # 拉取最新代码后重建
```

## 配置域名与 HTTPS

Caddy 会根据 `SITE_ADDRESS` 自动申请 Let's Encrypt 证书，**无需手写证书配置**。

1. **解析域名**：在你的域名服务商处，把域名的 A 记录指向服务器公网 IP。
2. **放行端口**：在腾讯云轻量服务器控制台「防火墙」放行 `80` 和 `443`（TCP）。
3. **告诉 Caddy 你的域名**：在项目根目录新建 `.env`：

   ```bash
   SITE_ADDRESS=llm.example.com
   ```

4. **重启使配置生效**：

   ```bash
   docker compose up -d
   ```

Caddy 会自动完成证书申请与 HTTP→HTTPS 跳转，之后用 `https://llm.example.com` 访问即可。证书会自动续期，无需人工干预。

> 未配置 `.env` 时，`SITE_ADDRESS` 默认为 `:80`，站点以纯 HTTP 方式提供，方便先跑通部署。

## 部署到腾讯云轻量应用服务器

1. **放行端口**：控制台「防火墙」放行 `80`、`443`（TCP）。
2. **安装 Docker**：见 [腾讯云官方文档](https://cloud.tencent.com/document/product/1207/45596)。
3. **拉取代码并启动**：

   ```bash
   git clone https://github.com/<你的用户名>/llm-learning-path.git
   cd llm-learning-path
   docker compose up -d --build
   ```
4. 浏览器访问 `http://<公网IP>/` 验证。

## 技术栈

Vue 3（`<script setup>`）+ Vite + Nginx（站点容器）+ Caddy（反向代理 / HTTPS），全部容器化。

## 许可

[MIT](LICENSE)
