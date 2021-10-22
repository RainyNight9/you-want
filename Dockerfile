FROM openresty/openresty:alpine
COPY deploy/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY dist/ /usr/local/openresty/nginx/html/