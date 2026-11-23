FROM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS builder

RUN apk add git

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --exclude=httpd.conf . .
RUN npm run build

FROM busybox:1-musl@sha256:80e38f9a1b39188b8bdb28879178edb322a4402b081a9aedda1924609decd6f6 AS runner

RUN addgroup -g 1001 -S abc && \
    adduser -u 1001 -S abc -G abc

COPY httpd.conf /etc/httpd.conf

WORKDIR /app
COPY --from=builder --chown=abc:abc /app/dist .

USER abc

EXPOSE 3000
CMD ["httpd", "-f", "-p", "0.0.0.0:3000"]
