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
	res.render('signup');
});

router.post('/', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	conn.query(sql.selUserByUname, [username], checkNameExits);
	//Execution of callback logic
	function checkNameExits(err, result) {
		if (err) {throw err}
		if (!result.length) {
			bcrypt.hash(password, 10, hashPasswd);
		} else {
			res.redirect('/signup');	
		}
	}

	function hashPasswd(err, hash) {
		if (err) {throw err}
		conn.query(sql.insUser, [username, hash] ,insertNewUser);
	}

	function insertNewUser(err, result, feilds) {
		if (err) {throw err}
		console.log(result.affectedRows);
		res.redirect('/signup');
		return;
	}
	// res.redirect('/signup');
});

