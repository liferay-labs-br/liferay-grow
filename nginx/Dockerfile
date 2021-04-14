FROM nginx:stable

ARG DOMAIN_LIST

RUN  apt-get update \
      && apt-get install -y openssl \
      && openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Liferay/CN=${DOMAIN_LIST}" -addext "subjectAltName=DNS:${DOMAIN_LIST}" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
