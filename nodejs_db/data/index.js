var mysql         = require('mysql');
var passwordHash  = require('password-hash');
var io            = require('socket.io')();

var connection = mysql.createConnection({
    host: 'db',
    user:'root',
    password:'Hard42',
    database:'APPASI'});

connection.connect();

io.on('connection', function(socket){

  // AUTHENTIFICATION
  socket.on('auth', function(id, mdp){
    connection.query('select * from USERS where id = "' + id + '"', function(err, rows, fields) {
      if (!err && rows[0].password === mdp) {
        // console.log("Authentification de " + id + " reussie");
        socket.userId = id;
        socket.parrain = rows[0].parrain;
        socket.emit("auth", true);
      }
      else {
        // console.log("Authentification de " + id + " echouée");
        socket.emit("auth", false);
      }
    });
  });


  // OBTENTION DES AUTRES UTILISATEURS
  socket.on('getUsers', function(){
    // ADD CHECK PARRAIN
    connection.query('select id, nom, prenom, pseudo, naissance, phrase from USERS where id != "' + socket.userId + '";', function(err, rows, fields) {
      if (!err)
        socket.emit("getUsers", rows);
      else
        socket.emit("error", "Impossible d'obtenir les autres utilisateurs");
    });
  });


  // LIKE / DISLIKE TINDER
  // A REVOIR -> SELECT PREVENTIF
  socket.on('tinder', function(user, choix){
    if (choix === "like" || choix === "dislike")
      connection.query('insert into TINDER values ("' + socket.userId + '", "' + user + '", "' + choix + '" );', function(err, rows, fields) {
        if (!err)
          socket.emit(choix, user); //On ajoute à la liste des utilisateurs à contacter sur le client
        else if (err.code === "ER_DUP_ENTRY")
          connection.query('update TINDER set choix = "' + choix + '" where auth = "' + socket.userId + '" and dest = "' + user + '";', function(err, rows, fields) {
            if (!err)
              socket.emit(choix, user);
            else
              socket.emit('error', "Erreur lors de l'accès à la table TINDER");
          });
      });
  });


  // RECUPERATION D'UNE CONVERSATION
  socket.on('recoverConversation', function(dest) {
    connection.query('select * from CONV where (auth = "' + socket.userId + '" and dest = "' + dest + '") or (auth = "' + dest + '" and dest = "' + socket.userId + '") order by mom;', function(err, rows, fields) {
      if (!err)
        socket.emit('recoverConversation', rows);
      else
        socket.emit('error', 'Impossible de récupérer la conversation');
    });
  });

  // RECUPERATION CONVERSATIONS EXISTANTES
  socket.on('recoverExistConv', function() {
    var env = new Array();
    var rec = new Array();

    connection.query('select dest user, mom, msg from CONV conv where auth="' + socket.userId + '" and id in (select max(id) from CONV where dest=conv.dest);',
    function(err, rows, fields) {
      if (!err) {
        env = rows;

        connection.query('select auth user, mom, msg from CONV conv where dest="' + socket.userId + '" and id in (select max(id) from CONV where auth=conv.auth);',
        function(err, rows, fields) {
          if (!err)
            rec = rows;
          socket.emit('recoverExistConv', env, rec);
        });
      }
    });
  });
});



// select dest user, mom, msg from CONV conv where auth="ttheologien" and id in (select max(id) from CONV where dest=conv.dest);
// select auth user, mom, msg from CONV conv where dest="ttheologien" and id in (select max(id) from CONV where auth=conv.auth);


io.listen(3001);
// connection.end();
