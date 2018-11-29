FROM node:6
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN apt-get update && \
    apt-get install -y \
    google-chrome-stable \
    git \ 
    yarn

COPY build.sh /build.sh
CMD ["/build.sh"]                              
