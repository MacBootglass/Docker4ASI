if [ ${PWD##*/} != "Docker4ASI" ]; then
  exit 1
fi

if [ $# -ge 1 ]; then
  if [ $1 == "stop" ]; then
    docker stop $(docker ps -a -q)
  fi

  if [ $1 == "clean" ]; then
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
  fi

  if [ $1 == "build" ]; then
    docker-compose build
  fi

  if [ $1 == "start" ]; then
    docker-compose up -d
  fi

  if [ $1 == "compile" ]; then
    if [ ! -d "nginx/data/ressources/css" ]; then
      mkdir nginx/data/ressources/css
    fi

    sass nginx/data/ressources/scss/index.scss nginx/data/ressources/css/index.css
  fi

  if [ $1 == "all" ]; then
    bash cmd.sh clean
    bash cmd.sh build
    bash cmd.sh start
    bash cmd.sh compile
  fi
fi
