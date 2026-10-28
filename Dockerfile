FROM node:24-alpine AS builder

RUN apk add git

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --exclude=httpd.conf . .
RUN npm run build

FROM alpine:3.24 AS runner

RUN apk add busybox-extras

RUN addgroup -g 1001 -S abc && \
    adduser -u 1001 -S abc -G abc

COPY httpd.conf /etc/httpd.conf

WORKDIR /app
COPY --from=builder --chown=abc:abc /app/dist .

USER abc

EXPOSE 3000
CMD ["httpd", "-f", "-p", "0.0.0.0:3000"]
