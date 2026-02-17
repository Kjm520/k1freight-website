# Static site on Cloud Run (no Next build)
FROM nginx:alpine

# Cloud Run listens on 8080
RUN printf '%s\n' \
'server {' \
'  listen 8080;' \
'  server_name _;' \
'  root /usr/share/nginx/html;' \
'  index index.html;' \
'' \
'  location / {' \
'    try_files $uri $uri/ =404;' \
'  }' \
'}' \
> /etc/nginx/conf.d/default.conf

# Copy your static site root
COPY site/ /usr/share/nginx/html/

EXPOSE 8080
