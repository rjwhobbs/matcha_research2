const uuid 		= require('uuid/v4');
const _			= require('lodash');
const express 	= require('express');
const conn		= require('./connection/conn');
const sql		= require('./sql/statements');
const bcrypt 	= require('bcrypt');
let	valid		= require('./helpers/signup_helpers');

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
	// See comments in checkNameExits() bellow on how flash() works
	let message = req.flash('message');
	res.render('signup', {message: message});
});

router.post('/', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	conn.query(sql.selUserByUname, [username], checkNameExits);
	// Execution of callback logic
	// Function hoisting in JS makes this possible
	function checkNameExits(err, result) {
		if (err) {throw err}
		if (!result.length) {
			if (!valid.uNameCheck(username)) {
				req.flash(
					'message',
					'Username can only be English letters (with or without digits) ' +
					'and not less than three letters long.'
				);
				res.redirect('/signup');
				return;
			}
			bcrypt.hash(password, 10, hashPasswd);
		} else {
			// req.flash creates the key value pair bellow
			// When the res.render is called on '/signup' the message will
			// get passed to the sigup.pug view -> Look for "if message".
			// req.flash requires that your session middlware be setup properly too.
			// The value gets cleared after refreshing.
			req.flash('message', 'Sorry, this name is already taken.');
			res.redirect('/signup');	
		}
	}
	function hashPasswd(err, hash) {
		if (err) {throw err}
		conn.query(sql.insUser, [username, hash] ,insertNewUser);
	}
	function insertNewUser(err, result, feilds) {
		if (err) {throw err}
		if (!result.affectedRows) {
			res.redirect('/signup');
			return;
		} else {
			// Success adding user
			req.flash(
				'message', 
				'You have successfully created your account, please login');
			res.redirect('/login');
		}
	}
});

