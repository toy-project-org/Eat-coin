var mysql = require('mysql2');

var db = 'database-1.cfjl0msookne.us-east-1.rds.amazonaws.com';

var connection = mysql.createConnection({
  host     : db,
  user     : 'root',
  password : 'didvk!7095',
  database : 'eatcoin'
});
 
connection.connect();

module.exports = connection;