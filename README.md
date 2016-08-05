# Docker4ASI
Configuration des containers docker pour le projet ASI (Nginx + NodeJS + MySQL)

# Prérequis:
* docker -> https://docs.docker.com/engine/installation/
* docker-compose -> https://docs.docker.com/compose/install/
* sass -> http://sass-lang.com/install
* utiliser les commandes suivantes sont disponibles pour gérer le projet:
  * bash cmd.sh stop -> stop tous les containers
  * bash cmd.sh clean -> stop et supprime tous les containers
  * bash cmd.sh build -> génère les images des containers
  * bash cmd.sh start -> lance le projet
  * bash cmd.sh connectDB -> se connecter au container de la base de données
  * bash cmd.sh connectWeb -> se connecter au container nginx
  * bash cmd.sh compile -> générer le css du projet
* par défaut, le port utilisé par le serveur nginx et le 80
* les ports 3000 et 3001 sont utilisés par les applications nodejs
* le port 3306 est utilisé pour mysql
