
docker run --name fc  -v "$PWD/ssl:/etc/nginx/certs"   -v "$PWD/ssl/nginx-default.conf:/etc/nginx/conf.d/"    -v "$PWD/dist/argefrontend:/usr/share/nginx/html:ro" -p 80:80 -p 443:443 -d nginx