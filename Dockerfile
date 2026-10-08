# ---------- 构建阶段 ----------
FROM node:22-alpine AS build

WORKDIR /app

# 先复制依赖清单，利用 Docker 层缓存加速重复构建
COPY package.json package-lock.json ./
RUN npm ci

# 复制源码并构建静态产物到 /app/dist
COPY . .
RUN npm run build

# ---------- 运行阶段 ----------
FROM nginx:1.27-alpine

# 用自定义配置替换默认站点配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 只把构建产物拷进运行镜像，镜像更小、更安全
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
