FROM nginx:1.11.10

RUN rm /etc/nginx/conf.d/default.conf && rm /usr/share/nginx/html/*

COPY nginx/conf.d /etc/nginx/conf.d

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./app/ /app

EXPOSE 8090