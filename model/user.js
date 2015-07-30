var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');


var AnswerSchema = new Schema({
	related_question: {
		type: String
	},
	value: {
		type: String
	},
	text_value: {
		type: String
	}
});

var UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	year_of_birth: {
		type: String,
		required: true
	},
	sexe: {
		type: String
	},
	answers : {
		type: [AnswerSchema]
	},
	total_score: {
		type: Number,
		default: 0
	}
});

exports.User = mongoose.model('User', UserSchema);
