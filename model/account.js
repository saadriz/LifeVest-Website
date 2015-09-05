/**
 * Created by Marwen on 24/08/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	primer: {
		saving: {
			type: Number,
			default: 1000
		},
		years: {
			type: Number,
			default: 15
		},
		inflation: {
			type: Number,
			default: 3
		},
		investment: {
			type: Number,
			default: 7
		}
	}
});

Account.plugin(passportLocalMongoose);

exports.Account = mongoose.model('Account', Account);

module.exports = mongoose.model('Account', Account);