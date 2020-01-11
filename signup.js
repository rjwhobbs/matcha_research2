const uuid 		= require('uuid/v4');
const _			= require('lodash');
const express 	= require('express');
const conn		= require('./connection/conn');
const sql		= require('./sql/statements');
const bcrypt 	= require('bcrypt');

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
			bcrypt.hash(password, 10, hashPasswd);
		} else {
			req.flash('message', 'Sorry, this name is already taken.');
			// req.flash('message', 'Sorry, this name is already taken.');
			// Send user exits error here
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
		} else {
			// Success adding user
			res.redirect('/signup');
		}
	}
});

