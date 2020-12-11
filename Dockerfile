FROM nginx

RUN mkdir -p /root/app
ADD . /root/app

RUN apt update \
        && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
        && apt install -y nodejs

RUN cd /root/app && npm i && npm run build
RUN mv /root/app/dist/* /usr/share/nginx/html
RUN rm -rf /root/app
