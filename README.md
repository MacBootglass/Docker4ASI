# Docker4ASI
Configuration des containers docker pour le projet ASI (Nginx + NodeJS + MySQL)
Pour récupérer les dépendances -> git clone https://github.com/MacBootglass/Docker4ASI.git --recursive 

# Prérequis:
* docker -> https://docs.docker.com/engine/installation/
* docker-compose -> https://docs.docker.com/compose/install/
* sass -> http://sass-lang.com/install

# Infos:
* utiliser les commandes suivantes sont disponibles pour gérer le projet:
  * bash cmd.sh stop -> stop tous les containers
  * bash cmd.sh clean -> stop et supprime tous les containers
  * bash cmd.sh build -> génère les images des containers
  * bash cmd.sh start -> lance le projet
  * bash cmd.sh connectDB -> se connecter au container de la base de données
  * bash cmd.sh connectWeb -> se connecter au container nginx
  * bash cmd.sh compile -> générer le css du projet
  * bash cmd.sh all -> execute toutes les commandes necessaires pour lancer le projet
* par défaut, le port utilisé par le serveur nginx et le 80
* les ports 3000 et 3001 sont utilisés par les applications nodejs
* le port 3306 est utilisé pour mysql
* le mot de passe par défaut de la base de données mysql est Hard42
* la table sql utilisée est APPASI
* vous pouvez consulter les indentifiants / mdp par défaut des utilisateurs dans le fichier mysql/data/insert.sql
