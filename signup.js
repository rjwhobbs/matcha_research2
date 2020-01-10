const uuid 		= require('uuid/v4');
const _			= require('lodash');
const express 	= require('express');

let router = express.Router();
module.exports = router;

router.get('/', (req, res) => {
	res.render('signup');
});