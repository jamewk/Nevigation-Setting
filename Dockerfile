## NODEJS
FROM node:8.12-alpine AS builder

COPY package*.json /

RUN apk update \
  && apk add git \
  && apk add gettext \
  && npm install \
  && mkdir /app \
  && cp -r node_modules /app/ 

WORKDIR /app

COPY . .

RUN $(npm bin)/ng build --prod


FROM node:8-alpine

ENV TZ=Asia/Bangkok
RUN apk add tzdata \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone \
  && mkdir -p /app/ssl 

ARG CONTAINER_PORT
ARG PM2_FILE
ENV PM2_FILE ${PM2_FILE}
WORKDIR /app/

COPY ssl  /app/ssl
COPY frontend.js  /app/
COPY pm2-iot.json /app/
COPY pm2-production.json /app/
COPY --from=builder /app/dist /app/dist

RUN npm config set unsafe-perm true
RUN npm install -g pm2 && npm install express express-winston winston helmet

EXPOSE ${CONTAINER_PORT}

CMD pm2 start ${PM2_FILE} --no-daemon
