const passport 		= require('passport');
const localStrategy = require('passport-local').Strategy;
const conn 			= require('../connection/conn');
const _ 			= require('lodash');
const bcrypt		= require('bcrypt');
let	sql				= require('../sql/statements');	

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
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.user_id);
});
// Adds the user id to the session var
passport.deserializeUser(function(user_id, done) {
	conn.query(sql.selUserById, [user_id], (err, results) => {
		if (err) {throw err}
		let user = results[0];
		done(null, user);
	});
});