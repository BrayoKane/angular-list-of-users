FROM node:16.13.1-alpine AS builder
WORKDIR /
COPY package.json ./
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build", "--prod"]

FROM nginx:latest AS web
# RUN rm -rf  /usr/share/nginx/html/*
# RUN rm -rf  dist/*
COPY --from=builder dist/ ./
COPY  nginx.conf    /etc/nginx/conf.d/default.conf
RUN rm -rf  node_modules/
COPY  .    /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
