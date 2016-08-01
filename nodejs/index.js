var mysql      = require('mysql');
var connection = mysql.createConnection({host: 'localhost', user:'root',password:'Hard42',database:'mysql'});
console.log(connection);
connection.connect();
console.log(connection);
connection.query('SELECT * from user', function(err, rows, fields) {
if (!err) { console.log('The solution is: ', rows); }
else { console.log('Error while performing Query.', err);} });
connection.end();
