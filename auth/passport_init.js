const passport 		= require('passport');
const localStrategy = require('passport-local').Strategy;
const conn 			= require('../connection/conn');
const _ 			= require('lodash');
const bcrypt		= require('bcrypt');
let	sql				= require('../model/sqL_statements');

passport.use(new localStrategy(function(username, password, done) {
	console.log("Auth ran");
	conn.query(sql.selUserByUname, [username], (err, results) => {
		if (err) {throw err}
		let user = results[0];
		if (!user) {
			done(null, false);
			return;
		}
		bcrypt.compare(password, user.password, (err, res) => {
			if (err) {throw err}
			// Null = no error, false = auth failed, no user
			// NB Call return; after auth failure
			if (res) {
				done(null, user);
			} else {
				done(null, false);
				return;
			}
		});
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.user_id);
});
// Adds the user id to the session var
// And if I understand it correctly it also adds this user to the request object
// as follows: req.user
// It is possible to add a global var inorder to skip this query 
// but I'm not sure how that will affect the integrity of the app.
passport.deserializeUser(function(user_id, done) {
	conn.query(sql.selUserById, [user_id], (err, results) => {
		if (err) {throw err}
		// Need to remove hashed password from object.
		let user = results[0];
		done(null, user);
	});
});