FROM trion/ng-cli:13.1.2 AS builder
WORKDIR /app
COPY package.json ./
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build", "--prod"]
RUN rm -rf  node_modules

FROM nginx:latest AS web
COPY --from=builder /app/dist/angular-list-of-users /usr/share/nginx/html/
COPY  --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
