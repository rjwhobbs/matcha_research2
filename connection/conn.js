const mysql 		= require('mysql');
let connCredentials	= require('./credentials');

// let settingsOne = {
// 	host: 'localhost',
// 	user: 'test2',
// 	password: 'XYfErbAQ8dAvrjKc',
// 	database: 'testdb',
// 	socketPath: '/Users/RogerHobbs/Desktop/Server/mysql/tmp/mysql.sock'
// };

// let settingsTwo = {
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'pw123456',
// 	database: 'testdb',
// 	socketPath: '/goinfre/rhobbs/Desktop/server/mysql/tmp/mysql.sock'
// };

let conn = mysql.createConnection(connCredentials.roger_imac1);

conn.connect(function(err) {
	if (err) {throw err}
	console.log('MySQL db connected');
});

module.exports = conn;