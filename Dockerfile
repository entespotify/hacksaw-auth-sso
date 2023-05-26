FROM node:16.15.0-alpine AS builder

COPY package.json \
     package-lock.json \
     tsconfig.json \
     /usr/web/

WORKDIR /usr/web/
RUN npm ci

COPY public/ /usr/web/public/
COPY src/ /usr/web/src/
RUN npm run build

FROM rtsp/lighttpd
COPY --from=builder /usr/web/build/ /var/www/html/