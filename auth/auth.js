const express 	= require('express');
const passport 	= require('passport');
const _ 		= require('lodash'); // Utility library

const router = express.Router();
module.exports = router;

router.get('/login', function(req, res) {
	// The code in this if block is used for automatic signin in dev mode
	// run 'npm run dev' or 'npm run pro'. See package.json script for details
	// on how the env var is setup up.
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
	// 'error' is the key for the value of failureFlash from the post below
	// For more on flash() please refer to 'signup.js' comments
	let message = req.flash('error');
	if (message.length === 0) {
		message = req.flash('message');
	}
	res.render('login', {message: message[0]});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: 'Incorrect username or password'
}));

router.get('/logout', function(req, res) {
	// I think passport middleware adds this logout function which clears the sess
	req.logout(); 
	res.redirect('/login');
});