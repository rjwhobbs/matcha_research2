const uuid 		= require('uuid/v4');
const _			= require('lodash');
const express 	= require('express');
const conn		= require('./connection/conn');
const sql		= require('./model/sql_statements');
const bcrypt 	= require('bcrypt');
let	valid		= require('./helpers/signup_helpers');
let	notice		= require('./model/messages');

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

	if (!valid.uNameCheck(username)) {
		req.flash('message', notice.errInvalidName);
		res.redirect('/signup');
		return;
	}
	conn.query(sql.selUserByUname, [username], checkNameExist);
	// Execution of callback logic
	// Function hoisting in JS makes this possible
	function checkNameExist(err, result) {
		if (err) {throw err}
		if (!result.length) {
			bcrypt.hash(password, 10, hashPasswd);
		} else {
			// req.flash creates the key value pair bellow
			// When the res.render is called on '/signup' the message will
			// get passed to the sigup.pug view -> Look for "if message".
			// req.flash requires that your session middlware be setup properly too.
			// The value gets cleared after refreshing.
			req.flash('message', notice.errNameExists);
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
			req.flash('message', notice.successCreate);
			res.redirect('/login');
		}
	}
});

