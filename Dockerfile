FROM node:hydrogen-buster


RUN apt-get update\
&& apt-get upgrade -y\
&& apt-get install libaio1\
&& mkdir -p /opt/oracle\
&& cd /opt/oracle\
&& wget https://download.oracle.com/otn_software/linux/instantclient/191000/instantclient-basic-linux.x64-19.10.0.0.0dbru.zip\
&& unzip instantclient-basic-linux.x64-19.10.0.0.0dbru.zip\
&& sh -c "echo /opt/oracle/instantclient_19_10 > /etc/ld.so.conf.d/oracle-instantclient.conf"\
&& ldconfig\
&& export LD_LIBRARY_PATH=/opt/oracle/instantclient_19_10:$LD_LIBRARY_PATH

RUN mkdir api
WORKDIR /api

# Set volume remote api
VOLUME ["/api"]
# Swagger UI and Application
EXPOSE 3000 4000