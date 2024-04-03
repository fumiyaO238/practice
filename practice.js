var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Password123!',
  database : 'todo'
});

connection.connect();

connection.query('SELECT * FROM tasks;', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();
