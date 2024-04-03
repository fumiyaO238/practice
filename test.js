process.stdin.setEncoding("utf8");

console.log("完了したタスク名を入力してください。");

var lines = []; 
var reader = require("readline").createInterface({
  input: process.stdin,
});

reader.on("line", (line) => {
  //改行ごとに"line"イベントが発火される
  lines.push(line); //ここで、lines配列に、標準入力から渡されたデータを入れる
});
reader.on("close", () => {
  //標準入力のストリームが終了すると呼ばれる

  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Password123!',
    database : 'todo'
  });

  connection.connect();

  connection.query(`SELECT * FROM tasks WHERE title = '${lines[0]}'`, function (error, results, fields) {

    if(results.length === 0){
       console.log("タスク名が間違えています。");
       return;
    } 
    connection.query(`UPDATE tasks SET is_completed = 1 WHERE title = '${lines[0]}'`);

    if (error) throw error;
    console.log(results);
  });

  // connection.end();
});


