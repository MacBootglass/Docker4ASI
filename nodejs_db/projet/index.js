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

  socket.on('getUsers', function(){

    // ADD CHECK PARRAIN
    connection.query('select nom, prenom, pseudo, naissance, phrase from USERS where id != "' + socket.userId + '";', function(err, rows, fields) {
      if (!err)
        socket.emit("otherUsers", rows);
      else
        socket.emit("error", "Impossible d'obtenir les autres utilisateurs");
    });
  });



  // RECUPERATION DES MESSAGES

});

io.listen(3001);
// connection.end();
