const express = require('express');
const passport = require('passport');
const users = require('./data/users');
const _ = require('lodash');

const router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
	if (req.app.get('env') === 'developement') {
		let user = users[0];
		if (req.query.user) {
			user = _.find(users, u => u.name === req.query.user);
		}
		req.logIn(user, function (err) {
			if (err) {return next(err);}
			return res.redirect('/');
		});
		return ;
	}
	let message = req.flash('error');
	res.render('login', {message: message[0]});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: 'Incorrect username or password'
}));

router.get('/logout', function(req, res) {
	req.logout(); 
	res.redirect('/login');
});