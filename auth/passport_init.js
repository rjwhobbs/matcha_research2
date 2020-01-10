const passport 		= require('passport');
const localStrategy = require('passport-local').Strategy;
const conn 			= require('../connection/conn');
const _ 			= require('lodash');
const bcrypt		= require('bcrypt');
let	sql				= require('../sql/statements');	
// let users 			= require('../dummy_data/users.json');

passport.use(new localStrategy(function(username, password, done) {
	conn.query(sql.selUser, [username], (err, results, feilds) => {
		if (err) {throw err}
		let user = results[0];
		bcrypt.compare(password, user.password, (err, res) => {
			if (err) {throw err}
			if (res) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
		// let user = _.find(users, u => u.name === username);
		// if (!user || user.password !== password) {
		// 	done(null, false); // Null = no error, false = auth failed, no user
		// 	return ;
		// }
		// done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.user_id);
});
// Adds the user id to the session var
passport.deserializeUser(function(user_id, done) {
	// let user = _.find(users, u => u.id === id);
	conn.query(sql.selUserById, [user_id], (err, results) => {
		if (err) {throw err}
		let user = results[0];
		done(null, user);
	});
	// done(null, user);
});