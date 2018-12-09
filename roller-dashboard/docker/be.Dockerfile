FROM 172.100.200.208/cube/escloud-linux-source-openstack-base:5.0.1
LABEL maintaner="YangPeng peng.yang@easystack.cn"

WORKDIR /usr/src/app/roller-dashboard

# RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
#     echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list && \
#     echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list && \
#     echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list && \
#     echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list && \
#     apt-get update

# ADD docker/pip.conf /root/.pip/
ADD docker/config.yaml /etc/roller/client/

ADD requirements.txt /usr/src/app/roller-dashboard
RUN pip install -r requirements.txt
