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
    connection.query('select * from USERS where id = "fmartin"', function(err, rows, fields) {
      if (!err && rows[0].password === mdp) {
        // console.log("Authentification de " + id + " reussie");
        socket.userId = id;
        socket.emit("auth", true);
      }
      else {
        // console.log("Authentification de " + id + " echouée");
        socket.emit("auth", false);
      }
    });
  });



  // RECUPERATION DES MESSAGES

});

io.listen(3001);
// connection.end();
