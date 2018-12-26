FROM 172.100.200.208/cube/escloud-linux-source-openstack-base:5.0.1
LABEL maintaner="YangPeng peng.yang@easystack.cn"

ENV FE_URL=http://fs.easystack.cn
ENV ROOT_DIR=/usr/src/app

WORKDIR /usr/src/app/horizon

# ADD docker/pip.conf /root/.pip
ADD requirements.txt ${ROOT_DIR}/horizon
RUN pip install -r requirements.txt
