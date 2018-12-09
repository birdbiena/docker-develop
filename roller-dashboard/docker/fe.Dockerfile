FROM node:6.12.2
LABEL maintaner="YangPeng peng.yang@easystack.cn"

ENV FE_URL=http://fs.easystack.cn
ENV ROOT_DIR=/usr/src/app

WORKDIR ${ROOT_DIR}/roller

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list && \
    echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list && \
    echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

RUN apt-get update && \
    apt-get install vim -y && \
    apt-get install zsh -y

ADD roller/package.json ${ROOT_DIR}/roller
ADD roller/system.config.js ${ROOT_DIR}/roller
ADD roller/.npmrc ${ROOT_DIR}/roller

# RUN npm i -g jspm

RUN curl -sSL -o /tmp/jspm_packages.tar.gz $FE_URL/roller/production/jspm_packages.tar.gz && \
    tar xf /tmp/jspm_packages.tar.gz -C ${ROOT_DIR}/roller/ && \
    rm -f /tmp/jspm_packages.tar.gz && \
    curl -sSL -o /tmp/node_modules.tar.gz $FE_URL/roller/production/node_modules.tar.gz && \
    tar xf /tmp/node_modules.tar.gz -C ${ROOT_DIR}/roller/ && \
    rm -f /tmp/node_modules.tar.gz

RUN npm install \
    && npm run postinstall
