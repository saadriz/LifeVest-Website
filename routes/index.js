var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require("../model/user.js").User;
var Account = require('../model/account');

router.get('/', function (req, res) {
	res.render('index', { user : req.user });
});

router.get('/main', function(req, res) {
	console.log(req.user);
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

router.post('/login', passport.authenticate('local'), function(req, res) {
	res.redirect('/main');
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
