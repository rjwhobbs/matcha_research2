const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
let users = require('../dummy_data/users.json');
const _ = require('lodash');

passport.use(new localStrategy(function(username, password, done) {
	let user = _.find(users, u => u.name === username);
	if (!user || user.password !== password) {
		done(null, false); // Null = no error, false = auth failed, no user
		return ;
	}
	done(null, user);
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
// Adds the user id to the session var
passport.deserializeUser(function(id, done) {
	let user = _.find(users, u => u.id === id);
	done(null, user);
});