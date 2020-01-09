const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const flash = require('connect-flash');
const passport = require('passport');

app.use(flash());

require('./authentication/passport_init');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(require('express-session')({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

let authRouter = require('./authentication/auth');
app.use(authRouter);

app.use(function(req, res, next) {
	if (req.isAuthenticated()) { 
		res.locals.user = req.user;
		next();
		return ;
	}
	res.redirect('/login');
});