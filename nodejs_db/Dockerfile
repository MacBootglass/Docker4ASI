FROM francolaiuppa/docker-nodemon-forever:latest
MAINTAINER thibault.theologien@insa-rouen.fr
RUN mkdir -p /usr/src/app
VOLUME /usr/src/app
WORKDIR /usr/src/app
CMD npm install ; nodemon app/index.js
