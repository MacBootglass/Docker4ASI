FROM francolaiuppa/docker-nodemon-forever:latest
MAINTAINER thibault.theologien@insa-rouen.fr
RUN mkdir -p /usr/src/app
VOLUME /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3001
CMD npm install ; nodemon index.js
