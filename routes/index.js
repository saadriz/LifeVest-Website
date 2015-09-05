var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require("../model/user.js").User;
var Account = require('../model/account');

router.get('/', function (req, res) {
	res.render('index', { user : req.user });
});

router.get('/main', function(req, res) {
	if (req.user) {
		res.render('main', { title: "LifVest | Start investing" })
	} else {
		res.redirect('/login');
	}
});

router.get('/register', function(req, res) {
	res.render('register', { });
});

router.post('/register', function(req, res) {
	Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
		if (err) {
			return res.render('register', { account : account });
		}

		passport.authenticate('local')(req, res, function () {
			res.redirect('/main');
		});
	});
});

router.get('/login', function(req, res) {
	res.render('login', { user : req.user });
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		// Redirect if it fails
		if (!user) { return res.render('login', { error: "Your username or password are incorrect." }) }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			// Redirect if it succeeds
			return res.redirect('/primer');
		});
	})(req, res, next);
});

router.get('/primer', function(req, res, next) {
	if (req.user) {
		console.log(req.user);
		res.render('admin/tools/primer', { title: "LifVest | Start investing", primer: req.user.primer })
	} else {
		res.redirect('login');
	}
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/**
 * Store the user data and return the id
 */
router.post('/user', function (req, res) {
	var entry = req.body;
	User.create(entry, function (err, user) {
		if (err) {
			return console.log("Error insertion user.");
		} else {
			return res.json(user);
		}
	});
});

/**
 * Signup a user
 */
router.post('/signup', function (req, res) {
	var entry = req.body;
	User.create(entry, function (err, user) {
		if (err) {
			return console.log(err);
		} else {
			return res.json(user);
		}
	});
});

router.post('/update-variables', function(req, res) {
	var user = req.user;
	user.primer = req.body;
	console.log( req.body);
	user.save(function(err){
		if(err) return console.log(err);
		return res.json({"status": 200, "message": "Variables updated with success !"});
		});
});

/**
 * store the first survey response
 */
router.post('/send-answers', function (req, res) {
	var id = req.body.id;
	var answers = JSON.parse(req.body.answers);
	var score = JSON.parse(req.body.score);
	console.log(req.body);
	User.findOne({_id: id})
		.exec(function (err, user) {
			if (err && user == null) {
				return console.log("No user find.");
			} else {
				user.answers = user.answers.concat(answers);
				console.log(answers);
				user.score = score;
				user.save(function(err, user) {
					if(err) {
						return console.log(err);
					} else {
						return res.json(user);
					}
				});
			}
		});
});

/* export all routes */
module.exports = router;
