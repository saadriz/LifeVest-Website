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
	score: {
		total: {
			type: Number,
			default: 0
		},
		robo: {
			type: Number,
			default: 0
		},
		brokerage: {
			type: Number,
			default: 0
		},
		fa: {
			type: Number,
			default: 0
		},
		ria: {
			type: Number,
			default: 0
		},
		result: {
			type: String
		}
	}
});

exports.User = mongoose.model('User', UserSchema);
