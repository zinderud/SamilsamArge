
FROM node:14.7.0-alpine as node
LABEL author="zinderud"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run start-build
##### Stage 2
FROM nginx:alpine
WORKDIR /app

VOLUME /var/cache/nginx
VOLUME ./ssl: /etc/nginx/certs
COPY ./ssl/server.crt /etc/nginx/certs/
COPY ./ssl/server.key /etc/nginx/certs/
COPY ./dist/argefrontend /usr/share/nginx/html
COPY ./ssl/nginx-default.conf /etc/nginx/conf.d/
EXPOSE 80
EXPOSE 443
#COPY nginx.conf /etc/nginx/nginx.conf

# docker build -t nginx-angular12 -f nginx.dockerfile .
# docker run -p 8080:80 nginx-angular
# docker run --rm -d -p 80:80/tcp  -p 4443:443 nginx-angular12:latest
# docker run --name fc  -v "$PWD/ssl:/etc/nginx/certs"   -v "$PWD/ssl/nginx-default.conf:/etc/nginx/conf.d/"    -v "$PWD/dist/argefrontend:/usr/share/nginx/html:ro" -p 80:80 -p 443:443 -d nginx

