var express = require('express');
var router = express.Router();
var User = require("../model/user.js").User;
var EarlyAccessUser = require("../model/earlyAccessUsers.js").User;

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
				user.save(function (err, user) {
					if (err) {
						return console.log(err);
					} else {
						return res.json(user);
					}
				});
			}
		});
});

/**
 * Subscribe user early access
 */
router.post('/early-access', function (req, res) {
	var entry = req.body;
	EarlyAccessUser.create(entry, function (err, user) {
		if (err) {
			return console.log("Error insertion user.");
		} else {
			return res.json(user);
		}
	});
});

/* export all routes */
module.exports = router;
