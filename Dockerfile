# ---------- build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA history 模式支持
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
