create table if not exists USERS (
  id varchar(15) primary key,
  nom varchar(30) not null,
  prenom varchar(20) not null,
  pseudo varchar(30) not null,
  naissance date,
  parrain boolean not null,
  phrase tinytext,
  img blob,
  password varchar(20)
);

create table if not exists CONV (
  id integer auto_increment primary key,
  auth varchar(15) references USERS,
  dest varchar(15) references USERS,
  mom datetime not null,
  msg text not null
);

create table if not exists TINDER (
  auth varchar(15) references USERS,
  dest varchar(15) references USERS,
  choix varchar(8) not null,
  check (choix in ('like', 'dislike')),
  primary key (auth, dest)
)
