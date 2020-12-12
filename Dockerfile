FROM nginx
ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /root/app
ADD . /root/app

RUN apt-get update && apt-get install -y curl \
        && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
        && apt-get install -y nodejs

RUN cd /root/app && /usr/bin/npm i && /usr/bin/npm run build
RUN mv /root/app/dist/* /usr/share/nginx/html
RUN rm -rf /root/app
