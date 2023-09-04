FROM node:alpine AS builder
RUN mkdir /src
COPY . /src/
WORKDIR /src
RUN npm install

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /src/build ./
