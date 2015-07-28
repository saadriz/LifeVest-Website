var express = require('express');
var router = express.Router();
var User = require("../model/user.js").User;

/**
 * Store the user data and return the id
 */
router.post('/user', function (req, res) {
	var entry = req.body;
	User.create(entry, function (err, user) {
		if (err) {
			return console.log("Error insertion user.");
		} else {
			res.header("Access-Control-Allow-Origin", "*");
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
	var total_score = req.body.total_score;
	console.log(req.body);

	User.findOne({_id: id})
		.exec(function (err, user) {
			if (err && !user) {
				return console.log("No user find.");
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				user.answers = user.answers.concat(answers);

				console.log(answers);

				user.total_score = total_score;
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
