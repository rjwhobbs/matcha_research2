const uuid 		= require('uuid/v4');
const _			= require('lodash');
const express 	= require('express');

let router = express.Router();
module.exports = router;

router.use((req, res, next) => {
	// Keeps a logged in user from accessing this page
	// Refer to passport_init for more on req.user.
	if (req.user) {
		res.redirect('/');
	}
	next();
	return;
});

router.get('/', (req, res) => {
	res.render('signup');
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.redirect('/signup');
});