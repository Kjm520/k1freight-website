# Static site on Cloud Run (no Next build)
FROM nginx:alpine

# Install exiftool for image metadata processing
RUN apk add --no-cache exiftool

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

# Strip all metadata from images and write K1 Freight LLC ownership
RUN exiftool -all= -overwrite_original \
    -Copyright="Copyright K1 Freight LLC. All rights reserved." \
    -Artist="K1 Freight LLC" \
    -XMP:Creator="K1 Freight LLC" \
    -XMP:Rights="Copyright K1 Freight LLC. All rights reserved." \
    -r /usr/share/nginx/html/public/img/

EXPOSE 8080
