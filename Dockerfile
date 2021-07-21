FROM nginx
COPY app /usr/share/nginx/html

# docker build -t emela/example:my-first-fe .
# docker run --name some-nginx -d -p 8080:80 emela/example:my-first-fe

# --------

# FROM nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY app /usr/share/nginx/html
# CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

# heroku login
# docker ps
# >>>> runing my-first-fe
# heroku container:login
# heroku container:push web --app emela-example
# heroku container:release web --app emela-example