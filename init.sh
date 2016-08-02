if [ ${PWD##*/} != "Docker4ASI" ] || [ $# -lt 1 ] || [ -h "nginx/projet" ]; then
  exit 1
fi

ln -s $1 nginx/projet
