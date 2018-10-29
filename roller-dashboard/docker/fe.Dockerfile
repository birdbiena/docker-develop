FROM node:6.12.2
LABEL maintaner="YangPeng peng.yang@easystack.cn"

# ENV FE_URL=http://fs.easystack.cn

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

COPY roller/package.json ${ROOT_DIR}/roller
COPY roller/system.config.js ${ROOT_DIR}/roller

RUN npm config set registry https://registry.npm.taobao.org && \
    npm install -g jspm gulp

# RUN curl -sSL -o /tmp/jspm_packages.tar.gz http://fs.easystack.cn/roller/jspm_packages.tar.gz && \
#     tar xvf /tmp/jspm_packages.tar.gz -C ${ROOT_DIR}/roller/ && \
#     rm -f /tmp/jspm_packages.tar.gz

# RUN curl -sSL -o /tmp/node_modules.tar.gz http://fs.easystack.cn/roller/node_modules.tar.gz && \
#     tar xvf /tmp/node_modules.tar.gz -C ${ROOT_DIR}/roller/ && \
#     rm -f /tmp/node_modules.tar.gz

RUN npm install && \
    jspm install
