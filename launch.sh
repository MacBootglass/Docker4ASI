if [ ${PWD##*/} != "Docker4ASI" ]; then
  exit 1
fi

if [ $# -ge 1 ] && [ $1 == "clean" ]; then
  docker stop $(docker ps -a -q)
  docker rm $(docker ps -a -q)
fi

docker-compose build
docker-compose up -d
