FROM node:24-alpine AS builder
WORKDIR /app

COPY --exclude=Caddyfile package*.json ./
RUN npm ci

COPY --exclude=Caddyfile . .
RUN npm run build

FROM caddy:2-alpine AS runner

COPY --from=builder /app/dist /usr/share/caddy

COPY Caddyfile /etc/caddy/Caddyfile
