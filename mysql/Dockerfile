FROM mysql:latest
MAINTAINER thibault.theologien@insa-rouen.fr
ENV MYSQL_ROOT_PASSWORD Hard42
ENV MYSQL_DATABASE APPASI
COPY data/create.sql /docker-entrypoint-initdb.d
COPY data/insert.sql /docker-entrypoint-initdb.d
WORKDIR /home
VOLUME /home
