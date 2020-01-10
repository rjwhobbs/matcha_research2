const fs 			= require('fs');
const mysql 		= require('mysql');
const configUsers 	= require('./config_credentials');

dbc = mysql.createConnection(configUsers.roger_mbp);

// So this splits up the data from setup.sql by a ';' char
// The sql statements then get passed one by one to a query to create the db
// and each table.
// I think a JSON file might be more efficient by this works quite well
// Also I'm not sure why this file doesn't quit after calling it, one needs to hit ^C after running it.
dbc.connect((err) => {
	if (err) {throw err}
	fs.readFile('./setup.sql', 'utf8', (err, data) => {
		if (err) {throw err}
		data.trim().split(';')
		.forEach((value, index, arr) => {
			dbc.query(value, (err, result) => {
				if (err) {throw err}
				if (index === arr.length - 1) {
					console.log("Created matcha research database.");
				}
			});
		});
	});
});
