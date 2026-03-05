# Stage 1: process images (exiftool + Perl, discarded after this stage)
FROM nginx:alpine AS builder
RUN apk add --no-cache exiftool
COPY site/ /tmp/site/
RUN exiftool -all= -overwrite_original \
    -Copyright="Copyright K1 Freight LLC. All rights reserved." \
    -Artist="K1 Freight LLC" \
    -XMP:Creator="K1 Freight LLC" \
    -XMP:Rights="Copyright K1 Freight LLC. All rights reserved." \
    -r /tmp/site/public/img/

# Stage 2: final image (clean nginx:alpine, no Perl)
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

# Copy processed site from builder stage
COPY --from=builder /tmp/site/ /usr/share/nginx/html/

EXPOSE 8080
